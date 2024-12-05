import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import PromotionTable from './PromotionComponent/PromotionTable';
import PromotionFormDialog from './PromotionComponent/PromotionFormDialog';
import HotelLayout from '../../components/HOTEL/HotelLayout';
import axios from 'axios';

const PromotionManagement = () => {
  const [promotions, setPromotions] = useState([]);
  const [newPromotion, setNewPromotion] = useState({
    service_id: 0,
    offering_id: null,
    discount_percentage: 0,
    start_date: '',
    end_date: '',
    usage_limit: null,
    promocode: null,
    campaign_name: '',
    conditions: [],
  });
  const [editingPromotion, setEditingPromotion] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [amenitiesList, setAmenitiesList] = useState([]);

  useEffect(() => {
    fetchPromotions();
    fetchOfferings();
  }, []);

  const fetchPromotions = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found, please login');
      return;
    }

    try {
      const response = await axios.get('https://localhost:7253/provider/promotions', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      setPromotions(response.data);
    } catch (error) {
      console.error('Failed to fetch promotions', error);
    }
  };

  const fetchOfferings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://localhost:7253/api/Offering/GetAllServiceOfferingsbyIdProvider', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const offeringsWithId = response.data.map((offering) => ({ ...offering, id: offering.offeringId }));
      setAmenitiesList(offeringsWithId);
    } catch (error) {
      console.error('Error fetching offerings:', error);
    }
  };

  const handleCreatePromotion = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found, please login');
      return;
    }

    try {
      const response = await axios.post('https://localhost:7253/provider/promotions', newPromotion, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const createdPromotion = response.data;
      setPromotions((prevPromotions) => [...prevPromotions, createdPromotion]);

      setNewPromotion({
        service_id: 0,
        offering_id: null,
        discount_percentage: 0,
        start_date: '',
        end_date: '',
        usage_limit: null,
        promocode: null,
        campaign_name: '',
        conditions: [],
      });

      setOpenDialog(false);
      fetchPromotions(); // Refresh the promotions list
    } catch (error) {
      console.error('Failed to create promotion', error);
    }
  };

  const handleUpdatePromotion = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found, please login');
      return;
    }

    try {
      const response = await axios.put(
        `https://localhost:7253/provider/promotions/${editingPromotion.promotionId}`,
        editingPromotion,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const updatedPromotion = response.data;
      setPromotions((prevPromotions) =>
        prevPromotions.map((promotion) =>
          promotion.promotionId === updatedPromotion.promotionId
            ? updatedPromotion
            : promotion
        )
      );

      setEditingPromotion(null);
      setOpenDialog(false);
      fetchPromotions(); // Refresh the promotions list
    } catch (error) {
      console.error('Failed to update promotion', error);
    }
  };

  const handleEditPromotion = (promotion) => {
    // Ensure that the conditions array exists
    const promotionWithConditions = {
      ...promotion,
      conditions: promotion.conditions || [],
    };
    setEditingPromotion(promotionWithConditions);
    setNewPromotion(promotionWithConditions);
    setOpenDialog(true);
  };

  return (
    <HotelLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Promotion Management</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setNewPromotion({
              service_id: 0,
              offering_id: null,
              discount_percentage: 0,
              start_date: '',
              end_date: '',
              usage_limit: null,
              promocode: null,
              campaign_name: '',
              conditions: [],
            });
            setEditingPromotion(null);
            setOpenDialog(true);
          }}
        >
          Create New Promotion
        </Button>

        <PromotionFormDialog
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          newPromotion={editingPromotion || newPromotion}
          setNewPromotion={editingPromotion ? setEditingPromotion : setNewPromotion}
          handleCreatePromotion={handleCreatePromotion}
          editingPromotion={editingPromotion}
          handleUpdatePromotion={handleUpdatePromotion}
          amenitiesList={amenitiesList}
        />

        <PromotionTable
          promotions={promotions}
          setPromotions={setPromotions}
          setEditingPromotion={handleEditPromotion}
          setOpenDialog={setOpenDialog}
        />
      </div>
    </HotelLayout>
  );
};

export default PromotionManagement;


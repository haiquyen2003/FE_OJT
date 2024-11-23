import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import PromotionTable from './PromotionComponent/PromotionTable';
import PromotionFormDialog from './PromotionComponent/PromotionFormDialog';
import HotelLayout from '../../components/HOTEL/HotelLayout';

const samplePromotions = [/* same data as before */];

const PromotionManagement = () => {
  const [promotions, setPromotions] = useState(samplePromotions);
  const [newPromotion, setNewPromotion] = useState({
    service_id: 0,
    offering_id: null,
    discount_percentage: 0,
    start_date: '',
    end_date: '',
    usage_limit: null,
    promocode: null,
    conditions: [],
  });
  const [editingPromotion, setEditingPromotion] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Define all the necessary functions here:

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPromotion((prev) => ({ ...prev, [name]: value }));
  };

  const handleConditionChange = (index, field, value) => {
    const newConditions = [...(newPromotion.conditions || [])];
    newConditions[index] = { ...newConditions[index], [field]: value };
    setNewPromotion((prev) => ({ ...prev, conditions: newConditions }));
  };

  const addCondition = () => {
    setNewPromotion((prev) => ({
      ...prev,
      conditions: [...(prev.conditions || []), { type: '', value: '' }],
    }));
  };

  const removeCondition = (index) => {
    setNewPromotion((prev) => ({
      ...prev,
      conditions: prev.conditions.filter((_, i) => i !== index),
    }));
  };

  const handleCreatePromotion = () => {
    const newId = Math.max(...promotions.map((p) => p.promotion_id)) + 1;
    const createdPromotion = { ...newPromotion, promotion_id: newId, is_active: true };
    setPromotions([...promotions, createdPromotion]);
    setNewPromotion({
      service_id: 0,
      offering_id: null,
      discount_percentage: 0,
      start_date: '',
      end_date: '',
      usage_limit: null,
      promocode: null,
      conditions: [],
    });
    setOpenDialog(false);
  };

  const handleUpdatePromotion = () => {
    const updatedPromotions = promotions.map((p) =>
      p.promotion_id === editingPromotion.promotion_id ? editingPromotion : p
    );
    setPromotions(updatedPromotions);
    setEditingPromotion(null);
    setOpenDialog(false);
  };

  return (
    <HotelLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Promotion Management</h1>
        <Button variant="contained" color="primary" onClick={() => {
          setNewPromotion({
            service_id: 0,
            offering_id: null,
            discount_percentage: 0,
            start_date: '',
            end_date: '',
            usage_limit: null,
            promocode: null,
            conditions: [],
          });
          setOpenDialog(true);
        }}>
          Create New Promotion
        </Button>
        
        <PromotionFormDialog
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          newPromotion={newPromotion}
          setNewPromotion={setNewPromotion}
          handleCreatePromotion={handleCreatePromotion}
          editingPromotion={editingPromotion}
          handleUpdatePromotion={handleUpdatePromotion}
          handleConditionChange={handleConditionChange}
          addCondition={addCondition}
          removeCondition={removeCondition}
        />
        <PromotionTable
          promotions={promotions}
          setPromotions={setPromotions}
          setEditingPromotion={setEditingPromotion}
          setOpenDialog={setOpenDialog}
        />
      </div>
    </HotelLayout>
  );
};

export default PromotionManagement;

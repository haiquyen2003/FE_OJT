import React, { useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  Button,
} from '@mui/material';
import CreatePromotionForm from './CreatePromotionForm';
import EditPromotionForm from './EditPromotionForm';
import axios from 'axios';

const PromotionFormDialog = ({
  openDialog,
  setOpenDialog,
  newPromotion,
  setNewPromotion,
  handleCreatePromotion,
  handleUpdatePromotion,
  amenitiesList,
  editingPromotion,
}) => {
  useEffect(() => {
    if (editingPromotion) {
      setNewPromotion(editingPromotion);  // Khi có khuyến mãi đang chỉnh sửa, cập nhật form
    }
  }, [editingPromotion, setNewPromotion]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPromotion((prev) => ({ ...prev, [name]: value }));
  };

  const handleConditionChange = (index, field, value) => {
    const newConditions = [...newPromotion.conditions];
    newConditions[index] = { ...newConditions[index], [field]: value };
    setNewPromotion((prev) => ({ ...prev, conditions: newConditions }));
  };

  const addCondition = () => {
    setNewPromotion((prev) => ({
      ...prev,
      conditions: [...prev.conditions, { type: '', value: '' }],
    }));
  };

  const removeCondition = (index) => {
    setNewPromotion((prev) => ({
      ...prev,
      conditions: prev.conditions.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found, please login');
      return;
    }

    // Prepare the payload based on the newPromotion state
    const payload = {
      OfferingId: newPromotion.offering_id === '' ? null : newPromotion.offering_id,
      DiscountPercentage: parseFloat(newPromotion.discount_percentage),
      StartDate: new Date(newPromotion.start_date).toISOString(),
      EndDate: new Date(newPromotion.end_date).toISOString(),
      UsageLimit: parseInt(newPromotion.usage_limit),
      Promocode: newPromotion.promocode === '' ? null : newPromotion.promocode,
      CampaignName: newPromotion.campaign_name,
      Conditions: newPromotion.conditions.map((condition) => ({
        type: condition.type,
        value: condition.value,
      })),
    };

    console.log('Submitting promotion data:', payload);

    try {
      if (editingPromotion) {
        // PUT request for updating promotion
        const response = await axios.put(
          `https://localhost:7253/provider/promotions/${editingPromotion.promotionId}`,
          payload,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        handleUpdatePromotion(); // Cập nhật lại danh sách sau khi chỉnh sửa thành công
      } else {
        // POST request for creating new promotion
        await axios.post('https://localhost:7253/provider/promotions', payload, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        handleCreatePromotion(); // Thêm mới khuyến mãi vào danh sách
      }
      setOpenDialog(false); // Đóng dialog sau khi thành công
    } catch (error) {
      console.error('Failed to submit promotion:', error);
    }
  };

  return (
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
      <DialogActions>
        <Button onClick={() => setOpenDialog(false)} color="secondary">
          Cancel
        </Button>
        <Button type="submit" color="primary" onClick={handleSubmit}>
          {editingPromotion ? 'Update Promotion' : 'Create Promotion'}
        </Button>
      </DialogActions>

      {editingPromotion ? (
        <EditPromotionForm
          newPromotion={newPromotion}
          setNewPromotion={setNewPromotion}
          handleInputChange={handleInputChange}
          handleConditionChange={handleConditionChange}
          addCondition={addCondition}
          removeCondition={removeCondition}
          amenitiesList={amenitiesList}
        />
      ) : (
        <CreatePromotionForm
          newPromotion={newPromotion}
          setNewPromotion={setNewPromotion}
          handleInputChange={handleInputChange}
          handleConditionChange={handleConditionChange}
          addCondition={addCondition}
          removeCondition={removeCondition}
          amenitiesList={amenitiesList}
        />
      )}
    </Dialog>
  );
};

export default PromotionFormDialog;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  DialogContent,
  DialogContentText,
  InputLabel,
  TextField,
  Box,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';

const EditPromotionForm = ({
  newPromotion,
  setNewPromotion,
  handleInputChange,
  addCondition,
  removeCondition,
  handleConditionChange,
  amenitiesList
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Gọi API để lấy chi tiết promotion khi mở form
  useEffect(() => {
    const fetchPromotionDetails = async () => {
      try {
        const token = localStorage.getItem('token'); // Lấy token từ localStorage hoặc bất kỳ nơi nào bạn lưu token

        const response = await axios.get(`https://localhost:7253/provider/promotions/${newPromotion.promotionId}`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Thêm token vào header
          }
        });

        setNewPromotion(response.data);
      } catch (error) {
        console.error('Failed to fetch promotion details:', error);
      }
    };

    if (newPromotion.promotionId) {
      fetchPromotionDetails();
    }
  }, [newPromotion.promotionId]);

  const handleUpdatePromotion = async () => {
    setLoading(true);
    setError(null);

    const updatePromotionDto = {
      offeringId: newPromotion.serviceOffering?.offeringId,
      discountPercentage: newPromotion.discountPercentage,
      endDate: newPromotion.endDate,
      usageLimit: newPromotion.usageLimit,
      promocode: newPromotion.promocode,
      campaignName: newPromotion.campaignName,
      conditions: newPromotion.conditions,
    };

    try {
      // Gọi API PUT để cập nhật promotion
      const response = await axios.put(`https://localhost:7253/provider/promotions/${newPromotion.promotionId}`, updatePromotionDto, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });

      if (response.status === 200) {
        // Cập nhật thành công, bạn có thể thông báo cho người dùng
        alert('Promotion updated successfully!');
      } else {
        setError('Failed to update promotion.');
      }
    } catch (error) {
      setError('Error updating promotion.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogContent>
      <DialogContentText>
        Edit the details of your promotion.
      </DialogContentText>
      <Box mt={2} style={{ minWidth: '500px' }}>
        {/* Offering */}
        <div className="space-y-2">
          <InputLabel htmlFor="offering_id">Offering</InputLabel>
          <FormControl fullWidth>
            <Select
              id="offering_id"
              name="offering_id"
              value={newPromotion.serviceOffering?.offeringId || ''}
              onChange={handleInputChange}
            >
              <MenuItem value="">
                <em>Apply to all services</em>
              </MenuItem>
              {amenitiesList.map((serviceOffering) => (
                <MenuItem key={serviceOffering.offeringId} value={serviceOffering.offeringId}>
                  {serviceOffering.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Discount Percentage */}
        <div className="space-y-2">
          <InputLabel htmlFor="discount_percentage">Discount Percentage</InputLabel>
          <TextField
            id="discount_percentage"
            name="discount_percentage"
            type="number"
            inputProps={{ min: "0", max: "100", step: "0.01" }}
            value={newPromotion.discountPercentage || ''}
            onChange={handleInputChange}
            required
            fullWidth
          />
        </div>

        {/* Promocode */}
        <div className="space-y-2">
          <InputLabel htmlFor="promocode">Promocode</InputLabel>
          <TextField
            id="promocode"
            name="promocode"
            value={newPromotion.promocode || ''}
            onChange={handleInputChange}
            fullWidth
          />
        </div>

        {/* End Date */}
        <div className="space-y-2">
          <InputLabel htmlFor="end_date">End Date</InputLabel>
          <TextField
            id="end_date"
            name="end_date"
            type="datetime-local"
            value={newPromotion.endDate ? new Date(newPromotion.endDate).toISOString().slice(0, 16) : ''}
            onChange={handleInputChange}
            fullWidth
          />
        </div>

        {/* Usage Limit */}
        <div className="space-y-2">
          <InputLabel htmlFor="usage_limit">Usage Limit</InputLabel>
          <TextField
            id="usage_limit"
            name="usage_limit"
            type="number"
            value={newPromotion.usageLimit || ''}
            onChange={handleInputChange}
            fullWidth
          />
        </div>

        {/* Conditions */}
        <div className="space-y-2">
          <InputLabel>Conditions</InputLabel>
          {newPromotion.conditions?.map((condition, index) => (
            <Box key={index} display="flex" alignItems="center" mt={1}>
              <TextField
                label="Condition Type"
                value={condition.type}
                onChange={(e) => handleConditionChange(index, 'type', e.target.value)}
                fullWidth
              />
              <TextField
                label="Condition Value"
                value={condition.value}
                onChange={(e) => handleConditionChange(index, 'value', e.target.value)}
                fullWidth
              />
              <Button onClick={() => removeCondition(index)} color="secondary">
                Remove
              </Button>
            </Box>
          ))}
          <Button type="button" variant="outlined" onClick={addCondition}>
            Add Condition
          </Button>
        </div>

        {/* Update Button */}
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdatePromotion}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Promotion'}
          </Button>
          {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
        </Box>
      </Box>
    </DialogContent>
  );
};

export default EditPromotionForm;

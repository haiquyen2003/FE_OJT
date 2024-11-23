import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, Box, IconButton, Typography, Switch } from '@mui/material';
import { FiTrash2 } from 'react-icons/fi';
// import toast is removed because the module was not found

const PromotionFormDialog = ({ openDialog, setOpenDialog, newPromotion, setNewPromotion, handleCreatePromotion, editingPromotion, handleUpdatePromotion }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPromotion) {
      handleUpdatePromotion();
    } else {
      handleCreatePromotion();
    }
    // toast call removed because toast module was not found
  };

  return (
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
      <DialogTitle>{editingPromotion ? 'Edit Promotion' : 'Create New Promotion'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>
            {editingPromotion ? 'Edit the details of your promotion.' : 'Enter the details for the new promotion.'}
          </DialogContentText>
          <Box mt={2} className="space-y-6">            
              <div className="space-y-2">
                <InputLabel htmlFor="offering_id">Offering ID</InputLabel>
                <TextField
                  id="offering_id"
                  name="offering_id"
                  type="number"
                  value={newPromotion.offering_id}
                  onChange={handleInputChange}
                  required
                  fullWidth
                />
              </div>
            <div className="space-y-2">
              <InputLabel htmlFor="discount_percentage">Discount Percentage</InputLabel>
              <TextField
                id="discount_percentage"
                name="discount_percentage"
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={newPromotion.discount_percentage}
                onChange={handleInputChange}
                required
                fullWidth
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <InputLabel htmlFor="start_date">Start Date</InputLabel>
                <TextField
                  id="start_date"
                  name="start_date"
                  type="date"
                  value={newPromotion.start_date}
                  onChange={handleInputChange}
                  required
                  fullWidth
                />
              </div>
              <div className="space-y-2">
                <InputLabel htmlFor="end_date">End Date</InputLabel>
                <TextField
                  id="end_date"
                  name="end_date"
                  type="date"
                  value={newPromotion.end_date}
                  onChange={handleInputChange}
                  required
                  fullWidth
                />
              </div>
            </div>
            <div className="space-y-2">
              <InputLabel htmlFor="usage_limit">Usage Limit</InputLabel>
              <TextField
                id="usage_limit"
                name="usage_limit"
                type="number"
                min="0"
                value={newPromotion.usage_limit}
                onChange={handleInputChange}
                required
                fullWidth
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <InputLabel htmlFor="promocode">Promo Code</InputLabel>
                <div className="flex items-center space-x-2">
                  <InputLabel htmlFor="is_automatic">Automatic Promotion</InputLabel>
                  <Switch
                    id="is_automatic"
                    checked={newPromotion.promocode === null}
                    onChange={(e) =>
                      setNewPromotion((prev) => ({ ...prev, promocode: e.target.checked ? null : '' }))
                    }
                  />
                </div>
              </div>
              <TextField
                id="promocode"
                name="promocode"
                value={newPromotion.promocode || ''}
                onChange={handleInputChange}
                disabled={newPromotion.promocode === null}
                placeholder={newPromotion.promocode === null ? 'Automatic Promotion' : 'Enter promo code'}
                fullWidth
              />
            </div>
            <div className="space-y-2">
              <InputLabel>Conditions</InputLabel>
              {newPromotion.conditions.map((condition, index) => (
                <Box key={index} display="flex" alignItems="center" mt={1}>
                  <FormControl fullWidth>
                    <InputLabel>Condition Type</InputLabel>
                    <Select
                      value={condition.type}
                      onChange={(e) => handleConditionChange(index, 'type', e.target.value)}
                    >
                      <MenuItem value="MIN_ORDER_VALUE">Minimum Order Value</MenuItem>
                      <MenuItem value="PAYMENT_METHOD">Payment Method</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    value={condition.value}
                    onChange={(e) => handleConditionChange(index, 'value', e.target.value)}
                    placeholder="Condition value"
                    fullWidth
                    style={{ marginLeft: '8px' }}
                  />
                  <IconButton
                    color="secondary"
                    onClick={() => removeCondition(index)}
                  >
                    <FiTrash2 />
                  </IconButton>
                </Box>
              ))}
              <Button type="button" variant="outlined" onClick={addCondition} style={{ marginTop: '8px' }}>
                Add Condition
              </Button>
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            {editingPromotion ? 'Update Promotion' : 'Create Promotion'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PromotionFormDialog;

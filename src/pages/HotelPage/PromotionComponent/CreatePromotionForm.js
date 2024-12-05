import React from 'react';
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
  Switch,
} from '@mui/material';

const CreatePromotionForm = ({
  newPromotion,
  setNewPromotion,
  handleInputChange,
  addCondition,
  removeCondition,
  handleConditionChange,
  amenitiesList
}) => (
  <DialogContent>
    <DialogContentText>
      Enter the details for the new promotion.
    </DialogContentText>
    <Box mt={2} className="space-y-6">
      {/* Offering selection */}
      <div className="space-y-2">
        <InputLabel htmlFor="offering_id">Offering</InputLabel>
        <FormControl fullWidth>
          <Select
            id="offering_id"
            name="offering_id"
            value={newPromotion.offering_id || ''}
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
          value={newPromotion.discount_percentage}
          onChange={handleInputChange}
          required
          fullWidth
        />
      </div>

      {/* Start Date and End Date */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <InputLabel htmlFor="start_date">Start Date</InputLabel>
          <TextField
            id="start_date"
            name="start_date"
            type="datetime-local"
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
            type="datetime-local"
            value={newPromotion.end_date}
            onChange={handleInputChange}
            required
            fullWidth
          />
        </div>
      </div>

      {/* Usage Limit */}
      <div className="space-y-2">
        <InputLabel htmlFor="usage_limit">Usage Limit</InputLabel>
        <TextField
          id="usage_limit"
          name="usage_limit"
          type="number"
          inputProps={{ min: "0" }}
          value={newPromotion.usage_limit}
          onChange={handleInputChange}
          required
          fullWidth
        />
      </div>

      {/* Promo Code and Automatic Promotion */}
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

      {/* Campaign Name */}
      <div className="space-y-2">
        <InputLabel htmlFor="campaign_name">Campaign Name</InputLabel>
        <TextField
          id="campaign_name"
          name="campaign_name"
          value={newPromotion.campaign_name || ''}
          onChange={handleInputChange}
          required
          fullWidth
        />
      </div>

      {/* Conditions */}
      <div className="space-y-2">
        <InputLabel>Conditions</InputLabel>
        {newPromotion.conditions.map((condition, index) => (
          <Box key={index} display="flex" alignItems="center" mt={1}>
            {/* Condition inputs */}
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
    </Box>
  </DialogContent>
);

export default CreatePromotionForm;

import React, { useState } from 'react';
import { 
  TextField,
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const EditableField = ({ label, value, onSave, type = 'text', disabled = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [fieldValue, setFieldValue] = useState(value);

  const handleSave = () => {
    onSave(fieldValue);
    setIsEditing(false);
  };

  const renderEditInput = () => {
    switch (type) {
      case 'date':
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={fieldValue ? new Date(fieldValue) : null}
              onChange={(newValue) => setFieldValue(newValue.toISOString())}
              renderInput={(params) => <TextField {...params} fullWidth size="small" />}
            />
          </LocalizationProvider>
        );
      case 'gender':
        return (
          <FormControl fullWidth size="small">
            <Select
              value={fieldValue || ''}
              onChange={(e) => setFieldValue(e.target.value)}
            >
              <MenuItem value="MAIL">Male</MenuItem>
              <MenuItem value="FEMALE">Female</MenuItem>
              <MenuItem value="OTHER">Other</MenuItem>
            </Select>
          </FormControl>
        );
      default:
        return (
          <TextField
            fullWidth
            value={fieldValue}
            onChange={(e) => setFieldValue(e.target.value)}
            variant="outlined"
            size="small"
            type={type}
          />
        );
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        {label}
      </Typography>
      {isEditing ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {renderEditInput()}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            onClick={() => setIsEditing(false)}
            startIcon={<CancelIcon />}
          >
            Cancel
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography>{value || `Add your ${label.toLowerCase()}`}</Typography>
          {!disabled && (
            <Button
              variant="outlined"
              onClick={() => setIsEditing(true)}
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

export default EditableField;


import React from 'react';
import { Typography, Box } from '@mui/material';

const LocationInfo = ({ location }) => (
  <Box>
    <Typography variant="h6" color="primary" gutterBottom>
      Thông tin Vị trí
    </Typography>
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" color="text.secondary">
        Thành phố
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {location.city}
      </Typography>

      <Typography variant="subtitle2" color="text.secondary">
        Địa chỉ
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {location.address}
      </Typography>

      <Typography variant="subtitle2" color="text.secondary">
        Quốc gia
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {location.country}
      </Typography>

      <Typography variant="subtitle2" color="text.secondary">
        Mã Bưu chính
      </Typography>
      <Typography variant="body1">
        {location.postal_code}
      </Typography>
    </Box>
  </Box>
);

export default LocationInfo;


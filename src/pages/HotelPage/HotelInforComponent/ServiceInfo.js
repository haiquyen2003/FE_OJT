import React from 'react';
import { Typography, Box } from '@mui/material';

const ServiceInfo = ({ service }) => (
  <Box>
    <Typography variant="h6" color="primary" gutterBottom>
      Thông tin Dịch vụ
    </Typography>
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" color="text.secondary">
        Tên Dịch vụ
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {service.name}
      </Typography>
      
      <Typography variant="subtitle2" color="text.secondary">
        Mô tả
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {service.description}
      </Typography>
      
      <Typography variant="subtitle2" color="text.secondary">
        Loại Dịch vụ
      </Typography>
      <Typography variant="body1">
        {service.serviceType}
      </Typography>
    </Box>
  </Box>
);

export default ServiceInfo;


import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Grid,
  Box,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import axios from 'axios';
import HotelLayout from '../../components/HOTEL/HotelLayout';
import ServiceInfo from '../HotelPage/HotelInforComponent/ServiceInfo';
import LocationInfo from '../HotelPage/HotelInforComponent/LocationInfo';
import ImageUploader from '../HotelPage/HotelInforComponent/ImageUploader';

export default function HotelInfoManager() {
  const [hotelInfo, setHotelInfo] = useState({
    serviceId: 0,
    name: '',
    description: '',
    serviceType: '',
    locationDTOs: [{
      latitude: 0,
      longitude: 0,
      city: '',
      region: '',
      country: '',
      postal_code: '',
      address: '',
    }],
    urlImage: '',
  });

  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    fetchHotelInfo();
  }, []);

  const fetchHotelInfo = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Không tìm thấy token, vui lòng đăng nhập');
      return;
    }

    try {
      const response = await axios.get('https://localhost:7253/api/Provider/InfomationServices', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = response.data;
      if (data && data.length > 0) {
        const firstService = data[0];
        setHotelInfo(firstService);
      }
    } catch (error) {
      console.error('Lỗi khi lấy thông tin khách sạn:', error);
    }
  };

  const handleImageUpload = (file) => {
    setNewImage(file);
  };

  const handleImageUpdate = async () => {
    if (!newImage) return;

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Không tìm thấy token, vui lòng đăng nhập');
      return;
    }

    const formData = new FormData();
    formData.append('NewImage', newImage);

    try {
      const response = await axios.post('https://localhost:7253/api/Provider/update-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.data.imageUrl) {
        setHotelInfo(prev => ({
          ...prev,
          urlImage: response.data.imageUrl,
        }));
        setNewImage(null);
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật hình ảnh:', error);
    }
  };

  return (
    <HotelLayout>
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            align="center" 
            gutterBottom 
            color="primary"
            sx={{ fontWeight: 'bold', mb: 4 }}
          >
            Thông tin Khách sạn
          </Typography>

          <Card elevation={3}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <ImageUploader
                    currentImage={hotelInfo.urlImage}
                    onImageUpload={handleImageUpload}
                    newImage={newImage}
                    onUpdateConfirm={handleImageUpdate}
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <ServiceInfo service={hotelInfo} />
                  <Divider sx={{ my: 3 }} />
                  <LocationInfo location={hotelInfo.locationDTOs[0]} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </HotelLayout>
  );
}


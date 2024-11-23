import React, { useState, useEffect } from 'react';
import { ChevronRight } from '@mui/icons-material';
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  Box,
  Typography,
  Autocomplete,
} from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import HotelLayout from '../../components/HOTEL/HotelLayout';
import axios from 'axios'; // Nhập axios

export default function HotelInfoManager() {
  const [hotelInfo, setHotelInfo] = useState({
    service: {
      service_id: 1,
      provider_id: 1,
      name: '',
      description: '',
      service_type: '',
      location_id: 1,
    },
    location: {
      location_id: 1,
      latitude: 0,
      longitude: 0,
      city: '',
      region: '',
      country: '',
      postal_code: '',
      address: '',
    },
  });

  const [locationSearch, setLocationSearch] = useState('');
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [tabValue, setTabValue] = useState('service');

  useEffect(() => {
    // Hàm gọi API để lấy thông tin khách sạn từ server
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
          setHotelInfo({
            service: {
              service_id: firstService.serviceId,
              name: firstService.name,
              description: firstService.description,
              service_type: firstService.serviceType,
              location_id: firstService.locationDTOs[0].location_id || 1,
            },
            location: {
              latitude: firstService.locationDTOs[0].latitude,
              longitude: firstService.locationDTOs[0].longitude,
              city: firstService.locationDTOs[0].city,
              region: firstService.locationDTOs[0].region,
              country: firstService.locationDTOs[0].country,
              postal_code: firstService.locationDTOs[0].postal_code,
              address: firstService.locationDTOs[0].address,
            },
          });
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin khách sạn:', error);
      }
    };

    // Gọi hàm fetchHotelInfo khi component được render
    fetchHotelInfo();
  }, []);

  useEffect(() => {
    if (locationSearch.length > 2) {
      // Gọi API để lấy gợi ý vị trí
      const fetchLocationSuggestions = async () => {
        try {
          const response = await axios.get(`https://localhost:7253/api/location/autocomplete`, {
            params: {
              query: locationSearch,
            },
          });
          setLocationSuggestions(response.data);
        } catch (error) {
          console.error('Lỗi khi lấy gợi ý địa điểm:', error);
        }
      };

      fetchLocationSuggestions();
    }
  }, [locationSearch]);

  const handleLocationSelect = (location) => {
    if (location) {
      setHotelInfo((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          latitude: parseFloat(location.lat),
          longitude: parseFloat(location.lon),
          address: location.display_name,
          city: location.display_place,
          country: location.display_address,
        },
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const [section, field] = name.split('.');
    setHotelInfo((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Thông tin khách sạn cập nhật:', hotelInfo);
  };

  return (
    <HotelLayout>
      <div className="max-w-7xl mx-auto p-16 bg-white shadow-lg rounded-lg border border-gray-300">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
          Thông tin Khách sạn
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg shadow-md border border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-blue-700">
                Thông tin Dịch vụ
              </h2>
              <Button variant="outlined" onClick={() => setOpenDialog(true)} className="border-blue-600">
                <ChevronRight />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <Typography className="text-blue-600">Tên Dịch vụ</Typography>
                <div className="p-2 bg-gray-50 rounded-md border border-gray-300">
                  {hotelInfo.service.name}
                </div>
              </div>
              <div>
                <Typography className="text-blue-600">Mô tả</Typography>
                <div className="p-2 bg-gray-50 rounded-md border border-gray-300">
                  {hotelInfo.service.description}
                </div>
              </div>
              <div>
                <Typography className="text-blue-600">Loại Dịch vụ</Typography>
                <div className="p-2 bg-gray-50 rounded-md border border-gray-300">
                  {hotelInfo.service.service_type}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg shadow-md border border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-blue-700">
                Thông tin Vị trí
              </h2>
              <Button variant="outlined" onClick={() => setOpenDialog(true)} className="border-blue-600">
                <ChevronRight />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <Typography className="text-blue-600">Thành phố</Typography>
                <div className="p-2 bg-gray-50 rounded-md border border-gray-300">
                  {hotelInfo.location.city}
                </div>
              </div>
              <div>
                <Typography className="text-blue-600">Địa chỉ</Typography>
                <div className="p-2 bg-gray-50 rounded-md border border-gray-300">
                  {hotelInfo.location.address}
                </div>
              </div>
              <div>
                <Typography className="text-blue-600">Quốc gia</Typography>
                <div className="p-2 bg-gray-50 rounded-md border border-gray-300">
                  {hotelInfo.location.country}
                </div>
              </div>
              <div>
                <Typography className="text-blue-600">Mã Bưu chính</Typography>
                <div className="p-2 bg-gray-50 rounded-md border border-gray-300">
                  {hotelInfo.location.postal_code}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dialog và các thành phần khác vẫn giữ nguyên */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Cập nhật Thông tin</DialogTitle>
          <DialogContent>
            <TabContext value={tabValue}>
              <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} aria-label="tabs">
                <Tab label="Dịch vụ" value="service" />
                <Tab label="Địa chỉ" value="address" />
              </Tabs>
              <TabPanel value="service">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <TextField
                    label="Tên Dịch vụ"
                    name="service.name"
                    value={hotelInfo.service.name}
                    onChange={handleInputChange}
                    fullWidth
                  />
                  <TextField
                    label="Mô tả"
                    name="service.description"
                    value={hotelInfo.service.description}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                  />
                  <TextField
                    label="Loại Dịch vụ"
                    name="service.service_type"
                    value={hotelInfo.service.service_type}
                    onChange={handleInputChange}
                    fullWidth
                  />
                  <Button type="submit" variant="contained" fullWidth>
                    Lưu thay đổi
                  </Button>
                </form>
              </TabPanel>
              <TabPanel value="address">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Autocomplete
                    options={locationSuggestions}
                    getOptionLabel={(option) => `${option.display_place}, ${option.display_address}`}
                    onInputChange={(event, newInputValue) => setLocationSearch(newInputValue)}
                    onChange={(event, newValue) => handleLocationSelect(newValue)}
                    renderOption={(props, option) => (
                      <Box component="li" {...props}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          <Typography component="span" sx={{ fontWeight: 'bold' }}>
                            {option.display_place}
                          </Typography>
                          <Typography component="span" variant="body2" color="text.secondary">
                            {option.display_address}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField {...params} label="Tìm kiếm địa điểm" fullWidth />
                    )}
                  />
                  <TextField
                    label="Địa chỉ"
                    name="location.address"
                    value={hotelInfo.location.address}
                    onChange={handleInputChange}
                    fullWidth
                  />
                  <TextField
                    label="Thành phố"
                    name="location.city"
                    value={hotelInfo.location.city}
                    onChange={handleInputChange}
                    fullWidth
                  />
                  <TextField
                    label="Quốc gia"
                    name="location.country"
                    value={hotelInfo.location.country}
                    onChange={handleInputChange}
                    fullWidth
                  />
                  <TextField
                    label="Mã Bưu chính"
                    name="location.postal_code"
                    value={hotelInfo.location.postal_code}
                    onChange={handleInputChange}
                    fullWidth
                  />
                  <Button type="submit" variant="contained" fullWidth>
                    Lưu thay đổi
                  </Button>
                </form>
              </TabPanel>
            </TabContext>
          </DialogContent>
        </Dialog>
      </div>
    </HotelLayout>
  );
}

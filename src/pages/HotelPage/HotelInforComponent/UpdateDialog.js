import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Tabs,
  Tab,
  Autocomplete,
  Box,
  Typography
} from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';

const UpdateDialog = ({
  open,
  onClose,
  tabValue,
  setTabValue,
  hotelInfo,
  handleInputChange,
  handleSubmit,
  locationSearch,
  setLocationSearch,
  locationSuggestions,
  handleLocationSelect
}) => (
  <Dialog open={open} onClose={onClose}>
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
              name="name"
              value={hotelInfo.name}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Mô tả"
              name="description"
              value={hotelInfo.description}
              onChange={handleInputChange}
              fullWidth
              multiline
            />
            <TextField
              label="Loại Dịch vụ"
              name="serviceType"
              value={hotelInfo.serviceType}
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
              value={hotelInfo.locationDTOs[0].address}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Thành phố"
              name="location.city"
              value={hotelInfo.locationDTOs[0].city}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Quốc gia"
              name="location.country"
              value={hotelInfo.locationDTOs[0].country}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Mã Bưu chính"
              name="location.postal_code"
              value={hotelInfo.locationDTOs[0].postal_code}
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
);

export default UpdateDialog;


import React, { useState, useEffect } from 'react';
import HotelLayout from '../../components/HOTEL/HotelLayout';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton, Grid } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import Autocomplete from '@mui/material/Autocomplete';

const AmenitiesManagement = () => {
  const [amenities, setAmenities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editAmenity, setEditAmenity] = useState(null);
  const [deleteAmenity, setDeleteAmenity] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);

  const iconOptions = [
    ...Object.keys(FaIcons).map((iconName) => ({
      label: iconName,
      value: iconName,
      component: React.createElement(FaIcons[iconName]),
    })),
    ...Object.keys(MdIcons).map((iconName) => ({
      label: iconName,
      value: iconName,
      component: React.createElement(MdIcons[iconName]),
    })),
  ];

  useEffect(() => {
    const fetchAmenities = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Không tìm thấy token, vui lòng đăng nhập');
        return;
      }

      try {
        const response = await axios.get('https://localhost:7253/api/Amenities/getAmenitiesByProvider', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setAmenities(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách tiện nghi:', error);
      }
    };

    fetchAmenities();
  }, []);

  const handleAddClick = () => {
    setEditAmenity(null);
    setSelectedIcon(null);
    setShowModal(true);
  };

  const handleEditClick = (amenity) => {
    setEditAmenity(amenity);
    setSelectedIcon(iconOptions.find(option => option.value === amenity.iconType) || null);
    setShowModal(true);
  };

  const handleDeleteClick = (amenity) => {
    setDeleteAmenity(amenity);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteAmenity) return;

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Không tìm thấy token, vui lòng đăng nhập');
      return;
    }

    try {
      await axios.delete(`https://localhost:7253/api/Amenities/deleteAmenity/${deleteAmenity.amenitieId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      setAmenities((prevAmenities) =>
        prevAmenities.filter((amenity) => amenity.amenitieId !== deleteAmenity.amenitieId)
      );

      setShowDeleteDialog(false);
      setDeleteAmenity(null);
    } catch (error) {
      console.error('Lỗi khi xóa tiện nghi:', error);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setDeleteAmenity(null);
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Không tìm thấy token, vui lòng đăng nhập');
      return;
    }
  
    const updatedAmenity = {
      name: document.getElementById('amenityName').value,
      description: document.getElementById('amenityDescription').value,
      iconType: selectedIcon?.value || "string", // Nếu không có icon chọn thì sẽ mặc định là "string"
    };
  
    // Log dữ liệu form trước khi gửi
    console.log('Form data to send:', updatedAmenity);
  
    try {
      if (editAmenity) {
        // Update amenity
        await axios.put(
          `https://localhost:7253/api/Amenities/updateAmenity/${editAmenity.amenitieId}`,
          updatedAmenity,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }
        );
  
        setAmenities((prevAmenities) =>
          prevAmenities.map((amenity) =>
            amenity.amenitieId === editAmenity.amenitieId ? { ...amenity, ...updatedAmenity } : amenity
          )
        );
      } else {
        // Create new amenity
        const response = await axios.post(
          'https://localhost:7253/api/Amenities/createAmenity',
          updatedAmenity,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }
        );
  
        setAmenities((prevAmenities) => [...prevAmenities, response.data]);
      }
    } catch (error) {
      console.error('Lỗi khi lưu tiện nghi:', error);
    }
  
    setShowModal(false);
  };

  const columns = [
    { field: 'amenitieId', headerName: '#', width: 100 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'description', headerName: 'Description', width: 350 },
    { 
      field: 'iconType', 
      headerName: 'Icon', 
      width: 250,
      renderCell: (params) => {
        const iconName = params.value;
        let IconComponent = null;
  
        if (FaIcons[iconName]) {
          IconComponent = FaIcons[iconName];
        } else if (MdIcons[iconName]) {
          IconComponent = MdIcons[iconName];
        }
  
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
          {IconComponent && <IconComponent style={{ fontSize: 30, marginRight: 8 }} />} {/* Thay đổi kích thước của icon */}
          {/* <span>{iconName}</span> */}
          </div>
        );
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleEditClick(params.row)}>
            <Edit />
          </IconButton>
          <IconButton color="error" onClick={() => handleDeleteClick(params.row)}>
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];
  

  return (
    <HotelLayout>
      <div className="bg-gray-100 text-gray-900 min-h-screen p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">Amenities Management</h1>
          <button
            className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-lg flex items-center"
            onClick={handleAddClick}
          >
            <Add className="mr-2" /> Add New Amenity
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div style={{ height: 500, width: '100%' }} className="bg-white text-gray-900">
            <DataGrid
              rows={amenities}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              getRowId={(row) => row.amenitieId}
            />
          </div>
        </div>
      </div>

      {/* Dialog Confirm Delete */}
      <Dialog open={showDeleteDialog} onClose={handleCancelDelete} maxWidth="sm" fullWidth>
        <DialogTitle>Xác nhận xóa tiện nghi</DialogTitle>
        <DialogContent>Bạn có chắc chắn muốn xóa tiện nghi này không?</DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="secondary">
            Hủy
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Add/Edit Amenity */}
      <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editAmenity ? 'Edit Amenity' : 'Add Amenity'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                label="Amenity Name"
                type="text"
                fullWidth
                variant="outlined"
                id="amenityName"
                defaultValue={editAmenity?.name || ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Description"
                type="text"
                fullWidth
                variant="outlined"
                id="amenityDescription"
                defaultValue={editAmenity?.description || ''}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                options={iconOptions}
                getOptionLabel={(option) => option.label}
                value={selectedIcon}
                onChange={(event, newValue) => setSelectedIcon(newValue)}
                renderOption={(props, option) => (
                  <li {...props} key={option.value}>
                    <span style={{ display: 'flex', alignItems: 'center', marginRight: 8 }}>
                      {React.cloneElement(option.component, { size: 24 })}
                    </span>
                    {option.label}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Icon Type"
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: selectedIcon ? (
                        <>
                          <span style={{ display: 'flex', alignItems: 'center', marginRight: 8 }}>
                            {React.cloneElement(selectedIcon.component, { size: 24 })}
                          </span>
                          {params.InputProps.startAdornment}
                        </>
                      ) : (
                        params.InputProps.startAdornment
                      ),
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            {editAmenity ? 'Update' : 'Add'} Amenity
          </Button>
        </DialogActions>
      </Dialog>
    </HotelLayout>
  );
};

export default AmenitiesManagement;

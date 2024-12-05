import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Typography, Box, Grid, Chip, IconButton } from '@mui/material';
import { DropzoneArea } from 'material-ui-dropzone';
import { Delete } from '@mui/icons-material';

const RoomTypeDialog = ({
  open,
  onClose,
  onSave,
  amenitiesList,
  selectedAmenities,
  onAmenityChange,
  onImageChange,
  externalSetImagesToDelete,
  nameRef,
  descriptionRef,
  priceRef,
  availableUnitsRef,
  roomSizeRef,
  bedTypeRef,
  maxGuestsRef,
  startDateRef,
  endDateRef,
  editRoom
}) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [selectedAmenitiesState, setSelectedAmenitiesState] = useState([]);

  // Chạy mỗi khi open dialog hoặc editRoom thay đổi
  useEffect(() => {
    if (editRoom && open) {
      if (nameRef.current) nameRef.current.value = editRoom.name || '';
      if (descriptionRef.current) descriptionRef.current.value = editRoom.description || '';
      if (priceRef.current) priceRef.current.value = editRoom.price || '';
      if (availableUnitsRef.current) availableUnitsRef.current.value = editRoom.availableUnits || '';
      if (roomSizeRef.current) roomSizeRef.current.value = editRoom.roomSize || '';
      if (bedTypeRef.current) bedTypeRef.current.value = editRoom.bedType || '';
      if (maxGuestsRef.current) maxGuestsRef.current.value = editRoom.maxGuests || '';
      setStartDate(editRoom.startDate ? editRoom.startDate.split('T')[0] : '');
      setEndDate(editRoom.endDate ? editRoom.endDate.split('T')[0] : '');
      const imageUrls = editRoom.offeringImages || [];
      setImages(imageUrls);
      console.log('Loaded Images:', imageUrls); // Log image URLs to check if they are being loaded
      setSelectedAmenitiesState(editRoom.amenity.map(amenity => amenity.amenitieId) || []);
    } else if (!editRoom && open) {
      // Nếu không phải là chỉnh sửa (create new room)
      setImages([]);
      setStartDate('');
      setEndDate('');
      setSelectedAmenitiesState([]);
    }
  }, [editRoom, open]);

  const handleImageChange = (files) => {
    console.log('Selected Images:', files); // Log selected images to verify changes
    setNewImages(files);
    onImageChange(files);
  };

  const handleAmenityClick = (amenityId) => {
    const updatedAmenities = selectedAmenitiesState.includes(amenityId)
      ? selectedAmenitiesState.filter((id) => id !== amenityId)
      : [...selectedAmenitiesState, amenityId];
    setSelectedAmenitiesState(updatedAmenities);
    onAmenityChange(updatedAmenities);
  };

  const handleDeleteOldImage = (index) => {
    const imageToDelete = images[index];
    console.log('Deleting image with ID:', imageToDelete.offeringImageId);
    if (typeof externalSetImagesToDelete === 'function') {
      externalSetImagesToDelete(imageToDelete.offeringImageId);
    } else {
      console.error('externalSetImagesToDelete is not a function');
    }
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{editRoom ? 'Edit Room Type' : 'Add Room Type'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {/* Các trường thông tin chung */}
          <Grid item xs={12}>
            <TextField
              inputRef={nameRef}
              autoFocus
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={editRoom?.name || ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              inputRef={descriptionRef}
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={editRoom?.description || ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              inputRef={priceRef}
              margin="dense"
              label="Price"
              type="number"
              fullWidth
              variant="outlined"
              defaultValue={editRoom?.price || ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              inputRef={availableUnitsRef}
              margin="dense"
              label="Available Units"
              type="number"
              fullWidth
              variant="outlined"
              defaultValue={editRoom?.availableUnits || ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              inputRef={roomSizeRef}
              margin="dense"
              label="Room Size (m²)"
              type="number"
              fullWidth
              variant="outlined"
              defaultValue={editRoom?.roomSize || ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              inputRef={bedTypeRef}
              margin="dense"
              label="Bed Type"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={editRoom?.bedType || ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              inputRef={maxGuestsRef}
              margin="dense"
              label="Max Guests"
              type="number"
              fullWidth
              variant="outlined"
              defaultValue={editRoom?.maxGuests || ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label="Start Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label="End Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Grid>

          {/* Chọn tiện nghi */}
          <Grid item xs={12}>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" gutterBottom>
                Amenities
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', maxHeight: 200, overflow: 'auto' }}>
                {amenitiesList.map((amenity) => (
                  amenity.amenitieId && (
                    <Chip
                      key={amenity.amenitieId}
                      label={amenity.name}
                      onClick={() => handleAmenityClick(amenity.amenitieId)}
                      clickable
                      sx={{
                        backgroundColor: selectedAmenitiesState.includes(amenity.amenitieId) ? 'black' : 'white',
                        color: selectedAmenitiesState.includes(amenity.amenitieId) ? 'white' : 'black',
                        border: '1px solid rgba(0, 0, 0, 0.2)'
                      }}
                    />
                  )
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Thêm hình ảnh */}
          <Grid item xs={12}>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" gutterBottom>
                Room Images
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
                {images.map((image, index) => (
                  <Box key={index} sx={{ position: 'relative' }}>
                    <img
                      src={image.imageUrl}
                      alt={`Room Image ${index + 1}`}
                      style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: 8 }}
                    />
                    <IconButton
                      onClick={() => handleDeleteOldImage(index)}
                      size="small"
                      sx={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
              <DropzoneArea
                acceptedFiles={['image/*']}
                dropzoneText={"Drag and drop an image here or click"}
                onChange={handleImageChange}
                filesLimit={5}
              />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={onSave} color="primary">
          {editRoom ? 'Update' : 'Add'} Room Type
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RoomTypeDialog;

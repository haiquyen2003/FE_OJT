import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography } from '@mui/material';
import { Button } from '@mui/material';

const RoomTypeImagesModal = ({ open, onClose, images }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Room Images</DialogTitle>
      <DialogContent>
        {images.length > 0 ? (
          images.map((image, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <img src={image} alt={`Room Image ${index + 1}`} style={{ width: '100%', borderRadius: 8 }} />
            </Box>
          ))
        ) : (
          <Typography>No images available for this room.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RoomTypeImagesModal;

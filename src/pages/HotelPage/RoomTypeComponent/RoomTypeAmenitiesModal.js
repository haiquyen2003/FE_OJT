import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography } from '@mui/material';
import { Button } from '@mui/material';

const RoomTypeAmenitiesModal = ({ open, onClose, amenities }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Room Amenities</DialogTitle>
      <DialogContent>
        {amenities.length > 0 ? (
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {amenities.map((amenity, index) => (
              <Typography key={index} variant="body2" sx={{ backgroundColor: 'white', color: 'black', border: '1px solid rgba(0, 0, 0, 0.2)', padding: '2px 10px', borderRadius: '5px' }}>
                {amenity}
              </Typography>
            ))}
          </Box>
        ) : (
          <Typography>No amenities available for this room.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RoomTypeAmenitiesModal;

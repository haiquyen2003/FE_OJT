import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography, Button } from '@mui/material';

const OfferingDetailsDialog = ({ open, onClose, offeringDetails }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Offering Details</DialogTitle>
      <DialogContent>
        {offeringDetails ? (
          <>
            <Typography variant="h6">{offeringDetails.name}</Typography>
            <Typography>Description: {offeringDetails.description}</Typography>
            <Typography>Price: {offeringDetails.price} VND</Typography>
            <Typography>Available Units: {offeringDetails.availableUnits}</Typography>
            <Typography>Room Size: {offeringDetails.roomSize} m²</Typography>
            <Typography>Bed Type: {offeringDetails.bedType}</Typography>
            <Typography>Max Guests: {offeringDetails.maxGuests}</Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>Amenities:</Typography>
            {offeringDetails.amenity?.map((amenity, index) => (
              <Typography key={index}>- {amenity.name}: {amenity.description}</Typography>
            ))}
            <Typography variant="body1" sx={{ mt: 2 }}>Images:</Typography>
            {offeringDetails.offeringImages?.map((image, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <img src={image.imageUrl} alt={image.description} style={{ width: '100%', borderRadius: 8 }} />
              </Box>
            ))}
          </>
        ) : (
          <Typography>No details available.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default OfferingDetailsDialog;

import React, { useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import HotelLayout from '../../components/HOTEL/HotelLayout';

import ServiceBookingList from '../HotelPage/BookingComopent/ServiceBookingList';
import BookingDetails from'../HotelPage/BookingComopent/BookingDetails';
const BookingManagement = () => {
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const handleSelectBooking = (bookingId) => {
    setSelectedBookingId(bookingId);
  };

  return (
    <HotelLayout>
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Booking Management
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ServiceBookingList onSelectBooking={handleSelectBooking} />
        </Grid>
        {selectedBookingId && (
          <Grid item xs={12}>
            <BookingDetails bookingId={selectedBookingId} />
          </Grid>
        )}
      </Grid>
    </Container>
    </HotelLayout>
  );
};

export default BookingManagement;


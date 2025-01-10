import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider, TextField, Button, Grid, Snackbar } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { getBookingDetails } from '../../../../src/services/bookingApi';



const BookingDetails = ({ bookingId }) => {
  const [booking, setBooking] = useState(null);
  const [roomAssignments, setRoomAssignments] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    if (bookingId) {
      fetchBookingDetails();
    }
  }, [bookingId]);

  const fetchBookingDetails = async () => {
    try {
      const data = await getBookingDetails(bookingId);
      setBooking(data);
      initializeRoomAssignments(data);
    } catch (error) {
      console.error('Error fetching booking details:', error);
    }
  };

  const initializeRoomAssignments = (bookingData) => {
    const initialAssignments = bookingData.serviceBookingOfferings.map(offering => ({
      booking_offering_id: offering.bookingOfferingId,
      room_id: '',
      check_in_date: new Date(bookingData.startDate),
      check_out_date: new Date(bookingData.endDate),
      number_of_guests: offering.numberOfRooms
    }));
    setRoomAssignments(initialAssignments);
  };

  const handleRoomAssignmentChange = (index, field, value) => {
    const newAssignments = [...roomAssignments];
    newAssignments[index][field] = value;
    setRoomAssignments(newAssignments);
  };

  const handleAssignRooms = async () => {
    try {
      //await assignRooms(bookingId, roomAssignments);
      setSnackbarMessage('Rooms assigned successfully');
      setSnackbarOpen(true);
      fetchBookingDetails(); // Refresh booking details
    } catch (error) {
      console.error('Error assigning rooms:', error);
      setSnackbarMessage('Failed to assign rooms');
      setSnackbarOpen(true);
    }
  };

  if (!booking) {
    return <Typography>Loading booking details...</Typography>;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Booking Details and Room Assignment
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography color="textSecondary">
                Booking ID: {booking.bookingId}
              </Typography>
              <Typography color="textSecondary">
                User ID: {booking.userId}
              </Typography>
              <Typography color="textSecondary">
                Service ID: {booking.serviceId}
              </Typography>
              <Typography color="textSecondary">
                Status ID: {booking.statusId}
              </Typography>
              <Typography color="textSecondary">
                Number of People: {booking.numberOfPeople}
              </Typography>
              <Typography color="textSecondary">
                Start Date: {new Date(booking.startDate).toLocaleDateString()}
              </Typography>
              <Typography color="textSecondary">
                End Date: {new Date(booking.endDate).toLocaleDateString()}
              </Typography>
              <Typography color="textSecondary">
                Total Price: ${booking.totalPrice}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Room Assignments</Typography>
              {roomAssignments.map((assignment, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={12}>
                    <TextField
                      label={`Room ID for Offering ${assignment.booking_offering_id}`}
                      value={assignment.room_id}
                      onChange={(e) => handleRoomAssignmentChange(index, 'room_id', e.target.value)}
                      fullWidth
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DateTimePicker
                      label="Check-in Date"
                      value={assignment.check_in_date}
                      onChange={(date) => handleRoomAssignmentChange(index, 'check_in_date', date)}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DateTimePicker
                      label="Check-out Date"
                      value={assignment.check_out_date}
                      onChange={(date) => handleRoomAssignmentChange(index, 'check_out_date', date)}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Number of Guests"
                      type="number"
                      value={assignment.number_of_guests}
                      onChange={(e) => handleRoomAssignmentChange(index, 'number_of_guests', parseInt(e.target.value))}
                      fullWidth
                      margin="normal"
                    />
                  </Grid>
                </Grid>
              ))}
              <Button variant="contained" color="primary" onClick={handleAssignRooms} fullWidth style={{ marginTop: '20px' }}>
                Assign Rooms
              </Button>
            </Grid>
          </Grid>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="h6">Service Booking Offerings</Typography>
          <List>
            {booking.serviceBookingOfferings.map((offering) => (
              <ListItem key={offering.bookingOfferingId}>
                <ListItemText
                  primary={`ServiceOffering: ${offering.offeringName}`}
                  secondary={
                    <>
                      <Typography component="span" display="block">
                        Number of Rooms: {offering.numberOfRooms}
                      </Typography>
                      <Typography component="span" display="block">
                        Total Price: ${offering.totalPrice}
                      </Typography>
                      <Typography component="span" display="block">
                        Detail Bookings:
                      </Typography>
                      <List>
                        {offering.detailBookings.map((detail) => (
                          <ListItem key={detail.detailId}>
                            <ListItemText
                              primary={`Detail ID: ${detail.detailId}`}
                              secondary={
                                <>
                                  <Typography component="span" display="block">
                                    Unit Number: {detail.unitNumber}
                                  </Typography>
                                  <Typography component="span" display="block">
                                    Total Price: ${detail.totalPrice}
                                  </Typography>
                                  <Typography component="span" display="block">
                                    Ticket Type: {detail.ticketType}
                                  </Typography>
                                </>
                              }
                            />
                          </ListItem>
                        ))}
                      </List>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </LocalizationProvider>
  );
};

export default BookingDetails;

import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

import {getServiceBookings} from '../../../../src/services/bookingApi';
const ServiceBookingList = ({ onSelectBooking }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await getServiceBookings();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Booking ID</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Number of People</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Total Rooms</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.bookingId}>
              <TableCell>{booking.bookingId}</TableCell>
              <TableCell>{booking.status}</TableCell>
              <TableCell>{booking.numberOfPeople}</TableCell>
              <TableCell>{new Date(booking.startDate).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(booking.endDate).toLocaleDateString()}</TableCell>
              <TableCell>{booking.total_Room}</TableCell>
              <TableCell>${booking.totalPrice}</TableCell>
              <TableCell>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => onSelectBooking(booking.bookingId)}
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ServiceBookingList;


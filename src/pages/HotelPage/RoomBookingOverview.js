import React, { useState } from 'react'; 
import { Card, CardContent, Typography, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Select, MenuItem, FormControl, InputLabel, Alert, Avatar } from '@mui/material';
import { CalendarToday, People, AttachMoney, Email, Phone, Info } from '@mui/icons-material';
import { FaHotel } from 'react-icons/fa';
import HotelLayout from '../../components/HOTEL/HotelLayout';
import { styled } from '@mui/system';

const StyledTableHead = styled(TableHead)({
  backgroundColor: '#2e3b55',
  border: '1px solid #ffffff',
});

const StyledTableCell = styled(TableCell)({
  color: '#fff',
  fontFamily: 'Arial, sans-serif',
  fontWeight: 'bold',
  border: '1px solid #ffffff',
});

const bookingsData = [
  {
    booking_id: 301,
    offering_id: 202,
    offering_name: 'Deluxe Room',
    check_in_date: '2024-01-01',
    check_out_date: '2024-01-05',
    number_of_rooms: 2,
    number_of_guests: 5,
    total_price: 1200,
    status: 'Pending Room Assignment',
    guest: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 123-456-7890',
    },
  },
  {
    booking_id: 302,
    offering_id: 203,
    offering_name: 'VIP Suite',
    check_in_date: '2024-01-10',
    check_out_date: '2024-01-15',
    number_of_rooms: 1,
    number_of_guests: 2,
    total_price: 1500,
    status: 'Confirmed',
    guest: {
      name: 'Alice Smith',
      email: 'alice.smith@example.com',
      phone: '+1 987-654-3210',
    },
  },
];

const availableRooms = [
  { room_id: 101, room_name: 'Room 101' },
  { room_id: 102, room_name: 'Room 102' },
  { room_id: 201, room_name: 'Room 201' },
];

const RoomBookingOverview = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSelectBooking = (bookingId) => {
    const booking = bookingsData.find((b) => b.booking_id === bookingId);
    if (booking) {
      setSelectedBooking(booking);
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBooking(null);
    setSelectedRooms([]);
    setErrorMessage('');
  };

  const handleRoomChange = (event) => {
    const selectedValues = event.target.value;
    if (selectedBooking && selectedValues.length > selectedBooking.number_of_rooms) {
      setErrorMessage(`You can only assign up to ${selectedBooking.number_of_rooms} room(s) for this booking.`);
    } else {
      setErrorMessage('');
      setSelectedRooms(selectedValues);
    }
  };

  return (
    <HotelLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-extrabold text-white">Booking Lists</h1>
      </div>
      <div className="container mx-auto mt-10 bg-gray-100 rounded-lg p-4 shadow-lg">
        <TableContainer component={Paper} className="shadow-md">
          <Table>
            <StyledTableHead>
              <TableRow>
                <StyledTableCell>Booking ID</StyledTableCell>
                <StyledTableCell>Room Type</StyledTableCell>
                <StyledTableCell>Guest Name</StyledTableCell>
                <StyledTableCell>Check-in Date</StyledTableCell>
                <StyledTableCell>Check-out Date</StyledTableCell>
                <StyledTableCell>Guests</StyledTableCell>
                <StyledTableCell>Total ($)</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Details</StyledTableCell>
              </TableRow>
            </StyledTableHead>
            <TableBody className="bg-slate-300">
              {bookingsData.map((booking) => (
                <TableRow key={booking.booking_id} style={{ cursor: 'pointer' }}>
                  <TableCell>{booking.booking_id}</TableCell>
                  <TableCell>{booking.offering_name}</TableCell>
                  <TableCell>{booking.guest.name}</TableCell>
                  <TableCell>{booking.check_in_date}</TableCell>
                  <TableCell>{booking.check_out_date}</TableCell>
                  <TableCell>{booking.number_of_guests}</TableCell>
                  <TableCell>{booking.total_price}</TableCell>
                  <TableCell>{booking.status}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleSelectBooking(booking.booking_id)}>
                      <Info color="primary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="booking-details-dialog">
          <DialogTitle id="booking-details-dialog">
            <Box className="text-center">
            Room Assignment for Booking #{selectedBooking?.booking_id}
            </Box>
          </DialogTitle>
          <DialogContent>
            {selectedBooking && (
              <DialogContentText>
                <Box className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12 mb-3">
                    {selectedBooking?.guest.name[0]}
                  </Avatar>
                  <Box>
                    <Box className="flex items-center mb-2">
                      <Email className="w-4 h-4 mr-2" fontSize="small" />
                      <Typography variant="body2" className="mr-4" fontSize="small">
                        {selectedBooking.guest.email}
                      </Typography>
                    </Box>
                    <Box className="flex items-center mb-4">
                      <Phone className="w-4 h-4 mr-2" fontSize="small"/>
                      <Typography variant="body2" fontSize="small">
                        {selectedBooking.guest.phone}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box className="flex items-center mb-4">
                  <FaHotel size={40} className="text-primary mr-4" />
                  <Box>
                    <Typography variant="h6" component="div" className="font-bold text-primary">
                      {selectedBooking.offering_name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Booking ID: #{selectedBooking.booking_id}
                    </Typography>
                  </Box>
                </Box>

                <Box className="flex justify-between items-center mb-3">
                  <Box className="flex items-center">
                    <CalendarToday className="mr-2 text-primary" />
                    <Typography variant="body2">Check-in: {selectedBooking.check_in_date}</Typography>
                  </Box>
                  <Box className="flex items-center">
                    <CalendarToday className="mr-2 text-primary" />
                    <Typography variant="body2">Check-out: {selectedBooking.check_out_date}</Typography>
                  </Box>
                </Box>

                <Box className="flex justify-between items-center mb-3">
                  <Box className="flex items-center">
                    <People className="mr-2 text-primary" />
                    <Typography variant="body2">Guests: {selectedBooking.number_of_guests}</Typography>
                  </Box>
                  <Box className="flex items-center">
                    <Typography variant="body2">Total: </Typography>
                    <AttachMoney className="mr-2 text-primary" />
                    <Typography variant="body2" className="text-primary font-bold">${selectedBooking.total_price}</Typography>
                  </Box>
                </Box>

                <Box className="mb-3">
                  <Typography variant="body2" className="font-semibold text-gray-500">
                    Special Requests:
                  </Typography>
                  <Box className="border rounded p-2 mt-1 bg-gray-100">
                    {selectedBooking.status}
                  </Box>
                </Box>

                {errorMessage && (
                  <Alert severity="error" className="mb-3">
                    {errorMessage}
                  </Alert>
                )}
                <Box className="mb-4">
                  <FormControl fullWidth>
                    <InputLabel id="select-room-label">Assign Rooms</InputLabel>
                    <Select
                      labelId="select-room-label"
                      multiple
                      value={selectedRooms}
                      label="Assign Rooms"
                      onChange={handleRoomChange}
                      renderValue={(selected) => selected.join(', ')}
                    >
                      {availableRooms.map((room) => (
                        <MenuItem key={room.room_id} value={room.room_name}>
                          {room.room_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </DialogContentText>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </HotelLayout>
  );
};

export default RoomBookingOverview;

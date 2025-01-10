import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { 
  Container, 
  Typography, 
  Grid, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem 
} from '@mui/material';
import BookingDetails from './UserPage/BookingDetails';
import FeedbackModal from './UserPage/FeedbackModal';
import BookingCard from './UserPage/BookingCard';
const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBookingId, setCurrentBookingId] = useState(null);

  useEffect(() => {
    // Simulating API call to fetch bookings
    const fetchBookings = async () => {
      // In a real application, this would be an API call
      const mockBookings = [
        {
          id: 1,
          hotelName: 'Grand Hotel',
          hotelImage: 'https://via.placeholder.com/300',
          checkIn: '2023-06-01',
          checkOut: '2023-06-05',
          status: 'confirmed',
          rooms: [
            { roomType: 'Deluxe Room', quantity: 1, price: 725165, capacity: '2 Adults + 1 Child' },
          ],
          specialRequests: 'Tôi muốn nhận phòng sớm.',
          benefits: ['Bãi đậu xe', 'WiFi miễn phí'],
          guestInfo: { name: 'Giang Thùy', adults: 2 },
          paymentDetails: {
            roomPrice: 725165,
            taxFee: 57835,
            totalAmount: 783000,
            paymentMethod: 'Đặt phòng này không cần thẻ tín dụng'
          },
        },
        // Add more mock bookings here
      ];
      setBookings(mockBookings);
    };

    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter(booking => 
    filter === 'all' || booking.status === filter
  );

  const sortedBookings = [...filteredBookings].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.checkIn) - new Date(a.checkIn);
    } else if (sortBy === 'price') {
      return b.paymentDetails.totalAmount - a.paymentDetails.totalAmount;
    }
    return 0;
  });

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleViewDetails = (bookingId) => {
    const booking = bookings.find(b => b.id === bookingId);
    setSelectedBooking(booking);
  };

  const handleCancelBooking = (bookingId) => {
    const updatedBookings = bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
    );
    setBookings(updatedBookings);
    alert(`Đặt phòng ${bookingId} đã bị hủy.`);
  };

  const handleOpenFeedback = (bookingId) => {
    setCurrentBookingId(bookingId);
    setIsModalOpen(true);
  };

  const handleSubmitFeedback = ({ rating, feedback }) => {
    console.log(`Feedback submitted for booking ${currentBookingId}:`, { rating, feedback });
    // Here you would typically send this data to your backend
    alert(`Cảm ơn bạn đã gửi phản hồi! Đánh giá: ${rating} sao, Nội dung: ${feedback}`);
  };


  return (
    <Layout activeItem="/UserBooking">
       <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Đặt phòng của bạn
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="status-filter-label">Lọc theo trạng thái</InputLabel>
            <Select
              labelId="status-filter-label"
              id="status-filter"
              value={filter}
              label="Lọc theo trạng thái"
              onChange={handleFilterChange}
            >
              <MenuItem value="all">Tất cả</MenuItem>
              <MenuItem value="confirmed">Đã xác nhận</MenuItem>
              <MenuItem value="pending">Đang chờ</MenuItem>
              <MenuItem value="cancelled">Đã hủy</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="sort-by-label">Sắp xếp theo</InputLabel>
            <Select
              labelId="sort-by-label"
              id="sort-by"
              value={sortBy}
              label="Sắp xếp theo"
              onChange={handleSortChange}
            >
              <MenuItem value="date">Ngày</MenuItem>
              <MenuItem value="price">Giá</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {sortedBookings.map((booking) => (
          <Grid item xs={12} sm={6} md={4} key={booking.id}>
            <BookingCard
              booking={booking}
              onViewDetails={handleViewDetails}
              onCancelBooking={handleCancelBooking}
              onOpenFeedback={handleOpenFeedback}
            />
          </Grid>
        ))}
      </Grid>

      {sortedBookings.length === 0 && (
        <Typography align="center" sx={{ mt: 4 }}>
          Không tìm thấy đặt phòng nào.
        </Typography>
      )}

      {selectedBooking && <BookingDetails booking={selectedBooking} />}

      <FeedbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitFeedback}
      />
    </Container>
    </Layout>
  );
};

export default UserBookings;


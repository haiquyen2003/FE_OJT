import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Divider, 
  Chip, 
  Grid, 
  Box 
} from '@mui/material';
import { CalendarDays, Users, Bed, Coffee, Wifi, Car, CreditCard, MessageSquare } from 'lucide-react';

const BookingDetails = ({ booking }) => {
  return (
    <Card sx={{ maxWidth: "max", margin: '2rem auto', padding: 2 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Chi tiết đặt phòng
        </Typography>

        <Box sx={{ my: 3 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Bed style={{ marginRight: 8 }} /> Thông tin về phòng
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {booking.rooms[0].quantity} x {booking.rooms[0].roomType}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Users style={{ marginRight: 8 }} /> {booking.rooms[0].capacity}
          </Typography>
        </Box>

        <Divider />

        <Box sx={{ my: 3 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Coffee style={{ marginRight: 8 }} /> Lợi ích
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {booking.benefits.map((benefit, index) => (
              <Chip key={index} label={benefit} variant="outlined" />
            ))}
          </Box>
        </Box>

        <Divider />

        <Box sx={{ my: 3 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <MessageSquare style={{ marginRight: 8 }} /> Yêu cầu đặc biệt
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {booking.specialRequests}
          </Typography>
        </Box>

        <Divider />

        <Box sx={{ my: 3 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Users style={{ marginRight: 8 }} /> Thông tin về khách
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Khách chính:</strong> {booking.guestInfo.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Sức chứa đã đặt:</strong> {booking.guestInfo.adults} người lớn
          </Typography>
        </Box>

        <Divider />

        <Box sx={{ my: 3 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <CalendarDays style={{ marginRight: 8 }} /> Thời gian
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" fontWeight="medium">Nhận phòng</Typography>
              <Typography variant="body2" color="text.secondary">{booking.checkIn}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" fontWeight="medium">Trả phòng</Typography>
              <Typography variant="body2" color="text.secondary">{booking.checkOut}</Typography>
            </Grid>
          </Grid>
        </Box>

        <Divider />

        <Box sx={{ my: 3 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <CreditCard style={{ marginRight: 8 }} /> Thông tin thanh toán
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>1 phòng x {booking.rooms[0].quantity} đêm:</strong> {booking.paymentDetails.roomPrice.toLocaleString('vi-VN')} VND
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Thuế và phí:</strong> {booking.paymentDetails.taxFee.toLocaleString('vi-VN')} VND
          </Typography>
          <Typography variant="body1" fontWeight="medium" sx={{ mt: 1 }}>
            <strong>Tổng tiền:</strong> {booking.paymentDetails.totalAmount.toLocaleString('vi-VN')} VND
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <strong>Phương thức thanh toán:</strong> {booking.paymentDetails.paymentMethod}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BookingDetails;


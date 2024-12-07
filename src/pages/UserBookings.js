import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState('');

  // Giả lập dữ liệu booking của người dùng
  useEffect(() => {
    const mockUserBookings = [
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
        specialRequests: 'Tôi muốn nhận phòng sớm. Mọi yêu cầu đặc biệt phụ thuộc vào tình trạng thực tế của khách sạn khi nhận phòng.',
        benefits: ['Bãi đậu xe', 'WiFi miễn phí'],
        guestInfo: { name: 'Giang Thùy', adults: 2 },
        paymentDetails: {
          roomPrice: 725165,
          taxFee: 57835,
          totalAmount: 783000,
          paymentMethod: 'Đặt phòng này không cần thẻ tín dụng'
        },
      },
      // Thêm các booking khác ở đây...
    ];
    setBookings(mockUserBookings);
  }, []);

  const filteredBookings = bookings.filter(booking => 
    filter === 'all' || booking.status === filter
  );

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleViewDetails = (bookingId) => {
    const booking = bookings.find(b => b.id === bookingId);
    setSelectedBooking(booking);
  };

  const handleCancelBooking = (bookingId) => {
    // Implement the cancel booking logic
    alert(`Cancelling booking ${bookingId}`);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmitFeedback = () => {
    // Logic to submit feedback
    alert(`Feedback submitted: ${feedback}`);
    setIsModalOpen(false);
    setFeedback('');
  };

  return (
    <Layout activeItem="bookings">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Hotel Bookings</h1>

        {/* Filter */}
        <div className="mb-4 flex justify-between items-center">
          <div>
            <label htmlFor="status-filter" className="mr-2">Filter by status:</label>
            <select
              id="status-filter"
              value={filter}
              onChange={handleFilterChange}
              className="p-2 border rounded"
            >
              <option value="all">All</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Bookings List (Card Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="bg-white p-4 rounded-lg shadow-lg">
              <img 
                src={booking.hotelImage} 
                alt={booking.hotelName} 
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold">{booking.hotelName}</h2>
              <p className="text-gray-600">Check-in: {booking.checkIn}</p>
              <p className="text-gray-600">Check-out: {booking.checkOut}</p>
              <p className={`text-sm mt-2 ${
                booking.status === 'confirmed' ? 'text-green-600' :
                booking.status === 'pending' ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                Status: {booking.status}
              </p>
              {booking.paymentDetails && booking.paymentDetails.totalAmount && (
                <p className="font-bold mt-2">{booking.paymentDetails.totalAmount.toLocaleString('vi-VN')} VND</p>
              )}
              <div className="mt-4 flex justify-between">
                <button 
                  className="text-blue-500 hover:underline"
                  onClick={() => handleViewDetails(booking.id)}
                >
                  View Details
                </button>
                {booking.status === 'confirmed' && (
                  <button 
                    className="text-red-500 hover:underline"
                    onClick={() => handleCancelBooking(booking.id)}
                  >
                    Cancel Booking
                  </button>
                )}
                <button
                  className="text-purple-500 hover:underline"
                  onClick={() => setIsModalOpen(true)}
                >
                  Gửi Feedback
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredBookings.length === 0 && (
          <p className="text-center mt-4">No bookings found.</p>
        )}

        {/* Booking Details */}
        {selectedBooking && (
          <div className="mt-8 bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-xl font-bold mb-4">Booking Details</h2>

            {/* Room Info */}
            <h3 className="text-lg font-semibold mb-2">Thông tin về phòng</h3>
            <p>{selectedBooking.rooms[0].quantity} x {selectedBooking.rooms[0].roomType} ({selectedBooking.rooms[0].capacity})</p>

            {/* Benefits */}
            <h3 className="text-lg font-semibold mt-4">Lợi ích</h3>
            <ul>
              {selectedBooking.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>

            {/* Special Requests */}
            <h3 className="text-lg font-semibold mt-4">Yêu cầu đặc biệt</h3>
            <p>{selectedBooking.specialRequests}</p>

            {/* Guest Info */}
            <h3 className="text-lg font-semibold mt-4">Thông tin về khách</h3>
            <p><strong>Khách chính:</strong> {selectedBooking.guestInfo.name}</p>
            <p><strong>Sức chứa đã đặt:</strong> {selectedBooking.guestInfo.adults} người lớn</p>

            {/* Payment Info */}
            <h3 className="text-lg font-semibold mt-4">Thông tin thanh toán</h3>
            <p><strong>1 phòng x {selectedBooking.rooms[0].quantity} đêm:</strong> {selectedBooking.paymentDetails?.roomPrice?.toLocaleString('vi-VN') || 'N/A'} VND</p>
            <p><strong>Thuế và phí:</strong> {selectedBooking.paymentDetails?.taxFee?.toLocaleString('vi-VN') || 'N/A'} VND</p>
            <p><strong>Tổng tiền:</strong> {selectedBooking.paymentDetails?.totalAmount?.toLocaleString('vi-VN') || 'N/A'} VND</p>
            <p><strong>Phương thức thanh toán:</strong> {selectedBooking.paymentDetails?.paymentMethod || 'N/A'}</p>
          </div>
        )}

        {/* Feedback Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Leave Your Feedback</h2>
              <textarea
                value={feedback}
                onChange={handleFeedbackChange}
                className="w-full h-32 p-2 border rounded"
                placeholder="Enter your feedback here..."
              />
              <div className="mt-4 flex justify-end">
                <button
                  className="text-blue-500"
                  onClick={handleSubmitFeedback}
                >
                  Submit Feedback
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserBookings;

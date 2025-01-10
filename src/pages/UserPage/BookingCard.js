import React from 'react';

const BookingCard = ({ booking, onViewDetails, onCancelBooking, onOpenFeedback }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <img 
        src={booking.hotelImage} 
        alt={booking.hotelName} 
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold">{booking.hotelName}</h2>
      <p className="text-gray-600">Nhận phòng: {booking.checkIn}</p>
      <p className="text-gray-600">Trả phòng: {booking.checkOut}</p>
      <p className={`text-sm mt-2 ${
        booking.status === 'confirmed' ? 'text-green-600' :
        booking.status === 'pending' ? 'text-yellow-600' :
        'text-red-600'
      }`}>
        Trạng thái: {booking.status === 'confirmed' ? 'Đã xác nhận' : 
                     booking.status === 'pending' ? 'Đang chờ' : 'Đã hủy'}
      </p>
      {booking.paymentDetails && booking.paymentDetails.totalAmount && (
        <p className="font-bold mt-2">{booking.paymentDetails.totalAmount.toLocaleString('vi-VN')} VND</p>
      )}
      <div className="mt-4 flex flex-wrap justify-between">
        <button 
          className="text-blue-500 hover:underline mb-2 sm:mb-0"
          onClick={() => onViewDetails(booking.id)}
        >
          Xem chi tiết
        </button>
        {booking.status === 'confirmed' && (
          <button 
            className="text-red-500 hover:underline mb-2 sm:mb-0"
            onClick={() => onCancelBooking(booking.id)}
          >
            Hủy đặt phòng
          </button>
        )}
        <button
          className="text-purple-500 hover:underline"
          onClick={onOpenFeedback}
        >
          Gửi phản hồi
        </button>
      </div>
    </div>
  );
};

export default BookingCard;


import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaWifi, FaParking, FaSwimmer, FaCheck, FaInfoCircle } from 'react-icons/fa';
import Header from '../components/Header';

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingData } = location.state || {};
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: 'Việt Nam',
    phone: '',
    specialRequests: ''
  });

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold mb-4">Lỗi tải dữ liệu đặt phòng</h1>
            <p>Không thể tải thông tin đặt phòng. Vui lòng thử lại.</p>
            <button
              onClick={() => navigate(-1)}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Quay lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API call would go here
    navigate('/booking-confirmation');
  };

  const numberOfNights = Math.ceil(
    (new Date(bookingData.endDate) - new Date(bookingData.startDate)) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-14">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full mb-8 py-14">
            {/* Hotel Information */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8 ">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                      Căn hộ
                    </span>
                    <div className="flex text-yellow-400">
                      {'★'.repeat(4)}
                    </div>
                  </div>
                  <h2 className="text-xl font-bold mb-2">{bookingData.hotelName || "Olala CBD Apartment - Rivergate Tower"}</h2>
                  <p className="text-gray-600 mb-2">{bookingData.address || "150 Bến Vân Đồn, Phường 6, Quận 1, TP. Hồ Chí Minh"}</p>
                  <div className="flex items-center gap-4 text-gray-600">
                    <FaWifi className="w-4 h-4" />
                    <FaParking className="w-4 h-4" />
                    <FaSwimmer className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-right">
                  <div className="inline-flex items-center bg-blue-100 px-2 py-1 rounded">
                    <span className="text-blue-800 font-bold mr-1">9.2</span>
                    <span className="text-sm text-blue-800">Tuyệt hảo</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">248 đánh giá</p>
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4">Chi tiết đặt phòng của bạn</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-600">Nhận phòng</p>
                  <p className="font-semibold">{new Date(bookingData.startDate).toLocaleDateString('vi-VN')}</p>
                  <p className="text-sm text-gray-500">15:00 – 21:00</p>
                </div>
                <div>
                  <p className="text-gray-600">Trả phòng</p>
                  <p className="font-semibold">{new Date(bookingData.endDate).toLocaleDateString('vi-VN')}</p>
                  <p className="text-sm text-gray-500">08:00 – 12:00</p>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-gray-600">Tổng thời gian lưu trú:</p>
                <p className="font-semibold">{numberOfNights} đêm</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Phòng đã đặt:</h4>
                {bookingData.bookingOfferings.map((offering, index) => (
                  <div key={index} className="mb-2 pb-2 border-b border-gray-200 last:border-b-0">
                    <p className="font-medium">{offering.roomType || `Loại phòng ${offering.offeringId}`}</p>
                    <p className="font-medium">{`ID ${offering.offeringId}`}</p>
                    <p className="text-sm text-gray-600">Số lượng: {offering.numberOfRooms}</p>
                    <p className="text-sm text-gray-600">Giá: {offering.totalPrice.toLocaleString('vi-VN')} VND</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Guest Information Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Nhập thông tin chi tiết của bạn</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Họ (tiếng Anh) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={customerInfo.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên (tiếng Anh) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={customerInfo.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Địa chỉ email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Email xác nhận đặt phòng sẽ được gửi đến địa chỉ này
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quốc gia/Vùng lãnh thổ <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="country"
                    value={customerInfo.country}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="Việt Nam">Việt Nam</option>
                    <option value="Other">Khác</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <select
                      className="w-24 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="+84">+84</option>
                    </select>
                    <input
                      type="tel"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Price Summary Sidebar */}
          <div className="lg:w-4/6 py-14">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Tóm tắt giá</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Giá gốc</span>
                  <span>VND {bookingData.totalPrice.toLocaleString('vi-VN')}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Giảm giá Genius</span>
                  <span>- VND {(bookingData.totalPrice * 0.12).toLocaleString('vi-VN')}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Ưu đãi đặt sớm</span>
                  <span>- VND {(bookingData.totalPrice * 0.08).toLocaleString('vi-VN')}</span>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold">Giá</span>
                    <div className="text-right">
                      <span className="line-through text-gray-400">
                        VND {bookingData.totalPrice.toLocaleString('vi-VN')}
                      </span>
                      <div className="text-2xl font-bold">
                        VND {(bookingData.totalPrice * 0.8).toLocaleString('vi-VN')}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">Đã bao gồm thuế và phí</p>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold"
                >
                  Tiếp tục đặt phòng
                </button>
                <p className="text-sm text-gray-500 text-center">
                  Bạn chưa bị trừ tiền
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;






// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Header from '../components/Header';

// const BookingPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { bookingData } = location.state || {};

//   if (!bookingData) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <Header />
//         <div className="text-center">
//           <h1 className="text-2xl font-bold mb-4">Lỗi tải dữ liệu đặt phòng</h1>
//           <p>Không thể tải thông tin đặt phòng. Vui lòng thử lại.</p>
//           <button
//             onClick={() => navigate(-1)}
//             className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           >
//             Quay lại
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const {
//     serviceId,
//     numberOfPeople,
//     startDate,
//     endDate,
//     totalPrice,
//     bookingOfferings,
//     detailBookings
//   } = bookingData;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <Header />
//       <h1 className="text-2xl font-bold mb-4">Xác nhận đặt phòng</h1>
//       <div className="bg-white shadow-md rounded-lg p-6">
//         <h2 className="text-xl font-semibold mb-4">Thông tin đặt phòng</h2>
//         <p>Mã dịch vụ: {serviceId}</p>
//         <p>Số người: {numberOfPeople}</p>
//         <p>Ngày nhận phòng: {startDate}</p>
//         <p>Ngày trả phòng: {endDate}</p>
//         <p className="font-bold mt-4">Tổng giá: {totalPrice.toLocaleString('vi-VN')} VND</p>

//         <h3 className="font-semibold mt-6 mb-2">Phòng đã chọn:</h3>
//         {bookingOfferings && bookingOfferings.length > 0 ? (
//           <ul>
//             {bookingOfferings.map((offering, index) => (
//               <li key={index}>
//                 Phòng {offering.offeringId} - Số lượng: {offering.numberOfRooms} - Giá: {offering.totalPrice.toLocaleString('vi-VN')} VND
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>Không có thông tin về phòng đã chọn.</p>
//         )}

//         <h3 className="font-semibold mt-6 mb-2">Chi tiết đặt phòng:</h3>
//         {detailBookings && detailBookings.length > 0 ? (
//           <ul>
//             {detailBookings.map((detail, index) => (
//               <li key={index}>
//                 Số lượng: {detail.unitNumber} - Giá: {detail.totalPrice.toLocaleString('vi-VN')} VND - Ngày tạo: {new Date(detail.createdAt).toLocaleString('vi-VN')}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>Không có thông tin chi tiết đặt phòng.</p>
//         )}
//       </div>

//       <div className="mt-8">
//         <button
//           onClick={() => {/* Xử lý xác nhận đặt phòng */}}
//           className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
//         >
//           Xác nhận đặt phòng
//         </button>
//         <button
//           onClick={() => navigate(-1)}
//           className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Quay lại
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BookingPage;


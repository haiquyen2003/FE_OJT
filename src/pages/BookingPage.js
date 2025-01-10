// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { FaWifi, FaParking, FaSwimmer, FaCheck, FaInfoCircle } from 'react-icons/fa';
// import Header from '../components/Header';

// const BookingPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { bookingData } = location.state || {};
//   const [customerInfo, setCustomerInfo] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     country: 'Việt Nam',
//     phone: '',
//     specialRequests: ''
//   });

//   if (!bookingData) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Header />
//         <div className="container mx-auto px-4 py-8 text-center">
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h1 className="text-2xl font-bold mb-4">Lỗi tải dữ liệu đặt phòng</h1>
//             <p>Không thể tải thông tin đặt phòng. Vui lòng thử lại.</p>
//             <button
//               onClick={() => navigate(-1)}
//               className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             >
//               Quay lại
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCustomerInfo(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // API call would go here
//     navigate('/booking-confirmation');
//   };

//   const numberOfNights = Math.ceil(
//     (new Date(bookingData.endDate) - new Date(bookingData.startDate)) / (1000 * 60 * 60 * 24)
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
//       <div className="container mx-auto px-4 py-14">
//         <div className="flex flex-col lg:flex-row gap-8">
//           <div className="w-full mb-8 py-14">
//             {/* Hotel Information */}
//             <div className="bg-white rounded-lg shadow-md p-6 mb-8 ">
//               <div className="flex items-start justify-between">
//                 <div>
//                   <div className="flex items-center gap-2 mb-2">
//                     <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
//                       Căn hộ
//                     </span>
//                     <div className="flex text-yellow-400">
//                       {'★'.repeat(4)}
//                     </div>
//                   </div>
//                   <h2 className="text-xl font-bold mb-2">{bookingData.hotelName || "Olala CBD Apartment - Rivergate Tower"}</h2>
//                   <p className="text-gray-600 mb-2">{bookingData.address || "150 Bến Vân Đồn, Phường 6, Quận 1, TP. Hồ Chí Minh"}</p>
//                   <div className="flex items-center gap-4 text-gray-600">
//                     <FaWifi className="w-4 h-4" />
//                     <FaParking className="w-4 h-4" />
//                     <FaSwimmer className="w-4 h-4" />
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <div className="inline-flex items-center bg-blue-100 px-2 py-1 rounded">
//                     <span className="text-blue-800 font-bold mr-1">9.2</span>
//                     <span className="text-sm text-blue-800">Tuyệt hảo</span>
//                   </div>
//                   <p className="text-sm text-gray-500 mt-1">248 đánh giá</p>
//                 </div>
//               </div>
//             </div>

//             {/* Booking Details */}
//             <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//               <h3 className="text-lg font-semibold mb-4">Chi tiết đặt phòng của bạn</h3>
//               <div className="grid grid-cols-2 gap-4 mb-4">
//                 <div>
//                   <p className="text-gray-600">Nhận phòng</p>
//                   <p className="font-semibold">{new Date(bookingData.startDate).toLocaleDateString('vi-VN')}</p>
//                   <p className="text-sm text-gray-500">15:00 – 21:00</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-600">Trả phòng</p>
//                   <p className="font-semibold">{new Date(bookingData.endDate).toLocaleDateString('vi-VN')}</p>
//                   <p className="text-sm text-gray-500">08:00 – 12:00</p>
//                 </div>
//               </div>
//               <div className="mb-4">
//                 <p className="text-gray-600">Tổng thời gian lưu trú:</p>
//                 <p className="font-semibold">{numberOfNights} đêm</p>
//               </div>
//               <div>
//                 <h4 className="font-semibold mb-2">Phòng đã đặt:</h4>
//                 {bookingData.bookingOfferings.map((offering, index) => (
//                   <div key={index} className="mb-2 pb-2 border-b border-gray-200 last:border-b-0">
//                     <p className="font-medium">{offering.roomType || `Loại phòng ${offering.offeringId}`}</p>
//                     <p className="font-medium">{`ID ${offering.offeringId}`}</p>
//                     <p className="text-sm text-gray-600">Số lượng: {offering.numberOfRooms}</p>
//                     <p className="text-sm text-gray-600">Giá: {offering.totalPrice.toLocaleString('vi-VN')} VND</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Guest Information Form */}
//             <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
//               <h3 className="text-lg font-semibold mb-4">Nhập thông tin chi tiết của bạn</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Họ (tiếng Anh) <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="lastName"
//                     value={customerInfo.lastName}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Tên (tiếng Anh) <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="firstName"
//                     value={customerInfo.firstName}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     required
//                   />
//                 </div>
//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Địa chỉ email <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={customerInfo.email}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     required
//                   />
//                   <p className="text-sm text-gray-500 mt-1">
//                     Email xác nhận đặt phòng sẽ được gửi đến địa chỉ này
//                   </p>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Quốc gia/Vùng lãnh thổ <span className="text-red-500">*</span>
//                   </label>
//                   <select
//                     name="country"
//                     value={customerInfo.country}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     required
//                   >
//                     <option value="Việt Nam">Việt Nam</option>
//                     <option value="Other">Khác</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Số điện thoại <span className="text-red-500">*</span>
//                   </label>
//                   <div className="flex">
//                     <select
//                       className="w-24 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                       <option value="+84">+84</option>
//                     </select>
//                     <input
//                       type="tel"
//                       name="phone"
//                       value={customerInfo.phone}
//                       onChange={handleInputChange}
//                       className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>
//             </form>
//           </div>

//           {/* Price Summary Sidebar */}
//           <div className="lg:w-4/6 py-14">
//             <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
//               <h3 className="text-lg font-semibold mb-4">Tóm tắt giá</h3>
//               <div className="space-y-4">
//                 <div className="flex justify-between">
//                   <span>Giá gốc</span>
//                   <span>VND {bookingData.totalPrice.toLocaleString('vi-VN')}</span>
//                 </div>
//                 <div className="flex justify-between text-green-600">
//                   <span>Giảm giá Genius</span>
//                   <span>- VND {(bookingData.totalPrice * 0.12).toLocaleString('vi-VN')}</span>
//                 </div>
//                 <div className="flex justify-between text-green-600">
//                   <span>Ưu đãi đặt sớm</span>
//                   <span>- VND {(bookingData.totalPrice * 0.08).toLocaleString('vi-VN')}</span>
//                 </div>
//                 <div className="pt-4 border-t">
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="text-lg font-bold">Giá</span>
//                     <div className="text-right">
//                       <span className="line-through text-gray-400">
//                         VND {bookingData.totalPrice.toLocaleString('vi-VN')}
//                       </span>
//                       <div className="text-2xl font-bold">
//                         VND {(bookingData.totalPrice * 0.8).toLocaleString('vi-VN')}
//                       </div>
//                     </div>
//                   </div>
//                   <p className="text-sm text-gray-500">Đã bao gồm thuế và phí</p>
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold"
//                 >
//                   Tiếp tục đặt phòng
//                 </button>
//                 <p className="text-sm text-gray-500 text-center">
//                   Bạn chưa bị trừ tiền
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingPage;






import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaWifi, FaParking, FaSwimmer } from 'react-icons/fa';
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

  const [loading, setLoading] = useState(false);

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
    setLoading(true);
  
    // Tạo requestData
    const requestData = {
      serviceId: bookingData.serviceId,
      numberOfPeople: bookingData.numberOfPeople, // Sử dụng số người từ bookingData
      startDate: new Date(bookingData.startDate).toISOString().split('T')[0], // Chuyển đổi ngày bắt đầu sang định dạng yyyy-mm-dd
      endDate: new Date(bookingData.endDate).toISOString().split('T')[0], // Chuyển đổi ngày kết thúc sang định dạng yyyy-mm-dd
      totalPrice: bookingData.totalPrice,
  
      // Chuyển các offering thành dạng mảng với các thuộc tính phù hợp
      bookingOfferings: bookingData.bookingOfferings.map(offering => ({
        offeringId: offering.offeringId, // Lấy ID của offering
        numberOfRooms: offering.numberOfRooms, // Số lượng phòng
        totalPrice: offering.totalPrice // Tổng giá của offering
      })),
  
      // Chuyển đổi detailBookings thành đối tượng đơn lẻ, không có key offeringId
      detailBookings: {
        unitNumber: bookingData.bookingOfferings[0].unitNumber || 0, // Lấy unitNumber từ offering đầu tiên, mặc định là 0
        totalPrice: bookingData.bookingOfferings[0].totalPrice, // Tổng giá của unit đầu tiên
        ticketType: bookingData.bookingOfferings[0].ticketType || 'Standard', // Mặc định là 'Standard' nếu không có ticketType
        createdAt: new Date().toISOString() // Thời gian tạo booking (hiện tại)
      }
    };
  
    
    
    
  
    // Log dữ liệu requestData để kiểm tra
    console.log('Request Data:', JSON.stringify(requestData, null, 2));
  
    try {
      const response = await axios.post(
        'https://localhost:7253/api/Booking/create',
        requestData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 200) {
        navigate('/UserBooking');
      } else {
        console.error('Error creating booking:', response.data);
        alert('Đặt phòng thất bại. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Lỗi kết nối. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
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
            {/* Thông tin khách sạn */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
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

            {/* Thông tin đặt phòng */}
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
                  <p className="text-sm text-gray-500">10:00 – 12:00</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-600">Số đêm</p>
                  <p className="font-semibold">{numberOfNights} đêm</p>
                </div>
                <div>
                  <p className="text-gray-600">Số người</p>
                  <p className="font-semibold">{bookingData.numberOfPeople}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form đặt phòng */}
          <div className="w-full lg:w-2/3">
            <form onSubmit={handleSubmit}>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Thông tin khách hàng</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Họ</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={customerInfo.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Tên</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={customerInfo.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700">Yêu cầu đặc biệt</label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={customerInfo.specialRequests}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 mt-6 bg-blue-500 text-white text-lg rounded-md ${loading ? 'opacity-50' : ''}`}
                >
                  {loading ? 'Đang xử lý...' : 'Đặt phòng'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;

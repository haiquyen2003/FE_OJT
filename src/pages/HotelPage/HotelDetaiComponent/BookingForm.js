import React, { useState, useCallback } from 'react';
import { useNavigate ,useParams} from 'react-router-dom';
import { FaUsers } from 'react-icons/fa';

const BookingForm = ({
  availableRooms,
  initialCheckInDate,
  initialCheckOutDate,
  initialNumberOfPeople,
  onSearch,
  onRoomSelect
}) => {
  const [checkInDate, setCheckInDate] = useState(initialCheckInDate);
  const [checkOutDate, setCheckOutDate] = useState(initialCheckOutDate);
  const [numberOfPeople, setNumberOfPeople] = useState(initialNumberOfPeople);
  const { serviceId } = useParams();
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(checkInDate, checkOutDate, numberOfPeople);

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('start_Date', checkInDate);
    searchParams.set('end_Date', checkOutDate);
    searchParams.set('number_Of_People', numberOfPeople);
    navigate(`?${searchParams.toString()}`, { replace: true });
  };

  const handleQuantityChange = useCallback((offeringId, quantity) => {
    setSelectedQuantities(prev => {
      const newQuantities = { ...prev, [offeringId]: quantity };
      calculateTotals(newQuantities);
      return newQuantities;
    });
  }, []);

  const calculateTotals = useCallback((quantities) => {
    let price = 0;
    let tax = 0;

    Object.entries(quantities).forEach(([roomId, quantity]) => {
      const room = availableRooms.find(r => r.offeringId === parseInt(roomId));
      if (room && quantity > 0) {
        price += room.price * quantity;
        tax += (room.price * 0.1) * quantity;
      }
    });

    setTotalPrice(price);
    setTotalTax(tax);
  }, [availableRooms]);

  // 
  const handleBookRoom = () => {
    const bookingData = {
      serviceId: serviceId,
      numberOfPeople: parseInt(numberOfPeople),
      startDate: new Date(checkInDate).toISOString(),  // Đảm bảo định dạng ISO
      endDate: new Date(checkOutDate).toISOString(),    // Đảm bảo định dạng ISO
      totalPrice: totalPrice + totalTax,
      bookingOfferings: Object.entries(selectedQuantities).map(([offeringId, numberOfRooms]) => {
        const room = availableRooms.find(r => r.offeringId === parseInt(offeringId));
        return {
          offeringId: parseInt(offeringId),
          numberOfRooms: numberOfRooms,
          totalPrice: room.price * numberOfRooms
        };
      }),
      detailBookings: Object.entries(selectedQuantities).reduce((acc, [offeringId, unitNumber]) => {
        const room = availableRooms.find(r => r.offeringId === parseInt(offeringId));
        acc[offeringId] = {
          unitNumber: unitNumber,
          totalPrice: room.price * unitNumber,
          ticketType: "string",  // Placeholder cho ticketType
          createdAt: new Date().toISOString()  // Đảm bảo định dạng ISO
        };
        return acc;
      }, {})
    };
  
    navigate('/booking', { state: { bookingData } });
  };

  const numberOfNights = Math.ceil((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 3600 * 24));

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/3 px-2 mb-4">
            <label htmlFor="checkInDate" className="block text-sm font-medium text-gray-700">Ngày nhận phòng</label>
            <input
              type="date"
              id="checkInDate"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="w-full md:w-1/3 px-2 mb-4">
            <label htmlFor="checkOutDate" className="block text-sm font-medium text-gray-700">Ngày trả phòng</label>
            <input
              type="date"
              id="checkOutDate"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="w-full md:w-1/3 px-2 mb-4">
            <label htmlFor="numberOfPeople" className="block text-sm font-medium text-gray-700">Số người</label>
            <input
              type="number"
              id="numberOfPeople"
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              min="1"
              required
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Tìm kiếm phòng trống
          </button>
        </div>
      </form>

      {availableRooms.length > 0 && (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#003580]">
                <th className="text-white font-medium p-2 text-left">Loại căn hộ</th>
                <th className="text-white font-medium p-2 text-left">Số lượng khách</th>
                <th className="text-white font-medium p-2 text-left">Giá cho {numberOfNights} đêm</th>
                <th className="text-white font-medium p-2 text-left">Các lựa chọn</th>
                <th className="text-white font-medium p-2 text-left">Chọn căn hộ</th>
              </tr>
            </thead>
            <tbody>
              {availableRooms.map((room) => (
                <tr key={room.offeringId} className="border-b">
                  <td className="p-2 align-top">
                    <div className="space-y-2">
                      <h3 
                        className="font-semibold text-lg text-blue-600 cursor-pointer hover:underline"
                        onClick={() => onRoomSelect(room.offeringId)} 
                      >
                        {room.roomType}
                      </h3>
                      <p className="text-sm text-gray-600">Diện tích: {room.roomSize} m²</p>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center gap-1">
                      <FaUsers className="h-4 w-4" />
                      <span>{room.maxGuests}</span>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="space-y-1">
                      <div className="line-through text-gray-500">
                        VND {(room.price * 1.2).toLocaleString('vi-VN')}
                      </div>
                      <div className="font-semibold text-lg">
                        VND {room.price.toLocaleString('vi-VN')}
                      </div>
                      <div className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                        Tiết kiệm 20%
                      </div>
                      <div className="text-sm text-gray-600">
                        Đã bao gồm thuế và phí
                      </div>
                    </div>
                  </td>
                  <td className="p-2"></td>
                  <td className="p-2">
                    <div className="space-y-2">
                      <select
                        className="w-20 p-1 border rounded"
                        value={selectedQuantities[room.offeringId] || 0}
                        onChange={(e) => handleQuantityChange(room.offeringId, parseInt(e.target.value))}
                      >
                        {Array.from({ length: room.availableRooms + 1 }, (_, i) => (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {Object.values(selectedQuantities).some(q => q > 0) && (
        <div className="mt-4 border rounded-lg p-4 bg-white shadow-sm">
          <h3 className="font-semibold text-lg mb-2">
            {Object.values(selectedQuantities).reduce((a, b) => a + b, 0)} căn hộ đã chọn
          </h3>
          <div className="space-y-2">
            <div className="line-through text-gray-500">
              VND {((totalPrice + totalTax) * 1.2).toLocaleString('vi-VN')}
            </div>
            <div className="text-2xl font-bold">
              VND {totalPrice.toLocaleString('vi-VN')}
            </div>
            <div className="text-sm text-gray-600">
              +VND {totalTax.toLocaleString('vi-VN')} thuế và phí
            </div>
            <button
              className="w-full bg-[#0071c2] hover:bg-[#005999] text-white font-bold py-3 px-4 rounded"
              onClick={handleBookRoom}
            >
              Đặt phòng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;


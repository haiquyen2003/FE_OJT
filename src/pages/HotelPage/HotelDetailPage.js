import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import HotelHeader from './HotelDetaiComponent/HotelHeader';
import HotelGallery from './HotelDetaiComponent/HotelGallery';
import BookingForm from './HotelDetaiComponent/BookingForm';
import RoomDetailsModal from './HotelDetaiComponent/RoomDetailsModal';

const HotelDetailPage = () => {
  const { serviceId } = useParams();
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate here

  const [hotelData, setHotelData] = useState(null);
  const [hotelImages, setHotelImages] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hotelError, setHotelError] = useState(null);  // State for hotel error
  const [roomsError, setRoomsError] = useState(null);  // State for rooms error
  const [roomDetailsError, setRoomDetailsError] = useState(null);  // State for room details error
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const initialCheckInDate = searchParams.get('start_Date') || '';
  const initialCheckOutDate = searchParams.get('end_Date') || '';
  const initialNumberOfPeople = searchParams.get('number_Of_People') || '1';

  // Hàm xử lý đặt phòng
  const onBookRoom = (room) => {
    // Thực hiện logic khi người dùng đặt phòng
    console.log('Đặt phòng:', room.name);
    // Ví dụ: Gọi API hoặc chuyển hướng đến trang thanh toán
    setIsModalOpen(false);  // Đóng modal sau khi đặt phòng
  };

  const fetchAvailableRooms = async (checkIn, checkOut, guests) => {
    try {
      const response = await axios.get(
        `https://localhost:7253/api/HotelService/available-rooms`, 
        {
          params: {
            checkInDate: checkIn,
            checkOutDate: checkOut,
            serviceId,
            numberOfPeople: guests
          }
        }
      );
      setAvailableRooms(response.data);
      setRoomsError(null); // Reset error if rooms are fetched successfully
    } catch (err) {
      console.error('Error fetching available rooms:', err);
      setRoomsError('Không thể tải dữ liệu phòng trống');
    }
  };

  const fetchRoomDetails = async (offeringId) => {
    try {
      const response = await axios.get(`https://localhost:7253/api/Offering/${offeringId}`);
      setSelectedRoom(response.data);
      setIsModalOpen(true);
      setRoomDetailsError(null); // Reset error if room details are fetched successfully
    } catch (err) {
      console.error('Error fetching room details:', err);
      setRoomDetailsError('Không thể tải chi tiết phòng');
    }
  };

  const fetchHotelDetails = async () => {
    try {
      const hotelResponse = await axios.get(
        `https://localhost:7253/api/HotelService/Hotel_Detail?ServiceId=${serviceId}`
      );
      setHotelData(hotelResponse.data);

      const imagesResponse = await axios.get(
        `https://localhost:7253/api/HotelService/InmageByIDservice?ServiceId=${serviceId}`
      );
      setHotelImages(imagesResponse.data.result);

      if (initialCheckInDate && initialCheckOutDate) {
        await fetchAvailableRooms(initialCheckInDate, initialCheckOutDate, initialNumberOfPeople);
      }

      setLoading(false);
    } catch (err) {
      console.error('Error fetching hotel details:', err);
      setHotelError('Không thể tải dữ liệu khách sạn');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotelDetails();
  }, [serviceId, initialCheckInDate, initialCheckOutDate, initialNumberOfPeople]);

  const handleBookRoom = (selectedQuantities) => {
    const bookingData = {
      serviceId: serviceId,
      numberOfPeople: initialNumberOfPeople,
      startDate: initialCheckInDate,
      endDate: initialCheckOutDate,
      selectedRooms: Object.entries(selectedQuantities).map(([offeringId, quantity]) => {
        const room = availableRooms.find(r => r.offeringId === parseInt(offeringId));
        return {
          offeringId: parseInt(offeringId),
          roomType: room.roomType,
          quantity: quantity,
          price: room.price
        };
      }),
      totalPrice: Object.entries(selectedQuantities).reduce((total, [offeringId, quantity]) => {
        const room = availableRooms.find(r => r.offeringId === parseInt(offeringId));
        return total + (room ? room.price * quantity : 0);
      }, 0)
    };

    // Chuyển hướng đến trang booking với dữ liệu đã chọn
    navigate('/booking', { state: { bookingData } });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {hotelData ? (
          <HotelHeader hotel={hotelData} />
        ) : hotelError ? (
          <div className="text-red-500">{hotelError}</div>
        ) : null}
      </div>

      <div className="container mx-auto px-4 py-8">
        {roomsError ? (
          <div className="text-red-500">{roomsError}</div>
        ) : (
          <BookingForm 
            hotelData={hotelData}
            availableRooms={availableRooms}
            initialCheckInDate={initialCheckInDate}
            initialCheckOutDate={initialCheckOutDate}
            initialNumberOfPeople={initialNumberOfPeople}
            onSearch={fetchAvailableRooms}
            onRoomSelect={fetchRoomDetails}
            onBookRoom={handleBookRoom}
          />
        )}
      </div>

      <HotelGallery images={hotelImages} />

      {selectedRoom && (
        <RoomDetailsModal
          room={selectedRoom}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onBookRoom={onBookRoom}
        />
      )}

      {roomDetailsError && (
        <div className="text-red-500">{roomDetailsError}</div>
      )}
    </div>
  );
};

export default HotelDetailPage;

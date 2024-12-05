import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Để lấy tham số serviceId từ URL
import axios from 'axios';
import HotelHeader from './HotelDetaiComponent/HotelHeader';
import HotelGallery from './HotelDetaiComponent/HotelGallery'; // Import component Gallery
import { FaInfoCircle, FaAccessibleIcon, FaSwimmingPool, FaSwimmer, FaHeart, FaWifi } from 'react-icons/fa';
import { MdEmojiFoodBeverage, MdAir, MdTableBar, MdFreeBreakfast } from 'react-icons/md';
import Header from '../../components/Header';
import { Padding } from '@mui/icons-material';
// Map icon
const iconMap = {
  FaAccessibleIcon,
  MdEmojiFoodBeverage,
  FaSwimmingPool,
  FaSwimmer,
  MdFreeBreakfast,
  MdAir,
  FaHeart,
  MdTableBar,
  FaWifi,
};

const HotelDetailPage = () => {
  const { serviceId } = useParams(); // Lấy serviceId từ URL
  const [hotelData, setHotelData] = useState(null);
  const [hotelImages, setHotelImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch thông tin chi tiết khách sạn
    axios.get(`https://localhost:7253/api/HotelService/Hotel_Detail?ServiceId=${serviceId}`)
      .then(response => {
        setHotelData(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Không thể tải dữ liệu khách sạn');
        setLoading(false);
      });
    
    // Fetch hình ảnh khách sạn
    axios.get(`https://localhost:7253/api/HotelService/InmageByIDservice?ServiceId=${serviceId}`)
      .then(response => {
        setHotelImages(response.data.result);
      })
      .catch(err => {
        setError('Không thể tải hình ảnh');
      });

  }, [serviceId]); // Gọi lại API mỗi khi serviceId thay đổi

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Header />

      {hotelData && <HotelHeader hotel={hotelData} />}
      <HotelGallery images={hotelImages} />
      {/* Các component khác như HotelInfo, BookingForm sẽ tiếp tục */}

      
    </div>
  );
};

export default HotelDetailPage;

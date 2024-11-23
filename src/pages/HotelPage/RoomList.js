import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import HotelLayout from '../../components/HOTEL/HotelLayout';
import { FaPlus, FaEllipsisV, FaEdit, FaTrash, FaInfoCircle, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Select, MenuItem, Card, CardContent, Typography, Chip, CardMedia, Modal, Box, TextField, Button, FormControl, InputLabel, Grid } from '@mui/material';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';

const RoomList = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [roomDetails, setRoomDetails] = useState(null);
  const [offerings, setOfferings] = useState([]);
  const [newRoom, setNewRoom] = useState({
    offeringId: '',
    roomNumber: '',
    floor: '',
    status: 'Trống' // Trạng thái mặc định là "Trống"
  });
  const modalRef = useRef();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://localhost:7253/api/Room/getAllRoomsByProviderId', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    const fetchOfferings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://localhost:7253/api/Offering/GetAllServiceOfferingsbyIdProvider', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOfferings(response.data);
      } catch (error) {
        console.error('Error fetching offerings:', error);
      }
    };

    fetchRooms();
    fetchOfferings();
  }, []);

  const handleDetailsClick = async (room) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://localhost:7253/api/Room/viewRoomdetail/${room.roomID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRoomDetails(response.data);
      setShowDetailsModal(true);
    } catch (error) {
      console.error('Error fetching room details:', error);
    }
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowDetailsModal(false);
    }
  };

  const handleAddRoom = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://localhost:7253/api/Room/create-room-with-offering', newRoom, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShowModal(false);
      // Fetch rooms again to update the list
      const response = await axios.get('https://localhost:7253/api/Room/getAllRoomsByProviderId', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRooms(response.data);
    } catch (error) {
      console.error('Error adding room:', error);
    }
  };

  return (
    <HotelLayout>
      <div className="p-8 bg-gray-900 text-white">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-extrabold text-white">Room List</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg flex items-center hover:bg-blue-500 transition-all duration-200"
          >
            <FaPlus className="mr-2" /> Add New Room
          </button>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg">
              <thead>
                <tr>
                  <th className="py-4 px-6 border-b text-left text-gray-400 font-semibold">Room Number</th>
                  <th className="py-4 px-6 border-b text-left text-gray-400 font-semibold">Room Type</th>
                  <th className="py-4 px-6 border-b text-left text-gray-400 font-semibold">Status</th>
                  <th className="py-4 px-6 border-b text-left text-gray-400 font-semibold">Price</th>
                  <th className="py-4 px-6 border-b text-left text-gray-400 font-semibold">Max Guests</th>
                  <th className="py-4 px-6 border-b text-left text-gray-400 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr key={room.roomID} className="hover:bg-gray-700 transition-all duration-200">
                    <td className="py-4 px-6 border-b text-blue-400 font-semibold cursor-pointer">
                      {room.roomNumber}
                    </td>
                    <td className="py-4 px-6 border-b text-white font-semibold cursor-pointer hover:underline">
                      {room.serviceOffering.name || 'N/A'}
                    </td>
                    <td className="py-4 px-6 border-b text-white font-semibold cursor-pointer hover:underline">
                      {room.status || 'N/A'}
                    </td>
                    <td className="py-4 px-6 border-b text-white font-semibold cursor-pointer hover:underline">
                      {room.serviceOffering.price ? `${room.serviceOffering.price.toLocaleString()} VND` : 'N/A'}
                    </td>
                    <td className="py-4 px-6 border-b text-white font-semibold cursor-pointer hover:underline">
                      {room.serviceOffering.maxGuests || 'N/A'}
                    </td>
                    <td className="py-4 px-6 border-b text-white font-semibold">
                      <button
                        onClick={() => handleDetailsClick(room)}
                        className="text-gray-400 hover:text-white"
                      >
                        <FaInfoCircle /> Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for Adding New Room */}
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box className="p-8 bg-white rounded-lg shadow-lg max-w-md mx-auto mt-20">
          <Typography variant="h5" className="mb-4 font-bold text-gray-800">Add New Room</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="offering-label">Offering</InputLabel>
                <Select
                  labelId="offering-label"
                  value={newRoom.offeringId}
                  onChange={(e) => setNewRoom({ ...newRoom, offeringId: e.target.value })}
                >
                  {offerings.map((offering) => (
                    <MenuItem key={offering.offeringId} value={offering.offeringId}>{offering.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Room Number"
                fullWidth
                value={newRoom.roomNumber}
                onChange={(e) => setNewRoom({ ...newRoom, roomNumber: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Floor"
                fullWidth
                value={newRoom.floor}
                onChange={(e) => setNewRoom({ ...newRoom, floor: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth onClick={handleAddRoom}>Add Room</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      {/* Details Modal */}
      {showDetailsModal && roomDetails && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={handleOutsideClick}
        >
          <Card ref={modalRef} className="max-w-4xl mx-auto shadow-xl">
            <ImageCarousel images={roomDetails.serviceOffering.offeringImages} />
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <Typography variant="h4" className="font-bold text-gray-800">
                    {roomDetails.serviceOffering.name}
                  </Typography>
                  <Typography variant="subtitle1" className="text-gray-600">
                    {roomDetails.status} - Floor {roomDetails.floor}, Room {roomDetails.roomNumber}
                  </Typography>
                </div>
                <Chip
                  label={`${roomDetails.serviceOffering.price.toLocaleString()} VND / night`}
                  color="primary"
                  icon={<FaInfoCircle />}
                  className="text-lg"
                />
              </div>
              <Typography variant="body1" className="mb-4 text-gray-700">
                {roomDetails.serviceOffering.description}
              </Typography>
              <Typography variant="h6" className="font-semibold mb-2 text-gray-800">
                Amenities
              </Typography>
              <div className="flex flex-wrap gap-2 mb-6">
  {roomDetails.serviceOffering.amenity.map((amenity) => {
    const IconComponent = FaIcons[amenity.iconType] || MdIcons[amenity.iconType] || FaInfoCircle;
    return (
      <Chip
        key={amenity.amenitieId}
        icon={<IconComponent />}
        label={amenity.name}
        variant="outlined"
        className="m-1"
      />
    );
  })}
</div>
            </CardContent>
          </Card>
        </div>
      )}
    </HotelLayout>
  );
};

export default RoomList;

const ImageCarousel = ({ images }) => {
  const PrevArrow = ({ className, onClick }) => (
    <button
      className={`${className} slick-prev text-white`}
      onClick={onClick}
      style={{
        display: "block",
        left: "10px",
        zIndex: 1,
      }}
    >
      <FaArrowLeft size={30} />
    </button>
  );

  const NextArrow = ({ className, onClick }) => (
    <button
      className={`${className} slick-next text-white`}
      onClick={onClick}
      style={{
        display: "block",
        right: "10px",
        zIndex: 1,
      }}
    >
      <FaArrowRight size={30} />
    </button>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className="rounded-t-lg overflow-hidden relative">
      <Slider {...settings}>
        {images.map((image) => (
          <div key={image.offeringImageId}>
            <CardMedia
              component="img"
              height="300"
              image={image.imageUrl}
              alt={image.description}
              className="w-full h-64 object-cover"
            />
            <Typography variant="body2" className="text-center text-gray-400 mt-2">
              {image.description}
            </Typography>
          </div>
        ))}
      </Slider>
    </div>
  );
};

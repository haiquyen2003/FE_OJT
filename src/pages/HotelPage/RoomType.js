import React, { useState, useEffect, useRef } from 'react';
import HotelLayout from '../../components/HOTEL/HotelLayout';
import { Button, AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Add } from '@mui/icons-material';
import RoomTypeList from './RoomTypeComponent/RoomTypeList';  // Import component
import RoomTypeDialog from './RoomTypeComponent/RoomTypeDialog';  // Import component
import RoomTypeImagesModal from './RoomTypeComponent/RoomTypeImagesModal';  // Import component
import RoomTypeAmenitiesModal from './RoomTypeComponent/RoomTypeAmenitiesModal';  // Import component
import OfferingDetailsDialog from './RoomTypeComponent/OfferingDetailsDialog';  // Import component
import axios from 'axios';

const RoomType = () => {
  const [offerings, setOfferings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editRoom, setEditRoom] = useState(null);
  const [amenitiesList, setAmenitiesList] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [showOfferingDetailsModal, setShowOfferingDetailsModal] = useState(false);
  const [selectedOfferingDetails, setSelectedOfferingDetails] = useState(null);

  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const priceRef = useRef(null);
  const availableUnitsRef = useRef(null);
  const roomSizeRef = useRef(null);
  const bedTypeRef = useRef(null);
  const maxGuestsRef = useRef(null);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  const fetchOfferings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://localhost:7253/api/Offering/GetAllServiceOfferingsbyIdProvider', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const offeringsWithId = response.data.map((offering) => ({ ...offering, id: offering.offeringId }));
      setOfferings(offeringsWithId);
    } catch (error) {
      console.error('Error fetching offerings:', error);
    }
  };

  const fetchAmenities = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://localhost:7253/api/Amenities/getAmenitiesByProvider', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAmenitiesList(response.data);
    } catch (error) {
      console.error('Error fetching amenities:', error);
    }
  };

  useEffect(() => {
    fetchOfferings();
    fetchAmenities();
  }, []);

  const handleAddClick = () => {
    setEditRoom(null);
    setSelectedAmenities([]);
    setImages([]);
    setNewImages([]);
    setImagesToDelete([]);
    setShowModal(true);
  };

  const handleEditClick = async (room) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://localhost:7253/api/Offering/${room.offeringId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Edit Room Data:', response.data);

      setEditRoom(response.data);
      setSelectedAmenities(response.data.amenity || []);

      // Chỉ chứa hình ảnh cũ và lưu cả offeringImageId
      setImages(response.data.offeringImages.map((img) => ({
        offeringImageId: img.offeringImageId,
        imageUrl: img.imageUrl,
      })));

      setNewImages([]); // Reset hình ảnh mới
      setImagesToDelete([]); // Reset danh sách ảnh cần xóa
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching room details:', error);
    }
  };

const handleImageDelete = (imageId) => {
    console.log('Deleting image with ID:', imageId);
    // Nếu ID hợp lệ thì thêm vào danh sách xóa
    if (imageId) {
      setImagesToDelete((prevImagesToDelete) => [...prevImagesToDelete, imageId]);
      console.log('Images to delete after update:', [...imagesToDelete, imageId]);
    }
    // Xóa ảnh khỏi danh sách hiện tại để cập nhật giao diện
    setImages((prevImages) => prevImages.filter((image) => image.offeringImageId !== imageId));
};


  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();

      // Add form data
      if (nameRef.current) formData.append('Name', nameRef.current.value || '');
      if (descriptionRef.current) formData.append('Description', descriptionRef.current.value || '');
      if (priceRef.current) formData.append('Price', priceRef.current.value || '');
      if (availableUnitsRef.current) formData.append('AvailableUnits', availableUnitsRef.current.value || '');
      if (roomSizeRef.current) formData.append('RoomSize', roomSizeRef.current.value || '');
      if (bedTypeRef.current) formData.append('BedType', bedTypeRef.current.value || '');
      if (maxGuestsRef.current) formData.append('MaxGuests', maxGuestsRef.current.value || '');
      if (startDateRef.current) formData.append('StartDate', startDateRef.current.value || '');
      if (endDateRef.current) formData.append('EndDate', endDateRef.current.value || '');

      // Add amenities
      selectedAmenities.forEach((amenity) => {
        if (typeof amenity === 'object' && amenity.amenitieId) {
          formData.append('AmenityIds[]', amenity.amenitieId);
        } else {
          formData.append('AmenityIds[]', amenity);
        }
      });

      // Add new images
      newImages.forEach((image) => {
        formData.append('NewImages', image);
      });

      // Add images to delete
      if (imagesToDelete.length > 0) {
        imagesToDelete.forEach((imageId) => {
          console.log('Adding image to delete with ID:', imageId);
          formData.append('ImagesToDelete[]', imageId);
        });
      } else {
        console.log('No images to delete.');
      }

      if (editRoom) {
        // Update existing room
        await axios.put(`https://localhost:7253/api/Offering/${editRoom.offeringId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        // Create new room
        await axios.post('https://localhost:7253/api/ServiceOffering/CreateOffering', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      setShowModal(false);
      fetchOfferings();
    } catch (error) {
      console.error('Error saving offering:', error);
    }
  };

  const handleOfferingDetailsView = async (offeringId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://localhost:7253/api/Offering/${offeringId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSelectedOfferingDetails(response.data);
      setShowOfferingDetailsModal(true);
    } catch (error) {
      console.error('Error fetching offering details:', error);
    }
  };

  return (
    <HotelLayout>
      <Box sx={{ bgcolor: 'white', color: 'text.primary', minHeight: '100vh', p: 3 }}>
        <AppBar position="static" sx={{ mb: 4, bgcolor: 'primary.main' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
              Room Types Management
            </Typography>
            <Button variant="contained" sx={{ color: 'white' }} startIcon={<Add />} onClick={handleAddClick}>
              Add New Room Type
            </Button>
          </Toolbar>
        </AppBar>

        <RoomTypeList
          offerings={offerings}
          onEdit={handleEditClick}
          onDelete={() => {}}
          onViewImages={(room) => setSelectedOfferingDetails(room.offeringImages)}
          onViewOfferingDetails={(offering) => handleOfferingDetailsView(offering.offeringId)}
        />

        <RoomTypeDialog 
          open={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          amenitiesList={amenitiesList}
          selectedAmenities={selectedAmenities}
          onAmenityChange={setSelectedAmenities}
          onImageChange={(files) => setNewImages(files)}
          externalSetImagesToDelete={(imageId) => {
            console.log('externalSetImagesToDelete called with ID:', imageId);
            setImagesToDelete((prevImages) => [...prevImages, imageId]);
          }}          nameRef={nameRef}
          descriptionRef={descriptionRef}
          priceRef={priceRef}
          availableUnitsRef={availableUnitsRef}
          roomSizeRef={roomSizeRef}
          bedTypeRef={bedTypeRef}
          maxGuestsRef={maxGuestsRef}
          startDateRef={startDateRef}
          endDateRef={endDateRef}
          editRoom={editRoom}
        />

        <OfferingDetailsDialog
          open={showOfferingDetailsModal}
          onClose={() => setShowOfferingDetailsModal(false)}
          offeringDetails={selectedOfferingDetails}
        />
      </Box>
    </HotelLayout>
  );
};

export default RoomType;

import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Button as MuiButton } from '@mui/material';

const RoomDetailsModal = ({ room, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === room.offeringImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? room.offeringImages.length - 1 : prev - 1
    );
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="lg" fullWidth>
      <div className="relative bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 bg-white rounded-full p-1 shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image carousel */}
        <div className="relative h-96">
          <img
            src={room.offeringImages[currentImageIndex].imageUrl}
            alt={room.offeringImages[currentImageIndex].description}
            className="w-full h-full object-cover"
          />
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Thumbnail gallery */}
        <div className="flex gap-2 p-2 overflow-x-auto">
          {room.offeringImages.map((image, index) => (
            <img
              key={image.offeringImageId}
              src={image.imageUrl}
              alt={image.description}
              className={`h-20 w-20 object-cover cursor-pointer ${currentImageIndex === index ? 'border-2 border-blue-500' : ''}`}
              onClick={() => selectImage(index)}
            />
          ))}
        </div>

        {/* Room details */}
        <DialogContent>
          <h2 className="text-2xl font-bold mb-4">{room.name}</h2>

          {/* Basic info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <FaIcons.FaHome className="h-5 w-5" />
              <span>Căn hộ nguyên căn</span>
            </div>
            <div className="flex items-center gap-2">
              <FaIcons.FaRuler className="h-5 w-5" />
              <span>{room.roomSize} m²</span>
            </div>
            <div className="flex items-center gap-2">
              <FaIcons.FaBed className="h-5 w-5" />
              <span>{room.bedType}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaIcons.FaUsers className="h-5 w-5" />
              <span>Tối đa {room.maxGuests} khách</span>
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Tiện nghi phòng</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {room.amenity.map((amenity) => {
                const IconComponent = FaIcons[amenity.iconType] || MdIcons[amenity.iconType] || null;
                return (
                  <div key={amenity.amenitieId} className="flex items-center gap-2">
                    {IconComponent && <IconComponent className="h-5 w-5" />}
                    <span>{amenity.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Mô tả</h3>
            <p className="text-gray-600">{room.description}</p>
          </div>

          {/* Price and booking */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              <p className="text-2xl font-bold">
                {room.price.toLocaleString('vi-VN')} VND
              </p>
              <p className="text-sm text-gray-500">Đã bao gồm thuế và phí</p>
            </div>
            <DialogActions>
              <MuiButton 
                variant="contained" 
                color="primary" 
                onClick={onClose}
              >
                Đặt ngay
              </MuiButton>
            </DialogActions>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default RoomDetailsModal;

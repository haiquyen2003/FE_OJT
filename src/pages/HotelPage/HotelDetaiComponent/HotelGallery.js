import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaCamera, FaTimes } from 'react-icons/fa';

const HotelGallery = ({ images }) => {
  const [showAll, setShowAll] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const displayImages = images.slice(0, 5);

  const handlePrevious = () => {
    setSelectedImage((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setSelectedImage((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const handleImageClick = (index) => {
    setSelectedImage(index);
    setShowAll(true);
  };

  // Handle closing modal when clicking outside of the modal content
  const handleCloseModal = (e) => {
    // Prevent closing if the click is on the modal content (image or other parts)
    if (e.target === e.currentTarget) {
      setShowAll(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[400px] relative rounded-lg overflow-hidden">
        <div className="col-span-2 row-span-2 relative">
          <img
            src={images[0].imageUrl}
            alt={images[0].description}
            className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition-opacity"
            onClick={() => {
              setSelectedImage(0);
              setShowAll(true);
            }}
          />
        </div>
        {displayImages.slice(1).map((image, index) => (
          <div key={image.offeringImageId} className="relative">
            <img
              src={image.imageUrl}
              alt={image.description}
              className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition-opacity"
              onClick={() => {
                setSelectedImage(index + 1);
                setShowAll(true);
              }}
            />
            {index === 3 && images.length > 5 && (
              <div
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer"
                onClick={() => setShowAll(true)}
              >
                <div className="text-white text-center">
                  <FaCamera className="w-6 h-6 mx-auto mb-2" />
                  <span className="font-medium">+{images.length - 5} ảnh</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {showAll && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col"
          onClick={handleCloseModal} // Close when clicking outside the modal content
        >
          <div className="relative flex-1">
            <button
              className="absolute right-4 top-4 text-white hover:text-gray-300"
              onClick={() => setShowAll(false)}
            >
              <FaTimes className="w-6 h-6" />
            </button>
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={images[selectedImage].imageUrl}
                alt={images[selectedImage].description}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
              onClick={handlePrevious}
            >
              <FaChevronLeft className="w-8 h-8" />
            </button>
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
              onClick={handleNext}
            >
              <FaChevronRight className="w-8 h-8" />
            </button>
          </div>
          <div className="bg-white p-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <div
                  key={image.offeringImageId}
                  className={`flex-shrink-0 w-20 h-20 cursor-pointer transition-all ${
                    selectedImage === index ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image.imageUrl}
                    alt={image.description}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {images[selectedImage].description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelGallery;

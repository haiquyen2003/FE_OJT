import React from 'react';

const ImageGallery = ({ images }) => (
  <div className="mt-8">
    <h2 className="text-2xl font-semibold mb-4 text-blue-700">Hình ảnh Khách sạn</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <div key={index} className="relative aspect-w-16 aspect-h-9">
          <img
            src={image}
            alt={`Hotel image ${index + 1}`}
            className="object-cover rounded-lg shadow-md"
          />
        </div>
      ))}
    </div>
  </div>
);

export default ImageGallery;


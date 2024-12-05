import React from 'react';
import { FaInfoCircle, FaAccessibleIcon, FaSwimmingPool, FaSwimmer, FaHeart, FaWifi } from 'react-icons/fa';
import { MdEmojiFoodBeverage, MdAir, MdTableBar, MdFreeBreakfast } from 'react-icons/md';
import { Star } from 'lucide-react';

const FaIcons = {
  FaAccessibleIcon,
  FaSwimmingPool,
  FaSwimmer,
  FaHeart,
  FaWifi
};

const MdIcons = {
  MdEmojiFoodBeverage,
  MdAir,
  MdTableBar,
  MdFreeBreakfast
};

interface Amenity {
  amenitieId: string;
  name: string;
  description: string;
  iconType: string;
}

interface Hotel {
  name: string;
  address: string;
  description: string;
  rating: number;
  amenities: Amenity[];
}

const HotelHeader: React.FC<{ hotel: Hotel }> = ({ hotel }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{hotel.name}</h1>
        <div className="flex items-center mb-2">
          {[...Array(Math.floor(hotel.rating))].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
          ))}
          <span className="ml-2 text-sm text-gray-600">
            {hotel.rating.toFixed(1)} stars
          </span>
        </div>
        <p className="text-gray-600">{hotel.address}</p>
      </div>

      <p className="text-gray-700 mb-6">{hotel.description}</p>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Tiện ích nổi bật</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {hotel.amenities.map((amenity) => (
            <AmenityItem key={amenity.amenitieId} amenity={amenity} />
          ))}
        </div>
      </div>
    </div>
  );
};

const AmenityItem: React.FC<{ amenity: Amenity }> = ({ amenity }) => {
  const IconComponent = FaIcons[amenity.iconType] || MdIcons[amenity.iconType] || FaInfoCircle;

  return (
    <div className="flex items-center">
      <IconComponent className="w-5 h-5 text-blue-600 mr-2" />
      <span className="text-gray-700">{amenity.name}</span>
    </div>
  );
};

export default HotelHeader;


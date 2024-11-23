import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaMapMarkerAlt, FaCalendarAlt, FaUserFriends, FaBed } from 'react-icons/fa';

const BookNowPage = () => {
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedDates, setSelectedDates] = useState({ start: '', end: '' });
  const [travelers, setTravelers] = useState(1);
  const [accommodation, setAccommodation] = useState('');

  const handleDateChange = (type, value) => {
    setSelectedDates((prev) => ({ ...prev, [type]: value }));
  };

  const handleTravelersChange = (e) => {
    setTravelers(parseInt(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý dữ liệu đặt vé ở đây, có thể gọi API hoặc hiển thị thông báo thành công.
    console.log({
      destination: selectedDestination,
      dates: selectedDates,
      travelers,
      accommodation,
    });
    alert('Booking Successful!');
  };

  return (
    <div>
      <Header />
      
      {/* Hero Section */}
      <section
        className="relative h-80 flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="z-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Book Your Adventure Now</h1>
          <p className="text-lg">Choose your next journey with us and experience the best of travel</p>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Book Your Next Adventure</h2>
          <form className="max-w-3xl mx-auto bg-white text-gray-800 rounded-lg shadow-lg p-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2">Destination</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Where do you want to go?"
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    value={selectedDestination}
                    onChange={(e) => setSelectedDestination(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2">Dates</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="relative flex-1">
                    <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                      value={selectedDates.start}
                      onChange={(e) => handleDateChange('start', e.target.value)}
                    />
                  </div>
                  <div className="relative flex-1">
                    <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                      value={selectedDates.end}
                      onChange={(e) => handleDateChange('end', e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block mb-2">Travelers</label>
                <div className="relative">
                  <FaUserFriends className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="number"
                    min="1"
                    value={travelers}
                    onChange={handleTravelersChange}
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2">Accommodation</label>
                <div className="relative">
                  <FaBed className="absolute left-3 top-3 text-gray-400" />
                  <select
                    value={accommodation}
                    onChange={(e) => setAccommodation(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="">Select accommodation</option>
                    <option value="hotel">Hotel</option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                  </select>
                </div>
              </div>
            </div>
            <button className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300">
              Book Now
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookNowPage;

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaMapMarkerAlt, FaCalendarAlt, FaUserFriends, FaBed, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import HeroSection from './HomepageSestion/HeroSection';
const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedDates, setSelectedDates] = useState({ start: '', end: '' });
  const [travelers, setTravelers] = useState(1);
  const [accommodation, setAccommodation] = useState('');

  const destinations = [
    { id: 1, name: 'Paris', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34', description: 'Experience the romance of the City of Light.' },
    { id: 2, name: 'Tokyo', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf', description: 'Immerse yourself in the blend of tradition and technology.' },
    { id: 3, name: 'Bali', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4', description: 'Relax on pristine beaches and explore lush jungles.' },
    { id: 4, name: 'New York', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9', description: 'Discover the vibrant energy of the Big Apple.' }
  ];

  const testimonials = [
    { id: 1, name: 'John Doe', rating: 5, comment: 'An unforgettable journey! The service was impeccable.' },
    { id: 2, name: 'Jane Smith', rating: 4, comment: 'Great destinations and smooth booking process.' },
    { id: 3, name: 'Mike Johnson', rating: 5, comment: 'Exceeded all expectations. Will definitely book again!' }
  ];
  const featuredTours = [
    { id: 1, name: "European Adventure", image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b", price: "$2999", description: "Explore the best of Europe" },
    { id: 2, name: "Asian Expedition", image: "https://images.unsplash.com/photo-1540162012087-7ba94b29c8c9", price: "$3499", description: "Discover the wonders of Asia" },
    { id: 3, name: "African Safari", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801", price: "$4299", description: "Experience wildlife up close" },
    { id: 1, name: "European Adventure", image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b", price: "$2999", description: "Explore the best of Europe" },
    { id: 1, name: "European Adventure", image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b", price: "$2999", description: "Explore the best of Europe" },
    { id: 1, name: "European Adventure", image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b", price: "$2999", description: "Explore the best of Europe" }
  ];
  useEffect(() => {
    if (searchQuery.length > 2) {
      const filteredSuggestions = destinations.filter(dest =>
        dest.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDateChange = (type, value) => {
    setSelectedDates((prev) => ({ ...prev, [type]: value }));
  };

  const handleTravelersChange = (e) => {
    setTravelers(parseInt(e.target.value));
  };

  const handleAccommodationChange = (e) => {
    setAccommodation(e.target.value);
  };

  return (
    <div>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} suggestions={suggestions} />
      

 {/* Hero Section */}
 <HeroSection />

{/* <section
  className="relative h-screen flex items-center justify-center text-white"
  style={{
    backgroundImage: "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  <div className="absolute inset-0 bg-black opacity-50"></div> 
  
  <div className="z-10 text-center px-4">
    <h1 className="text-5xl font-bold mb-4">Explore the World</h1>
    <p className="text-xl mb-8">Discover new adventures and create unforgettable memories</p>
    

    <div className="bg-white rounded-full shadow-lg p-4 max-w-5xl mx-auto flex items-center justify-between space-x-4">
      <input
        type="text"
        placeholder="Where would you like to stay?"
        className="w-1/4 p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <input
        type="date"
        className="w-1/4 p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <input
        type="date"
        className="w-1/4 p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <select
        className="w-1/4 p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Guests</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4+</option>
      </select>
      
      <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-full transition duration-300">
        Search
      </button>
    </div>

    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full mt-6 transition duration-300">
      Start Your Journey
    </button>
  </div>
</section> */}



      {/* Featured Destinations */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {destinations.map((destination) => (
              <motion.div
                key={destination.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
                whileHover={{ y: -10 }}
              >
                <img src={destination.image} alt={destination.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{destination.name}</h3>
                  <p className="text-gray-600">{destination.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Tours</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredTours.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => navigate(`/tours/${tour.id}`)}
            >
              <img
                src={tour.image}
                alt={tour.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-xl mb-2">{tour.name}</h3>
                <p className="text-gray-600 mb-2">{tour.description}</p>
                <p className="text-blue-600 font-bold text-lg mb-4">{tour.price}</p>
                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>    
      {/* Booking Form */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Book Your Next Adventure</h2>
          <form className="max-w-3xl mx-auto bg-white text-gray-800 rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2">Destination</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Where do you want to go?"
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2">Dates</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
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
                    onChange={handleAccommodationChange}
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

      {/* Testimonials */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Travelers Say</h2>
          <div className="flex overflow-x-auto space-x-6 pb-4">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="flex-shrink-0 w-80 bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
                <p className="font-semibold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;

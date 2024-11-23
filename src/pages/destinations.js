import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const DestinationsPage = () => {
  const destinations = [
    {
      id: 1,
      name: 'Paris',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
      description: 'Experience the romance of the City of Light, with its iconic landmarks and vibrant culture.'
    },
    {
      id: 2,
      name: 'Tokyo',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf',
      description: 'Immerse yourself in the blend of tradition and technology, from ancient temples to neon-lit streets.'
    },
    {
      id: 3,
      name: 'Bali',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
      description: 'Relax on pristine beaches, explore lush jungles, and experience the vibrant Balinese culture.'
    },
    {
      id: 4,
      name: 'New York',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
      description: 'Discover the vibrant energy of the Big Apple, with its towering skyscrapers and bustling streets.'
    }
  ];

  return (
    <div>
      <Header />
      
      {/* Hero Section */}
      <section
        className="relative h-80 flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="z-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Destinations</h1>
          <p className="text-lg">Discover the world's most amazing places with us</p>
        </div>
      </section>

      {/* Destinations List */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Explore Our Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination) => (
              <motion.div
                key={destination.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
                whileHover={{ y: -10 }}
              >
                <img src={destination.image} alt={destination.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">{destination.name}</h3>
                  <p className="text-gray-600 mb-4">{destination.description}</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                    Learn More
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DestinationsPage;

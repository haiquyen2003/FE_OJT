import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutUsPage = () => {
  return (
    <div>
      <Header />

      {/* Hero Section */}
      <section
        className="relative h-80 flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="z-10 text-center">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg">Get to know more about our journey and our passion for travel</p>
        </div>
      </section>

      {/* About Us Content Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Story</h2>
          <div className="flex flex-col md:flex-row items-center md:space-x-12">
            <img
              src="https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b"
              alt="Our Team"
              className="w-full md:w-1/2 rounded-lg shadow-lg mb-6 md:mb-0"
            />
            <div className="md:w-1/2">
              <p className="text-gray-700 mb-6">
                Founded in 2010, TravelWorld was born from a shared passion for exploring the globe and experiencing the unique cultures that make our planet so fascinating. We started as a small group of travel enthusiasts, and today we have grown into a worldwide network of travelers, helping thousands of people create unforgettable journeys.
              </p>
              <p className="text-gray-700 mb-6">
                Our mission is to provide the best travel experiences, from discovering hidden gems in faraway places to connecting people with cultures and traditions different from their own. We believe in the transformative power of travel and the magic it brings to those who embrace the adventure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Passion for Travel</h3>
              <p className="text-gray-600">
                We live and breathe travel. Our passion drives us to explore new places, share new experiences, and help others do the same.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Customer First</h3>
              <p className="text-gray-600">
                Our customers are at the heart of everything we do. We aim to provide outstanding service and create travel experiences that exceed expectations.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Sustainable Tourism</h3>
              <p className="text-gray-600">
                We believe in responsible travel that respects local cultures and environments, ensuring that our adventures benefit both travelers and the communities we visit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold">John Doe</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </div>
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1502767089025-6572583495b6"
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold">Jane Smith</h3>
              <p className="text-gray-600">Head of Operations</p>
            </div>
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39"
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold">Alice Johnson</h3>
              <p className="text-gray-600">Lead Travel Specialist</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUsPage;

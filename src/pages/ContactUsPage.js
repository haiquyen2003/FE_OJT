import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactUsPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý gửi liên hệ ở đây, có thể gọi API hoặc hiển thị thông báo thành công.
    console.log({ name, email, message });
    alert('Thank you for reaching out! We will get back to you soon.');
  };

  return (
    <div>
      <Header />

      {/* Hero Section */}
      <section
        className="relative h-80 flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="z-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg">We are here to answer any questions you may have</p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Get in Touch</h2>
          <div className="flex flex-col md:flex-row md:space-x-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <p className="text-gray-700 mb-4">
                Feel free to contact us at any time. We are always available to assist you with your travel plans.
              </p>
              <div className="flex items-center mb-4">
                <FaPhone className="text-blue-600 mr-4" />
                <span className="text-gray-700">+123 456 7890</span>
              </div>
              <div className="flex items-center mb-4">
                <FaEnvelope className="text-blue-600 mr-4" />
                <span className="text-gray-700">contact@travelworld.com</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-blue-600 mr-4" />
                <span className="text-gray-700">123 Travel St, Adventure City, World</span>
              </div>
            </div>
            <form className="md:w-1/2 bg-white rounded-lg shadow-lg p-8" onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block mb-2">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  rows="5"
                  required
                ></textarea>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactUsPage;

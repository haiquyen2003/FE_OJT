import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaStar, FaCalendarAlt, FaUserFriends, FaCheckCircle } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const TourDetailPage = () => {
  // Lấy tourId từ URL
  const { tourId } = useParams();

  // Các thông tin về các tours
  const tours = [
    {
      id: 1,
      name: "European Adventure",
      images: [
        "https://images.unsplash.com/photo-1467269204594-9661b134dd2b",
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
        "https://images.unsplash.com/photo-1529016583200-1f015bd06e01"
      ],
      price: "$2999",
      description: "Explore the best of Europe with this amazing tour through some of the continent's most iconic locations.",
      details: "This tour will take you to multiple countries across Europe including France, Italy, and Germany. Enjoy guided tours, comfortable accommodations, and unique cultural experiences throughout your journey.",
      schedule: "10 Days, 9 Nights",
      highlights: ['Paris City Tour', 'Colosseum in Rome', 'Rhine Valley Cruise'],
      rating: 4.8,
      reviews: [
        { name: "John Doe", rating: 5, comment: "An unforgettable experience. The guides were excellent and everything was well organized." },
        { name: "Jane Smith", rating: 4, comment: "Great tour, but I wish we had more time in Italy." },
        { name: "David Brown", rating: 5, comment: "Highly recommend this tour! Worth every penny." }
      ]
    },
    {
      id: 2,
      name: "Asian Expedition",
      images: [
        "https://images.unsplash.com/photo-1540162012087-7ba94b29c8c9",
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4"
      ],
      price: "$3499",
      description: "Discover the wonders of Asia on this unforgettable expedition through beautiful landscapes.",
      details: "The Asian Expedition covers highlights in countries like Japan, China, and Thailand. Experience a mix of modernity and tradition, visit temples, and savor the amazing cuisine.",
      schedule: "12 Days, 11 Nights",
      highlights: ['Tokyo City Exploration', 'Great Wall of China', 'Bangkok Night Market'],
      rating: 4.7,
      reviews: [
        { name: "Emily White", rating: 5, comment: "The cultural experience was incredible! Each country had something unique to offer." },
        { name: "Chris Green", rating: 4, comment: "A good experience overall, but the schedule was a bit tight." }
      ]
    },
    {
      id: 3,
      name: "African Safari",
      images: [
        "https://images.unsplash.com/photo-1516426122078-c23e76319801",
        "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8",
        "https://images.unsplash.com/photo-1502082553048-f009c37129b9"
      ],
      price: "$4299",
      description: "Experience wildlife up close with this thrilling African safari.",
      details: "The African Safari takes you on an incredible journey through Kenya and Tanzania. Enjoy guided wildlife tours, luxury lodges, and the opportunity to see the Big Five in their natural habitats.",
      schedule: "8 Days, 7 Nights",
      highlights: ['Maasai Mara Safari', 'Serengeti National Park', 'Ngorongoro Crater'],
      rating: 4.9,
      reviews: [
        { name: "Sarah Black", rating: 5, comment: "Absolutely amazing! Seeing the animals in their natural environment was breathtaking." },
        { name: "Tom Blue", rating: 5, comment: "The guides were very knowledgeable and made sure we had a safe and memorable trip." }
      ]
    }
  ];

  // Tìm kiếm tour dựa vào tourId
  const tour = tours.find((tour) => tour.id === parseInt(tourId));

  // Đảm bảo gọi hook trước bất kỳ return nào
  const [selectedDates, setSelectedDates] = useState({ start: '', end: '' });
  const [travelers, setTravelers] = useState(1);

  if (!tour) {
    return <div>Tour not found!</div>;
  }

  const handleDateChange = (type, value) => {
    setSelectedDates((prev) => ({ ...prev, [type]: value }));
  };

  const handleTravelersChange = (e) => {
    setTravelers(parseInt(e.target.value));
  };

  const handleBooking = (e) => {
    e.preventDefault();
    alert(`Tour booked successfully for ${travelers} traveler(s) from ${selectedDates.start} to ${selectedDates.end}!`);
  };

  return (
    <div>
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-80 flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="z-10 text-center">
          <h1 className="text-4xl font-bold mb-4">{tour.name}</h1>
          <p className="text-lg">{tour.price}</p>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <Carousel showThumbs={true} dynamicHeight={true} infiniteLoop={true} autoPlay={true} interval={4000}>
            {tour.images.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`${tour.name} Image ${index + 1}`} />
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Tour Details Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Tour Information */}
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold mb-6">{tour.name}</h2>
              <p className="text-gray-700 mb-6">{tour.description}</p>
              <p className="text-gray-700 mb-6">{tour.details}</p>
              <div className="mb-6">
                <h4 className="text-xl font-bold mb-2">Schedule</h4>
                <p className="text-gray-700">{tour.schedule}</p>
              </div>
              <div className="mb-6">
                <h4 className="text-xl font-bold mb-2">Highlights</h4>
                <ul className="list-disc list-inside text-gray-700">
                  {tour.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-6">
                <h4 className="text-xl font-bold mb-2">Reviews ({tour.reviews.length})</h4>
                {tour.reviews.map((review, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex items-center mb-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700">"{review.comment}"</p>
                    <p className="font-semibold text-gray-800">- {review.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Section */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Book This Tour</h3>
              <form onSubmit={handleBooking}>
                <div className="mb-6">
                  <label className="block mb-2">Dates</label>
                  <div className="flex space-x-4">
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
                <div className="mb-6">
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
                <button className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300">
                  Book Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TourDetailPage;

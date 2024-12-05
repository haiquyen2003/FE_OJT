import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const HeroSection = () => {
  const [location, setDestination] = useState('');
  const [start_Date, setStartDate] = useState('');
  const [end_Date, setEndDate] = useState('');
  const [number_Of_People, setGuests] = useState('1');
  const [loading, setLoading] = useState(false);  // Để xử lý trạng thái loading
  const [error, setError] = useState(null); // Để xử lý lỗi nếu có
  const navigate = useNavigate(); // Khai báo useNavigate

  // const handleSearch = async (e) => {
  //   e.preventDefault();
    
  //   // Set trạng thái loading khi người dùng gửi form
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const response = await axios.post('https://localhost:7253/api/HotelService/search', {
  //       location,
  //       start_Date,
  //       end_Date,
  //       number_Of_People,
  //     });
  //     navigate('/search-results', { state: { searchResults: response.data } });
      
  //     // Xử lý dữ liệu từ phản hồi API
  //     console.log('Search Results:', response.data);
  //     // Bạn có thể làm gì đó với dữ liệu trả về từ API
  //   } catch (error) {
  //     console.error('Lỗi khi tìm kiếm khách sạn:', error);
  //     setError('Có lỗi xảy ra khi lấy dữ liệu. Vui lòng thử lại.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleSearch = (e) => {
    e.preventDefault();
    
    // Thiết lập trạng thái loading khi người dùng gửi form
    setLoading(true);
    setError(null);

    // Tạo tham số truy vấn
    const queryParams = new URLSearchParams({
      location,
      start_Date,
      end_Date,
      number_Of_People,
    }).toString();

    // Điều hướng tới trang kết quả tìm kiếm với tham số truy vấn
    navigate(`/search-results?${queryParams}`);
  };

  return (
    <section className="relative h-screen flex items-center justify-center text-white">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      <div className="z-10 text-center px-4 w-full max-w-6xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 animate-fade-in-down">
          Explore the World
        </h1>
        <p className="text-xl sm:text-2xl mb-8 animate-fade-in-up">
          Discover new adventures and create unforgettable memories
        </p>
        
        <form onSubmit={handleSearch} className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 mb-8 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <label htmlFor="destination" className="sr-only">Destination</label>
              <input
                id="destination"
                type="text"
                placeholder="Where would you like to go?"
                className="w-full p-3 rounded-md bg-white bg-opacity-20 border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-300 text-white"
                value={location}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="start-date" className="sr-only">Check-in Date</label>
              <input
                id="start-date"
                type="date"
                className="w-full p-3 rounded-md bg-white bg-opacity-20 border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                value={start_Date}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="end-date" className="sr-only">Check-out Date</label>
              <input
                id="end-date"
                type="date"
                className="w-full p-3 rounded-md bg-white bg-opacity-20 border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                value={end_Date}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="guests" className="sr-only">Number of Guests</label>
              <select
                id="guests"
                className="w-full p-3 rounded-md bg-white bg-opacity-20 border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                value={number_Of_People}
                onChange={(e) => setGuests(e.target.value)}
              >
                <option className=" bg-black bg-opacity-60" value="1">1 Guest</option>
                <option className=" bg-black bg-opacity-60" value="2">2 Guests</option>
                <option className=" bg-black bg-opacity-60" value="3">3 Guests</option>
                <option className=" bg-black bg-opacity-60" value="4">4+ Guests</option>
              </select>
            </div>
          </div>

          <button 
        type="submit"
        className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 mt-6 text-white font-bold py-3 px-8  rounded-full transition duration-300 transform hover:scale-105 animate-bounce"
        disabled={loading}>
           {loading ? 'Đang tìm kiếm...' : 'Tìm kiếm'}

        </button>
        {error && <p>{error}</p>}
        
          {/* <button 
            type="submit"
            className="w-full sm:w-auto mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105"
          >
            Search
          </button> */}
        </form>

        
      </div>
    </section>
  );
};

export default HeroSection;

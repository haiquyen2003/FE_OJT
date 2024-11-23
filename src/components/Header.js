import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; 
import { FaSearch, FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const userMenuRef = useRef(null);

  useEffect(() => {
    // Kiểm tra token trong localStorage để xác định trạng thái đăng nhập
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);  // Nếu token tồn tại, coi như đã đăng nhập

    // Đóng menu người dùng khi click ra bên ngoài
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      try {
        const response = await axios.get('https://localhost:7253/api/location/autocomplete', {
          params: { query }
        });
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    // Xóa token khỏi localStorage để đăng xuất
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    // Làm mới trang hoặc điều hướng đến trang chủ sau khi đăng xuất
    window.location.href = '/';
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">
          <Link to="/">Travel World</Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-800 hover:text-blue-600 focus:outline-none">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Links for Larger Screens */}
        <div className={`md:flex space-x-4 ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
          <Link to="/" className="text-gray-800 hover:text-blue-600">Home</Link>
          <Link to="/destinations" className="text-gray-800 hover:text-blue-600">Destinations</Link>
          <Link to="/book-now" className="text-gray-800 hover:text-blue-600">Book Now</Link>
          <Link to="/about-us" className="text-gray-800 hover:text-blue-600">About Us</Link>
          <Link to="/contact" className="text-gray-800 hover:text-blue-600">Contact</Link>
        </div>

        {/* Search and User Section */}
        <div className="relative flex items-center space-x-4">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search destinations"
              className="pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={searchQuery}
              onChange={handleSearch}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            {suggestions && suggestions.length > 0 && (
              <ul className="absolute top-full left-0 right-0 bg-white border rounded-md shadow-lg mt-1 z-10">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.place_id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => window.location.href = `/destinations/${suggestion.place_id}`}
                  >
                    {suggestion.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* User Icon or Sign In / Sign Up Links */}
          {isLoggedIn ? (
            <div className="relative" ref={userMenuRef}>
              <button 
                className="text-gray-800 hover:text-blue-600 focus:outline-none"
                onClick={toggleUserMenu}
              >
                <FaUserCircle size={28} />
              </button>
              {isUserMenuOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>
                    Logout
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <div className="hidden md:flex space-x-4">
              <Link to="/sign-in" className="text-gray-800 hover:text-blue-600">Sign In</Link>
              <Link to="/sign-up" className="text-gray-800 hover:text-blue-600">Sign Up</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;

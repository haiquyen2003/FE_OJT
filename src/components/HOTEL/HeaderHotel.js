import React, { useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';

export function HeaderHotel() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    // Xóa token khỏi localStorage và điều hướng đến trang đăng nhập
    localStorage.removeItem('token');
    navigate('/sign-in');
  };

  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-gray-100 shadow-md">
      {/* Logo and Search Input on the Left */}
      <div className="flex items-center gap-6">
        <h1 className="text-xl md:text-2xl font-bold">
          <span className="text-blue-400">Hotel</span>
          <span className="text-red-500">Admin</span>
        </h1>
        <div className="hidden sm:flex items-center gap-2">
          <svg className="h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-700 text-gray-100 p-2 rounded w-32 md:w-50 border border-gray-600"
          />
        </div>
      </div>

      {/* User Icon with Dropdown on the Right */}
      <div className="relative">
        <button onClick={toggleMenu} className="flex items-center gap-2 focus:outline-none">
          <svg className="h-6 w-6 md:h-8 md:w-8 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4z" />
            <path fillRule="evenodd" d="M4 20v-1c0-2.5 5-4 8-4s8 1.5 8 4v1H4z" />
          </svg>
          <h3 className="hidden sm:block font-bold text-gray-100">Admin User</h3>
          <svg className="h-4 w-4 md:h-5 md:w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-40 md:w-48 bg-gray-700 text-gray-100 shadow-md rounded z-50">            
            <Link to="/hotelmanager" className="block px-4 py-2 hover:bg-gray-600 w-full text-left">
            Dashboard
            </Link>
            <Link to="/HotelInfoManager" className="block px-4 py-2 hover:bg-gray-600 w-full text-left">
              Profile
            </Link>
            <button onClick={toggleMenu} className="block px-4 py-2 hover:bg-gray-600 w-full text-left">
              Settings
            </button>
            <button onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-600 w-full text-left">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default HeaderHotel;

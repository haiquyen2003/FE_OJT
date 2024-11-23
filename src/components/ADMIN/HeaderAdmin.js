import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function HeaderAdmin() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    // Xóa token khỏi localStorage và điều hướng đến trang đăng nhập
    localStorage.removeItem('token');
    navigate('/sign-in');
  };

  return (
    <header className="flex items-center justify-between p-4 bg-gray-50 text-gray-800 shadow-md">
      {/* Search Input on the Left */}
      <div className="flex items-center gap-6 ">
        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-50  p-2 rounded w-50"
        />
      </div>

      {/* User Icon with Dropdown on the Right */}
      <div className="relative">
        <button onClick={toggleMenu} className="flex items-center gap-2 focus:outline-none">
          <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4z" />
            <path fillRule="evenodd" d="M4 20v-1c0-2.5 5-4 8-4s8 1.5 8 4v1H4z" />
          </svg>
          <h3 className="font-bold">Hải Quyến</h3>
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-blue-900 shadow-md rounded">
            <button onClick={toggleMenu} className="block px-4 py-2 hover:bg-blue-100 w-full text-left">
              Profile
            </button>
            <button onClick={toggleMenu} className="block px-4 py-2 hover:bg-blue-100 w-full text-left">
              Settings
            </button>
            <button onClick={handleLogout} className="block px-4 py-2 hover:bg-blue-100 w-full text-left">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default HeaderAdmin;

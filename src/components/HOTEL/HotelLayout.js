// components/HOTEL/AdminLayout.js
import React from 'react';
import SidebarHotel from './SidebarHotel';
import HeaderHotel from './HeaderHotel';

const HotelLayout = ({ children, isMobile, isDrawerOpen, toggleDrawer }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-900">
      {/* Sidebar */}
      {isMobile && (
        <button
          onClick={toggleDrawer}
          className="fixed top-4 left-4 z-50 bg-blue-500 text-white p-2 rounded-full"
        >
          {isDrawerOpen ? (
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      )}

      <div className={`fixed inset-y-0 left-0 bg-blue-50 w-64 shadow-lg transition-transform transform ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <SidebarHotel isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      </div>

      {/* Main Content */}
      
      <div className={`flex-1 transition-all duration-300 ease-in-out ${isDrawerOpen ? 'ml-64' : 'ml-0'} md:ml-64 overflow-y-auto`}>
        <div className="sticky top-0 z-10 bg-white shadow-md">
          <HeaderHotel toggleDrawer={toggleDrawer} />
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default HotelLayout;

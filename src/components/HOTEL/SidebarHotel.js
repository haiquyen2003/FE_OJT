import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import {
  FaCalendarAlt,
  FaHome,
  FaChartBar,
  FaUser,
  FaMoneyBillWave,
  FaHeadset,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

export function SidebarHotel() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(0);

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
      setIsDrawerOpen(true);
    } else {
      setIsMobile(false);
      setIsDrawerOpen(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <div className="relative">
      <div
        className={`fixed inset-y-0 left-0 z-40 bg-gray-900 p-4 w-64 shadow-lg transition-transform duration-300 ease-in-out transform ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block`}
      >
        <div className="h-full w-full p-4 bg-gray-800 shadow-md">
          <div className="mb-2 flex items-center p-4">
            <h1 className="text-2xl font-bold">
              <span className="text-gray-200">Dash</span>
              <span className="text-red-600">Admin</span>
            </h1>
          </div>

          <div className="mt-4">
            {/* Mục Bookings */}
            <div>
              <button
                onClick={() => handleOpen(1)}
                className="w-full flex items-center justify-between p-3 text-gray-200 border-b border-gray-700"
              >
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="h-5 w-5" />
                  <span>Bookings</span>
                </div>
              </button>
              {open === 1 && (
                <div className="pl-6">
                  <Link
                    to="/RoomBookingOverview"
                    onClick={() => handleOpen(1)}
                    className="block w-full text-left p-2 text-gray-200"
                  >
                    All Booking
                  </Link>
                  <button className="block w-full text-left p-2 text-gray-200">Add Booking</button>
                  <button className="block w-full text-left p-2 text-gray-200">Edit Booking</button>
                </div>
              )}
            </div>

            {/* Mục Room */}
            <div>
              <button
                onClick={() => handleOpen(2)}
                className="w-full flex items-center justify-between p-3 text-gray-200 border-b border-gray-700"
              >
                <div className="flex items-center gap-2">
                  <FaHome className="h-5 w-5" />
                  <span>Room</span>
                </div>
              </button>
              {open === 2 && (
                <div className="pl-6">
                  <Link
                    to="/roomlist"
                    onClick={() => handleOpen(2)}
                    className="block w-full text-left p-2 text-gray-200"
                  >
                    List Room 
                  </Link>
                  <Link
                    to="/roomtype"
                    onClick={() => handleOpen(2)}
                    className="block w-full text-left p-2 text-gray-200"
                  >
                    Room Types
                  </Link>
                  <Link
                    to="/roomoverview"
                    onClick={() => handleOpen(2)}
                    className="block w-full text-left p-2 text-gray-200"
                  >
                    Room Overview
                  </Link>
                  <Link
                    to="/AmenitiesManagement"
                    onClick={() => handleOpen(2)}
                    className="block w-full text-left p-2 text-gray-200"
                  >
                    Amenitie
                  </Link>
                </div>
              )}
            </div>

            {/* Mục Reports */}
            <div>
              <button
                onClick={() => handleOpen(3)}
                className="w-full flex items-center justify-between p-3 text-gray-200 border-b border-gray-700"
              >
                <div className="flex items-center gap-2">
                  <FaChartBar className="h-5 w-5" />
                  <span>Reports</span>
                </div>
              </button>
              {open === 3 && (
                <div className="pl-6">
                   <Link
                    to="/PromotionManagement"
                    onClick={() => handleOpen(3)}
                    className="block w-full text-left p-2 text-gray-200"
                  >
                    PromotionManagement
                  </Link>
                  <button className="block w-full text-left p-2 text-gray-200">Expenses</button>
                  <button className="block w-full text-left p-2 text-gray-200">Booking</button>
                </div>
              )}
            </div>

            {/* Mục Customers */}
            <button className="w-full flex items-center gap-2 p-3 text-gray-200 border-b border-gray-700">
              <FaUser className="h-5 w-5" />
              Customers
            </button>

            {/* Mục Payment */}
            <button className="w-full flex items-center gap-2 p-3 text-gray-200 border-b border-gray-700">
            <Link to="/WalletHotel" className="flex items-center gap-2">
    <FaMoneyBillWave className="h-5 w-5" />
    Payment
  </Link>
            </button>

            {/* Mục Support */}
            <button className="w-full flex items-center gap-2 p-3 text-gray-200 border-b border-gray-700">
              <FaHeadset className="h-5 w-5" />
              Support
            </button>

            {/* Mục Settings */}
            <button className="w-full flex items-center gap-2 p-3 text-gray-200 border-b border-gray-700">
              <FaCog className="h-5 w-5" />
              Settings
            </button>

            {/* Mục Log Out */}
            <button className="w-full flex items-center gap-2 p-3 text-gray-200 border-b border-gray-700">
              <FaSignOutAlt className="h-5 w-5" />
              Log Out
            </button>
          </div>
        </div>
      </div>

      {isMobile && isDrawerOpen && (
        <div className="fixed inset-0 bg-black opacity-50"></div>
      )}
    </div>
  );
}

export default SidebarHotel;

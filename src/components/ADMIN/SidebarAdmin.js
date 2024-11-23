import React, { useState, useEffect } from "react";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaInbox,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

export function SidebarWithBurgerMenu() {
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
        className={`fixed inset-y-0 left-0 z-40 bg-blue-50 p-4 w-64 shadow-lg transition-transform duration-300 ease-in-out transform ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block`}
      >
        <div className="h-full w-full p-4 bg-white shadow-md">
          <div className="mb-2 flex items-center p-4">
            <h1 className="text-2xl font-bold">
              <span className="text-blue-500">Travel</span>
              <span className="text-red-600">World</span>
            </h1>
          </div>

          <div className="mt-4">
            {/* Mục Dashboard */}
            <div>
              <button
                onClick={() => handleOpen(1)}
                className="w-full flex items-center justify-between p-3 text-blue-500 border-b"
              >
                <div className="flex items-center gap-2">
                  <FaTachometerAlt className="h-5 w-5" />
                  <span>Dashboard</span>
                </div>
              </button>
              {open === 1 && (
                <div className="pl-6">
                  <button className="block w-full text-left p-2 text-blue-500">Analytics</button>
                  <button className="block w-full text-left p-2 text-blue-500">Reporting</button>
                  <button className="block w-full text-left p-2 text-blue-500">Projects</button>
                </div>
              )}
            </div>

            {/* Mục E-Commerce */}
            <div>
              <button
                onClick={() => handleOpen(2)}
                className="w-full flex items-center justify-between p-3 text-blue-500 border-b"
              >
                <div className="flex items-center gap-2">
                  <FaBoxOpen className="h-5 w-5" />
                  <span>E-Commerce</span>
                </div>
              </button>
              {open === 2 && (
                <div className="pl-6">
                  <button className="block w-full text-left p-2 text-blue-500">Orders</button>
                  <button className="block w-full text-left p-2 text-blue-500">Products</button>
                </div>
              )}
            </div>

            <hr className="my-2 border-blue-200" />

            {/* Inbox */}
            <button className="w-full flex items-center gap-2 p-3 text-blue-500 border-b">
              <FaInbox className="h-5 w-5" />
              Inbox
              <span className="ml-auto bg-blue-500 text-white text-xs rounded-full px-2">14</span>
            </button>

            {/* Profile */}
            <button className="w-full flex items-center gap-2 p-3 text-blue-500 border-b">
              <FaUser className="h-5 w-5" />
              Profile
            </button>

            {/* Settings */}
            <button className="w-full flex items-center gap-2 p-3 text-blue-500 border-b">
              <FaCog className="h-5 w-5" />
              Settings
            </button>

            {/* Log Out */}
            <button className="w-full flex items-center gap-2 p-3 text-blue-500 border-b">
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

export default SidebarWithBurgerMenu;

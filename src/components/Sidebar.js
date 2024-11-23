import React, { useState } from 'react';
import { FaHome, FaPlane, FaUserCircle, FaSignOutAlt, FaWallet, FaBars } from 'react-icons/fa'; // Import FaWallet and FaBars
import { Link, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group'; // Import for smooth transitions

const Sidebar = ({ activeItem, setActiveItem }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const handleItemClick = (path) => {
    setActiveItem(path);  
    setIsSidebarOpen(true); // Close sidebar after clicking
    window.scrollTo(0, 0); // Scroll to top when navigating
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <>
      <style>{`
        .fade-enter {
          opacity: 0;
        }
        .fade-enter-active {
          opacity: 1;
          transition: opacity 300ms;
        }
        .fade-exit {
          opacity: 1;
        }
        .fade-exit-active {
          opacity: 0;
          transition: opacity 300ms;
        }
      `}</style>
      {/* Hamburger Icon for Mobile and Large Screens */}
      <div className="fixed top-4 left-4 z-50">
        <button onClick={toggleSidebar} className="text-slate-600 p-2 rounded-full">
          <FaBars size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <CSSTransition
        in={isSidebarOpen}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <div
          className={`fixed top-16 left-0 h-full w-64 bg-slate-100 transform transition-transform duration-300 ease-in-out z-40 pt-16 md:pt-0 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0`}
        >
          <div className="p-4 text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5l1.125-3.375L7.5 14.25 2.25 12l1.5-1.875 2.25-.375 2.25-7.875L12 3l1.125 6.75L18.75 9l1.5 1.875L12 13.875l1.125 3.75-1.125.375z" />
            </svg>
            <h1 className="text-2xl font-bold">
              <span className="text-blue-500">Travel</span>
              <span className="text-red-600">World</span>
            </h1>
          </div>
          <nav className="mt-10">
            <ul className="space-y-6 list-none p-3 m-0">
              <li>
                <Link
                  to="/"
                  onClick={() => handleItemClick('/')}
                  className={`flex items-center p-3 rounded-md transition duration-300 text-slate-500 hover:bg-blue-100  ${
                    activeItem === '/' ? 'bg-blue-600 text-white' : ''
                  }`}
                >
                  <FaHome className={`mr-3 ${activeItem === '/' ? 'text-white' : ''}`} />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/destinations"
                  onClick={() => handleItemClick('/destinations')}
                  className={`flex items-center p-3 rounded-md transition duration-300 text-slate-500 hover:bg-blue-100  ${
                    activeItem === '/destinations' ? 'bg-blue-400 text-white ' : ''
                  }`}
                >
                  <FaPlane className={`mr-3 ${activeItem === '/destinations' ? 'text-white' : ''}`} />
                  Destinations
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  onClick={() => handleItemClick('/profile')}
                  className={`flex items-center p-3 rounded-md transition duration-300 text-slate-500 hover:bg-blue-100   ${
                    activeItem === '/profile' ? 'bg-blue-400 text-white ' : ''
                  }`}
                >
                  <FaUserCircle className={`mr-3 ${activeItem === '/profile' ? 'text-white' : ''}`} />
                  Profile
                </Link>
              </li>
              {/* Mục Ví tiền mới thêm */}
              <li>
                <Link
                  to="/wallet"
                  onClick={() => handleItemClick('/wallet')}
                  className={`flex items-center p-3 rounded-md transition duration-300 text-slate-500 hover:bg-blue-100   ${
                    activeItem === '/wallet' ? 'bg-blue-400 text-white ' : ''
                  }`}
                >
                  <FaWallet className={`mr-3 ${activeItem === '/wallet' ? 'text-white' : ''}`} />
                  Wallet
                </Link>
              </li>
              <li>
                <button className="flex items-center text-slate-500 hover:bg-blue-100  p-3 rounded-md w-full text-left transition duration-300">
                  <FaSignOutAlt className="mr-3" />
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </CSSTransition>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;

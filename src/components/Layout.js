import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children, activeItem }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      <div className="flex">
        {/* Sidebar */}
        <div className="flex-none h-screen">
          <Sidebar activeItem={activeItem} setActiveItem={() => {}} />
        </div>

        {/* Main Content */}
        <div className="flex-grow p-8 bg-gray-100 mt-16 ml-64" style={{ minHeight: 'calc(100vh - 4rem)' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;

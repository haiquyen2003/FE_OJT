import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCompass } from 'react-icons/fa';

const PageNotFound = () => {
  return (
    <motion.div
      className="h-screen flex"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-blue-900 text-white px-8 py-16">
        <div className="w-full max-w-md">
          <div className="text-left mb-6">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5l1.125-3.375L7.5 14.25 2.25 12l1.5-1.875 2.25-.375 2.25-7.875L12 3l1.125 6.75L18.75 9l1.5 1.875L12 13.875l1.125 3.75-1.125.375z"
                />
              </svg>
              <h1 className="text-2xl font-bold">
                <span className="text-blue-500">Travel</span>
                <span className="text-red-600">World</span>
              </h1>
            </Link>
          </div>

          <h2 className="text-6xl font-bold mb-4">404</h2>
          <h3 className="text-3xl font-semibold mb-6">Page Not Found</h3>
          <p className="mb-8 text-lg">
            Oops! It seems you've wandered off the beaten path. The page you're looking for doesn't exist or has been moved.
          </p>

          <Link
            to="/"
            className="flex items-center justify-center w-full py-3 rounded-full transition duration-300 mb-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold hover:shadow-lg transform hover:-translate-y-1 hover:scale-105"
          >
            <FaCompass className="mr-2" />
            Back to Home
          </Link>

          <div className="text-center mt-6">
            <p className="text-sm">
              Need help? <Link to="/contact" className="underline hover:text-orange-400">Contact us</Link>
            </p>
          </div>
        </div>
      </div>

      <div
        className="hidden md:block md:w-1/2 h-full relative bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500835556837-99ac94a94552?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-6">
          <h2 className="text-7xl font-bold mb-12">Lost Your Way?</h2>
          <p className="text-lg text-zinc-300">Don't worry, even the best travelers</p>
          <p className="text-lg text-zinc-300">sometimes take an unexpected detour.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default PageNotFound;


import React, { useState, useEffect } from 'react';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthAPI from '../services/api';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const resetToken = searchParams.get('token');
    const userEmail = searchParams.get('email');
    if (resetToken && userEmail) {
      // Giải mã token và email
      setToken(decodeURIComponent(resetToken));
      setEmail(decodeURIComponent(userEmail));
    } else {
      setMessage('Invalid or missing reset token.');
      setIsError(true);
    }
  }, [location]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      setIsError(true);
      return;
    }
    try {
      await AuthAPI.resetPassword(token, password, confirmPassword, email);
      setMessage('Password reset successful. You can now log in with your new password.');
      setIsError(false);
      setTimeout(() => navigate('/sign-in'), 3000);
    } catch (error) {
      console.error('Password reset failed:', error);
      const errorMessage = error.response?.data?.message || 'Failed to reset password. Please try again or request a new reset link.';
      setMessage(errorMessage);
      setIsError(true);
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <motion.div
      className="h-screen flex"
      initial={{ opacity: 0, x: -200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
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

          <h2 className="text-4xl font-bold mb-4">Reset Your Password</h2>
          <p className="mb-8">Enter your new password below:</p>

          {message && (
            <p className={`mb-4 ${isError ? 'text-red-500' : 'text-green-500'}`}>
              {message}
            </p>
          )}

          <form onSubmit={handleResetPassword}>
            <div className="mb-4 relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New Password"
                className="w-full pl-10 pr-10 py-3 bg-blue-800 text-white border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('password')}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="mb-6 relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm New Password"
                className="w-full pl-10 pr-10 py-3 bg-blue-800 text-white border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirmPassword')}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button
              type="submit"
              className="flex items-center justify-center w-full py-3 rounded-full transition duration-300 mb-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold hover:shadow-lg transform hover:-translate-y-1 hover:scale-105"
            >
              Reset Password
            </button>
          </form>
          <div className="text-center">
            <Link to="/sign-in" className="text-sm hover:underline">
              Back to Login
            </Link>
          </div>
        </div>
      </div>

      <div
        className="hidden md:block md:w-1/2 h-full relative bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-6">
          <h2 className="text-7xl font-bold mb-12">New Beginnings</h2>
          <p className="text-lg text-zinc-300">Reset your password and continue</p>
          <p className="text-lg text-zinc-300">your journey with Travel World.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ResetPasswordPage;
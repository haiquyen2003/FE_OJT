import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaLock, FaUser, FaGoogle, FaFacebook } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthAPI from '../services/api';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthAPI.register(name, email, password);
      console.log('Registration response:', response);
      setRegistrationStatus('success');
      setErrorMessage('');
    } catch (error) {
      console.error('Registration failed:', error);
      setRegistrationStatus('error');
      setErrorMessage('Registration failed. Please try again.');
    }
  };

  // Handle Google registration button click
  const handleGoogleRegister = () => {
    window.location.href = "https://localhost:7253/api/Account/login/Google";
  };

  // Handle Facebook registration button click
  const handleFacebookRegister = () => {
    window.location.href = "https://localhost:7253/api/Account/login/Facebook";
  };

  // After Google or Facebook login, process the response
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const email = params.get('email');
    const roles = params.get('roles');

    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
      localStorage.setItem('roles', roles);

      window.history.replaceState({}, document.title, window.location.pathname);

      if (roles && roles.includes('admin')) {
        navigate('/admin/dashboard');
      } else if (roles && roles.includes('user')) {
        navigate('/user/home');
      } else {
        navigate('/');
      }
    }
  }, [navigate]);

  return (
    <motion.div
      className="h-screen flex"
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -200 }}
      transition={{ duration: 0.5 }}
    >
      {/* Image Section - Left side with added text */}
      <div
        className="hidden md:block md:w-1/2 h-full relative bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-6">
          <h2 className="text-7xl font-bold mb-12">Welcome Back!</h2>
          <p className="text-lg text-zinc-300">To keep connected with us please</p>
          <p className="text-lg text-zinc-300">Login with your personal info</p>
          <div className="mt-2 px-6 py-2 border-2 border-white text-zinc-100 rounded-full focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg" >
            <Link to="/sign-in" className="text-2xl">
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Register Form Section - Right side */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-blue-900 text-white px-8 py-16">
        <div className="w-full max-w-md">
          <div className="text-left mb-6">
            <Link to="/">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5l1.125-3.375L7.5 14.25 2.25 12l1.5-1.875 2.25-.375 2.25-7.875L12 3l1.125 6.75L18.75 9l1.5 1.875L12 13.875l1.125 3.75-1.125.375z" />
              </svg>
              <h1 className="text-2xl font-bold">
                <span className="text-blue-500">Travel</span>
                <span className="text-red-600">World</span>
              </h1>
            </Link>
          </div>
          <h2 className="text-4xl font-bold mb-4">Create Your Account!</h2>
          <p>Welcome back! Select method to register:</p>
          {/* Register with Google and Facebook */}
          <div className="flex flex-row space-x-4 mb-6 mt-6 justify-center">
            <button
              className="flex items-center justify-center w-1/3 py-3 rounded-full transition duration-300 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold hover:shadow-lg transform hover:-translate-y-1 hover:scale-105"
              onClick={handleGoogleRegister}
            >
              <FaGoogle className="mr-2" /> Google
            </button>
            <button
              className="flex items-center justify-center w-1/3 py-3 rounded-full transition duration-300 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold hover:shadow-lg transform hover:-translate-y-1 hover:scale-105"
              onClick={handleFacebookRegister}
            >
              <FaFacebook className="mr-2" /> Facebook
            </button>
          </div>
          <div className="flex items-center mb-3">
            <div className="flex-grow border-t border-stone-300"></div>
            <p className="mx-4 text-stone-300">or continue with email</p>
            <div className="flex-grow border-t border-stone-300"></div>
          </div>
          {errorMessage && <p className="mb-4 text-red-500">{errorMessage}</p>}
          {registrationStatus === 'success' ? (
            <div className="mb-4 text-green-500">
              Registration successful! Please check your email to verify your account.
            </div>
          ) : (
            <form onSubmit={handleRegister}>
              <div className="mb-4 relative">
                <FaUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full pl-10 pr-4 py-3 bg-blue-800 text-white border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="mb-4 relative">
                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full pl-10 pr-4 py-3 bg-blue-800 text-white border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="mb-4 relative">
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-3 bg-blue-800 text-white border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center w-full py-3 rounded-full transition duration-300 mb-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold hover:shadow-lg transform hover:-translate-y-1 hover:scale-105"
              >
                Register
              </button>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default RegisterPage;


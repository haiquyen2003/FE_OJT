import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaLock, FaGoogle, FaFacebook } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthAPI from '../services/api';
import { jwtDecode } from 'jwt-decode';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthAPI.login(email, password);
      
      // Kiểm tra response có token hay không
      if (!response.token) {
        setErrorMessage('Login failed. Invalid credentials.');
        return;
      }
  
      const token = response.token;
      localStorage.setItem('token', token);
  
      // Giải mã token để lấy thông tin roles
      const decodedToken = jwtDecode(token);
      console.log('Decoded Token:', decodedToken);
  
      // Lấy thông tin role từ decoded token
      const roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  
      if (roles) {
        if (roles === 'Admin') {
          navigate('/dashboard');
        } else if (roles === 'User') {
          navigate('/profile');
        } else if (roles === 'Hotel') {
          navigate('/Hotelmanager');
        } else {
          navigate('/');
        }
      } else {
        setErrorMessage('Invalid user roles.');
      }      
    } catch (error) {
      console.error('Login failed:', error);
      // Kiểm tra response status và hiển thị thông báo lỗi phù hợp
      if (error.response) {
        switch (error.response.status) {
          case 400:
            setErrorMessage('Invalid email or password.');
            break;
          case 401:
            setErrorMessage('Invalid credentials.');
            break;
          case 404:
            setErrorMessage('Account not found.');
            break;
          default:
            setErrorMessage('Login failed. Please try again later.');
        }
      } else {
        setErrorMessage('Network error. Please check your connection.');
      }
    }
  };
  

  // Handle Google login button click
  const handleGoogleLogin = () => {
    // Điều hướng tới Google login endpoint
    window.location.href = 'https://localhost:7253/api/Account/login/Google';
  };

  // Handle Facebook login button click
  const handleFacebookLogin = () => {
    // Điều hướng tới Facebook login endpoint
    window.location.href = 'https://localhost:7253/api/Account/login/Facebook';
  };

  // After Google or Facebook login, process the response
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const email = params.get('email');
    const roles = params.get('roles');
  
    if (token) {
      // Save token and user details in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
      localStorage.setItem('roles', roles);
  
      // Clear query parameters from URL after processing
      window.history.replaceState({}, document.title, window.location.pathname);
  
      // Redirect to appropriate page based on roles
      let parsedRoles = [];
      try {
        parsedRoles = roles ? JSON.parse(roles) : [];
      } catch (e) {
        console.error('Error parsing roles:', e);
      }
  
      if (parsedRoles && Array.isArray(parsedRoles)) {
        if (parsedRoles.includes('Admin')) {
          navigate('/dashboard');
        } else if (parsedRoles.includes('User')) {
          navigate('/profile');
        } else if (parsedRoles.includes('Hotel')) {
          navigate('/Hotelmanager');
        } else {
          setErrorMessage('Invalid user roles.');
        }
      } else {
        setErrorMessage('Invalid user roles.');
      }
    }
  }, [navigate]);
  

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

          <h2 className="text-4xl font-bold mb-4">Sign in to Travel World</h2>
          <p className="mb-8">Welcome back! Select a method to log in:</p>
          <div className="flex flex-row space-x-4 mb-6 mt-6 justify-center">
            <button
              className="flex items-center justify-center w-1/3 py-3 rounded-full transition duration-300 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold hover:shadow-lg transform hover:-translate-y-1 hover:scale-105"
              onClick={handleGoogleLogin}
            >
              <FaGoogle className="mr-2" /> Google
            </button>
            <button
              className="flex items-center justify-center w-1/3 py-3 rounded-full transition duration-300 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold hover:shadow-lg transform hover:-translate-y-1 hover:scale-105"
              onClick={handleFacebookLogin}
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
          <form onSubmit={handleLogin}>
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
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input type="checkbox" id="remember-me" className="mr-2" />
                <label htmlFor="remember-me" className="text-sm">Remember me</label>
              </div>
              <Link to="/ForgotPassword" className="text-sm hover:underline">
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="flex items-center justify-center w-full py-3 rounded-full transition duration-300 mb-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold hover:shadow-lg transform hover:-translate-y-1 hover:scale-105"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      <div
        className="hidden md:block md:w-1/2 h-full relative bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-6">
          <h2 className="text-7xl font-bold mb-12">Hello, Friend!</h2>
          <p className="text-lg text-zinc-300">Enter your personal details</p>
          <p className="text-lg text-zinc-300">and start your journey with us</p>
          <div className="mt-2 px-6 py-2 border-2 border-white text-zinc-100 rounded-full focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
            <Link to="/sign-up" className="text-2xl">
              Register
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import HomePage from './pages/HomePage';
import BookNowPage from './pages/BookNowPage';
import TourDetailPage from './pages/TourDetailPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import WalletManagementPage from './pages/WalletmanagerPage';
import Dashboard from './pages/AdminPage/Dashboard';  
import DashboardHotel from './pages/HotelPage/DashBoardHotel';
import RoomType from './pages/HotelPage/RoomType';
import RoomList from './pages/HotelPage/RoomList';
import RoomOverview from './pages/HotelPage/RoomOverView';
import HotelInfoManager from './pages/HotelPage/HotelInfoManager';
import AmenitiesManagement from './pages/HotelPage/AmenitiesManagement';
import EnhancedWalletPage from './pages/HotelPage/EnhancedWalletPage';
import RoomBookingOverview from './pages/HotelPage/RoomBookingOverview';
import PromotionManagement from './pages/HotelPage/PromotionManagement';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import PageNotFound from './pages/PageNotFound';
import ResetPasswordPage from './pages/ResetPasswordPage';
import DestinationsPage from './pages/destinations';
import SearchResultsPage from './pages/HomepageSestion/SearchResultsPage';
import HotelDetailPage from './pages/HotelPage/HotelDetailPage';
import BookingForm from './pages/HotelPage/HotelDetaiComponent/BookingForm';
import BookingPage from './pages/BookingPage';
import UserBookings from './pages/UserBookings';

// PrivateRoute component to protect specific routes based on roles
const PrivateRoute = ({ element: Component, roles, ...rest }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    // If no token is found, redirect to login page
    return <Navigate to="/sign-in" />;
  }

  let userRole = null;
  try {
    const decodedToken = jwtDecode(token);
    userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']; 
    
    // Kiểm tra nếu vai trò là một mảng
    if (Array.isArray(userRole)) {
      if (!userRole.some((role) => roles.includes(role))) {
        return <Navigate to="/" />; // Không có vai trò phù hợp
      }
    } else {
      // Nếu vai trò là chuỗi
      if (!roles.includes(userRole)) {
        return <Navigate to="/" />;
      }
    }

  } catch (error) {
    // If the token is invalid, redirect to login
    return <Navigate to="/sign-in" />;
  }

  // Nếu tất cả điều kiện đều hợp lệ
  return <Component {...rest} />;
};


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}

        <Route path="/" element={<HomePage />} />
        <Route path="/search-results" element={<SearchResultsPage />} />
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/sign-up" element={<RegisterPage />} />
        <Route path="/ForgotPassword" element={<ForgotPasswordPage/>} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/book-now" element={<BookNowPage />} />
        <Route path="/tours/:tourId" element={<TourDetailPage />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/resetpass" element={<ResetPasswordPage />} />
        <Route path="/hotel/:serviceId" element={<HotelDetailPage />} />
        <Route path="/booking" element={<BookingPage />} />
        {/* Protected Routes for USER role */}
        <Route
          path="/profile"
          element={<PrivateRoute roles={['User', 'Admin']} element={ProfilePage} />}
        />
        <Route
          path="/UserBooking"
          element={<PrivateRoute roles={['User', 'Admin']} element={UserBookings} />}
        />
        <Route
          path="/wallet"
          element={<PrivateRoute roles={['User', 'Admin']} element={WalletManagementPage} />}
        />

        {/* Protected Routes for ADMIN role */}
        <Route
          path="/dashboard"
          element={<PrivateRoute roles={['Admin']} element={Dashboard} />}
        />

        {/* Protected Routes for HOTEL role */}
        <Route
          path="/Hotelmanager"
          element={<PrivateRoute roles={['Hotel']} element={DashboardHotel} />}
        />
        <Route
          path="/roomtype"
          element={<PrivateRoute roles={['Hotel']} element={RoomType} />}
        />
        <Route
          path="/roomlist"
          element={<PrivateRoute roles={['Hotel']} element={RoomList} />}
        />
        <Route
          path="/roomoverview"
          element={<PrivateRoute roles={['Hotel']} element={RoomOverview} />}
        />
        <Route
          path="/HotelInfoManager"
          element={<PrivateRoute roles={['Hotel']} element={HotelInfoManager} />}
        />
        <Route
          path="/AmenitiesManagement"
          element={<PrivateRoute roles={['Hotel']} element={AmenitiesManagement} />}
        />
        <Route
          path="/RoomBookingOverview"
          element={<PrivateRoute roles={['Hotel']} element={RoomBookingOverview} />}
        />
        <Route
          path="/PromotionManagement"
          element={<PrivateRoute roles={['Hotel']} element={PromotionManagement} />}
        />
        <Route
          path="/WalletHotel"
          element={<PrivateRoute roles={['Hotel']} element={EnhancedWalletPage} />}
        />

        {/* 404 Page Not Found Route */}
        <Route path="*" 
        element={<PageNotFound/>}
        />
      </Routes>
    </Router>
  );
}

export default App;

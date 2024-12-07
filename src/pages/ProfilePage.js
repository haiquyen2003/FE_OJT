import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { FaUserCircle } from 'react-icons/fa';

// Helper function to decode the JWT token and extract UserId from claims
const getUserIdFromToken = (token) => {
  if (!token) return null;
  
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  const decoded = JSON.parse(window.atob(base64));
  
  // Assuming 'UserID' is the key in the claims, update it if necessary
  return decoded.UserID;
};

const ProfilePage = () => {
  const [editingField, setEditingField] = useState(null);
  const [fieldValue, setFieldValue] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  // Get the token from localStorage
  const token = localStorage.getItem('token');

  // Fetch user information from API
  const fetchUserInfo = async () => {
    if (!token) {
      console.error('No token available!');
      return;
    }

    try {
      const response = await fetch('https://localhost:7253/api/User/UserInfor', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error fetching user info');
      }

      const data = await response.json();
      setUserInfo(data); // Set user data in state
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchUserInfo(); // Fetch user info when component mounts
  }, []);

  const handleEditClick = (field, currentValue) => {
    setEditingField(field);
    setFieldValue(currentValue);
  };

  const handleSave = async () => {
    if (!token) {
      console.error('No token available!');
      return;
    }

    const userId = getUserIdFromToken(token); // Get UserId from token

    if (!userId) {
      console.error('User ID not found in token!');
      return;
    }

    try {
      const response = await fetch('https://localhost:7253/api/User/update-field', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          Field: editingField,
          Value: fieldValue,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user information');
      }

      const data = await response.json();
      console.log('User information updated', data);
      setEditingField(null); // Close the edit form after saving
    } catch (error) {
      console.error('Error saving the field:', error);
    }
  };

  const handleCancel = () => {
    setEditingField(null); // Close the edit form without saving
  };

  const renderEditableField = (fieldName, label, currentValue) => {
    return editingField === fieldName ? (
      <div className="flex flex-col border-b pb-4">
        <label className="text-gray-600 font-bold mb-2">{label} *</label>
        <input
          type="text"
          value={fieldValue}
          onChange={(e) => setFieldValue(e.target.value)}
          className="border rounded-lg p-4 focus:outline-none focus:border-blue-600"
        />
        <div className="flex justify-end mt-4 space-x-6">
          <button onClick={handleCancel} className="text-blue-700 hover:underline text-lg">Cancel</button>
          <button onClick={handleSave} className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg transition duration-300 text-lg">Save</button>
        </div>
      </div>
    ) : (
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <p className="text-gray-600 text-lg font-semibold">{label}</p>
          <p className="text-xl font-bold text-gray-900">{currentValue}</p>
        </div>
        <button onClick={() => handleEditClick(fieldName, currentValue)} className="text-blue-700 hover:underline text-lg">Edit</button>
      </div>
    );
  };

  if (!userInfo) return <div>Loading...</div>;

  return (
    <Layout activeItem="/profile">
      <div className="container mx-auto h-full">
        <h1 className="text-4xl font-bold text-blue-800 mb-10">Personal Information</h1>

        <div className="bg-white shadow-lg rounded-xl p-10 h-full">
          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10">
              <div className="flex items-center space-x-6">
                <FaUserCircle className="text-7xl text-blue-500" />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{userInfo.userName}</h2>
                  <p className="text-lg text-gray-700">{userInfo.email} <span className="text-green-600 font-semibold">Verified</span></p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {renderEditableField('Display Name', 'Display Name', userInfo.userName || 'Choose display name')}
              {renderEditableField('Email Address', 'Email Address', userInfo.email || 'vanhaiquyen@gmail.com')}
              {renderEditableField('Phone Number', 'Phone Number', userInfo.phoneNumber || 'Add your phone number')}
              {renderEditableField('Date of Birth', 'Date of Birth', userInfo.dateOfBirth || 'Enter your date of birth')}
              {renderEditableField('Nationality', 'Nationality', userInfo.nationality || 'Select your country/region')}
              {renderEditableField('Gender', 'Gender', userInfo.gender || 'Select gender')}
              {renderEditableField('Address', 'Address', userInfo.address || 'Enter address')}
              {renderEditableField('Passport Information', 'Passport Information', userInfo.passportInformation || 'Not provided')}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;

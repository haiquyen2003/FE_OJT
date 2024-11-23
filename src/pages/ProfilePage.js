import React, { useState } from 'react';
import Layout from '../components/Layout';
import { FaUserCircle } from 'react-icons/fa';

const ProfilePage = () => {
  const [editingField, setEditingField] = useState(null);
  const [fieldValue, setFieldValue] = useState('');

  const handleEditClick = (field, currentValue) => {
    setEditingField(field);
    setFieldValue(currentValue);
  };

  const handleSave = () => {
    // Save logic here
    setEditingField(null);
  };

  const handleCancel = () => {
    setEditingField(null);
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

  return (
    <Layout activeItem="/profile">
      <div className="container mx-auto h-full">
        <h1 className="text-4xl font-bold text-blue-800 mb-10">Personal Information</h1>

        <div className="bg-white shadow-lg rounded-xl p-10 h-full">
          {/* Personal Information Section */}
          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10">
              <div className="flex items-center space-x-6">
                <FaUserCircle className="text-7xl text-blue-500" />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Hai Quyen</h2>
                  <p className="text-lg text-gray-700">vanhaiquyen@gmail.com <span className="text-green-600 font-semibold">Verified</span></p>
                </div>
              </div>
            </div>

            {/* Profile Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {renderEditableField('Display Name', 'Display Name', 'Choose display name')}
              {renderEditableField('Name', 'Name', 'Hai Quyen')}
              {renderEditableField('Email Address', 'Email Address', 'vanhaiquyen@gmail.com')}
              {renderEditableField('Phone Number', 'Phone Number', 'Add your phone number')}
              {renderEditableField('Date of Birth', 'Date of Birth', 'Enter your date of birth')}
              {renderEditableField('Nationality', 'Nationality', 'Select your country/region')}
              {renderEditableField('Gender', 'Gender', 'Select gender')}
              {renderEditableField('Address', 'Address', 'Enter address')}
              {renderEditableField('Passport Information', 'Passport Information', 'Not provided')}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;

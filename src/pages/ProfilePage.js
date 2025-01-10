import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  Grid,
  styled
} from '@mui/material';
import Layout from '../components/Layout';

import EditableField from './UserPage/EditableField';
const StyledCard = styled(Card)({
  padding: '32px',
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  margin: '24px auto',
  maxWidth: '1000px'
});

const VerifiedBadge = styled(Typography)({
  color: '#22C55E',
  fontWeight: 500,
  display: 'inline-block',
  marginLeft: '8px'
});

const ChangePictureButton = styled(Button)({
  backgroundColor: '#EEF4FF',
  color: '#0066FF',
  textTransform: 'none',
  padding: '8px 16px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: '#DCE7FF'
  }
});

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // Added image preview state
  const token = localStorage.getItem('token');

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

      if (!response.ok) throw new Error('Error fetching user info');
      const data = await response.json();
      setUserInfo(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Create image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append('Image', file);

    try {
      const response = await fetch('https://localhost:7253/api/User/update-image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error('Error updating profile image');
      const data = await response.json();
      setUserInfo(prev => ({ ...prev, image: data.imageUrl }));
      setImagePreview(null); // Clear preview after successful upload
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleSave = async (field, value) => {
    try {
      const response = await fetch('https://localhost:7253/api/User/update-field', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          field: field.toLowerCase(),
          value: value,
        }),
      });

      if (!response.ok) throw new Error('Failed to update user information');
      const data = await response.json();
      setUserInfo(prev => ({ ...prev, [field.toLowerCase()]: value }));
    } catch (error) {
      console.error('Error saving the field:', error);
    }
  };

  if (!userInfo) return <Typography>Loading...</Typography>;

  return (
    <Layout activeItem="/profile">
      <StyledCard>
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar
                src={userInfo.image || '/placeholder.svg?height=120&width=120'}
                alt="User Avatar"
                sx={{ width: 120, height: 120 }}
              />
              <Box>
                <Typography variant="h6">{userInfo.email}</Typography>
                <VerifiedBadge>Verified</VerifiedBadge>
              </Box>
            </Box>
            <Box>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="change-profile-picture"
                type="file"
                onChange={handleImageUpload}
              />
              <label htmlFor="change-profile-picture">
                <ChangePictureButton component="span">
                  {userInfo.image ? 'Change Profile Picture' : 'Upload Profile Picture'}
                </ChangePictureButton>
              </label>
            </Box>
          </Box>

          {imagePreview && (
            <Box mb={4} textAlign="center">
              <Avatar
                src={imagePreview}
                alt="Preview"
                sx={{
                  width: 128,
                  height: 128,
                  mx: 'auto',
                  border: 4,
                  borderColor: 'primary.light',
                }}
              />
              <Button
                onClick={() => handleImageUpload({ target: { files: [new File([imagePreview], 'image')] } })}
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Upload New Image
              </Button>
            </Box>
          )}

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <EditableField
                label="User Name"
                value={userInfo.userName}
                onSave={(value) => handleSave('userName', value)}
              />

              <EditableField
                label="Phone Number"
                value={userInfo.phoneNumber}
                onSave={(value) => handleSave('phoneNumber', value)}
                type="tel"
              />

              <EditableField
                label="Nationality"
                value={userInfo.nationality}
                onSave={(value) => handleSave('nationality', value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <EditableField
                label="Email Address"
                value={userInfo.email}
                disabled={true}
                type="email"
              />

              <EditableField
                label="Date of Birth"
                value={userInfo.dateOfBirth}
                onSave={(value) => handleSave('dateOfBirth', value)}
                type="date"
              />

              <EditableField
                label="Gender"
                value={userInfo.gender}
                onSave={(value) => handleSave('gender', value)}
                type="gender"
              />
            </Grid>

            <Grid item xs={12}>
              <EditableField
                label="Address"
                value={userInfo.address}
                onSave={(value) => handleSave('address', value)}
              />
            </Grid>
          </Grid>
        </CardContent>
      </StyledCard>
    </Layout>
  );
};

export default ProfilePage;


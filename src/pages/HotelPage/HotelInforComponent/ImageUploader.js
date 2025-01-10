import React, { useState } from 'react';
import { 
  Button, 
  Typography, 
  Box,
  Paper
} from '@mui/material';
import { AddPhotoAlternate } from '@mui/icons-material';

const ImageUploader = ({ currentImage, onImageUpload, newImage, onUpdateConfirm }) => {
  const [showNewImage, setShowNewImage] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onImageUpload(file);
      setShowNewImage(true);
    }
  };

  return (
    <Box>
      <Typography variant="h6" component="h2" gutterBottom color="primary">
        Hình ảnh Khách sạn
      </Typography>
      <Paper 
        elevation={0} 
        sx={{ 
          position: 'relative',
          aspectRatio: '4/3',
          overflow: 'hidden',
          borderRadius: 1,
          bgcolor: 'grey.100',
          mb: 2
        }}
      >
        <img
          src={newImage ? URL.createObjectURL(newImage) : (currentImage || '/placeholder.svg?height=200&width=300')}
          alt="Hotel"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Paper>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="image-upload"
        />
        <label htmlFor="image-upload">
          <Button
            variant="outlined"
            component="span"
            fullWidth
            startIcon={<AddPhotoAlternate />}
          >
            Chọn hình ảnh mới
          </Button>
        </label>
        {newImage && (
          <Button 
            variant="contained" 
            onClick={() => {
              onUpdateConfirm();
              setShowNewImage(false);
            }}
            fullWidth
          >
            Xác nhận cập nhật
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ImageUploader;


import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Modal, 
  IconButton, 
  Typography, 
  ImageList, 
  ImageListItem 
} from '@mui/material';
import { 
  ChevronLeft, 
  ChevronRight, 
  CameraAlt, 
  Close 
} from '@mui/icons-material';

const HotelGallery = ({ images }) => {
  const [showAll, setShowAll] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const displayImages = images.slice(0, 5);

  const handlePrevious = () => {
    setSelectedImage((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setSelectedImage((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const handleImageClick = (index) => {
    setSelectedImage(index);
    setShowAll(true);
  };

  return (
    <Box sx={{ maxWidth: 'lg', mx: 'auto' }}>
      <Grid container spacing={1} sx={{ height: 400 }}>
        <Grid item xs={6} sx={{ height: '100%' }}>
          <Box
            component="img"
            src={images[0].imageUrl}
            alt={images[0].description}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              cursor: 'pointer',
              '&:hover': { opacity: 0.95 },
              transition: 'opacity 0.3s',
            }}
            onClick={() => handleImageClick(0)}
          />
        </Grid>
        <Grid item xs={6} container spacing={1}>
          {displayImages.slice(1).map((image, index) => (
            <Grid item xs={6} key={image.offeringImageId}>
              <Box sx={{ position: 'relative', height: '100%' }}>
                <Box
                  component="img"
                  src={image.imageUrl}
                  alt={image.description}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    '&:hover': { opacity: 0.95 },
                    transition: 'opacity 0.3s',
                  }}
                  onClick={() => handleImageClick(index + 1)}
                />
                {index === 3 && images.length > 5 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      bgcolor: 'rgba(0, 0, 0, 0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => setShowAll(true)}
                  >
                    <Box sx={{ color: 'white', textAlign: 'center' }}>
                      <CameraAlt sx={{ width: 24, height: 24, mb: 1 }} />
                      <Typography variant="body2" fontWeight="medium">
                        +{images.length - 5} ảnh
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Modal
        open={showAll}
        onClose={() => setShowAll(false)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ outline: 'none', width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ flexGrow: 1, position: 'relative', bgcolor: 'black' }}>
            <IconButton
              onClick={() => setShowAll(false)}
              sx={{ position: 'absolute', right: 16, top: 16, color: 'white' }}
            >
              <Close />
            </IconButton>
            <Box
              component="img"
              src={images[selectedImage].imageUrl}
              alt={images[selectedImage].description}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
              }}
            />
            <IconButton
              onClick={handlePrevious}
              sx={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'white' }}
            >
              <ChevronLeft />
            </IconButton>
            <IconButton
              onClick={handleNext}
              sx={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: 'white' }}
            >
              <ChevronRight />
            </IconButton>
          </Box>
          <Box sx={{ bgcolor: 'white', p: 2 }}>
            <ImageList sx={{ display: 'flex', overflowX: 'auto', mb: 2 }} cols={images.length}>
              {images.map((image, index) => (
                <ImageListItem 
                  key={image.offeringImageId}
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    flexShrink: 0,
                    cursor: 'pointer',
                    border: selectedImage === index ? '2px solid #1976d2' : 'none',
                    borderRadius: 1,
                    overflow: 'hidden'
                  }}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image.imageUrl}
                    alt={image.description}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
            <Typography variant="body2" color="text.secondary">
              {images[selectedImage].description}
            </Typography>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default HotelGallery;


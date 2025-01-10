import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Button, 
  Rating, 
  Typography, 
  Box 
} from '@mui/material';
import { Star } from '@mui/icons-material';

const FeedbackModal = ({ isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    onSubmit({ rating, feedback });
    setRating(0);
    setFeedback('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Gửi phản hồi của bạn</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 2 }}>
          <Typography component="legend">Đánh giá</Typography>
          <Rating
            name="rating"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
            precision={1}
            icon={<Star fontSize="inherit" />}
            emptyIcon={<Star fontSize="inherit" />}
            size="large"
          />
          <TextField
            label="Phản hồi của bạn"
            multiline
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Hủy
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained" disabled={rating === 0}>
          Gửi phản hồi
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FeedbackModal;

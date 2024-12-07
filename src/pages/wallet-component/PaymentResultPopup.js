import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const PaymentResultPopup = ({ open, onClose, success, amount }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{success ? 'Thanh Toán Thành Công' : 'Thanh Toán Thất Bại'}</DialogTitle>
      <DialogContent>
        <Typography variant="h6" color="textSecondary">
          {success ? `Bạn đã thanh toán thành công ${amount.toLocaleString('vi-VN')} VND` : 'Thanh toán của bạn không thành công. Vui lòng thử lại.'}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Đóng</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentResultPopup;
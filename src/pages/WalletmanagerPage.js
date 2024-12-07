import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress
} from '@mui/material';
import Layout from '../components/Layout';
import PaymentResultPopup from './wallet-component/PaymentResultPopup';

const VNPayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" fill="#0F1E32"/>
    <path d="M4 12.9L7.14286 16L20 5" stroke="#F7B600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function WalletManagementPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [balance, setBalance] = useState(1500000); // Initial balance
  const [loading, setLoading] = useState(false);
  const [openVNPayDialog, setOpenVNPayDialog] = useState(false);
  const [amount, setAmount] = useState('');
  const [showPaymentResult, setShowPaymentResult] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paidAmount, setPaidAmount] = useState(0);
  const [transactions, setTransactions] = useState([]); // State for wallet transactions
  const [transactionsLoading, setTransactionsLoading] = useState(true); // Loading state for transactions

  useEffect(() => {
    // Gọi hàm xử lý callback thanh toán khi trang được tải lại
    handlePaymentCallback();
    fetchTransactions(); // Fetch wallet transactions
  }, [location.search]);

  // Handle VNPay response parameters from URL
  const handlePaymentCallback = async () => {
    const query = new URLSearchParams(location.search);
    const vnp_ResponseCode = query.get('vnp_ResponseCode');
    const vnp_Amount = query.get('vnp_Amount');
    const vnp_TxnRef = query.get('vnp_TxnRef');
    const vnp_TransactionNo = query.get('vnp_TransactionNo');
    const vnp_SecureHash = query.get('vnp_SecureHash');
    const vnp_OrderInfo = query.get('vnp_OrderInfo');
    const vnp_PayDate = query.get('vnp_PayDate');
    const vnp_BankCode = query.get('vnp_BankCode');
    const vnp_CardType = query.get('vnp_CardType');
    const vnp_TransactionStatus = query.get('vnp_TransactionStatus');
    const vnp_TmnCode = query.get('vnp_TmnCode');

    // Kiểm tra nếu mã phản hồi VNPay là "00" (thành công)
    if (vnp_ResponseCode && vnp_Amount) {
      const success = vnp_ResponseCode === '00'; // 00: success, other: failure
      const amount = parseInt(vnp_Amount, 10) / 100; // VNPay amount is in cents
      setPaymentSuccess(success);
      setPaidAmount(amount);
      setShowPaymentResult(true);

      // Gọi API payment-execute sau khi nhận phản hồi từ VNPay
      if (success) {
        await handlePaymentExecute(
          vnp_TxnRef,
          vnp_TransactionNo,
          amount,
          vnp_ResponseCode,
          vnp_SecureHash,
          vnp_OrderInfo,
          vnp_PayDate,
          vnp_BankCode,
          vnp_CardType,
          vnp_TransactionStatus,
          vnp_TmnCode
        );
      }
    }
  };

  // Handle the API call to execute the payment after VNPay response
  const handlePaymentExecute = async (
    txnRef, transactionNo, amount, responseCode, secureHash, orderInfo, payDate, bankCode, cardType, transactionStatus, tmnCode
  ) => {
    try {
      setLoading(true);
      const response = await axios.post(
        'https://localhost:7253/api/VnPay/payment-execute', // API endpoint
        null, // Không có body, sử dụng query params thay vì body
        {
          params: {
            vnp_Amount: amount * 100, // VNPay amount is in cents (multiply by 100)
            vnp_BankCode: bankCode,
            vnp_TxnRef: txnRef,
            vnp_TransactionNo: transactionNo,
            vnp_ResponseCode: responseCode,
            vnp_SecureHash: secureHash,
            vnp_OrderInfo: orderInfo,
            vnp_PayDate: payDate,
            vnp_CardType: cardType,
            vnp_TransactionStatus: transactionStatus,
            vnp_TmnCode: tmnCode
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Bearer token authorization
          },
          timeout: 30000 // Timeout 30 seconds để tránh bị lỗi timeout
        }
      );

      if (response.data && response.status === 200) {
        // Nếu payment-execute thành công, cập nhật số dư
        setBalance((prevBalance) => prevBalance + amount);
      } else {
        console.error('Payment execution failed');
      }
    } catch (error) {
      console.error('Error during payment execution:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle VNPay top-up action
  const handleVNPayTopUp = async () => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      alert('Vui lòng nhập số tiền hợp lệ');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        'https://localhost:7253/api/VnPay/create-payment-url',
        { amount: parseFloat(amount) },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data && response.data.paymentUrl) {
        window.location.href = response.data.paymentUrl; // Redirect to VNPay for payment
      } else {
        throw new Error('Không nhận được URL thanh toán');
      }
    } catch (error) {
      console.error('Error during VNPay top-up:', error);
      alert('Có lỗi xảy ra khi xử lý yêu cầu nạp tiền. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
      setOpenVNPayDialog(false);
      setAmount('');
    }
  };

  const handleVNPayDialogClose = () => setOpenVNPayDialog(false);

  // Fetch wallet transactions
  const fetchTransactions = async () => {
    try {
      const response = await axios.get('https://localhost:7253/api/Wallet/GetWalletTransactions', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Gửi token trong header
        },
      });
      setTransactions(response.data.$values || []); // Ensure transactions is always an array
    } catch (error) {
      console.error('Error fetching wallet transactions:', error);
    } finally {
      setTransactionsLoading(false);
    }
  };

  return (
    <Layout>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Số dư ví của bạn</Typography>
          <Typography variant="h4" color="primary">{balance.toLocaleString('vi-VN')} VND</Typography>
          <Button variant="outlined" startIcon={<VNPayIcon />} onClick={() => setOpenVNPayDialog(true)} fullWidth>
            Nạp qua VNPay
          </Button>
        </CardContent>
      </Card>

      {/* Payment Result Popup */}
      <PaymentResultPopup
        open={showPaymentResult}
        onClose={() => setShowPaymentResult(false)}
        success={paymentSuccess}
        amount={paidAmount}
      />

      {/* Dialog for VNPay top-up */}
      <Dialog open={openVNPayDialog} onClose={handleVNPayDialogClose}>
        <DialogTitle>Nạp tiền qua VNPay</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Nhập số tiền bạn muốn nạp:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Số tiền"
            type="number"
            fullWidth
            variant="outlined"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleVNPayDialogClose} color="primary">Hủy bỏ</Button>
          <Button onClick={handleVNPayTopUp} color="primary" variant="contained">Xác nhận</Button>
        </DialogActions>
      </Dialog>

      {/* Wallet Transactions */}
      <Typography variant="h6" sx={{ mt: 4 }}>Lịch sử giao dịch</Typography>
      {transactionsLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Mã giao dịch</TableCell>
                <TableCell align="center">Ngày giao dịch</TableCell>
                <TableCell align="center">Số tiền</TableCell>
                <TableCell align="center">Trạng thái</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(transactions) && transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <TableRow key={transaction.transactionId}>
                    <TableCell align="center">{transaction.transactionId}</TableCell>
                    <TableCell align="center">{new Date(transaction.transactionDate).toLocaleString()}</TableCell>
                    <TableCell align="center">{transaction.amount.toLocaleString('vi-VN')} VND</TableCell>
                    <TableCell align="center">{transaction.transactionType}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">Chưa có giao dịch nào.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Layout>
  );
}

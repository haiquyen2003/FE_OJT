import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  Chip,
  Avatar,
  Tab,
  Tabs,
  Box,
  CircularProgress,
  Grid,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@mui/material';
import { 
  AccountBalanceWallet, 
  Refresh,
  ArrowUpward,
  ArrowDownward,
  History,
  DateRange,
  Description
} from '@mui/icons-material';
import Layout from '../components/Layout';

const MomoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#A50064"/>
    <path d="M11.9996 4.8C9.55921 4.8 7.19961 6.24 7.19961 9.6C7.19961 12 8.63961 13.44 10.0796 14.88C10.7996 15.6 11.5196 16.32 11.9996 17.04C12.4796 16.32 13.1996 15.6 13.9196 14.88C15.3596 13.44 16.7996 12 16.7996 9.6C16.7996 6.24 14.4396 4.8 11.9996 4.8Z" fill="white"/>
  </svg>
);

const VNPayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" fill="#0F1E32"/>
    <path d="M4 12.9L7.14286 16L20 5" stroke="#F7B600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function WalletManagementPage() {
  const [balance, setBalance] = useState(1500000);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionStatus, setTransactionStatus] = useState('Pending');

  useEffect(() => {
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setBalance(1500000);
      setTransactions([
        { id: 1, date: '2023-05-01', amount: 500000, type: 'deposit', method: 'VNPAY', description: 'Nạp tiền qua VNPAY', status: 'Success' },
        { id: 2, date: '2023-05-03', amount: 200000, type: 'withdrawal', description: 'Thanh toán tour Du lịch Đà Lạt' },
        { id: 3, date: '2023-05-05', amount: 300000, type: 'deposit', method: 'MoMo', description: 'Nạp tiền qua MoMo', status: 'Failed' },
        { id: 4, date: '2023-05-07', amount: 100000, type: 'withdrawal', description: 'Đặt cọc khách sạn tại Nha Trang' },
        { id: 5, date: '2023-05-10', amount: 1000000, type: 'deposit', method: 'VNPAY', description: 'Nạp tiền qua VNPAY', status: 'Pending' },
        { id: 6, date: '2023-05-12', amount: 150000, type: 'withdrawal', description: 'Mua vé máy bay' },
        { id: 7, date: '2023-05-15', amount: 700000, type: 'deposit', method: 'MoMo', description: 'Nạp tiền qua MoMo', status: 'Success' },
        { id: 8, date: '2023-05-18', amount: 200000, type: 'withdrawal', description: 'Đặt xe taxi' },
        { id: 9, date: '2023-05-20', amount: 400000, type: 'deposit', method: 'VNPAY', description: 'Nạp tiền qua VNPAY', status: 'Success' },
        { id: 10, date: '2023-05-22', amount: 300000, type: 'withdrawal', description: 'Mua quà lưu niệm' },
      ]);
    } catch (err) {
      console.error('Error fetching wallet data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMoney = (method) => {
    setSelectedMethod(method);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setAmount('');
    setTransactionStatus('Pending');
  };

  const handleConfirmAddMoney = () => {
    if (!isNaN(parseFloat(amount)) && parseFloat(amount) > 0) {
      const newTransaction = {
        id: transactions.length + 1,
        date: new Date().toISOString().split('T')[0],
        amount: parseFloat(amount),
        type: 'deposit',
        method: selectedMethod,
        description: `Nạp tiền qua ${selectedMethod}`,
        status: transactionStatus,
      };
      setTransactions([newTransaction, ...transactions]);
      setBalance(balance + parseFloat(amount));
    }
    setOpenDialog(false);
    setAmount('');
    setTransactionStatus('Pending');
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const filteredTransactions = tabValue === 0 
    ? transactions 
    : transactions.filter(t => t.type === (tabValue === 1 ? 'deposit' : 'withdrawal'));

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Layout activeItem="/wallet">
      <div className="container mx-auto p-4 max-w-6xl">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card className="mb-6 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white relative">
                <div className="absolute top-0 right-0 mt-4 mr-4">
                  <Tooltip title="Làm mới số dư">
                    <IconButton onClick={fetchWalletData} className="text-white hover:text-blue-200">
                      <Refresh />
                    </IconButton>
                  </Tooltip>
                </div>
                <AccountBalanceWallet className="text-6xl mb-4" />
                <Typography variant="h4" className="mb-2 font-bold">
                  Số dư ví
                </Typography>
                <Typography variant="h3" className="font-bold mb-4">
                  {balance.toLocaleString('vi-VN')} VND
                </Typography>
                <div className="flex space-x-2">
                  <Button 
                    variant="contained" 
                    startIcon={<ArrowUpward />}
                    className="bg-green-500 hover:bg-green-600"
                    onClick={() => handleAddMoney('VNPay')}
                  >
                    Nạp tiền
                  </Button>
                  <Button 
                    variant="outlined" 
                    startIcon={<ArrowDownward />}
                    className="border-white text-white hover:bg-white hover:text-purple-600"
                    onClick={() => handleAddMoney('withdraw')}
                  >
                    Rút tiền
                  </Button>
                </div>
              </div>
              <CardContent className="bg-gray-100">
                <Typography variant="subtitle1" className="font-semibold mb-2">
                  Phương thức thanh toán
                </Typography>
                <div className="flex space-x-4">
                  <Button 
                    variant="outlined" 
                    startIcon={<MomoIcon />}
                    className="border-pink-500 text-pink-500 hover:bg-pink-50"
                    onClick={() => handleAddMoney('MoMo')}
                  >
                    MoMo
                  </Button>
                  <Button 
                    variant="outlined" 
                    startIcon={<VNPayIcon />}
                    className="border-blue-800 text-blue-800 hover:bg-blue-50"
                    onClick={() => handleAddMoney('VNPay')}
                  >
                    VNPay
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card className="mb-4">
              <CardContent>
                <Typography variant="h5" className="mb-4 flex items-center">
                  <History className="mr-2" />
                  Lịch sử giao dịch
                </Typography>
                <Tabs value={tabValue} onChange={handleTabChange} className="mb-4">
                  <Tab icon={<History />} label="Tất cả" />
                  <Tab icon={<ArrowUpward />} label="Nạp tiền" />
                  <Tab icon={<ArrowDownward />} label="Rút tiền" />
                </Tabs>
                {loading ? (
                  <Box className="flex justify-center my-8">
                    <CircularProgress />
                  </Box>
                ) : (
                  <>
                    <List>
                      {paginatedTransactions.map((transaction) => (
                        <ListItem key={transaction.id} divider className="flex flex-col sm:flex-row items-start sm:items-center">
                          <Avatar className={`mr-4 ${transaction.type === 'deposit' ? 'bg-green-500' : 'bg-red-500'}`}>
                            {transaction.type === 'deposit' ? <ArrowUpward /> : <ArrowDownward />}
                          </Avatar>
                          <ListItemText
                            primary={
                              <Typography variant="h6" className={transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'}>
                                {transaction.type === 'deposit' ? '+' : '-'}{transaction.amount.toLocaleString('vi-VN')} VND
                              </Typography>
                            }
                            secondary={
                              <React.Fragment>
                                <Typography variant="body2" className="flex items-center">
                                  <DateRange className="mr-1" fontSize="small" />
                                  {transaction.date}
                                </Typography>
                                <Typography variant="body2" className="flex items-center">
                                  <Description className="mr-1" fontSize="small" />
                                  {transaction.description}
                                </Typography>
                                {transaction.status && (
                                  <Typography variant="body2" className="flex items-center">
                                    Trạng thái: {transaction.status}
                                  </Typography>
                                )}
                              </React.Fragment>
                            }
                          />
                          <Chip 
                            icon={transaction.type === 'deposit' ? <ArrowUpward /> : <ArrowDownward />}
                            label={transaction.type === 'deposit' ? 'Nạp tiền' : 'Rút tiền'}
                            color={transaction.type === 'deposit' ? 'success' : 'error'}
                            className="mt-2 sm:mt-0"
                          />
                        </ListItem>
                      ))}
                    </List>
                    <Box className="flex justify-center mt-4">
                      <Pagination 
                        count={Math.ceil(filteredTransactions.length / itemsPerPage)} 
                        page={currentPage} 
                        onChange={handlePageChange} 
                        color="primary" 
                      />
                    </Box>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Dialog for adding money */}
        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>Xác nhận nạp tiền</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Nhập số tiền bạn muốn nạp qua {selectedMethod}:
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
            <Button onClick={handleDialogClose} color="primary">
              Hủy bỏ
            </Button>
            <Button onClick={handleConfirmAddMoney} color="primary" variant="contained">
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Layout>
  );
}

// Table ExternalPayment
// external_payment_id int [primary key]
// user_id int [ref: > AspNetUsers.Id]
// provider varchar [note: 'Tên của bên cung cấp, ví dụ: MoMo']
// transaction_id varchar [note: 'ID giao dịch từ MoMo']
// amount decimal
// status varchar [note: 'Pending, Success, Failed']
// created_at timestamp 
// completed_at timestamp

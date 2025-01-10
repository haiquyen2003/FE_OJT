// import React, { useState } from 'react';
// import { Card, CardContent, List, ListItem, ListItemText, Button, Divider, TextField, BottomNavigation, BottomNavigationAction, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
// import { Wallet, Send, CreditCard, Plane, Hotel, Car, History, PieChart, Plus, DollarSign } from 'lucide-react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import HotelLayout from '../../components/HOTEL/HotelLayout';

// // Dữ liệu mẫu cho biểu đồ
// const spendingData = [
//   { name: 'Jan', amount: 400 },
//   { name: 'Feb', amount: 300 },
//   { name: 'Mar', amount: 600 },
//   { name: 'Apr', amount: 800 },
//   { name: 'May', amount: 500 },
// ];

// function EnhancedWalletPage() {
//   const [view, setView] = useState('main');
//   const [balance, setBalance] = useState(2500);
//   const [cards, setCards] = useState([
//     { id: 1, number: '**** **** **** 1234', type: 'Visa' },
//     { id: 2, number: '**** **** **** 5678', type: 'Mastercard' },
//   ]);
//   const [isTopUpOpen, setIsTopUpOpen] = useState(false);
//   const [topUpAmount, setTopUpAmount] = useState('');
//   const [transactions, setTransactions] = useState([
//     { id: 1, description: 'Đặt phòng khách sạn', date: '20 tháng 5, 2023', amount: -150 },
//     { id: 2, description: 'Vé máy bay', date: '18 tháng 5, 2023', amount: -300 },
//     { id: 3, description: 'Nạp tiền', date: '15 tháng 5, 2023', amount: 500 },
//   ]);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   const toggleDrawer = () => {
//     setIsDrawerOpen(!isDrawerOpen);
//   };

//   const handleTopUp = () => {
//     const amount = parseFloat(topUpAmount);
//     if (amount > 0) {
//       setBalance(prevBalance => prevBalance + amount);
//       setTransactions(prevTransactions => [
//         { id: Date.now(), description: 'Nạp tiền', date: new Date().toLocaleDateString('vi-VN'), amount: amount },
//         ...prevTransactions
//       ]);
//       setIsTopUpOpen(false);
//       setTopUpAmount('');
//     }
//   };

//   const renderMainView = () => (
//     <>
//       <Card className="mb-6 rounded-lg shadow-lg">
//         <CardContent>
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-semibold">Ví của tôi</h2>
//             <Wallet className="text-blue-500" />
//           </div>
//           <div className="text-center">
//             <p className="text-sm text-gray-600">Số dư khả dụng</p>
//             <p className="text-4xl font-bold text-green-600">${balance.toFixed(2)}</p>
//           </div>
//           <div className="mt-4 flex justify-center space-x-4">
//             <Button variant="contained" startIcon={<Send className="w-4 h-4" />} className="bg-blue-500 hover:bg-blue-600 rounded-full px-6 py-3">
//               Gửi
//             </Button>
//             <Button 
//               variant="outlined" 
//               startIcon={<CreditCard className="w-4 h-4" />} 
//               className="border-blue-500 text-blue-500 rounded-full px-6 py-3"
//               onClick={() => setIsTopUpOpen(true)}
//             >
//               Nạp tiền
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       <Card className="mb-6 rounded-lg shadow-lg">
//         <CardContent>
//           <h3 className="text-lg font-semibold mb-2">Giao dịch gần đây</h3>
//           <List>
//             {transactions.slice(0, 3).map((transaction) => (
//               <React.Fragment key={transaction.id}>
//                 <ListItem className="rounded-lg p-2 hover:bg-gray-100 transition-colors">
//                   <ListItemText primary={transaction.description} secondary={transaction.date} />
//                   <span className={transaction.amount > 0 ? "text-green-500 font-bold" : "text-red-500 font-bold"}>
//                     {transaction.amount > 0 ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
//                   </span>
//                 </ListItem>
//                 <Divider />
//               </React.Fragment>
//             ))}
//           </List>
//         </CardContent>
//       </Card>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         <Button variant="outlined" startIcon={<Plane className="w-4 h-4" />} className="border-blue-500 text-blue-500 rounded-full px-6 py-3">
//           Chuyến bay
//         </Button>
//         <Button variant="outlined" startIcon={<Hotel className="w-4 h-4" />} className="border-blue-500 text-blue-500 rounded-full px-6 py-3">
//           Khách sạn
//         </Button>
//         <Button variant="outlined" startIcon={<Car className="w-4 h-4" />} className="border-blue-500 text-blue-500 rounded-full px-6 py-3">
//           Thuê xe
//         </Button>
//       </div>
//     </>
//   );

//   const renderTransactionHistory = () => (
//     <Card className="rounded-lg shadow-lg">
//       <CardContent>
//         <h3 className="text-lg font-semibold mb-4">Lịch sử giao dịch</h3>
//         <List>
//           {transactions.map((transaction) => (
//             <React.Fragment key={transaction.id}>
//               <ListItem className="rounded-lg p-2 hover:bg-gray-100 transition-colors">
//                 <ListItemText 
//                   primary={transaction.description} 
//                   secondary={transaction.date} 
//                 />
//                 <span className={transaction.amount > 0 ? "text-green-500 font-bold" : "text-red-500 font-bold"}>
//                   {transaction.amount > 0 ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
//                 </span>
//               </ListItem>
//               <Divider />
//             </React.Fragment>
//           ))}
//         </List>
//       </CardContent>
//     </Card>
//   );

//   const renderCardManagement = () => (
//     <Card className="rounded-lg shadow-lg">
//       <CardContent>
//         <h3 className="text-lg font-semibold mb-4">Quản lý thẻ</h3>
//         <List>
//           {cards.map((card) => (
//             <ListItem key={card.id} className="rounded-lg p-2 hover:bg-gray-100 transition-colors">
//               <ListItemText primary={card.number} secondary={card.type} />
//               <Button variant="outlined" color="secondary" size="small" className="rounded-full">
//                 Xóa
//               </Button>
//             </ListItem>
//           ))}
//         </List>
//         <div className="mt-4">
//           <TextField label="Số thẻ" fullWidth className="mb-2" />
//           <TextField label="Loại thẻ" fullWidth className="mb-2" />
//           <Button variant="contained" startIcon={<Plus className="w-4 h-4" />} fullWidth className="rounded-full">
//             Thêm thẻ mới
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );

//   const renderSpendingChart = () => (
//     <Card className="rounded-lg shadow-lg">
//       <CardContent>
//         <h3 className="text-lg font-semibold mb-4">Biểu đồ chi tiêu</h3>
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={spendingData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
//           </LineChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   );

//   return (
//     <HotelLayout isMobile={isMobile} isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer}>
//       <div className="min-h-screen bg-gray-100 p-4 pb-20">
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Travel World</h1>

//           <BottomNavigation
//             value={view}
//             onChange={(event, newValue) => {
//               setView(newValue);
//             }}
//             showLabels
//             className="mb-4 rounded-full shadow-lg"
//           >
//             <BottomNavigationAction label="Chính" value="main" icon={<Wallet />} />
//             <BottomNavigationAction label="Lịch sử" value="history" icon={<History />} />
//             <BottomNavigationAction label="Thẻ" value="cards" icon={<CreditCard />} />
//             <BottomNavigationAction label="Chi tiêu" value="chart" icon={<PieChart />} />
//           </BottomNavigation>

//           {view === 'main' && renderMainView()}
//           {view === 'history' && renderTransactionHistory()}
//           {view === 'cards' && renderCardManagement()}
//           {view === 'chart' && renderSpendingChart()}
//         </div>

//         <Dialog open={isTopUpOpen} onClose={() => setIsTopUpOpen(false)}>
//           <DialogTitle>Nạp tiền vào ví</DialogTitle>
//           <DialogContent>
//             <TextField
//               autoFocus
//               margin="dense"
//               label="Số tiền"
//               type="number"
//               fullWidth
//               variant="outlined"
//               value={topUpAmount}
//               onChange={(e) => setTopUpAmount(e.target.value)}
//               InputProps={{
//                 startAdornment: <DollarSign className="w-4 h-4 mr-2" />,
//               }}
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setIsTopUpOpen(false)} className="rounded-full">Hủy</Button>
//             <Button onClick={handleTopUp} variant="contained" color="primary" className="rounded-full">
//               Nạp tiền
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </div>
//     </HotelLayout>
//   );
// }

// export default EnhancedWalletPage;

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, List, ListItem, ListItemText, Button, Divider, TextField, BottomNavigation, BottomNavigationAction, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Wallet, Send, CreditCard, Plane, Hotel, Car, History, PieChart, Plus, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import HotelLayout from '../../components/HOTEL/HotelLayout';

const spendingData = [
  { name: 'Jan', amount: 400 },
  { name: 'Feb', amount: 300 },
  { name: 'Mar', amount: 600 },
  { name: 'Apr', amount: 800 },
  { name: 'May', amount: 500 },
];

function EnhancedWalletPage() {
  const [view, setView] = useState('main');
  const [balance, setBalance] = useState(0);  // Set initial balance to 0
  const [cards, setCards] = useState([/* Your cards data */]);
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [transactions, setTransactions] = useState([]);  // Start with an empty array
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    // Fetch balance and transactions when the component mounts
    fetchBalance();
    fetchTransactions();
  }, []);

  // Function to fetch balance from the API
  const fetchBalance = async () => {
    try {
      // Gửi yêu cầu GET đến API với Authorization Header
      const response = await axios.get('https://localhost:7253/api/Wallet/balance', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Lấy token từ localStorage
        },
      });
  
      // Kiểm tra dữ liệu trả về
      if (response.data && response.data.balance !== undefined) {
        setBalance(response.data.balance);  // Cập nhật số dư vào state
      } else {
        console.error('Không nhận được số dư ví từ API');
      }
    } catch (error) {
      console.error('Lỗi khi lấy số dư ví:', error);
    }
  };
  
  

  // Function to fetch transactions from the API
  // Function to fetch transactions from the API with pagination and filtering out odd transaction IDs
const fetchTransactions = async (page, pageSize) => {
  try {
    const response = await axios.get('https://localhost:7253/api/Wallet/GetWalletTransactions', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      params: { page, pageSize }
    });

    if (response.data && Array.isArray(response.data)) {
      // Filter out transactions with odd transactionIds
      const evenTransactions = response.data.filter(transaction => transaction.transactionId % 2 === 0);

      // Reverse the transactions array to show the latest transactions first
      const reversedTransactions = evenTransactions.reverse();

      // Update the transactions state with filtered and reversed transactions
      setTransactions(reversedTransactions);
    } else {
      console.error('Lỗi: Dữ liệu giao dịch không hợp lệ');
      setTransactions([]);
    }
  } catch (error) {
    console.error('Lỗi khi lấy lịch sử giao dịch:', error);
    setTransactions([]);
  }
};

  
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleTopUp = () => {
    const amount = parseFloat(topUpAmount);
    if (amount > 0) {
      setBalance(prevBalance => prevBalance + amount);
      setTransactions(prevTransactions => [
        { id: Date.now(), description: 'Nạp tiền', date: new Date().toLocaleDateString('vi-VN'), amount: amount },
        ...prevTransactions
      ]);
      setIsTopUpOpen(false);
      setTopUpAmount('');
    }
  };

  const renderMainView = () => (
    <>
      <Card className="mb-6 rounded-lg shadow-lg">
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Ví của tôi</h2>
            <Wallet className="text-blue-500" />
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Số dư khả dụng</p>
            <p className="text-4xl font-bold text-green-600">${balance.toFixed(2)}</p>
          </div>
          <div className="mt-4 flex justify-center space-x-4">
            <Button variant="contained" startIcon={<Send className="w-4 h-4" />} className="bg-blue-500 hover:bg-blue-600 rounded-full px-6 py-3">
              Gửi
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<CreditCard className="w-4 h-4" />} 
              className="border-blue-500 text-blue-500 rounded-full px-6 py-3"
              onClick={() => setIsTopUpOpen(true)}
            >
              Nạp tiền
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6 rounded-lg shadow-lg">
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Giao dịch gần đây</h3>
          <List>
            {transactions.slice(0, 3).map((transaction) => (
              <React.Fragment key={transaction.id}>
                <ListItem className="rounded-lg p-2 hover:bg-gray-100 transition-colors">
                  <ListItemText primary={transaction.description} secondary={transaction.date} />
                  <span className={transaction.amount > 0 ? "text-green-500 font-bold" : "text-red-500 font-bold"}>
                    {transaction.amount > 0 ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                  </span>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>
    </>
  );

  const renderTransactionHistory = () => (
    <Card className="rounded-lg shadow-lg">
      <CardContent>
        <h3 className="text-lg font-semibold mb-4">Lịch sử giao dịch</h3>
        <List>
          {transactions.map((transaction) => (
            <React.Fragment key={transaction.id}>
              <ListItem className="rounded-lg p-2 hover:bg-gray-100 transition-colors">
                <ListItemText 
                  primary={transaction.description} 
                  secondary={transaction.date} 
                />
                <span className={transaction.amount > 0 ? "text-green-500 font-bold" : "text-red-500 font-bold"}>
                  {transaction.amount > 0 ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                </span>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );

  return (
    <HotelLayout isMobile={isMobile} isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer}>
      <div className="min-h-screen bg-gray-100 p-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Travel World</h1>

          <BottomNavigation
            value={view}
            onChange={(event, newValue) => setView(newValue)}
            showLabels
            className="mb-4 rounded-full shadow-lg"
          >
            <BottomNavigationAction label="Chính" value="main" icon={<Wallet />} />
            <BottomNavigationAction label="Lịch sử" value="history" icon={<History />} />
            <BottomNavigationAction label="Thẻ" value="cards" icon={<CreditCard />} />
            <BottomNavigationAction label="Chi tiêu" value="chart" icon={<PieChart />} />
          </BottomNavigation>

          {view === 'main' && renderMainView()}
          {view === 'history' && renderTransactionHistory()}
        </div>

        <Dialog open={isTopUpOpen} onClose={() => setIsTopUpOpen(false)}>
          <DialogTitle>Nạp tiền vào ví</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Số tiền"
              type="number"
              fullWidth
              variant="outlined"
              value={topUpAmount}
              onChange={(e) => setTopUpAmount(e.target.value)}
              InputProps={{
                startAdornment: <DollarSign className="w-4 h-4 mr-2" />,
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsTopUpOpen(false)} className="rounded-full">Hủy</Button>
            <Button onClick={handleTopUp} variant="contained" color="primary" className="rounded-full">
              Nạp tiền
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </HotelLayout>
  );
}

export default EnhancedWalletPage;

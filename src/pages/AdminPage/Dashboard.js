// Dashboard.js
import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/ADMIN/AdminLayout";
import { FaUsers, FaShoppingCart, FaChartLine, FaCog, FaEye, FaTrash } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie, LabelList, AreaChart, Area } from 'recharts';

export function Dashboard() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Resize handler to manage state for mobile views
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
      setIsDrawerOpen(false);
    } else {
      setIsMobile(false);
      setIsDrawerOpen(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  // Your chart and data definitions
  const salesData = [
    { month: 'Jan', sales: 3000, profit: 2000 },
    { month: 'Feb', sales: 2500, profit: 1500 },
    { month: 'Mar', sales: 4000, profit: 2800 },
    { month: 'Apr', sales: 3500, profit: 2200 },
    { month: 'May', sales: 5000, profit: 3200 },
    { month: 'Jun', sales: 4500, profit: 3000 },
  ];

  const clientData = [
    { month: 'Jan', clients: 100 },
    { month: 'Feb', clients: 150 },
    { month: 'Mar', clients: 200 },
    { month: 'Apr', clients: 180 },
    { month: 'May', clients: 220 },
    { month: 'Jun', clients: 260 },
  ];

  const partnerData = [
    { name: 'Agoda', value: 400 },
    { name: 'Traveloka', value: 300 },
    { name: 'Booking.com', value: 300 },
    { name: 'Expedia', value: 200 },
  ];

  const clientList = [
    { name: 'Howell Hand', company: 'Kiehn-Green', city: 'Emelyside', progress: 0.6, created: 'Mar 3, 2023' },
    { name: 'Hope Howe', company: 'Nolan Inc', city: 'Paristown', progress: 0.7, created: 'Dec 1, 2023' },
    { name: 'Nelson Jerde', company: 'Nitzsche LLC', city: 'Jailynbury', progress: 0.5, created: 'May 18, 2023' },
    { name: 'Kim Weimann', company: 'Brown-Lueilwitz', city: 'New Emie', progress: 0.4, created: 'May 4, 2023' },
    { name: "Justice O'Reilly", company: 'Lakin-Muller', city: 'New Kacie', progress: 0.6, created: 'Mar 27, 2023' },
  ];

  const partnerAccounts = [
    { name: 'Partner A', company: 'Company A', city: 'City A', progress: 0.8, created: 'Jan 1, 2023' },
    { name: 'Partner B', company: 'Company B', city: 'City B', progress: 0.9, created: 'Feb 12, 2023' },
    { name: 'Partner C', company: 'Company C', city: 'City C', progress: 0.7, created: 'Mar 25, 2023' },
    { name: 'Partner D', company: 'Company D', city: 'City D', progress: 0.6, created: 'Apr 7, 2023' },
    { name: 'Partner E', company: 'Company E', city: 'City E', progress: 0.85, created: 'May 16, 2023' },
  ];

  const deviceData = [
    { name: 'Desktop', value: 65, color: '#0088FE' },
    { name: 'Mobile', value: 45, color: '#00C49F' },
    { name: 'Tablet', value: 34, color: '#FFBB28' },
    { name: 'Unknown', value: 12, color: '#FF8042' },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <AdminLayout isMobile={isMobile} isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer}>
      <h4 className="mb-6 text-2xl font-bold text-gray-800">Overview</h4>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {/* Clients Card */}
        <div className="p-6 bg-white shadow-sm rounded-md relative">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 flex items-center">
                <FaChartLine className="h-5 w-5 mr-1" />
                12%
              </p>
              <h6 className="text-lg text-gray-800">Clients</h6>
              <p className="text-3xl font-bold text-gray-800 ">512</p>
            </div>
          </div>
          <FaUsers className="h-10 w-10 text-green-500 absolute bottom-4 right-4" />
          <FaCog className="h-5 w-5 text-gray-600 absolute top-4 right-4" />
        </div>

        {/* Sales Card */}
        <div className="p-6 bg-white shadow-sm rounded-md relative">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600">-16%</p>
              <h6 className="text-lg text-gray-800">Sales</h6>
              <p className="text-3xl font-bold text-gray-800">$7,770</p>
            </div>
          </div>
          <FaShoppingCart className="h-10 w-10 text-blue-500 absolute bottom-4 right-4" />
          <FaCog className="h-5 w-5 text-gray-600 absolute top-4 right-4" />
        </div>

        {/* Performance Card */}
        <div className="p-6 bg-white shadow-sm rounded-md relative">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600">Overflow</p>
              <h6 className="text-lg text-gray-800">Performance</h6>
              <p className="text-3xl font-bold text-gray-800">256%</p>
            </div>
          </div>
          <FaChartLine className="h-10 w-10 text-yellow-500 absolute bottom-4 right-4" />
          <FaCog className="h-5 w-5 text-gray-600 absolute top-4 right-4" />
        </div>
      </div>

      {/* Clients Overview Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white shadow-md p-4 rounded-md">
          <h5 className="mb-4 text-lg font-semibold text-gray-800">Clients Overview</h5>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={clientData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="clients" fill="#82ca9d">
                <LabelList dataKey="clients" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Partner Distribution Chart */}
        <div className="bg-white shadow-md p-4 rounded-md">
          <h5 className="mb-4 text-lg font-semibold text-gray-800">Partner Distribution</h5>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={partnerData} cx="50%" cy="50%" outerRadius={120} fill="#8884d8" dataKey="value" label>
                {partnerData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sales Area Chart */}
      <div className="mb-8 bg-white shadow-md p-4 rounded-md">
        <h5 className="mb-4 text-lg font-semibold text-gray-800">Sales & Profit Trend</h5>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="sales" stroke="#8884d8" fillOpacity={1} fill="url(#colorSales)" />
            <Area type="monotone" dataKey="profit" stroke="#82ca9d" fillOpacity={1} fill="url(#colorProfit)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Clients Table */}
      <div className="mb-8">
        <h5 className="mb-4 text-lg font-semibold text-gray-800">Clients</h5>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Company</th>
                <th className="py-2 px-4 border-b">City</th>
                <th className="py-2 px-4 border-b">Progress</th>
                <th className="py-2 px-4 border-b">Created</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clientList.map((item, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{item.name}</td>
                  <td className="py-2 px-4 border-b">{item.company}</td>
                  <td className="py-2 px-4 border-b">{item.city}</td>
                  <td className="py-2 px-4 border-b">
                    <div className="relative w-full h-3 bg-gray-200 rounded-full">
                      <div className="absolute top-0 left-0 h-full bg-blue-500 rounded-full" style={{ width: `${item.progress * 100}%` }}></div>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b">{item.created}</td>
                  <td className="py-2 px-4 border-b">
                    <button className="text-blue-500 p-2">
                      <FaEye />
                    </button>
                    <button className="text-red-500 p-2 ml-2">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Partners Table */}
      <div className="mb-8">
        <h5 className="mb-4 text-lg font-semibold text-gray-800">Partners</h5>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Company</th>
                <th className="py-2 px-4 border-b">City</th>
                <th className="py-2 px-4 border-b">Progress</th>
                <th className="py-2 px-4 border-b">Created</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {partnerAccounts.map((item, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{item.name}</td>
                  <td className="py-2 px-4 border-b">{item.company}</td>
                  <td className="py-2 px-4 border-b">{item.city}</td>
                  <td className="py-2 px-4 border-b">
                    <div className="relative w-full h-3 bg-gray-200 rounded-full">
                      <div className="absolute top-0 left-0 h-full bg-blue-500 rounded-full" style={{ width: `${item.progress * 100}%` }}></div>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b">{item.created}</td>
                  <td className="py-2 px-4 border-b">
                    <button className="text-blue-500 p-2">
                      <FaEye />
                    </button>
                    <button className="text-red-500 p-2 ml-2">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Dashboard;

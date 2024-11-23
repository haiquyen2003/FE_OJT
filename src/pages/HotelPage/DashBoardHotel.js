// components/HOTEL/DashBoardHotel.js
import React from 'react';
import HotelLayout from '../../components/HOTEL/HotelLayout';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Tooltip, Legend } from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Tooltip, Legend);

const DashboardHotel = () => {
  const salesRevenueData = {
    labels: Array.from({ length: 30 }, (_, i) => `${i + 1} Jan, 2020`),
    datasets: [
      {
        label: 'Sales Revenue',
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 1000) + 500),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const roomBookingData = {
    labels: ['Single', 'Double', 'Delux', 'Suit'],
    datasets: [
      {
        data: [1913, 859, 482, 138],
        backgroundColor: ['#6366F1', '#10B981', '#F59E0B', '#EF4444'],
        hoverOffset: 4,
      },
    ],
  };

  const incomeExpensesData = {
    labels: Array.from({ length: 30 }, (_, i) => `${i + 1} Jan, 2020`),
    datasets: [
      {
        label: 'Income',
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 5000) + 2000),
        borderColor: '#6366F1',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Expenses',
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 4000) + 1500),
        borderColor: '#EF4444',
        borderWidth: 2,
        fill: false,
        borderDash: [5, 5],
        tension: 0.4,
      },
    ],
  };

  return (
    <HotelLayout>
      <div className="p-6 bg-gray-900 text-white">
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-gray-400 mb-6">Welcome to DashLite Dashboard Template.</p>
        <div className="flex items-center justify-between mb-6">
          <button className="bg-gray-700 text-white px-4 py-2 rounded-md">Last 30 Days</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Reports</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Total Bookings */}
          <div className="bg-gray-800 p-6 rounded-md shadow-lg">
            <h2 className="text-xl font-semibold">Total Bookings</h2>
            <div className="flex items-center mt-4">
              <span className="text-4xl font-bold mr-2">11,230</span>
              <span className="text-red-500 text-sm">↓ 1.93%</span>
            </div>
            <div className="mt-4 text-gray-400">
              <p>THIS MONTH: <span className="font-semibold">1913</span></p>
              <p>THIS WEEK: <span className="font-semibold">1125</span></p>
            </div>
          </div>

          {/* Card 2: Rooms Available */}
          <div className="bg-gray-800 p-6 rounded-md shadow-lg">
            <h2 className="text-xl font-semibold">Rooms Available</h2>
            <div className="flex items-center mt-4">
              <span className="text-4xl font-bold mr-2">312</span>
            </div>
            <div className="mt-4 text-gray-400">
              <p>BOOKED (M): <span className="font-semibold">913</span></p>
              <p>BOOKED (W): <span className="font-semibold">125</span></p>
            </div>
          </div>

          {/* Card 3: Expenses */}
          <div className="bg-gray-800 p-6 rounded-md shadow-lg">
            <h2 className="text-xl font-semibold">Expenses</h2>
            <div className="flex items-center mt-4">
              <span className="text-4xl font-bold mr-2">79,358.50 USD</span>
            </div>
            <div className="mt-4 text-gray-400">
              <p>THIS MONTH: <span className="font-semibold">3,540.59 USD</span></p>
              <p>THIS WEEK: <span className="font-semibold">1,259.28 USD</span></p>
            </div>
          </div>
        </div>

        {/* Sales Revenue and Room Booking Chart */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-10">
          <div className="bg-gray-800 p-6 rounded-md shadow-lg col-span-3">
            <h2 className="text-xl font-semibold">Sales Revenue</h2>
            <p className="text-gray-400 mb-4">In last 30 days revenue from rent.</p>
            <div className="flex justify-between mb-4 text-gray-400">
              <div>
                <p>Monthly</p>
                <p className="text-green-400">9.28K ↑ 4.63%</p>
              </div>
              <div>
                <p>Weekly</p>
                <p className="text-red-400">2.69K ↓ 1.92%</p>
              </div>
              <div>
                <p>Daily (Avg)</p>
                <p className="text-green-400">0.94K ↑ 3.45%</p>
              </div>
            </div>
            <Bar data={salesRevenueData} />
          </div>

          <div className="bg-gray-800 p-6 rounded-md shadow-lg col-span-2">
            <h2 className="text-xl font-semibold p-2">Room Booking Chart</h2>
            <Doughnut data={roomBookingData}/>
          </div>
        </div>

        {/* Income vs Expenses Chart */}
        <div className="bg-gray-800 p-6 rounded-md shadow-lg mt-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Income vs Expenses</h2>
              <p className="text-gray-400">How was your income and expenses this month.</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-gray-700 text-white px-4 py-1 rounded-md">7D</button>
              <button className="bg-blue-600 text-white px-4 py-1 rounded-md">1M</button>
              <button className="bg-gray-700 text-white px-4 py-1 rounded-md">3M</button>
            </div>
          </div>
          <div className="flex justify-between my-4 text-gray-400">
            <div>
              <p className="text-blue-500">Income</p>
              <p className="text-2xl font-bold">2.57K</p>
              <p className="text-red-500">↓ 12.37%</p>
            </div>
            <div>
              <p className="text-red-500">Expenses</p>
              <p className="text-2xl font-bold">3.5K</p>
              <p className="text-green-500">↑ 8.37%</p>
            </div>
          </div>
          <Line data={incomeExpensesData} />
        </div>

        {/* Recent Bookings */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Recent Bookings</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 border border-gray-700">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left text-gray-400 font-semibold">Customer Name</th>
                  <th className="py-2 px-4 border-b text-left text-gray-400 font-semibold">Room Type</th>
                  <th className="py-2 px-4 border-b text-left text-gray-400 font-semibold">Check-in Date</th>
                  <th className="py-2 px-4 border-b text-left text-gray-400 font-semibold">Check-out Date</th>
                  <th className="py-2 px-4 border-b text-left text-gray-400 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b text-white">John Doe</td>
                  <td className="py-2 px-4 border-b text-white">Deluxe Suite</td>
                  <td className="py-2 px-4 border-b text-white">Oct 10, 2024</td>
                  <td className="py-2 px-4 border-b text-white">Oct 15, 2024</td>
                  <td className="py-2 px-4 border-b text-green-400 font-semibold">Confirmed</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b text-white">Jane Smith</td>
                  <td className="py-2 px-4 border-b text-white">Standard Room</td>
                  <td className="py-2 px-4 border-b text-white">Oct 12, 2024</td>
                  <td className="py-2 px-4 border-b text-white">Oct 18, 2024</td>
                  <td className="py-2 px-4 border-b text-yellow-400 font-semibold">Pending</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b text-white">Michael Johnson</td>
                  <td className="py-2 px-4 border-b text-white">Luxury Suite</td>
                  <td className="py-2 px-4 border-b text-white">Oct 20, 2024</td>
                  <td className="py-2 px-4 border-b text-white">Oct 25, 2024</td>
                  <td className="py-2 px-4 border-b text-green-400 font-semibold">Confirmed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </HotelLayout>
  );
};

export default DashboardHotel;

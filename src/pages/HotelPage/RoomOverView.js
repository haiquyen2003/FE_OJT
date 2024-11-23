import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaEllipsisV, FaEdit, FaTrash, FaUser, FaTools } from 'react-icons/fa';
import { Search, BedDouble, Users, Home, Castle, Loader, Wrench, DoorClosed, Calendar, ChevronDown } from "lucide-react";
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import { Menu } from '@headlessui/react';
import HotelLayout from '../../components/HOTEL/HotelLayout';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const RoomOverview = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");
  const [rooms, setRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]); // Danh sách loại phòng
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Fetch rooms and room types
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const token = localStorage.getItem('token');

        // Gọi API để lấy danh sách phòng
        const response = await axios.get('https://localhost:7253/api/Room/filtered-rooms', {
          params: {
            search: searchTerm,
            date: dateFilter,
            status: statusFilter,
            type: typeFilter,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Cập nhật danh sách phòng
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    const fetchRoomTypes = async () => {
      try {
        const token = localStorage.getItem('token');

        // Gọi API để lấy danh sách loại phòng
        const response = await axios.get('https://localhost:7253/api/Offering/GetAllServiceOfferingsbyIdProvider', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Cập nhật danh sách loại phòng (name)
        const roomTypeNames = response.data.map(offering => offering.name);
        setRoomTypes(roomTypeNames);
      } catch (error) {
        console.error('Error fetching room types:', error);
      }
    };

    fetchRooms();
    fetchRoomTypes();
  }, [searchTerm, dateFilter, statusFilter, typeFilter]);

  const statusColors = [
    { status: "Trống", color: "bg-green-800 text-white" },
    { status: "Đã đặt", color: "bg-yellow-700 text-white" },
    { status: "Đang dọn", color: "bg-blue-800 text-white" },
    { status: "Đã nhận phòng", color: "bg-red-700 text-white" },
    { status: "Bảo trì", color: "bg-gray-700 text-white" },
  ];

  const getStatusColor = (status) => {
    const statusColor = statusColors.find(sc => sc.status === status);
    return statusColor ? statusColor.color : "bg-gray-800";
  };

  const filteredRooms = rooms.sort((a, b) => {
    if (sortBy === "id") return a.roomID - b.roomID;
    if (sortBy === "price") return a.serviceOffering.price - b.serviceOffering.price;
    if (sortBy === "type") return a.serviceOffering.name.localeCompare(b.serviceOffering.name);
    if (sortBy === "status") return a.roomStatusHistories.status.localeCompare(b.roomStatusHistories.status);
    return 0;
  });

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);
  const paginatedRooms = filteredRooms.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const statistics = rooms.reduce((acc, room) => {
    acc[room.roomStatusHistories.status] = (acc[room.roomStatusHistories.status] || 0) + 1;
    return acc;
  }, {});

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, typeFilter, sortBy]);

  return (
    <HotelLayout>
      <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Quản lý Phòng Khách sạn</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="lg:col-span-2">
            <input
              type="text"
              placeholder="Tìm kiếm phòng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-gray-800 text-white"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Calendar className="text-gray-400" size={20} />
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="flex-grow px-3 py-2 border rounded-md bg-gray-800 text-white"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border rounded-md bg-gray-800 text-white"
          >
            <option value="">Tình trạng phòng</option>
            {statusColors.map(({ status }) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border rounded-md bg-gray-800 text-white"
          >
            <option value="">Loại phòng</option>
            {roomTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2">
            {Object.entries(statistics).map(([status, count]) => (
              <span key={status} className={`px-2 py-1 rounded-full text-xs ${getStatusColor(status)}`}>
                {status}: {count}
              </span>
            ))}
          </div>
          {/* Các thành phần sắp xếp và chuyển đổi chế độ hiển thị... */}
        </div>
        <div className="flex items-center space-x-4">
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-gray-600 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500">
                Sắp xếp theo: {sortBy === "id" ? "Số phòng" : sortBy === "price" ? "Giá" : sortBy === "type" ? "Loại phòng" : "Trạng thái"}
                <ChevronDown className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
              </Menu.Button>
              <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-gray-800 divide-y divide-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setSortBy("id")}
                        className={`${
                          active ? 'bg-gray-700 text-white' : 'text-gray-300'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        Số phòng
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setSortBy("price")}
                        className={`${
                          active ? 'bg-gray-700 text-white' : 'text-gray-300'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        Giá
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setSortBy("type")}
                        className={`${
                          active ? 'bg-gray-700 text-white' : 'text-gray-300'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        Loại phòng
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setSortBy("status")}
                        className={`${
                          active ? 'bg-gray-700 text-white' : 'text-gray-300'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        Trạng thái
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1 rounded-md ${viewMode === "grid" ? "bg-blue-700 text-white" : "bg-gray-800 text-gray-300"}`}
              >
                Lưới
              </button>
              <button
                onClick={() => setViewMode("calendar")}
                className={`px-3 py-1 rounded-md ${viewMode === "calendar" ? "bg-blue-700 text-white" : "bg-gray-800 text-gray-300"}`}
              >
                Lịch
              </button>
            </div>
          </div>
        {/* Phần hiển thị danh sách phòng... */}
        </div>
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedRooms.map((room) => {
              return (
                <div key={room.roomID} className={`rounded-lg shadow-md overflow-hidden ${getStatusColor(room.roomStatusHistories.status)}`}>
                  <div className="p-4 text-white">
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-xl font-bold text-white">Phòng {room.roomNumber}</h2>
                    </div>
                    <p className="text-sm font-semibold text-gray-300">{room.serviceOffering.name}</p>
                    <p className="text-lg font-bold mt-1 text-white">{room.serviceOffering.price.toLocaleString()} VNĐ/đêm</p>
                    <div className="text-xs text-gray-300 mt-2 grid grid-cols-3 gap-4">
                    <div className="flex items-center">
                        <Home className="mr-1 text-sx" /> {room.serviceOffering.roomSize} m²
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-1 text-sx" /> {room.serviceOffering.maxGuests} khách
                      </div>
                    <div className="flex items-center">
                      <BedDouble className="mr-2 text-xs" />  {room.serviceOffering.bedType}
                      </div>
                    </div>
                    <div className="mt-3">
                      <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gray-200 text-black">
                          Trạng thái: {room.roomStatusHistories.status}
                       </span>
                     </div>
                     <div className="mt-4">
                    <p className="text-sm font-bold mb-2">Tiện nghi:</p>
                    <div className="text-sm text-gray-300 flex flex-wrap gap-4">
                          {room.serviceOffering.amenities.map((amenity) => {
                          const IconComponent = FaIcons[amenity.iconType] || MdIcons[amenity.iconType] || null;
              return (
            <div key={amenity.amenitieId} className="flex items-center">
              {IconComponent && <IconComponent className="mr-2" />} {amenity.name}
            </div>
          );
        })}
      </div>
    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center p-4 bg-gray-700 rounded-lg text-white">
            Chế độ xem lịch sẽ được triển khai ở đây.
          </div>
        )}
        
        {/* Phân trang */}
        <div className="mt-6 flex justify-center">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-600 bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700"
            >
              <span className="sr-only">Previous</span>
              <ChevronDown className="h-5 w-5 transform rotate-90" aria-hidden="true" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  currentPage === page
                    ? 'z-10 bg-blue-700 border-blue-600 text-white'
                    : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-600 bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700"
            >
              <span className="sr-only">Next</span>
              <ChevronDown className="h-5 w-5 transform -rotate-90" aria-hidden="true" />
            </button>
          </nav>
      </div>
    </HotelLayout>
  );
};

export default RoomOverview;

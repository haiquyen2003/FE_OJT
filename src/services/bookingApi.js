const API_BASE_URL = 'https://localhost:7253/api';

export const getServiceBookings = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/Booking/GetServiceBookings`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch service bookings');
  }
  return response.json();
};

export const getBookingDetails = async (bookingId) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/Booking/getdetailbooking/${bookingId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch booking details');
  }
  return response.json();
};

export const assignRooms = async (bookingId, roomAssignments) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/Booking/AssignRooms/${bookingId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ rooms: roomAssignments }),
  });
  if (!response.ok) {
    throw new Error('Failed to assign rooms');
  }
  return response.json();
};

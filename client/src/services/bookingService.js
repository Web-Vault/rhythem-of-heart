import axios from "axios";

const API_URL = 'http://localhost:5000/api/bookings';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Get user bookings
export const getUserBookings = async () => {
  try {
    const response = await api.get('/user');
    console.log('User Bookings Response:', response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to fetch bookings' };
  }
};

// Get event bookings
export const getEventBookings = async (eventId) => {
  try {
    const response = await api.get(`/event/${eventId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to fetch event bookings' };
  }
};

export const createBooking = async (bookingData) => {
  try {
    const response = await api.post('/', bookingData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to create booking' };
  }
};

const bookingService = {
  getUserBookings,
  getEventBookings,
  createBooking
};

export default bookingService;
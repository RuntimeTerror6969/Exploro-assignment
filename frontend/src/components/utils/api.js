import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication API calls
export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};

// Trips API calls
export const fetchTrips = async () => {
  const response = await api.get("/trips");
  return response.data;
};

export const fetchTripById = async (id) => {
  const response = await api.get(`/trips/${id}`);
  return response.data;
};

export const createTrip = async (tripData) => {
  const response = await api.post("/trips", tripData);
  return response.data;
};

export const updateTrip = async (id, tripData) => {
  const response = await api.put(`/trips/${id}`, tripData);
  return response.data;
};

export const deleteTrip = async (id) => {
  const response = await api.delete(`/trips/${id}`);
  return response.data;
};

// Cart API calls
export const addToCart = async (tripId) => {
  const response = await api.post("/cart", { tripId });
  return response.data;
};

export const removeFromCart = async (tripId) => {
  const response = await api.delete(`/cart/${tripId}`);
  return response.data;
};

export const getCart = async () => {
  const response = await api.get("/cart");
  return response.data;
};

// Booking API calls
export const createBooking = async (bookingData) => {
  const response = await api.post("/bookings", bookingData);
  return response.data;
};

export const getUserBookings = async () => {
  const response = await api.get("/bookings/user");
  return response.data;
};

export const cancelBooking = async (bookingId) => {
  const response = await api.post(`/bookings/${bookingId}/cancel`);
  return response.data;
};

// Error handler helper
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error
    return error.response.data.message || "An error occurred";
  } else if (error.request) {
    // Request made but no response
    return "Unable to connect to server";
  } else {
    // Something else went wrong
    return "An unexpected error occurred";
  }
};

export default api;

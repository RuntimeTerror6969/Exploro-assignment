import { format, differenceInDays } from "date-fns";

// Format price to currency string
export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

// Format date to readable string
export const formatDate = (date) => {
  return format(new Date(date), "MMM d, yyyy");
};

// Calculate duration between two dates
export const calculateDuration = (startDate, endDate) => {
  return differenceInDays(new Date(endDate), new Date(startDate));
};

// Calculate refund amount based on cancellation policy
export const calculateRefundAmount = (
  bookingDate,
  tripStartDate,
  tripPrice
) => {
  const daysUntilTrip = differenceInDays(new Date(tripStartDate), new Date());

  if (daysUntilTrip >= 15) {
    return tripPrice; // 100% refund
  } else if (daysUntilTrip >= 7) {
    return tripPrice * 0.5; // 50% refund
  }
  return 0; // No refund
};

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength
export const isValidPassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

// Format error messages for display
export const formatErrorMessage = (error) => {
  if (typeof error === "string") return error;
  if (error.response?.data?.message) return error.response.data.message;
  return "An unexpected error occurred";
};

// Generate trip status badge color
export const getTripStatusColor = (status) => {
  const statusColors = {
    upcoming: "bg-blue-100 text-blue-800",
    "in-progress": "bg-green-100 text-green-800",
    completed: "bg-gray-100 text-gray-800",
    cancelled: "bg-red-100 text-red-800",
  };
  return statusColors[status] || statusColors["upcoming"];
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

// Sort trips by date
export const sortTripsByDate = (trips, ascending = true) => {
  return [...trips].sort((a, b) => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return ascending ? dateA - dateB : dateB - dateA;
  });
};

export const getAvailabilityStatus = (availableSlots) => {
  if (availableSlots === 0) return "Sold Out";
  if (availableSlots <= 5) return `Only ${availableSlots} spots left`;
  return `${availableSlots} spots available`;
};

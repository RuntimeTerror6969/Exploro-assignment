// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const Dashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("bookings");
  const [newTrip, setNewTrip] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    price: "",
    availableSlots: "",
  });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       if (user.role === "user") {
  //         const response = await axios.get(
  //           "http://localhost:5000/api/bookings/user",
  //           {
  //             headers: { Authorization: `Bearer ${user.token}` },
  //           }
  //         );
  //         setBookings(response.data);
  //       } else if (user.role === "organizer") {
  //         const [tripsResponse, bookingsResponse] = await Promise.all([
  //           axios.get("http://localhost:5000/api/trips/organizer", {
  //             headers: { Authorization: `Bearer ${user.token}` },
  //           }),
  //           axios.get("http://localhost:5000/api/bookings/organizer", {
  //             headers: { Authorization: `Bearer ${user.token}` },
  //           }),
  //         ]);
  //         setTrips(tripsResponse.data);
  //         setBookings(bookingsResponse.data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching dashboard data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [user]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("User role:", user.role);
        if (user.role === "user") {
          const response = await axios.get(
            "http://localhost:5000/api/bookings/user"
          );
          console.log("User bookings response:", response.data);
          setBookings(response.data);
        } else if (user.role === "organizer") {
          console.log("Fetching organizer data...");
          const [tripsResponse, bookingsResponse] = await Promise.all([
            axios.get("http://localhost:5000/api/trips/organizer"),
            axios.get("http://localhost:5000/api/bookings/organizer"),
          ]);
          console.log("Organizer trips:", tripsResponse.data);
          console.log("Organizer bookings:", bookingsResponse.data);
          setTrips(tripsResponse.data);
          setBookings(bookingsResponse.data);
        }
      } catch (error) {
        console.error("Dashboard fetch error:", error.response || error);
      }
    };
    fetchData();
  }, [user]);

  const handleNewTripSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/trips",
        newTrip,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setTrips([...trips, response.data]);
      setNewTrip({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        price: "",
        availableSlots: "",
      });
    } catch (error) {
      console.error("Error creating trip:", error);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/bookings/${bookingId}/cancel`,
        {},
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setBookings(bookings.filter((booking) => booking._id !== bookingId));
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {user.role === "organizer" && (
        <div className="mb-8">
          <div className="flex space-x-4 mb-4">
            <button
              className={`px-4 py-2 rounded ${
                activeTab === "bookings"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setActiveTab("bookings")}
            >
              Bookings
            </button>
            <button
              className={`px-4 py-2 rounded ${
                activeTab === "trips"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setActiveTab("trips")}
            >
              Manage Trips
            </button>
            <button
              className={`px-4 py-2 rounded ${
                activeTab === "new"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setActiveTab("new")}
            >
              Add New Trip
            </button>
          </div>

          {activeTab === "new" && (
            <form
              onSubmit={handleNewTripSubmit}
              className="max-w-2xl bg-white p-6 rounded-lg shadow"
            >
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Trip Name
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={newTrip.name}
                    onChange={(e) =>
                      setNewTrip({ ...newTrip, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows="3"
                    value={newTrip.description}
                    onChange={(e) =>
                      setNewTrip({ ...newTrip, description: e.target.value })
                    }
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={newTrip.startDate}
                    onChange={(e) =>
                      setNewTrip({ ...newTrip, startDate: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={newTrip.endDate}
                    onChange={(e) =>
                      setNewTrip({ ...newTrip, endDate: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    type="number"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={newTrip.price}
                    onChange={(e) =>
                      setNewTrip({ ...newTrip, price: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Available Slots
                  </label>
                  <input
                    type="number"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={newTrip.availableSlots}
                    onChange={(e) =>
                      setNewTrip({ ...newTrip, availableSlots: e.target.value })
                    }
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Create Trip
              </button>
            </form>
          )}

          {activeTab === "bookings" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Bookings</h2>
              {bookings.map((booking) => (
                <div key={booking._id} className="border-b py-4">
                  <p>
                    <strong>Trip:</strong> {booking.tripName}
                  </p>
                  <p>
                    <strong>Date:</strong> {booking.date}
                  </p>
                  <button
                    onClick={() => handleCancelBooking(booking._id)}
                    className="mt-2 text-red-600 hover:underline"
                  >
                    Cancel Booking
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "trips" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Manage Trips</h2>
              {trips.map((trip) => (
                <div key={trip._id} className="border-b py-4">
                  <p>
                    <strong>Name:</strong> {trip.name}
                  </p>
                  <p>
                    <strong>Description:</strong> {trip.description}
                  </p>
                  <p>
                    <strong>Price:</strong> ${trip.price}
                  </p>
                  <p>
                    <strong>Slots:</strong> {trip.availableSlots}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

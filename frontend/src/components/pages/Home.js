// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/trips");
        setTrips(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching trips:", error);
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Discover Amazing Destinations
        </h1>
        <p className="text-lg text-gray-600">
          Find and book your next adventure with us
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <div
            key={trip._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={`/api/placeholder/400/250`}
              alt={trip.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{trip.name}</h2>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {trip.description}
              </p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold text-blue-600">
                  ${trip.price}
                </span>
                <span className="text-sm text-gray-500">
                  {trip.availableSlots} slots left
                </span>
              </div>
              <Link
                to={`/trips/${trip._id}`}
                className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

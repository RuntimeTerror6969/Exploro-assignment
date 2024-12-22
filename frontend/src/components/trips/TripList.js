import React, { useState, useEffect } from "react";
import TripCard from "./TripCard";
import Loading from "../common/Loading";
import Alert from "../common/Alert";
import { fetchTrips } from "../utils/api";

const TripList = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTrips = async () => {
      try {
        setLoading(true);
        const data = await fetchTrips();
        setTrips(data);
        setError(null);
      } catch (err) {
        setError("Failed to load trips. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadTrips();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loading size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Alert type="error" message={error} />
      </div>
    );
  }

  if (trips.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900">
            No trips available
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Check back later for new adventures!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {trips.map((trip) => (
          <TripCard key={trip._id} trip={trip} />
        ))}
      </div>
    </div>
  );
};

export default TripList;

// src/pages/TripDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { addToCart } from "../utils/api";
const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/trips/${id}`
        );
        setTrip(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching trip details:", error);
        setLoading(false);
      }
    };

    fetchTripDetails();
  }, [id]);

  // const handleAddToCart = async () => {
  //   if (!user) {
  //     navigate("/login", { state: { from: `/trips/${id}` } });
  //     return;
  //   }

  //   setAddingToCart(true);
  //   try {
  //     await axios.post("http://localhost:5000/api/cart/add", {
  //       tripId: id,
  //       userId: user._id,
  //     });
  //     navigate("/cart");
  //   } catch (error) {
  //     console.error("Error adding to cart:", error);
  //     alert("Failed to add trip to cart");
  //   } finally {
  //     setAddingToCart(false);
  //   }
  // };
  const handleAddToCart = async () => {
    if (!user) {
      navigate("/login", { state: { from: `/trips/${id}` } });
      return;
    }

    setAddingToCart(true);
    try {
      await addToCart(id);
      navigate("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add trip to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-xl">Trip not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <img
          src={`/api/placeholder/800/400`}
          alt={trip.name}
          className="w-full h-96 object-cover rounded-lg mb-8"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-4">{trip.name}</h1>
            <p className="text-gray-600 mb-6">{trip.description}</p>

            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-gray-600 w-32">Start Date:</span>
                <span>{new Date(trip.startDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 w-32">End Date:</span>
                <span>{new Date(trip.endDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 w-32">Available Slots:</span>
                <span>{trip.availableSlots}</span>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">
                Cancellation Policy
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Full refund if cancelled 15 days prior to the trip date</li>
                <li>50% refund if cancelled 7 days prior</li>
                <li>No refund if cancelled less than 7 days prior</li>
              </ul>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <div className="text-center mb-6">
                <span className="text-3xl font-bold text-blue-600">
                  ${trip.price}
                </span>
                <span className="text-gray-600">/person</span>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={addingToCart || trip.availableSlots === 0}
                className={`w-full py-3 px-4 rounded-lg text-white font-semibold ${
                  addingToCart || trip.availableSlots === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {addingToCart
                  ? "Adding to Cart..."
                  : trip.availableSlots === 0
                  ? "Sold Out"
                  : "Add to Cart"}
              </button>

              <p className="text-sm text-gray-500 text-center mt-4">
                {trip.availableSlots} slots remaining
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;

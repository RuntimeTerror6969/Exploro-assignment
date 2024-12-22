// src/pages/Cart.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchCart = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/cart/${user._id}`
        );
        setCartItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setLoading(false);
      }
    };

    fetchCart();
  }, [user, navigate]);

  const handleRemoveItem = async (tripId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/cart/${user._id}/${tripId}`
      );
      setCartItems(cartItems.filter((item) => item.trip._id !== tripId));
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Failed to remove item from cart");
    }
  };

  const handleCheckout = async () => {
    setProcessing(true);
    try {
      // Dummy payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Create bookings
      const response = await axios.post(
        "http://localhost:5000/api/bookings/create",
        {
          userId: user._id,
          items: cartItems.map((item) => ({
            tripId: item.trip._id,
            price: item.trip.price,
          })),
        }
      );

      // Clear cart
      await axios.delete(`http://localhost:5000/api/cart/${user._id}`);

      navigate("/dashboard", { state: { bookingSuccess: true } });
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Failed to process checkout");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const total = cartItems.reduce((sum, item) => sum + item.trip.price, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Browse Trips
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.trip._id}
                className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={`/api/placeholder/100/100`}
                    alt={item.trip.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.trip.name}</h3>
                    <p className="text-gray-600">
                      {new Date(item.trip.startDate).toLocaleDateString()} -{" "}
                      {new Date(item.trip.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-xl font-bold">${item.trip.price}</span>
                  <button
                    onClick={() => handleRemoveItem(item.trip._id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${(total * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${(total * 1.1).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                disabled={processing}
                className={`w-full py-3 px-4 rounded-lg text-white font-semibold ${
                  processing
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {processing ? "Processing..." : "Proceed to Checkout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

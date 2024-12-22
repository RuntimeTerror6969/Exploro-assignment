import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import TripDetails from "./pages/TripDetails";
// import Dashboard from "./pages/Dashboard";
// TripList
import { AuthProvider } from "./context/AuthContext";
import Home from "./components/pages/Home";
import Register from "./components/pages/Register";
import TripDetails from "./components/pages/TripDetails";
import Dashboard from "./components/pages/Dashboard";
import Login from "./components/pages/Login";
import TripList from "./components/trips/TripList";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/trips" element={<TripList />} />
            <Route path="/trips/:id" element={<TripDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

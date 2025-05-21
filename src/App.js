import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";

// Contexts
import { useAuth } from "./contexts/AuthContext";

// Common
import Layout from "./components/Layout";
import { ThemeProvider } from "./contexts/ThemeContext";

// User Pages
import HomePage from "./pages/HomePage";
import CarRides from "./components/Services/Car_Rides";
import Rentals from "./components/Services/Rentals";
import Auto_Rides from "./components/Services/Auto_Rides";
import Bike_Rides from "./components/Services/Bike_Rides";
import Intercity from "./components/Services/Intercity";
import Book_Ride from "./components/Services/Book_Ride";
import SignUp from "./components/User/Signup";
import Login from "./components/User/Login";
import OTPVerification from "./components/User/OTPVerification";
import ProfileLayout from "./components/profile/ProfileLayout";
import Aboutpage from "./components/Aboutpage/Aboutpage";
import Allcities from "./components/Aboutpage/Allcities";
import RideBooking from "./components/Home/RideBooking";
import BookRide from "./pages/BookRide";
import BikeRide from "./components/rides/BikeRide";
import ConfirmRide from "./components/rides/ConfirmRide";
import AddPaymentMethod from "./components/rides/AddPaymentMethod";
import RideTrackingPage from "./components/rides/RideTrackingPage";
import RideCompleted from "./components/rides/RideCompleted";
import HeroSafety from "./components/Safety/HeroSafety";

// Driver Pages
import DriverDashboard from './components/DriverDashboard/Page/DriverDashboard';
import DriverPannle from './components/DriverDashboard/DriverPannle';
import RideHistory from './components/DriverDashboard/Page/RideHistory';
import Earnings from './components/DriverDashboard/Page/Earnings';
import Profile from './components/DriverDashboard/Page/Profile';
import Support from './components/DriverDashboard/Page/Support';
import Settings from './components/DriverDashboard/Page/Settings';

function App() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user && window.location.pathname === "/profile") {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="App">
      <Layout>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/carrides" element={<CarRides />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/Auto_rides" element={<Auto_Rides />} />
          <Route path="/Bike_rides" element={<Bike_Rides />} />
          <Route path="/Intercity" element={<Intercity />} />
          <Route path="/Book_ride" element={<Book_Ride />} />
          <Route path="/about" element={<Aboutpage />} />
          <Route path="/allcities" element={<Allcities />} />
          <Route path="/Safety" element={<HeroSafety />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otpverification" element={<OTPVerification />} />
          <Route path="/profile" element={<ProfileLayout />} />
          <Route path="/book" element={<RideBooking />} />
          <Route path="/book-ride" element={<BookRide />} />
          <Route path="/bike-ride" element={<BikeRide />} />
          <Route path="/confirm" element={<ConfirmRide />} />
          <Route path="/add-payment" element={<AddPaymentMethod />} />
          <Route path="/ride-tracking" element={<RideTrackingPage />} />
          <Route path="/rating" element={<RideCompleted />} />

         

         {/* Driver side  */}
              {/* Protected driver routes */}
              <Route path='/driver' element={
                  <DriverPannle />
              }>
                <Route index element={<DriverDashboard />} />
                <Route path='ridehistory' element={<RideHistory />} />
                <Route path='earnings' element={<Earnings />} />
                <Route path='profile' element={<Profile />} />
                <Route path='support' element={<Support />} />
                <Route path='settings' element={<Settings />} />
              </Route>
        </Routes>
      </Layout>
    </div>
  );
}

export default App;


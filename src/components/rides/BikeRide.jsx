import React from "react";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
// import Footer from "../component/Footer";

export default function BikeRide() {
  const handlePayment = () => {
    const options = {
      key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay key
      amount: 9900, // 99 INR in paise
      currency: "INR",
      name: "GreenBike",
      description: "Ride Booking Payment",
      image: "/icons/bike.png",
      handler: function (response) {
        alert("Payment successful. Payment ID: " + response.razorpay_payment_id);
        // Here, you can redirect or confirm the ride
      },
      prefill: {
        name: "Test User",
        email: "user@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#0f172a",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <div className="min-h-[85vh] bg-white daek:bg-[#0f1624] text-black dark:text-white flex items-center justify-center px-4 py-10">
        <div className="bg-whitedark:bg-[#1f2a3b] rounded-2xl w-full max-w-3xl p-6 sm:p-8 shadow-2xl">

          {/* Top Section */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-start">Book Your Ride</h1>
          </div>

          {/* Available Rides + Back Button */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-semibold text-start">Available Rides</h2>
              <p className="text-sm text-gray-400 text-start">
                Scheduled for 2025-05-08 at 12:26
              </p>
            </div>
            <Link to="/book-ride">
              <button className="dark:bg-[#0b111c] border hover:bg-green-900 dark:text-white text-sm px-5 py-2.5 rounded-lg cursor-pointer hover:bg-green-200/100">
                Back
              </button>
            </Link>
          </div>

          {/* Ride Box */}
          <div className="bg-white dark:bg-[#0b111c] shadow-xl hover:border border-green-600 dark:border-none p-5 rounded-xl flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-[#14532d33] p-3 sm:p-4 rounded-full">
                  <img
                    src="/icons/bike.png"
                    alt="bike"
                    className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                  />
                </div>
                <div>
                  <p className="font-semibold text-black dark:text-white text-lg text-start">GreenBike</p>
                  <p className="text-sm text-gray-400">
                    Quick & affordable bike rides
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-semibold text-xl">₹99</p>
                <p className="text-xs text-gray-400">ETA: 4 mins</p>
              </div>
            </div>

            <hr className="border-gray-700" />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex gap-3">

                <Link to={"/confirm"}>
                  <button
                    onClick={handlePayment}
                    className="bg-[#F3F4F6] dark:bg-[#2e3c51] hover:bg-[#3a4b65] text-black  dark:text-white px-2 py-1.5 rounded-2xl text-sm font-medium cursor-pointer hover:bg-[#F3F4F6]"
                  >
                    Fastest Option
                  </button>
                </Link>
                <Link to={"/confirm"}>
                <button
                  onClick={handlePayment}
                  className="bg-[#F3F4F6] dark:bg-[#2e3c51] hover:bg-[#3a4b65] text-black dark:text-white px-2 py-1.5 rounded-2xl text-sm font-medium cursor-pointer hover:bg-[#F3F4F6]"
                >
                  Economical
                </button>
                </Link>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <User className="w-5 h-5" />
                <span>1 Passenger</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

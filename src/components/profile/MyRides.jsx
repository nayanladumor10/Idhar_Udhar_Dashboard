import React from "react";
import { Car, Bike } from "lucide-react";
import { Link } from "react-router-dom";

const MyRides = () => {
  const rides = [
    {
      type: "GreenCar Ride",
      icon: <Car className="w-6 h-6" />,
      date: "15 Jun 2023",
      time: "09:30 AM",
      from: "Andheri East",
      to: "Bandra Kurla Complex",
      status: "upcoming",
      amount: "₹350",
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-500",
    },
    {
      type: "GreenBike Ride",
      icon: <Bike className="w-6 h-6" />,
      date: "14 Jun 2023",
      time: "06:15 PM",
      from: "Powai",
      to: "Vikhroli",
      status: "completed",
      amount: "₹120",
      iconBg: "bg-green-500/20",
      iconColor: "text-green-500",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-black dark:text-white">
          Your Recent Rides
        </h2>
        <button className="text-white bg-green-500 hover:bg-green-600  dark:bg-[#010514] dark:border border-gray-500 px-4 py-2 rounded-lg">
          View All Rides
        </button>
      </div>

      <div className="space-y-4">
        {rides.map((ride, index) => (
          <div
            key={index}
            className="bg-white shadow-xl dark:bg-[#010514] rounded-lg p-4 transition-colors shadow-[0.5px_0_0_white,-0.5px_0_0_white,0_0.5px_0_white]"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div
                  className={`w-12 h-12 ${ride.iconBg} ${ride.iconColor} rounded-lg flex items-center justify-center mr-4`}
                >
                  {ride.icon}
                </div>
                <div>
                  <h3 className="text-black dark:text-white font-medium">
                    {ride.type}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {ride.date} • {ride.time}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-black dark:text-white font-medium">
                  {ride.amount}
                </p>
                <p
                  className={`text-sm ${
                    ride.status === "upcoming"
                      ? "text-blue-400"
                      : "text-green-500"
                  }`}
                >
                  {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                </p>
              </div>
            </div>

            {/* FROM - TO Locations with dots aligned horizontally */}
            <div className="relative pl-3 ml-6">
              <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-gray-700"></div>{" "}
              {/* Adjusted top and bottom */}
              <div className="flex items-center mb-2">
                <div className="absolute -left-[7.5px] w-4 h-4 bg-green-500 rounded-full"></div>
                <p className="text-black dark:text-white ml-4">{ride.from}</p>
              </div>
              <div className="flex items-center">
                <div className="absolute -left-[7.5px] w-4 h-4 bg-red-500 rounded-full"></div>
                <p className="text-black dark:text-white ml-4">{ride.to}</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-4">
              {ride.status === "upcoming" ? (
                <>
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg w-[120px]">
                    Track Ride
                  </button>
                  <button className="dark:bg-gray-700 dark:hover:bg-gray-600 border border-gray-600 text-black dark:text-white px-4 py-2 rounded-lg">
                    View Details
                  </button>
                </>
              ) : (
                <>
                  <button className="dark:bg-gray-700 dark:hover:bg-gray-600 border border-gray-600 text-black dark:text-white px-4 py-2 rounded-lg">
                    View Details
                  </button>
                  <button className="dark:bg-gray-700 dark:hover:bg-gray-600 border border-gray-600 text-black dark:text-white px-4 py-2 rounded-lg">
                    Book Again
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Book New Ride Button */}
      <div className="flex justify-center mt-6">
        <Link to="/Book_ride">
        <button className="bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg py-3 w-[200px]">
          Book a New Ride
        </button>
        </Link>
        {/* <button className="bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg py-3 w-[200px]">
          Book a New Ride
        </button> */}
      </div>
    </div>
  );
};

export default MyRides;

import React, { useState } from 'react';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const navigate = useNavigate();

  const isDisabled = !pickup.trim() || !dropoff.trim();

  const handleFindRides = () => {
    if (!isDisabled) {
      navigate(`/book?pickup=${encodeURIComponent(pickup)}&dropoff=${encodeURIComponent(dropoff)}`);
    }
  };

  return (
    <div className="relative bg-[#0f683e] text-white px-6 py-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-[-100px] right-[-100px] w-[200px] h-[200px] rounded-full bg-white/10 animate-pulse blur-2xl z-0"></div>
      <div className="absolute bottom-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-white/10 animate-pulse blur-2xl z-0"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10 items-center">
        {/* Left content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            The Future of <br />
            <span className="text-green-400">Ride Sharing</span> <br />
            is <span className="text-green-400">Green & Sustainable</span>
          </h1>
          <p className="text-gray-200 mt-4 text-base md:text-lg max-w-md">
            Experience seamless, eco-friendly rides at your fingertips. Idhar-Udhar connects you with reliable drivers in over 500+ cities nationwide.
          </p>

          {/* Form */}
          <div className="mt-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 space-y-4 shadow-lg w-full max-w-lg">
            <div className="flex items-center bg-white/10 rounded-md px-3 py-2">
              <FaMapMarkerAlt className="text-green-300 mr-3" />
              <input
                type="text"
                placeholder="Pickup Location"
                className="bg-transparent outline-none w-full text-white placeholder-gray-300"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
              />
            </div>
            <div className="flex items-center bg-white/10 rounded-md px-3 py-2">
              <FaMapMarkerAlt className="text-green-300 mr-3" />
              <input
                type="text"
                placeholder="Dropoff Location"
                className="bg-transparent outline-none w-full text-white placeholder-gray-300"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
              />
            </div>

            <button
              onClick={handleFindRides}
              disabled={isDisabled}
              className={`w-full py-2 rounded-md flex items-center justify-center gap-2 font-semibold  cursor-pointer
                ${isDisabled ? 'bg-green-800 cursor-not-allowed opacity-50' : 'bg-green-500 hover:bg-green-600 text-white'}`}
            >
              <FaSearch />
              Find Rides
            </button>
          </div>
        </div>

        {/* Right side with car */}
        <div className="relative group transition-all duration-700 ease-in-out transform hover:scale-[1.02] hidden lg:block">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/10 backdrop-blur-sm">
            <img
              src="/Car.png"
              alt="Electric Car"
              className="w-full h-full object-cover"
            />
            <div className="p-5 bg-gradient-to-t from-black/60 to-transparent">
              <div className="flex items-center gap-3">
                <div className="bg-green-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">G</div>
                <div>
                  <p className="font-semibold">IdharUdhar Premium</p>
                  <p className="text-green-300 text-sm">Electric Luxury Experience</p>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-300">Starting at</p>
              <p className="text-2xl font-bold text-white">₹199</p>
            </div>
            <button className="absolute bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow-md z-10">
              Book Now
            </button>
          </div>
          <div className="absolute top-[-20px] right-[-20px] w-[80px] h-[80px] rounded-full bg-green-400/20 animate-ping z-0"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

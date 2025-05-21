import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MapPin,
  Phone,
  ShieldCheck,
  MessageCircle,
  AlertTriangle,
  Clock,
} from "lucide-react";

const RideTrackingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [progress, setProgress] = useState(0);
  const [displayMinutes, setDisplayMinutes] = useState("3 min");

  useEffect(() => {
    if (location.state?.showPopup) {
      setShowPopup(true);
      const timer = setTimeout(() => setShowPopup(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  useEffect(() => {
    const totalDuration = 180; // 3 minutes in seconds
    const displayDuration = 5; // finish in 5 real seconds
    let secondsLeft = totalDuration;
    let elapsed = 0;

    const interval = setInterval(() => {
      const progressPercent = ((elapsed + 1) / displayDuration) * 100;
      setProgress(progressPercent > 100 ? 100 : progressPercent);

      const mins = Math.floor(secondsLeft / 60);
      setDisplayMinutes(`${mins} min`);

      secondsLeft--;
      elapsed++;

      if (elapsed >= displayDuration) {
        clearInterval(interval);
        setProgress(100);
        setDisplayMinutes("0 min");
        setTimeout(() => navigate("/rating"), 500);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f172a] text-black dark:text-white flex items-center justify-center p-6 relative">
      <style>
        {`
          @keyframes slide-up {
            from {
              transform: translateY(20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          .animate-slide-up {
            animation: slide-up 0.4s ease-out;
          }
        `}
      </style>

      <div className="bg-white dark:bg-[#1e293b] w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden">
        <div className="w-full bg-[#E5E7EB] dark;bg-gray-600 h-70 p-6 border-b border-gray-700 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-gray-400">Interactive map would be displayed here</p>
          <div className="mt-2 text-xs text-gray-500 space-y-1">
            <div>Driver: 22:52:02, 7/2/2023</div>
            <div>Pickup: 22:52:10, 7/2/2023</div>
            <div>Dropoff: 23:15:55, 7/2/2023</div>
          </div>
        </div>

        <div className="w-full bg-green-600 text-white text-lg px-6 py-2">
          <div className="flex justify-between items-center p-2">
            <span className="font-semibold">Driver is on the way to pickup</span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> {displayMinutes}
            </span>
          </div>
          <div className="h-3 mt-2 bg-green-500 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-400 rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-black dark:text-white font-semibold text-lg mb-4">
            Your Ride <span className="text-sm text-gray-400">Order #TR-320995</span>
          </h2>

          <div className="mb-4 space-y-3">
            <div className="flex items-start gap-3 text-sm">
              <MapPin className="text-green-500 w-5 h-5 mt-1" />
              <div>
                <p className="text-black dark:text-white font-semibold text-start">Pickup</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">123 Green Avenue, Sector 15</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-sm">
              <MapPin className="text-green-500 w-5 h-5 mt-1" />
              <div>
                <p className="text-black dark:text-white font-semibold text-start">Dropoff</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">GreenTech Business Park, Cyber City</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-gray-700 pt-4">
            <div className="flex items-center gap-4">
              <img
                src="https://i.pravatar.cc/100?img=12"
                className="rounded-full w-12 h-12"
                alt="Driver"
              />
              <div>
                <p className="text-black dark:text-white font-semibold">Rahul Singh</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">⭐ 4.8 • 1243 trips</p>
              </div>
            </div>
            <div className="text-right text-sm text-black dark:text-white leading-5">
              <p className="text-gray-600 dark:text-gray-400 font-semibold">Honda City</p>
              <p className="font-semibold">DL 01 AB 1234</p>
              <p>White</p>
            </div>
          </div>

          <div className="flex gap-3 mt-5">
            <button className="flex items-center  justify-center gap-2 bg-[#16A34A] w-full py-2 rounded text-sm font-medium hover:bg-green-700 transition">
              <Phone className="w-4 h-4 text-black dark:text-white" /> Call Driver
            </button>
            <button className="flex items-center justify-center gap-2 bg-white dark:bg-[#0f172a] border border-gray-700 w-full py-2 rounded text-sm font-medium  transition">
              <MessageCircle className="w-4 h-4" /> Message
            </button>
          </div>

          <div className="border border-gray-500/50 dark:border-none bg-white dark:bg-[#0f172a] p-4 mt-5 rounded-md text-sm">
            <div className="flex items-start gap-3">
              <ShieldCheck className="text-green-500 w-5 h-5 mt-1" />
              <div>
                <p className="text-black dark:text-white font-semibold text-start">Trip Safety</p>
                <p className="text-gray-600 dark:text-gray-400 text-xs text-start">
                  Share your trip status with friends and family for added safety. Your ride is protected with insurance coverage.
                </p>
                <button className="mt-2 text-xs text-green-600 dark:text-green-400 font-medium hover:underline text-start">
                  Share trip status
                </button>
              </div>
            </div>
          </div>

          <button className="flex items-center justify-center gap-2 bg-red-600 mt-5 w-full py-3 rounded text-sm font-semibold hover:bg-red-700 transition text-white">
            <AlertTriangle className="w-4 h-4" /> SOS Emergency Button
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-gray-950 text-white px-6 py-5 rounded-xl shadow-xl flex items-start gap-4 w-96 animate-slide-up relative">
            <div className="flex-1">
              <p className="font-semibold text-lg">Ride Confirmed</p>
              <p className="text-sm text-white/90">Your ride has been booked successfully.</p>
            </div>
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-3 text-white hover:text-white/70 text-xl font-bold cursor-pointer"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RideTrackingPage;

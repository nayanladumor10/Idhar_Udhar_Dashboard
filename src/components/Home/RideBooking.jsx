import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
// import Footer from "./Footer";

const RideBooking = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const [pickup, setPickup] = useState("");
    const [dropoff, setDropoff] = useState("");
    const [activeTab, setActiveTab] = useState("now");
    const [scheduleDate, setScheduleDate] = useState("");
    const [scheduleTime, setScheduleTime] = useState("");

    useEffect(() => {
        const pickupParam = params.get("pickup");
        const dropoffParam = params.get("dropoff");

        if (pickupParam) setPickup(pickupParam);
        if (dropoffParam) setDropoff(dropoffParam);

        if (activeTab === "schedule") {
            getCurrentDateTime();
        }
    }, [location.search, activeTab]);

    const getCurrentDateTime = () => {
        const now = new Date();
        now.setMinutes(now.getMinutes() + 15);

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;

        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const formattedTime = `${hours}:${minutes}`;

        setScheduleDate(formattedDate);
        setScheduleTime(formattedTime);
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (tab === "schedule") {
            getCurrentDateTime();
        }
    };

    return (
        <>
            <div className="min-h-[85vh] bg-white dark:bg-[#0f172a] flex items-center justify-center px-4 py-30">
                <div className="w-full max-w-3xl bg-white dark:bg-[#1e293b] text-black dark:text-white rounded-2xl p-8 shadow-xl space-y-6">
                    <h2 className="text-2xl font-bold text-start">Book Your Ride</h2>

                    <div>
                        <label className="text-sm font-medium mb-1 block text-start">Pickup Location</label>
                        <div className="flex items-center bg-[#f1f5f9] dark:bg-[#0f172a] px-4 py-3 rounded-lg">
                            <FaMapMarkerAlt className="text-gray-400 mr-3 text-lg" />
                            <input
                                type="text"
                                value={pickup}
                                onChange={(e) => setPickup(e.target.value)}
                                className="bg-transparent w-full outline-none text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                                placeholder="Enter pickup"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-1 block text-start">Dropoff Location</label>
                        <div className="flex items-center bg-[#f1f5f9] dark:bg-[#0f172a] px-4 py-3 rounded-lg">
                            <FaPaperPlane className="text-gray-400 mr-3 text-lg" />
                            <input
                                type="text"
                                value={dropoff}
                                onChange={(e) => setDropoff(e.target.value)}
                                className="bg-transparent w-full outline-none text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                                placeholder="Enter dropoff"
                            />
                        </div>
                    </div>

                    {activeTab === "schedule" && (
                        <>
                            <div>
                                <label className="text-sm font-medium mb-1 block">Date</label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={scheduleDate}
                                        onChange={(e) => setScheduleDate(e.target.value)}
                                        min={new Date().toISOString().split("T")[0]}
                                        className="bg-[#f1f5f9] dark:bg-[#0f172a] text-black dark:text-white w-full rounded-lg py-3 pl-10 pr-4 outline-none placeholder-gray-400 dark:placeholder-gray-500 appearance-none"
                                    />
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" className=" w-5 h-5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="text-sm font-medium mb-1 block">Time</label>
                                <div className="relative">
                                    <input
                                        type="time"
                                        value={scheduleTime}
                                        onChange={(e) => setScheduleTime(e.target.value)}
                                        className="bg-[#f1f5f9] dark:bg-[#0f172a] text-black dark:text-white w-full rounded-lg py-3 pl-10 pr-4 outline-none placeholder-gray-400 dark:placeholder-gray-500 appearance-none"
                                    />
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2M12 2a10 10 0 100 20 10 10 0 000-20z" />
                                        </svg>
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                                    Rides can be scheduled at least 15 minutes in advance
                                </p>
                            </div>
                        </>
                    )}

                    <div className="flex bg-[#f1f5f9] dark:bg-[#0f172a] rounded-lg overflow-hidden">
                        <button
                            onClick={() => handleTabClick("now")}
                            className={`w-1/2 py-2 font-semibold cursor-pointer text-sm ${activeTab === "now" ? "bg-[#020617] text-white dark:bg-white dark:text-black" : "text-gray-400 dark:text-gray-300"}`}
                        >
                            Ride Now
                        </button>
                        <button
                            onClick={() => handleTabClick("schedule")}
                            className={`w-1/2 py-2 font-semibold cursor-pointer text-sm ${activeTab === "schedule" ? "bg-[#020617] text-white dark:bg-white dark:text-black" : "text-gray-400 dark:text-gray-300"}`}
                        >
                            Schedule
                        </button>
                    </div>

                    <p className="text-sm text-gray-400 dark:text-gray-500 text-start">
                        {activeTab === "now"
                            ? "Book a ride for immediate pickup at your location"
                            : "Schedule your ride for later pickup"}
                    </p>

                    <Link
                        to={`/book-ride?pickup=${pickup}&dropoff=${dropoff}`}
                        className="block w-full text-center bg-green-500 hover:bg-green-600 transition duration-200 text-white font-semibold py-3 rounded-md"
                    >
                        Find Rides
                    </Link>
                </div>
            </div>
            {/* <Footer /> */}
        </>
    );
};

export default RideBooking;

import React, { useState } from "react";

const SafetyGuidelines = () => {
  const [activeTab, setActiveTab] = useState("driver");

  const riderGuidelines = [
    {
      title: "Verify Your Ride",
      description:
        "Always confirm the driver's name, car model, and license plate before getting in. Ensure they know your name as the rider.",
    },
    {
      title: "Share Your Trip Details",
      description:
        "Use the Share My Trip feature to let family or friends follow your journey in real-time.",
    },
    {
      title: "Ride in the Back Seat",
      description:
        "When traveling alone, sit in the back seat to give yourself and your driver personal space.",
    },
    {
      title: "Trust Your Instincts",
      description:
        "If you feel uncomfortable for any reason, ask the driver to end the ride early. Your safety comes first.",
    },
    {
      title: "Rate Your Experience",
      description:
        "Always rate your driver after the ride. Your feedback helps improve the experience for everyone",
    },
  ];

  const driverGuidelines = [
    {
      title: "Verify Your Rider",
      description:
        "Always confirm the rider's name before starting the journey. Never accept rides outside the app.",
    },
    {
      title: "Maintain Your Vehicle",
      description:
        "Ensure your vehicle is regularly serviced and meets all safety standards required by GreenGlide.",
    },
    {
      title: "Follow Traffic Rules",
      description:
        "Always follow traffic regulations, speed limits, and avoid distractions while driving.",
    },
    {
      title: "Emergency Protocols",
      description:
        "Familiarize yourself with emergency procedures and how to use the in-app emergency features.",
    },
    {
      title: "Report Issues",
      description:
        "Report any safety concerns, unusual incidents, or inappropriate rider behavior immediately via the app.",
    },
  ];

  const guidelines =
    activeTab === "driver" ? driverGuidelines : riderGuidelines;

  return (
    <section className="w-full px-4 sm:px-6 py-10 bg-[#F9FAFB] dark:bg-[#1C2431] text-black dark:text-white">
      <div className="max-w-4xl mx-auto text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
          Safety Guidelines
        </h2>

        <div className="max-w-4xl mx-auto flex  flex-row  items-center gap-1 mb-6">
          <button
            onClick={() => setActiveTab("rider")}
            className={`w-full sm:w-1/2 py-2 rounded-lg  transition-all duration-300 ${
              activeTab === "rider"
                ? "bg-white dark:bg-black shadow"
                : "bg-[#F1F5F9] dark:bg-[#1E293B] dark:text-gray-300 text-gray-600"
            }`}
          >
            For Riders
          </button>
          <button
            onClick={() => setActiveTab("driver")}
            className={`w-full sm:w-1/2 py-2 rounded-lg  transition-all duration-300 ${
              activeTab === "driver"
                ? "bg-white dark:bg-black shadow"
                : "bg-[#F1F5F9] dark:bg-[#1E293B] dark:text-gray-300 text-gray-600"
            }`}
          >
            For Drivers
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto rounded-xl bg-white dark:bg-[#2B3443] p-6 sm:p-10 shadow-lg">
        <ul className="space-y-6">
          {guidelines.map((item, index) => (
            <li key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-[#DCFCE7] dark:bg-[] text-green-600 flex items-center justify-center font-bold shadow-sm shadow-green-300/50">
                  {index + 1}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-start">{item.title}</h3>
                <p className="text-sm sm:text-base dark:text-gray-300 text-gray-600 mt-1 text-start">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SafetyGuidelines;

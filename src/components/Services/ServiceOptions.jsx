import React from "react";
import { Link } from "react-router-dom";
// import Footer from "./Footer";

const ServiceOptions = () => {
  const services = [
    {
      title: "Bike Ride",
      desc: "Quick & affordable bike rides",
      icon: "/icons/bike.png",
      img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
      route: "/bike-ride",
    },
    {
      title: "Car Ride",
      desc: "Comfortable sedans for daily commute",
      icon: "/icons/car.png",
      img: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Auto Ride",
      desc: "Convenient three-wheeler auto rides",
      icon: "/icons/road.png",
      img: "https://i.pinimg.com/736x/64/eb/ef/64ebefbbd558d77f1a1e0d01a4e050c1.jpg",
    },
    {
      title: "Courier Delivery",
      desc: "Fast & secure package delivery",
      icon: "/icons/box.png",
      img: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Food Delivery",
      desc: "Deliver food from restaurants to your doorstep",
      icon: "/icons/cutlery.png",
      img: "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Grocery Delivery",
      desc: "Convenient grocery delivery to your home",
      icon: "/icons/food-pack.png",
      img: "https://images.unsplash.com/photo-1543168256-418811576931?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <>
      <div className="bg-white dark:bg-[#101826] min-h-screen flex items-center justify-center px-4 py-30 text-black dark:text-white">
        <div className="bg-white dark:bg-[#1C2838] p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-2xl">
          <h2 className="text-3xl font-bold mb-1 text-start">Book Your Ride</h2>
          <p className="text-lg font-semibold text-start">Select Service Type</p>
          <p className="text-sm text-gray-400 dark:text-gray-300 mb-6 text-start">
            Choose what kind of service you need
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((s, i) => {
              const Card = (
                <div
                  className="relative rounded-xl overflow-hidden group cursor-pointer hover:scale-[1.02] transition duration-300 ease-in-out shadow-lg hover:shadow-2xl" // Increased shadow here
                  style={{ height: "160px" }}
                >
                  <img
                    src={s.img}
                    alt={`${s.title} background`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4 flex flex-col justify-end">
                    <div className="mb-4">
                      <div className="w-[60px] h-[60px] bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                        <img
                          src={s.icon}
                          alt={`${s.title} icon`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-white text-start">{s.title}</div>
                    <div className="text-sm text-gray-300 text-start">{s.desc}</div>
                  </div>
                </div>
              );

              return s.route ? (
                <Link to={s.route} key={i}>
                  {Card}
                </Link>
              ) : (
                <div key={i}>{Card}</div>
              );
            })}
          </div>
        </div>
      </div>

      {/* <Footer/> */}
    </>
  );
};

export default ServiceOptions;

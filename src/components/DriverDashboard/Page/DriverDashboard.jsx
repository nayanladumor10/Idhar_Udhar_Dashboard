import React from 'react';
import { useGlobalContext } from '../../../contexts/GlobalContext';
// import { useGlobalContext } from '../Context/GlobalContext';

export default function DriverDashboard() {
  const { Isonline, ToggleOnline } = useGlobalContext();
  
  const Complated_rides = [
    {
      earning: 12.75,
      time: "13 minute ago",
      status: "completed"
    },
    {
      time: "42 minute ago",
      status: "Cancled"
    },
    {
      earning: 22.75,
      time: "1 hour ago",
      status: "completed"
    },
  ];

  return (
    <div className='bg-gray-100 dark:bg-gray-950 p-4 sm:p-5'>
      <h3 className='text-2xl sm:text-3xl text-gray-800 dark:text-white text-start mt-1 sm:mt-2 font-medium'>Welcome back, John Red</h3>
      <p className='text-gray-600 dark:text-gray-400 w-full text-start mt-1 text-sm sm:text-base'>
        {Isonline 
          ? "You are online and ready to receive ride requests." 
          : "You are currently offline. Go online to start receiving ride requests."
        }
      </p>

      {!Isonline && (
        <div className="w-full sm:w-[95%] bg-white dark:bg-gray-200/10 border border-gray-300 dark:border-gray-400/20 rounded-lg mx-auto mt-4 sm:mt-5 text-gray-600 dark:text-gray-400 flex flex-col justify-center items-center gap-2 py-4 sm:py-6 px-2">
          <i className="fas fa-car-side text-2xl sm:text-3xl text-gray-700 dark:text-gray-400"></i>
          <h3 className='text-gray-800 dark:text-white text-xl sm:text-2xl font-medium'>You're Offline</h3>
          <p className='text-center text-sm sm:text-base'>Go online to start receiving ride requests and earning money.</p>
          <button 
            className='h-9 sm:h-10 px-4 sm:px-6 bg-green-600/80 hover:bg-green-700 text-white rounded-lg animate-pulse cursor-pointer transition-colors text-sm sm:text-base'
            onClick={ToggleOnline}
          >
            Go Online
          </button>
        </div>
      )}

      <div className="w-full sm:w-[95%] mx-auto mt-4 sm:mt-5 grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-3 sm:gap-4">
        <div className="bg-white dark:bg-gray-200/10 md:w-[22%] h-20 sm:h-22 flex flex-col justify-center items-start gap-1 rounded-lg ps-3 sm:ps-4 hover:bg-gray-100 dark:hover:bg-gray-700/60 cursor-default transition-all duration-200">
          <h6 className='text-gray-600 dark:text-gray-400 text-xs sm:text-sm'><i className="fas fa-money-bill-wave text-green-500 text-lg sm:text-xl mr-1"></i> Today's Earnings</h6>
          <h3 className='text-green-500 text-xl sm:text-2xl font-medium'>$86.50 <span className='text-xs sm:text-sm text-gray-500 dark:text-gray-400/70'>7 rides</span></h3>
        </div>
        <div className="bg-white dark:bg-gray-200/10 h-20 md:w-[22%] sm:h-22 flex flex-col justify-center items-start gap-1 rounded-lg ps-3 sm:ps-4 hover:bg-gray-100 dark:hover:bg-gray-700/60 cursor-default transition-all duration-200">
          <h6 className='text-gray-600 dark:text-gray-400 text-xs sm:text-sm'><i className="fas fa-star text-yellow-500 text-lg sm:text-xl mr-1"></i> Ratings</h6>
          <h3 className='text-yellow-500 text-xl sm:text-2xl font-medium'>4.8 <span className='text-xs sm:text-sm text-gray-500 dark:text-gray-400/70'>Excellent</span></h3>
        </div>
        <div className="bg-white dark:bg-gray-200/10 h-20 md:w-[22%] sm:h-22 flex flex-col justify-center items-start gap-1 rounded-lg ps-3 sm:ps-4 hover:bg-gray-100 dark:hover:bg-gray-700/60 cursor-default transition-all duration-200">
          <h6 className='text-gray-600 dark:text-gray-400 text-xs sm:text-sm'><i className="fas fa-check-circle text-green-500 text-lg sm:text-xl mr-1"></i> Acceptance Rate</h6>
          <h3 className='text-green-500 text-xl sm:text-2xl font-medium'>95% <span className='text-xs sm:text-sm text-gray-500 dark:text-gray-400/70'>Good standing</span></h3>
        </div>
        <div className="bg-white dark:bg-gray-200/10 h-20 md:w-[22%] sm:h-22 flex flex-col justify-center items-start gap-1 rounded-lg ps-3 sm:ps-4 hover:bg-gray-100 dark:hover:bg-gray-700/60 cursor-default transition-all duration-200">
          <h6 className='text-gray-600 dark:text-gray-400 text-xs sm:text-sm'><i className="fas fa-clock text-blue-500 text-lg sm:text-xl mr-1"></i> Online Hours</h6>
          <h3 className='text-blue-500 text-xl sm:text-2xl font-medium'>5.5h<span className='text-xs sm:text-sm text-gray-500 dark:text-gray-400/70'> 7 rides</span></h3>
        </div>
      </div>

      <div className="w-full sm:w-[95%] mx-auto mt-5 sm:mt-7 flex flex-col sm:flex-row gap-4">
        <div className="bg-white dark:bg-gray-200/10 w-full rounded-lg p-3">
          <h3 className='text-start text-lg text-gray-800 dark:text-white font-medium'>Recent Rides</h3>
          <div className='mt-3 space-y-3'>
            {Complated_rides.map((ride, i) => (
              <div 
                key={i}
                className="h-14 sm:h-15 w-full rounded-lg border border-gray-200 dark:border-gray-400/30 flex items-center px-2 sm:px-3 relative hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-all duration-200"
              >
                <div className={`h-8 sm:h-10 w-8 sm:w-10 rounded-full ${ride.status === "completed" ? 'bg-green-100 dark:bg-green-500/60' : 'bg-red-100 dark:bg-red-500/60'} flex justify-center items-center`}>
                  <i className={`fas fa-money-bill-wave ${ride.status === "completed" ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'} text-xs sm:text-sm`}></i>
                </div>
                <div className="ml-3 sm:ml-4">
                  <h3 className='text-sm sm:text-base text-gray-800 dark:text-white leading-5 text-start'>
                    Ride {ride.status} <br /> 
                    <span className='text-xs sm:text-sm text-gray-500 dark:text-gray-400'>{ride.time}</span>
                  </h3>
                </div>
                <div className="absolute right-3 sm:right-4">
                  <span className={`text-sm sm:text-base ${ride.status === "completed" ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"}`}>
                    {ride.status === "completed" ? `+ ${ride.earning}` : 'Canceled'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-200/10 w-full sm:w-[35%] rounded-lg p-3">
          <h3 className='text-start text-lg text-gray-800 dark:text-white font-medium'>Today's Summary</h3>

          <div className="w-full mt-4 sm:mt-5">
            <div className="w-full flex justify-between">
              <span className='text-xs sm:text-sm text-gray-600 dark:text-gray-400'>Earning Goal</span>
              <span className='text-xs sm:text-sm text-gray-600 dark:text-gray-400'>$150.00</span>
            </div>
            <div className="w-full h-2 sm:h-3 bg-gray-200 dark:bg-gray-700 rounded-full mt-2">
              <div className={`bg-green-500 w-[66%] h-full rounded-full ${Isonline ? 'animate-pulse' : ""}`}></div>
            </div>
            <div className="w-full flex justify-between mt-1">
              <span className='text-xs sm:text-sm text-green-600 dark:text-green-400'>$86.50</span>
              <span className='text-xs sm:text-sm text-gray-600 dark:text-gray-400'>58%</span>
            </div>
          </div>

          <div className="h-[1px] w-full bg-gray-300 dark:bg-gray-400/40 mx-auto mt-4 sm:mt-5"></div>

          <h3 className='text-start text-base text-gray-800 dark:text-white font-medium mt-4 sm:mt-5'>Hours Breakdown</h3>
          <div className="w-full flex justify-between mt-3 sm:mt-4">
            <span className='text-xs sm:text-sm text-gray-600 dark:text-gray-400'>Online Time</span>
            <span className='text-xs sm:text-sm text-gray-800 dark:text-white'>5.5 hours</span>
          </div>
          <div className="w-full flex justify-between mt-1">
            <span className='text-xs sm:text-sm text-gray-600 dark:text-gray-400'>Active Time</span>
            <span className='text-xs sm:text-sm text-gray-800 dark:text-white'>4.2 hours</span>
          </div>
          <div className="w-full flex justify-between mt-1">
            <span className='text-xs sm:text-sm text-gray-600 dark:text-gray-400'>Utilization</span>
            <span className='text-xs sm:text-sm text-green-600 dark:text-green-500'>76%</span>
          </div>

          <div className="h-[1px] w-full bg-gray-300 dark:bg-gray-400/20 mx-auto mt-4 sm:mt-5"></div>

          <h3 className='text-start text-base text-gray-800 dark:text-white font-medium mt-4 sm:mt-5'>Expected Payout</h3>
          <h3 className='text-green-600 dark:text-green-500 text-start text-xl sm:text-2xl font-medium mt-1 sm:mt-2'>$86.50</h3>
          <h6 className='text-start text-xs sm:text-sm text-gray-500 dark:text-gray-400'>Will be transferred on Monday</h6>
        </div>
      </div>
    </div>
  );
}
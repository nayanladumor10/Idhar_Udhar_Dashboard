import React, { useState } from 'react';
import { useGlobalContext } from '../Context/GlobalContext';
import { Link } from 'react-router';


export default function DashboardNav() {
  const { Isonline, ToggleOnline, ToggleSidebar } = useGlobalContext();

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "You received a new ride request", time: "5 mins ago", read: false },
    { id: 2, message: "Payout processed successfully", time: "1 hour ago", read: false },
    { id: 3, message: "Rating updated to 4.8", time: "2 hours ago", read: true }
  ]);

  const toggleNotifications = () => setShowNotifications(prev => !prev);
  const closeNotifications = () => setShowNotifications(false);
  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const hasUnread = notifications.some(n => !n.read);

  return (
    <div className='w-full h-[8%] p-1 bg-gray-200/10 flex justify-between items-center px-2 py-2 rounded-lg md:rounded-none relative'>
      <h3 className='text-3xl dark:text-white flex items-center gap-3 ps-1'>
        <div className="icon text-xl cursor-pointer lg:hidden" onClick={ToggleSidebar}>
          <i className="fas fa-bars"></i>
        </div>
      </h3>

      <div className="Nav-buttons flex items-center justify-center gap-4">
        <span className='dark:text-white font-medium flex items-center'>
          {Isonline ? 'Online' : 'Offline'}
        </span>

        <div className="ToggleButton flex items-center">
          <button
            onClick={ToggleOnline}
            className={`relative inline-flex items-center h-5 rounded-full w-11 transition-colors duration-300 
              ${Isonline ? 'bg-green-500' : 'bg-gray-600'}`}
          >
            <span
              className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 
                ${Isonline ? 'translate-x-6' : 'translate-x-1'}`}
            />
          </button>
        </div>

        <div className={`onlineStatus text-green-400/80 h-6 w-6 text-lg items-center justify-center ${Isonline ? 'flex' : 'hidden'}`}>
          <i className="fas fa-car animate-pulse"></i>
        </div>

        {/* Notification Icon */}
        <div
          className="Notification relative dark:text-white h-8 w-8 text-lg flex items-center justify-center hover:bg-gray-500/30 rounded-full transition-all duration-200 cursor-pointer"
          onClick={toggleNotifications}
        >
          <i className="fas fa-bell"></i>
          {hasUnread && <span className="absolute top-0 right-0 h-2 w-2 bg-green-500 rounded-full"></span>}
        </div>

        {/* Notification Dropdown */}
        <div className={`absolute right-4 top-16 w-80 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-50 transition-all duration-300 ${showNotifications ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
          <div className="flex justify-between items-center p-3 border-b border-gray-600">
            <h3 className="text-white text-lg">Notifications</h3>
            <button onClick={closeNotifications} className="text-gray-400 hover:text-red-400 transition">
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {notifications.length > 0 ? notifications.map(notif => (
              <div
                key={notif.id}
                onClick={() => markAsRead(notif.id)}
                className="flex items-start gap-3 p-3 hover:bg-gray-700 cursor-pointer transition-all"
              >
                <div className="relative pt-1">
                  <i className="fas fa-bell text-white"></i>
                  {!notif.read && <span className="absolute top-0 right-0 h-2 w-2 bg-green-500 rounded-full"></span>}
                </div>
                <div className="text-sm text-white">
                  <p>{notif.message}</p>
                  <span className="text-xs text-gray-400">{notif.time}</span>
                </div>
              </div>
            )) : (
              <div className="p-3 text-gray-400 text-sm">No notifications</div>
            )}
          </div>
        </div>

       <Link to='support'>
        <div className="QuestionMark dark:text-white h-8 w-8 text-lg flex items-center justify-center hover:bg-gray-500/30 rounded-full transition-all duration-200">
          <i className="fas fa-question"></i>
        </div>
       </Link>

        <Link to='profile'>
          <div className="profile h-11 rounded-md flex items-center hover:bg-gray-500/30 transition-all duration-200 p-1">
            <div className="ProfileName w-17 dark:text-white flex flex-col items-start p-1">
              <span className='text-sm font-medium'>John Red</span>
              <span className='text-xs text-gray-400'>4.8 <i className="fas fa-star"></i></span>
            </div>
            <div className="ProfileIcon h-10 w-8 rounded-lg bg-gray-400/60 text-white flex items-center justify-center">
              <i className="fas fa-user"></i>
            </div>
          </div></Link>
      </div>
    </div>
  );
}

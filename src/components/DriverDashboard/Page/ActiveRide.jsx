import React, { useState, useEffect } from 'react';
import { 
  FaUser, 
  FaPhone, 
  FaStar, 
  FaCar, 
  FaMoneyBillWave, 
  FaClock, 
  FaMapMarkerAlt,
  FaBell,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
  FaExclamationTriangle,
  FaPaperPlane,
  FaLocationArrow,
  FaCheck
} from 'react-icons/fa';
import { RiAlertFill, RiChatSmileLine } from 'react-icons/ri';
import { IoMdClose } from 'react-icons/io';
import { BsArrowLeftRight, BsThreeDotsVertical } from 'react-icons/bs';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});

// Custom icon components
const createStartIcon = () => {
  return new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

const createUserIcon = () => {
  return L.divIcon({
    html: `<div style="font-size: 24px; text-shadow: 0 0 3px #000; animation: pulse 2s infinite">🚙</div>`, // Blue car emoji with pulse
    iconSize: [24, 24],
    className: 'bg-transparent border-none'
  });
};


const createEndIcon = () => {
  return new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

const UserIcon = () => (
  <div className="text-blue-500 text-2xl animate-pulse">
    <FaLocationArrow />
  </div>
);

// Create custom Leaflet icons using divIcon
const createCustomIcon = (iconComponent, className = '') => {
  return L.divIcon({
    html: iconComponent,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
    className: `bg-transparent border-none ${className}`
  });
};

export default function ActiveRide() {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [rideStatus, setRideStatus] = useState('enroute'); // 'enroute', 'arrived', 'ongoing', 'completed'
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [customerRating] = useState(4.8);
  const [showDetails, setShowDetails] = useState(false);
  const [showRouteOptions, setShowRouteOptions] = useState(false);
  const [eta, setEta] = useState(15); // Initial ETA to pickup point
  const [distance] = useState(4.7);
  const [fare] = useState(185);
  const [activePopup, setActivePopup] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [reportReason, setReportReason] = useState('');
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [hasArrived, setHasArrived] = useState(false);

  // Map points
  const startPoint = [23.04595809517286, 72.66674726646471];
  const endPoint = [23.069280993402167, 72.68000973783428];
  const [routeToPickup, setRouteToPickup] = useState(null);
  const [routeToDestination, setRouteToDestination] = useState(null);
  const [activeRoute, setActiveRoute] = useState(null);
//  live-distance states 
  const [liveDistanceToPickup, setLiveDistanceToPickup] = useState(0);
  const [liveDistanceToDestination, setLiveDistanceToDestination] = useState(0);
  const [liveEta, setLiveEta] = useState(eta);
//  live-speen states 
const [currentSpeed, setCurrentSpeed] = useState(0); // in km/h
const [speedAccuracy, setSpeedAccuracy] = useState(null);
  // Get user's live location
useEffect(() => {
  if (navigator.geolocation) {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const newLocation = [position.coords.latitude, position.coords.longitude];
        setUserLocation(newLocation);
        
        // Use the device-provided speed if available (in m/s)
        if (position.coords.speed !== null) {
          const speedKmh = position.coords.speed * 3.6; // Convert m/s to km/h
          setCurrentSpeed(Math.round(speedKmh));
          setSpeedAccuracy(position.coords.speedAccuracy);
        } else {
          // Fallback to calculating speed between positions
          calculateSpeedBetweenPositions(newLocation);
        }
        
      },
      (error) => console.error("Error getting location:", error),
      { 
        enableHighAccuracy: true,
        maximumAge: 2000,
        timeout: 5000
      }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }
}, [rideStatus]);


// addtition states and logic for live speed 
const [lastPosition, setLastPosition] = useState(null);
const [lastUpdateTime, setLastUpdateTime] = useState(null);
const calculateSpeedBetweenPositions = (newPosition) => {
  const now = Date.now();
  
  if (lastPosition && lastUpdateTime) {
    const timeDiff = (now - lastUpdateTime) / 1000; // in seconds
    if (timeDiff > 0) {
      const distance = calculateDistance(
        lastPosition[0], lastPosition[1],
        newPosition[0], newPosition[1]
      ) * 1000; // Convert km to meters
      
      const speedMs = distance / timeDiff; // meters per second
      const speedKmh = speedMs * 3.6; // km per hour
      setCurrentSpeed(Math.round(speedKmh));
    }
  }
  
  setLastPosition(newPosition);
  setLastUpdateTime(now);
};


  // getLive distance 
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in km
};

// for LiveDistance Calculating 
useEffect(() => {
  if (navigator.geolocation) {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const newLocation = [position.coords.latitude, position.coords.longitude];
        setUserLocation(newLocation);
        
        // Calculate live distance to pickup
        const distToPickup = calculateDistance(
          newLocation[0], newLocation[1],
          startPoint[0], startPoint[1]
        );
        setLiveDistanceToPickup(distToPickup);
        
        // Calculate live distance to destination if ride has started
        if (rideStatus === 'ongoing' || rideStatus === 'arrived') {
          const distToDestination = calculateDistance(
            newLocation[0], newLocation[1],
            endPoint[0], endPoint[1]
          );
          setLiveDistanceToDestination(distToDestination);
        }
        
        // Update ETA based on distance and speed (assuming average speed of 40 km/h)
       if (currentSpeed > 5) { // Only update ETA if moving (>5 km/h to filter out GPS noise)
  const newEta = Math.round((distToPickup / currentSpeed) * 60);
  setLiveEta(newEta > 0 ? newEta : 1);
}

      },
      (error) => {
        console.error("Error getting location:", error);
        setUserLocation([12.9716, 77.5946]);
      },
      { enableHighAccuracy: true, maximumAge: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  } else {
    setUserLocation([12.9716, 77.5946]);
  }
}, [rideStatus]);

  // Timer effect
useEffect(() => {
  const timer = setInterval(() => {
    setTimeElapsed(prev => prev + 1);
    // Update ETA based on live calculation
    setEta(liveEta > 0 ? liveEta - 1 : 0);
  }, 60000);
  return () => clearInterval(timer);
}, [liveEta]);
  // Fetch routes based on ride status
useEffect(() => {
  const fetchRoute = async (start, end, setRouteFn) => {
    try {
      const response = await axios.get(
        'https://api.openrouteservice.org/v2/directions/driving-car',
        {
          params: {
            api_key: '5b3ce3597851110001cf6248ed630a0511ab4c1884dbf8788ea2bd5d',
            start: `${start[1]},${start[0]}`,
            end: `${end[1]},${end[0]}`,
          },
          headers: {
            'Accept': 'application/json, application/geo+json',
          },
        }
      );
      const routeData = response.data.features[0];
      const routeCoords = routeData.geometry.coordinates
        .map(coord => [coord[1], coord[0]]);
      setRouteFn(routeCoords);
      
      // Calculate initial ETA based on route duration (in seconds)
      const durationMinutes = Math.round(routeData.properties.summary.duration / 60);
      setLiveEta(durationMinutes);
      setEta(durationMinutes);
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  if (userLocation) {
    if (rideStatus === 'enroute') {
      fetchRoute(userLocation, startPoint, setRouteToPickup);
      setActiveRoute('pickup');
    } else if (rideStatus === 'arrived' || rideStatus === 'ongoing') {
      fetchRoute(startPoint, endPoint, setRouteToDestination);
      setActiveRoute('destination');
    }
  }
}, [userLocation, rideStatus]);

  const formatTime = (minutes) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs > 0 ? `${hrs}h ` : ''}${mins}m`;
  };

  const handleArrived = () => {
    setRideStatus('arrived');
    setEta(25); // Reset ETA for the trip to destination
  };

  const handleStartRide = () => {
    setRideStatus('ongoing');
  };

  const handleCompleteRide = () => {
    setRideStatus('completed');
  };

  const handleCancelRide = () => {
    setRideStatus('cancelled');
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: 'driver' }]);
      setMessage('');
      // Simulate reply after 1 second
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "Thanks for the update!", sender: 'customer' }]);
      }, 1000);
    }
  };

  const handleSubmitReport = () => {
    alert(`Report submitted: ${reportReason}`);
    setActivePopup(null);
    setReportReason('');
  };

  const handleSubmitRating = () => {
    alert(`Rating submitted: ${rating} stars\nFeedback: ${feedback}`);
    setActivePopup(null);
    setRating(5);
    setFeedback('');
  };

  // Auto-center map when user location changes
  const MapUpdater = () => {
    const map = useMap();
    
    useEffect(() => {
      
      if (userLocation) {
        map.setView(startPoint, map.getZoom());
      }
    }, [userLocation, map]);

    return null;
  };

  const renderPopup = () => {
    switch (activePopup) {
      case 'message':
        return (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold flex items-center">
                  <RiChatSmileLine className="mr-2 text-blue-400" />
                  Message Customer
                </h3>
                <button onClick={() => setActivePopup(null)} className="p-1 rounded-full hover:bg-gray-700">
                  <FaTimes />
                </button>
              </div>
              
              <div className="h-64 overflow-y-auto mb-4 space-y-3">
                {messages.length > 0 ? (
                  messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.sender === 'driver' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs p-3 rounded-lg ${msg.sender === 'driver' ? 'bg-blue-600 rounded-br-none' : 'bg-gray-700 rounded-bl-none'}`}>
                        {msg.text}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 h-full flex items-center justify-center">
                    No messages yet
                  </div>
                )}
              </div>
              
              <div className="flex">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-700 rounded-l-lg p-3 focus:outline-none"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button 
                  onClick={handleSendMessage}
                  className="bg-blue-600 hover:bg-blue-700 px-4 rounded-r-lg"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'report':
        return (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold flex items-center">
                  <FaExclamationTriangle className="mr-2 text-yellow-400" />
                  Report Issue
                </h3>
                <button onClick={() => setActivePopup(null)} className="p-1 rounded-full hover:bg-gray-700">
                  <FaTimes />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 mb-2">Reason for report</label>
                  <select 
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="w-full bg-gray-700 rounded-lg p-3 focus:outline-none"
                  >
                    <option value="">Select a reason</option>
                    <option value="Customer behavior">Customer behavior</option>
                    <option value="Safety concern">Safety concern</option>
                    <option value="Payment issue">Payment issue</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-400 mb-2">Additional details</label>
                  <textarea
                    rows="3"
                    className="w-full bg-gray-700 rounded-lg p-3 focus:outline-none"
                    placeholder="Provide more details..."
                  />
                </div>
                
                <button
                  onClick={handleSubmitReport}
                  className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-medium"
                >
                  Submit Report
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'rate':
        return (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold flex items-center">
                  <FaStar className="mr-2 text-yellow-400" />
                  Rate Customer
                </h3>
                <button onClick={() => setActivePopup(null)} className="p-1 rounded-full hover:bg-gray-700">
                  <FaTimes />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="text-3xl mx-1 focus:outline-none"
                    >
                      {star <= rating ? (
                        <FaStar className="text-yellow-400" />
                      ) : (
                        <FaStar className="text-gray-600" />
                      )}
                    </button>
                  ))}
                </div>
                
                <div>
                  <label className="block text-gray-400 mb-2">Feedback (optional)</label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows="3"
                    className="w-full bg-gray-700 rounded-lg p-3 focus:outline-none"
                    placeholder="How was your experience?"
                  />
                </div>
                
                <button
                  onClick={handleSubmitRating}
                  className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-medium"
                >
                  Submit Rating
                </button>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className='text-white p-4 max-w-6xl mx-auto'>
      {/* Header*/}
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent'>
            Active Ride
          </h1>
          <p className='text-gray-400 mt-1'>Have a safe and green ride!</p>
        </div>

      </div>

      {/* Main Grid Layout */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Left Column - Map and Ride Info */}
        <div className='lg:col-span-2 space-y-6'>
          {/* Enhanced Map Container */}
          <div className="relative h-96 rounded-2xl border-2 border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden -z-0">
            <MapContainer
              center={userLocation || startPoint}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />

              {/* Start Marker with custom icon */}
<Marker position={startPoint} icon={createStartIcon()}>
  <Popup>Pickup Location</Popup>
</Marker>

              {/* End Marker with custom icon */}
<Marker position={endPoint} icon={createEndIcon()}>
  <Popup>Drop Location</Popup>
</Marker>

              {/* User's live location marker */}
{userLocation && (
  <Marker position={userLocation} icon={createUserIcon()}>
    <Popup>Your Current Location</Popup>
  </Marker>
)}


              {/* Route Polyline - Show appropriate route based on ride status */}
              {rideStatus === 'enroute' && routeToPickup && (
                <Polyline 
                  positions={routeToPickup} 
                  color="#3B82F6" 
                  weight={5} 
                  opacity={0.9}
                />
              )}
              
              {(rideStatus === 'arrived' || rideStatus === 'ongoing') && routeToDestination && (
                <Polyline 
                  positions={routeToDestination} 
                  color="#088F8F" 
                  weight={5} 
                  opacity={0.9}
                />
              )}

              {/* Auto-center map when user location changes */}
              <MapUpdater />
            </MapContainer>
          </div>

          {/* Ride Info */}
{/* Ride Info */}
<div className="bg-gray-900/90 backdrop-blur-sm rounded-xl p-4 shadow-xl z-10 opacity-100">
  <div className='flex justify-between items-center'>
    <div>
      <div className='flex items-center text-green-400'>
        <FaClock className="mr-2" />
        <span className='font-medium'>
          {formatTime(timeElapsed)} • <span className='animate-pulse'>{liveEta} min left</span>
        </span>
      </div>
      <div className='text-sm text-gray-400 mt-1'>
        <span className='text-white'>
          {rideStatus === 'enroute' ? 
            liveDistanceToPickup.toFixed(2) : 
            liveDistanceToDestination.toFixed(2)} km
        </span> • ₹{fare} • EV-45
      </div> 
    </div>
    <div className='flex space-x-2'>
<div className='px-3 py-1 bg-gray-800 rounded-lg flex items-center'>
  {currentSpeed} km/h
  {speedAccuracy && (
    <span className='text-xs text-gray-400 ml-1'>
      ±{(speedAccuracy * 3.6).toFixed(1)} km/h
    </span>
  )}
</div>
      <button 
        onClick={() => setShowRouteOptions(!showRouteOptions)}
        className='px-3 py-1 bg-gray-800 rounded-lg flex items-center'
      >
        Route {showRouteOptions ? <FaChevronUp className='ml-1' /> : <FaChevronDown className='ml-1' />}
      </button>
    </div>
  </div>

  {showRouteOptions && (
    <div className='mt-3 pt-3 border-t border-gray-800'>
      <div className='grid grid-cols-3 gap-2'>
        <button className='bg-gray-800 hover:bg-gray-700 p-2 rounded-lg text-xs'>Fastest</button>
        <button className='bg-green-600/20 border border-green-500 text-green-400 p-2 rounded-lg text-xs'>Eco (Selected)</button>
        <button className='bg-gray-800 hover:bg-gray-700 p-2 rounded-lg text-xs'>Comfort</button>
      </div>
    </div>
  )}
</div>

          {/* Customer Details Card */}
          <div className="bg-gray-800/50 rounded-2xl p-5 backdrop-blur-sm border border-gray-700">
            <div className='flex justify-between items-center mb-4'>
              <h2 className="text-xl font-semibold flex items-center">
                <div className='w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mr-3'>
                  <FaUser className='text-green-400' />
                </div>
                Customer Details
              </h2>
              <button 
                onClick={() => setShowDetails(!showDetails)}
                className='p-2 rounded-full bg-gray-700 hover:bg-gray-600'
              >
                {showDetails ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            </div>

            <div className='flex flex-col md:flex-row gap-4'>
              <div className='flex-1'>
                <div className='flex items-center mb-3'>
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-600 to-blue-600 flex items-center justify-center mr-4 text-xl font-bold">
                    RS
                  </div>
                  <div>
                    <div className="font-bold text-lg">Rahul Sharma</div>
                    <div className="flex items-center text-sm text-gray-400">
                      <FaStar className="text-yellow-400 mr-1" /> {customerRating} • 142 rides
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-sm mt-4 bg-gray-900/50 p-3 rounded-lg">
                  <FaPhone className="mr-3 text-green-400" /> 
                  <span>+91 98765 43210</span>
                  <button className='ml-auto bg-blue-600/20 text-blue-400 px-3 py-1 rounded-lg text-xs'>
                    Call
                  </button>
                </div>
              </div>

              {showDetails && (
                <div className='flex-1 space-y-4'>
                  <div className='bg-gray-900/50 p-3 rounded-lg'>
                    <h4 className='text-sm font-medium text-gray-400 mb-2'>Ride Preferences</h4>
                    <div className='flex flex-wrap gap-2'>
                      <span className="bg-green-900/30 text-green-400 px-2 py-1 rounded-full text-xs">No AC</span>
                      <span className="bg-blue-900/30 text-blue-400 px-2 py-1 rounded-full text-xs">Pet Friendly</span>
                      <span className="bg-purple-900/30 text-purple-400 px-2 py-1 rounded-full text-xs">Quiet Ride</span>
                    </div>
                    <div className='mt-3 text-xs text-gray-400'>
                      "Please drive carefully, I get motion sickness easily."
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Ride Actions and Info */}
        <div className='space-y-6'>
          {/* Ride Status Card */}
          <div className="bg-gray-800/50 rounded-2xl p-5 backdrop-blur-sm border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Ride Status</h2>
            
            <div className='space-y-4'>
              <div className='flex justify-between items-center'>
                <div className='text-gray-400'>Ride ID</div>
                <div className='font-mono'>#GRN2023-4587</div>
              </div>
              <div className='flex justify-between items-center'>
                <div className='text-gray-400'>Vehicle</div>
                <div className='flex items-center'>
                  <FaCar className='text-green-400 mr-2' /> EV Sedan
                </div>
              </div>
              <div className='flex justify-between items-center'>
                <div className='text-gray-400'>Payment</div>
                <div className='flex items-center'>
                  <FaMoneyBillWave className='text-green-400 mr-2' /> UPI (₹185)
                </div>
              </div>
              <div className='flex justify-between items-center'>
                <div className='text-gray-400'>Booked At</div>
                <div>Today, 4:32 PM</div>
              </div>
            </div>

            <div className='mt-6 pt-4 border-t border-gray-700'>
              {rideStatus === 'enroute' && (
                <div className='space-y-3'>
                  <button 
                    onClick={handleArrived}
                    className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-medium transition-all flex items-center justify-center"
                  >
                    <FaCheck className='mr-2' /> Arrived at Pickup
                  </button>
                  <button 
                    onClick={() => setShowEmergencyModal(true)}
                    className="w-full bg-red-600/10 hover:bg-red-600/20 border border-red-600 text-red-400 py-3 rounded-xl font-medium flex items-center justify-center transition-all"
                  >
                    <RiAlertFill className="mr-2" /> Emergency
                  </button>
                  <button 
                    onClick={handleCancelRide}
                    className="w-full bg-gray-700 hover:bg-gray-600 py-3 rounded-xl font-medium transition-all"
                  >
                    Cancel Ride
                  </button>
                </div>
              )}
              
              {rideStatus === 'arrived' && (
                <div className='space-y-3'>
                  <button 
                    onClick={handleStartRide}
                    className="w-full bg-green-500 hover:bg-green-600 py-3 rounded-xl font-medium transition-all flex items-center justify-center"
                  >
                    <FaCar className='mr-2' /> Start Ride
                  </button>
                  <button 
                    onClick={() => setShowEmergencyModal(true)}
                    className="w-full bg-red-600/10 hover:bg-red-600/20 border border-red-600 text-red-400 py-3 rounded-xl font-medium flex items-center justify-center transition-all"
                  >
                    <RiAlertFill className="mr-2" /> Emergency
                  </button>
                </div>
              )}
              
              {rideStatus === 'ongoing' && (
                <div className='space-y-3'>
                  <button 
                    onClick={handleCompleteRide}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 py-3 rounded-xl font-medium transition-all flex items-center justify-center"
                  >
                    <FaCar className='mr-2' /> Complete Ride
                  </button>
                  <button 
                    onClick={() => setShowEmergencyModal(true)}
                    className="w-full bg-red-600/10 hover:bg-red-600/20 border border-red-600 text-red-400 py-3 rounded-xl font-medium flex items-center justify-center transition-all"
                  >
                    <RiAlertFill className="mr-2" /> Emergency
                  </button>
                </div>
              )}
              
              {rideStatus === 'completed' ? (
                <div className="text-center py-3 bg-green-900/20 rounded-xl border border-green-800">
                  <div className="text-green-400 font-medium">Ride Completed Successfully</div>
                  <div className="text-xs text-gray-400 mt-1">₹185 received</div>
                </div>
              ) : rideStatus === 'cancelled' && (
                <div className="text-center py-3 bg-red-900/20 rounded-xl border border-red-800">
                  <div className="text-red-400 font-medium">Ride Cancelled</div>
                  <div className="text-xs text-gray-400 mt-1">No charges applied</div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-800/50 rounded-2xl p-5 backdrop-blur-sm border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className='grid grid-cols-2 gap-3'>
              <button 
                onClick={() => setActivePopup('message')}
                className='bg-gray-800 hover:bg-gray-700 p-3 rounded-lg flex flex-col items-center transition-all'
              >
                <div className='w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center mb-2'>
                  <RiChatSmileLine className='text-blue-400 text-lg' />
                </div>
                <span className='text-xs'>Message</span>
              </button>
              <button className='bg-gray-800 hover:bg-gray-700 p-3 rounded-lg flex flex-col items-center transition-all'>
                <div className='w-10 h-10 rounded-full bg-purple-600/10 flex items-center justify-center mb-2'>
                  <FaMapMarkerAlt className='text-purple-400 text-lg' />
                </div>
                <span className='text-xs'>Share Route</span>
              </button>
              <button 
                onClick={() => setActivePopup('report')}
                className='bg-gray-800 hover:bg-gray-700 p-3 rounded-lg flex flex-col items-center transition-all'
              >
                <div className='w-10 h-10 rounded-full bg-yellow-600/10 flex items-center justify-center mb-2'>
                  <FaExclamationTriangle className='text-yellow-400 text-lg' />
                </div>
                <span className='text-xs'>Report</span>
              </button>
              <button 
                onClick={() => setActivePopup('rate')}
                className='bg-gray-800 hover:bg-gray-700 p-3 rounded-lg flex flex-col items-center transition-all'
              >
                <div className='w-10 h-10 rounded-full bg-green-600/10 flex items-center justify-center mb-2'>
                  <FaStar className='text-green-400 text-lg' />
                </div>
                <span className='text-xs'>Rate</span>
              </button>
            </div>
          </div>

          {/* Ride Summary */}
          <div className="bg-gray-800/50 rounded-2xl p-5 backdrop-blur-sm border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Ride Summary</h2>
            <div className='space-y-3'>
              <div className='flex justify-between'>
                <span className='text-gray-400'>Base Fare</span>
                <span>₹120</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-400'>Distance (4.7 km)</span>
                <span>₹65</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-400'>Green Bonus</span>
                <span className='text-green-400'>-₹15</span>
              </div>
              <div className='pt-3 mt-3 border-t border-gray-700 flex justify-between font-medium'>
                <span>Total</span>
                <span>₹186</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Modal */}
      {showEmergencyModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-gray-800 rounded-2xl p-6 max-w-md w-full border border-red-900/50 relative">
            <button 
              onClick={() => setShowEmergencyModal(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-700"
            >
              <IoMdClose className="text-lg" />
            </button>
            
            <div className='flex items-center mb-4'>
              <div className='p-3 rounded-full bg-red-600/20 mr-3'>
                <RiAlertFill className='text-red-400 text-2xl' />
              </div>
              <h3 className="text-xl font-bold">Emergency Assistance</h3>
            </div>
            
            <p className="mb-6 text-gray-300">
              Emergency services will be notified immediately. Your current location and ride details will be shared with authorities.
            </p>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowEmergencyModal(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 py-3 rounded-lg transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  // Implement emergency functionality
                  setShowEmergencyModal(false);
                }}
                className="flex-1 bg-red-600 hover:bg-red-700 py-3 rounded-lg flex items-center justify-center transition-all"
              >
                <FaPhone className="mr-2" /> Call 112
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Popups */}
      {renderPopup()}
    </div>
  );
}
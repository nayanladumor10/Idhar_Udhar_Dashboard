import React, { useState, useEffect } from 'react'

export default function RideHistory() {
    const initialRides = [
        {
            id: 1,
            customer: "Emily S.",
            time: "Today, 2:45 PM",
            pickup: "123 Main St",
            dropoff: "456 Market Ave",
            fare: 14.75,
            duration: "24 mins",
            distance: "5.2 mi",
            cancelled: false,
            rating: 5,
            vehicle: "Toyota Camry",
            paymentMethod: "Credit Card"
        },
        {
            id: 2,
            customer: "Michael R.",
            time: "Today, 12:30 PM",
            pickup: "789 Park Blvd",
            dropoff: "321 Lake View Dr",
            fare: 9.50,
            duration: "18 mins",
            distance: "3.8 mi",
            cancelled: false,
            rating: 4,
            vehicle: "Honda Accord",
            paymentMethod: "Apple Pay"
        },
        {
            id: 3,
            customer: "Sarah J.",
            time: "Today, 10:15 AM",
            pickup: "555 Ocean Ave",
            dropoff: "777 Mountain Rd",
            fare: 22.30,
            duration: "35 mins",
            distance: "8.1 mi",
            cancelled: false,
            rating: 5,
            vehicle: "Tesla Model 3",
            paymentMethod: "Credit Card"
        },
        {
            id: 4,
            customer: "David L.",
            time: "Yesterday, 7:20 PM",
            pickup: "888 Downtown St",
            dropoff: "999 Uptown Ave",
            fare: 18.65,
            duration: "28 mins",
            distance: "6.4 mi",
            cancelled: false,
            rating: 4,
            vehicle: "Ford Escape",
            paymentMethod: "Google Pay"
        },
        {
            id: 5,
            customer: "Rebecca T.",
            time: "Yesterday, 3:50 PM",
            pickup: "444 Forest Ln",
            dropoff: "222 Meadow Dr",
            fare: 11.40,
            duration: "21 mins",
            distance: "4.1 mi",
            cancelled: false,
            rating: 5,
            vehicle: "Toyota RAV4",
            paymentMethod: "Credit Card"
        },
        {
            id: 6,
            customer: "James K.",
            time: "Yesterday, 1:10 PM",
            pickup: "123 Beach Rd",
            dropoff: "456 Sunset Blvd",
            fare: 25.80,
            duration: "42 mins",
            distance: "9.3 mi",
            cancelled: true,
            rating: null,
            vehicle: "Nissan Altima",
            paymentMethod: "Cash"
        }
    ];

    const [rides, setRides] = useState(initialRides);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState('time');
    const [expandedRide, setExpandedRide] = useState(null);
    const [stats, setStats] = useState({
        todayEarnings: 0,
        acceptanceRate: 0,
        avgRating: 0
    });
    
    useEffect(() => {
        calculateStats();
    }, []);

    const calculateStats = () => {
        const todayRides = initialRides.filter(ride => ride.time.includes('Today') && !ride.cancelled);
        const todayEarnings = todayRides.reduce((sum, ride) => sum + ride.fare, 0);
        const completedRides = initialRides.filter(ride => !ride.cancelled).length;
        const acceptanceRate = Math.round((completedRides / initialRides.length) * 100);
        const ratings = initialRides.filter(ride => ride.rating).map(ride => ride.rating);
        const avgRating = ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : 0;

        setStats({
            todayEarnings,
            acceptanceRate,
            avgRating
        });
    };

    // Toggle ride details expansion
    const toggleRideDetails = (id) => {
        setExpandedRide(expandedRide === id ? null : id);
    };

    // Handle search
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        filterAndSortRides(term, filter, sortBy);
    };

    // Handle filter change
    const handleFilterChange = (e) => {
        const newFilter = e.target.value;
        setFilter(newFilter);
        filterAndSortRides(searchTerm, newFilter, sortBy);
    };

    // Handle sort change
    const handleSortChange = (newSortBy) => {
        setSortBy(newSortBy);
        filterAndSortRides(searchTerm, filter, newSortBy);
    };

    // Combined filter and sort function
    const filterAndSortRides = (term, filterType, sortType) => {
        let filtered = [...initialRides];
        
        // Apply search filter
        if (term) {
            filtered = filtered.filter(ride => 
                ride.customer.toLowerCase().includes(term) || 
                ride.pickup.toLowerCase().includes(term) ||
                ride.dropoff.toLowerCase().includes(term) ||
                ride.vehicle.toLowerCase().includes(term)
            );
        }
        
        // Apply status filter
        if (filterType === 'completed') {
            filtered = filtered.filter(ride => !ride.cancelled);
        } else if (filterType === 'cancelled') {
            filtered = filtered.filter(ride => ride.cancelled);
        }
        
        // Apply sorting
        filtered.sort((a, b) => {
            switch (sortType) {
                case 'time':
                    // Simple comparison for demo - in a real app, parse the dates properly
                    return a.time.localeCompare(b.time);
                case 'fare':
                    return b.fare - a.fare;
                case 'distance':
                    // Extract numeric value from distance string
                    const aDist = parseFloat(a.distance.split(' ')[0]);
                    const bDist = parseFloat(b.distance.split(' ')[0]);
                    return bDist - aDist;
                case 'duration':
                    // Extract numeric value from duration string
                    const aDur = parseFloat(a.duration.split(' ')[0]);
                    const bDur = parseFloat(b.duration.split(' ')[0]);
                    return bDur - aDur;
                case 'rating':
                    return (b.rating || 0) - (a.rating || 0);
                default:
                    return 0;
            }
        });
        
        setRides(filtered);
    };

    // Format rating stars
    const renderStars = (rating) => {
        if (!rating) return null;
        return (
            <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                    <i 
                        key={i} 
                        className={`fas fa-star ${i < rating ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'}`}
                    ></i>
                ))}
            </div>
        );
    };

    return (
        <div className='p-5 dark:bg-gray-950 bg-gray-50 min-h-screen'>
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <div>
                        <h3 className='text-3xl dark:text-white text-gray-800 font-medium'>Ride History</h3>
                        <p className='dark:text-gray-400 text-gray-600 mt-1'>View your past rides and earnings</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <div className="flex items-center gap-2">
                            <span className="dark:text-gray-400 text-gray-600 text-sm">Sort by:</span>
                            <div className="flex bg-white dark:bg-gray-900 rounded-lg p-1 shadow-sm">
                                <button 
                                    onClick={() => handleSortChange('time')} 
                                    className={`px-3 py-1 text-sm rounded-md ${sortBy === 'time' ? 'bg-green-500 text-white' : 'dark:text-gray-400 text-gray-600'}`}
                                >
                                    Time
                                </button>
                                <button 
                                    onClick={() => handleSortChange('fare')} 
                                    className={`px-3 py-1 text-sm rounded-md ${sortBy === 'fare' ? 'bg-green-500 text-white' : 'dark:text-gray-400 text-gray-600'}`}
                                >
                                    Fare
                                </button>
                                <button 
                                    onClick={() => handleSortChange('rating')} 
                                    className={`px-3 py-1 text-sm rounded-md ${sortBy === 'rating' ? 'bg-green-500 text-white' : 'dark:text-gray-400 text-gray-600'}`}
                                >
                                    Rating
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="EarningDetail-box dark:bg-gray-200/10 bg-white/80 p-4 rounded-lg shadow-sm dark:shadow-none transition-all duration-200 hover:shadow-md">
                        <div className="flex items-center gap-3">
                            <div className="bg-green-500/20 p-3 rounded-full">
                                <i className="fas fa-money-bill-wave text-green-500 text-xl"></i>
                            </div>
                            <div>
                                <h6 className='dark:text-gray-400 text-gray-600 text-sm'>Today's Earnings</h6>
                                <h3 className='text-green-500 text-2xl font-medium'>${stats.todayEarnings.toFixed(2)}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="EarningDetail-box dark:bg-gray-200/10 bg-white/80 p-4 rounded-lg shadow-sm dark:shadow-none transition-all duration-200 hover:shadow-md">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-500/20 p-3 rounded-full">
                                <i className="fas fa-map-marker-alt text-blue-500 text-xl"></i>
                            </div>
                            <div>
                                <h6 className='dark:text-gray-400 text-gray-600 text-sm'>Acceptance Rate</h6>
                                <h3 className={`${stats.acceptanceRate > 90 ? 'text-green-500' : stats.acceptanceRate > 70 ? 'text-yellow-500' : 'text-red-500'} text-2xl font-medium`}>
                                    {stats.acceptanceRate}%
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="EarningDetail-box dark:bg-gray-200/10 bg-white/80 p-4 rounded-lg shadow-sm dark:shadow-none transition-all duration-200 hover:shadow-md">
                        <div className="flex items-center gap-3">
                            <div className="bg-yellow-500/20 p-3 rounded-full">
                                <i className="fas fa-star text-yellow-500 text-xl"></i>
                            </div>
                            <div>
                                <h6 className='dark:text-gray-400 text-gray-600 text-sm'>Average Rating</h6>
                                <div className="flex items-center gap-2">
                                    <h3 className='text-yellow-500 text-2xl font-medium'>{stats.avgRating}</h3>
                                    {renderStars(Math.round(stats.avgRating))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm dark:shadow-none p-4 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex-1 relative">
                            <i className='fas fa-search absolute left-3 dark:text-gray-400 text-gray-500 top-3'></i>
                            <input 
                                type="text" 
                                className='w-full py-2 px-10 rounded-lg dark:bg-gray-800 bg-gray-50 dark:text-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 border border-gray-200 dark:border-gray-700' 
                                placeholder='Search by passenger, location or vehicle...' 
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg">
                                <i className="fas fa-filter text-green-500"></i>
                                <select 
                                    onChange={handleFilterChange}
                                    value={filter}
                                    className='text-sm dark:text-white text-gray-700 bg-transparent focus:outline-none'
                                >
                                    <option className='dark:bg-gray-950' value="all">All Rides</option>
                                    <option className='dark:bg-gray-950' value="completed">Completed</option>
                                    <option className='dark:bg-gray-950' value="cancelled">Cancelled</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    {rides.length > 0 ? (
                        rides.map((ride) => (
                            <div 
                                key={ride.id} 
                                className={`ride bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-sm dark:shadow-none transition-all duration-200 ${expandedRide === ride.id ? 'ring-2 ring-green-400' : 'hover:shadow-md'}`}
                            >
                                <div 
                                    className="p-4 cursor-pointer" 
                                    onClick={() => toggleRideDetails(ride.id)}
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`h-12 w-12 rounded-full flex items-center justify-center ${ride.cancelled ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>
                                                <i className={`fas ${ride.cancelled ? 'fa-times' : 'fa-check'}`}></i>
                                            </div>
                                            <div>
                                                <h4 className='dark:text-white text-gray-800 font-medium text-start'>{ride.customer}</h4>
                                                <p className='dark:text-gray-400 text-gray-600 text-sm'>{ride.time}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-center">
                                                <p className='dark:text-gray-400 text-gray-600 text-sm'>Fare</p>
                                                <p className='text-green-500 font-medium'>${ride.fare.toFixed(2)}</p>
                                            </div>
                                            <div className="text-center">
                                                <p className='dark:text-gray-400 text-gray-600 text-sm'>Distance</p>
                                                <p className='dark:text-white text-gray-800 font-medium'>{ride.distance}</p>
                                            </div>
                                            <div className="text-center">
                                                <p className='dark:text-gray-400 text-gray-600 text-sm'>Duration</p>
                                                <p className='dark:text-white text-gray-800 font-medium'>{ride.duration}</p>
                                            </div>
                                            <button className="text-green-500 hover:text-green-600">
                                                <i className={`fas fa-chevron-${expandedRide === ride.id ? 'up' : 'down'}`}></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                                {expandedRide === ride.id && (
                                    <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h5 className="dark:text-gray-300 text-gray-700 font-medium mb-2">Trip Details</h5>
                                                <div className="space-y-3">
                                                    <div className="flex">
                                                        <div className="w-24 dark:text-gray-400 text-gray-600">Pickup:</div>
                                                        <div className="dark:text-white text-gray-800">{ride.pickup}</div>
                                                    </div>
                                                    <div className="flex">
                                                        <div className="w-24 dark:text-gray-400 text-gray-600">Dropoff:</div>
                                                        <div className="dark:text-white text-gray-800">{ride.dropoff}</div>
                                                    </div>
                                                    <div className="flex">
                                                        <div className="w-24 dark:text-gray-400 text-gray-600">Vehicle:</div>
                                                        <div className="dark:text-white text-gray-800">{ride.vehicle}</div>
                                                    </div>
                                                    <div className="flex">
                                                        <div className="w-24 dark:text-gray-400 text-gray-600">Payment:</div>
                                                        <div className="dark:text-white text-gray-800">{ride.paymentMethod}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <h5 className="dark:text-gray-300 text-gray-700 font-medium mb-2">Rating & Feedback</h5>
                                                {ride.rating ? (
                                                    <div className="space-y-3">
                                                        <div className="flex items-center gap-2">
                                                            {renderStars(ride.rating)}
                                                            <span className="dark:text-white text-gray-800">{ride.rating}.0</span>
                                                        </div>
                                                        <div className="bg-white dark:bg-gray-700 p-3 rounded-lg">
                                                            <p className="dark:text-gray-300 text-gray-700 italic">"Great driver! Very professional and safe."</p>
                                                        </div>
                                                    </div>
                                                ) : ride.cancelled ? (
                                                    <div className="text-red-500">Ride was cancelled</div>
                                                ) : (
                                                    <div className="text-gray-500 dark:text-gray-400">No rating provided</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
                                            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                                                <i className="fas fa-receipt mr-2"></i> Receipt
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10 dark:text-gray-400 text-gray-600">
                            <i className="fas fa-car-alt text-4xl mb-3 text-gray-300 dark:text-gray-600"></i>
                            <p className="text-lg">No rides found matching your criteria</p>
                            <button 
                                onClick={() => {
                                    setSearchTerm('');
                                    setFilter('all');
                                    setSortBy('time');
                                    setRides(initialRides);
                                }}
                                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                            >
                                Reset Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
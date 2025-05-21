import React, { useMemo, useState } from 'react'
import { Link } from 'react-router';

export default function Allcities() {
  const cities = [
    { key: 1, city: "Delhi", state: "Delhi", featured: true, available: true, area: "north" },
    { key: 2, city: "Bangalore", state: "Karnataka", featured: true, available: true, area: "south" },
    { key: 3, city: "Mumbai", state: "Maharashtra", featured: true, available: true, area: "west" },
    { key: 4, city: "Kolkata", state: "West Bengal", featured: true, available: true, area: "east" },
    { key: 5, city: "Hyderabad", state: "Telangana", featured: true, available: true, area: "south" },
    { key: 6, city: "Gurgaon", state: "Haryana", featured: true, available: true, area: "north" },
    { key: 7, city: "Chennai", state: "Tamil Nadu", featured: true, available: true, area: "south" },
    { key: 8, city: "Pune", state: "Maharashtra", featured: true, available: true, area: "west" },
    { key: 9, city: "Noida", state: "Uttar Pradesh", featured: true, available: true, area: "north" },
    { key: 10, city: "Kochi", state: "Kerala", featured: false, available: true, area: "south" },
    { key: 11, city: "Ahmedabad", state: "Gujarat", featured: true, available: true, area: "west" },
    { key: 12, city: "Patna", state: "Bihar", featured: false, available: true, area: "east" },
    { key: 13, city: "Jaipur", state: "Rajasthan", featured: true, available: true, area: "north" },
    { key: 14, city: "Chandigarh", state: "Chandigarh", featured: true, available: true, area: "north" },
    { key: 15, city: "Trivandrum", state: "Kerala", featured: false, available: true, area: "south" },
    { key: 16, city: "Surat", state: "Gujarat", featured: false, available: true, area: "west" },
    { key: 17, city: "Ranchi", state: "Jharkhand", featured: false, available: true, area: "east" },
    { key: 18, city: "Lucknow", state: "Uttar Pradesh", featured: true, available: true, area: "north" },
    { key: 19, city: "Agra", state: "Uttar Pradesh", featured: false, available: true, area: "north" },
    { key: 20, city: "Coimbatore", state: "Tamil Nadu", featured: false, available: true, area: "south" },
    { key: 21, city: "Vadodara", state: "Gujarat", featured: false, available: true, area: "west" },
    { key: 22, city: "Guwahati", state: "Assam", featured: false, available: true, area: "east" },
    { key: 23, city: "Amritsar", state: "Punjab", featured: false, available: true, area: "north" },
    { key: 24, city: "Mysore", state: "Karnataka", featured: false, available: true, area: "south" },
    { key: 25, city: "Ludhiana", state: "Punjab", featured: false, available: true, area: "north" },
    { key: 26, city: "Madurai", state: "Tamil Nadu", featured: false, available: true, area: "south" },
    { key: 27, city: "Nagpur", state: "Maharashtra", featured: true, available: true, area: "west" },
    { key: 28, city: "Bhubaneswar", state: "Odisha", featured: false, available: true, area: "east" },
    { key: 29, city: "Dehradun", state: "Uttarakhand", featured: false, available: true, area: "north" },
    { key: 30, city: "Varanasi", state: "Uttar Pradesh", featured: false, available: true, area: "north" },
    { key: 31, city: "Mangalore", state: "Karnataka", featured: false, available: true, area: "south" },
    { key: 32, city: "Thane", state: "Maharashtra", featured: false, available: true, area: "west" },
    { key: 33, city: "Siliguri", state: "West Bengal", featured: false, available: true, area: "east" },
    { key: 34, city: "Kanpur", state: "Uttar Pradesh", featured: false, available: true, area: "north" },
    { key: 35, city: "Pondicherry", state: "Puducherry", featured: false, available: true, area: "south" },
    { key: 36, city: "Allahabad", state: "Uttar Pradesh", featured: false, available: true, area: "north" },
    { key: 37, city: "Vizag", state: "Andhra Pradesh", featured: false, available: true, area: "south" },
    { key: 38, city: "Nashik", state: "Maharashtra", featured: false, available: true, area: "west" },
    { key: 39, city: "Cuttack", state: "Odisha", featured: false, available: true, area: "east" },
    { key: 40, city: "Meerut", state: "Uttar Pradesh", featured: false, available: true, area: "north" },
    { key: 41, city: "Tirupati", state: "Andhra Pradesh", featured: false, available: true, area: "south" },
    { key: 42, city: "Aurangabad", state: "Maharashtra", featured: false, available: true, area: "west" },
    { key: 43, city: "Asansol", state: "West Bengal", featured: false, available: true, area: "east" },
    { key: 44, city: "Srinagar", state: "Jammu & Kashmir", featured: false, available: true, area: "north" },
    { key: 45, city: "Jammu", state: "Jammu & Kashmir", featured: false, available: true, area: "north" },
    { key: 46, city: "Kanyakumari", state: "Tamil Nadu", featured: false, available: true, area: "south" },
    { key: 47, city: "Rajkot", state: "Gujarat", featured: false, available: true, area: "west" },
    { key: 48, city: "Dhanbad", state: "Jharkhand", featured: false, available: true, area: "east" },
    { key: 49, city: "Shimla", state: "Himachal Pradesh", featured: false, available: true, area: "north" },
    { key: 50, city: "Ghaziabad", state: "Uttar Pradesh", featured: false, available: true, area: "north" },
    { key: 51, city: "Ooty", state: "Tamil Nadu", featured: false, available: true, area: "south" },
    { key: 52, city: "Goa", state: "Goa", featured: false, available: true, area: "west" },
    { key: 53, city: "Jamshedpur", state: "Jharkhand", featured: false, available: true, area: "east" },
    { key: 54, city: "Vellore", state: "Tamil Nadu", featured: false, available: true, area: "south" },
    { key: 55, city: "Indore", state: "Madhya Pradesh", featured: true, available: true, area: "north" },
    { key: 56, city: "Calicut", state: "Kerala", featured: false, available: true, area: "south" },
    { key: 57, city: "Bhopal", state: "Madhya Pradesh", featured: true, available: true, area: "north" },
    { key: 58, city: "Shillong", state: "Meghalaya", featured: false, available: true, area: "east" },
    { key: 59, city: "Jodhpur", state: "Rajasthan", featured: false, available: true, area: "north" },
    { key: 60, city: "Imphal", state: "Manipur", featured: false, available: true, area: "east" },
    { key: 61, city: "Udaipur", state: "Rajasthan", featured: false, available: true, area: "north" },
    { key: 62, city: "Tiruchirappalli", state: "Tamil Nadu", featured: false, available: true, area: "south" },
    { key: 63, city: "Navi Mumbai", state: "Maharashtra", featured: false, available: true, area: "west" },
    { key: 64, city: "Gangtok", state: "Sikkim", featured: false, available: true, area: "east" },
    { key: 65, city: "Haridwar", state: "Uttarakhand", featured: false, available: true, area: "north" },
    { key: 66, city: "Vijayawada", state: "Andhra Pradesh", featured: false, available: true, area: "south" },
    { key: 67, city: "Jamnagar", state: "Gujarat", featured: false, available: true, area: "west" },
    { key: 68, city: "Mathura", state: "Uttar Pradesh", featured: false, available: true, area: "north" },
    { key: 69, city: "Thrissur", state: "Kerala", featured: false, available: true, area: "south" },
    { key: 70, city: "Ujjain", state: "Madhya Pradesh", featured: false, available: true, area: "north" },
    { key: 71, city: "Darjeeling", state: "West Bengal", featured: false, available: true, area: "east" },
    { key: 72, city: "Jalandhar", state: "Punjab", featured: false, available: true, area: "north" },
    { key: 73, city: "Salem", state: "Tamil Nadu", featured: false, available: true, area: "south" },
    { key: 74, city: "Solapur", state: "Maharashtra", featured: false, available: true, area: "west" },
    { key: 75, city: "Gaya", state: "Bihar", featured: false, available: true, area: "east" },
    { key: 76, city: "Aligarh", state: "Uttar Pradesh", featured: false, available: true, area: "north" },
    { key: 77, city: "Warangal", state: "Telangana", featured: false, available: true, area: "south" },
    { key: 78, city: "Panaji", state: "Goa", featured: false, available: true, area: "west" },
    { key: 79, city: "Durgapur", state: "West Bengal", featured: false, available: true, area: "east" },
    { key: 80, city: "Puri", state: "Odisha", featured: false, available: true, area: "east" },
    { key: 81, city: "Agartala", state: "Tripura", featured: false, available: true, area: "east" },
    { key: 82, city: "Diu", state: "Daman & Diu", featured: false, available: false, area: "west" },
    { key: 83, city: "Aizawl", state: "Mizoram", featured: false, available: false, area: "east" },
    { key: 84, city: "Silvassa", state: "Dadra & Nagar Haveli", featured: false, available: false, area: "west" },
    { key: 85, city: "Kohima", state: "Nagaland", featured: false, available: false, area: "east" },
    { key: 86, city: "Dimapur", state: "Nagaland", featured: false, available: false, area: "east" },
    { key: 87, city: "Lakshadweep", state: "Lakshadweep", featured: false, available: false, area: "south" },
    { key: 88, city: "Itanagar", state: "Arunachal Pradesh", featured: false, available: false, area: "east" },
    { key: 89, city: "Portblair", state: "Andaman & Nicobar Islands", featured: false, available: false, area: "south" }
  ];

  const [areaFilter, setAreaFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCities = useMemo(() => {
    let filtered = cities.filter(city => city.available);

    if (areaFilter !== 'all') {
      filtered = filtered.filter(city => city.area === areaFilter);
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter(city =>
        city.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.state.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [areaFilter, searchTerm]);

  const totalPages = Math.ceil(filteredCities.length / 30);
  const currentCities = filteredCities.slice((currentPage - 1) * 30, currentPage * 30);

  const handleFilter = (area) => {
    setAreaFilter(area);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };


  return (
    <section className='w-full'>
      <div className="Allcities_header text-center w-full bg-[#16A34A] pt-25 pb-10">
        <h3 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white'>GreenGlide Cities</h3>
        <p className='text-white mt-4 text-lg mx-auto'>Discover all the cities where GreenGlide operates. Book a ride anywhere, anytime.</p>
        <div className="h-12 sm:w-140 size-[80%] border bg-white dark:bg-black text-gray-800 dark:text-gray-400 rounded-xl relative mx-auto mt-7">
          <i className="fas fa-search absolute text-md text-gray-500 dark:text-gray-400 top-[35%] left-3"></i>
        <input
   type="text"
   className='h-full w-full bg-white dark:bg-black px-3 text-gray-800 dark:text-gray-400 pl-10 pr-4 rounded-xl shadow-md text-[0.9rem] font-medium border border-transparent focus:border-green-600 focus:outline-none'
   placeholder='Search for a city or state...'
   value={searchTerm}
   onChange={handleSearch}
  />
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
   {/* Your Search Icon (SVG Example) */}
   <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
   </svg>
   {/* Your Search Icon (Image Example) */}
   {/* <img src="/path/to/your/search-icon.png" alt="Search Icon" className="w-5 h-5 text-gray-500 dark:text-gray-400" /> */}
  </div>
        </div>
      </div>

      <div className="Allcities_body w-full bg-gray-100 dark:bg-gray-900 md:p-10 p-2 pt-13">
        <div className="Allcities-tabs-buttons sm md:w-[70%] lg:w-[45%] bg-gray-200 dark:bg-gray-700/50 flex rounded-md p-2 pl-0 mt-4">
          {['all', 'north', 'south', 'east', 'west'].map(area => {
            const isActive = areaFilter === area;
            return (
              <button
                key={area}
                onClick={() => handleFilter(area)}
                className={`h-9 btn text-xs md:text-sm w-90 rounded-md mx-1 transition-all duration-200 
              ${isActive ? 'bg-gray-950 text-white' : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600 hover:text-black dark:hover:text-white'}`}
              >
                {area === 'all' ? 'All cities' : `${area.charAt(0).toUpperCase() + area.slice(1)} india`}
              </button>
            );
          })}
        </div>

        <h3 className='w-50 text-2xl font-semibold text-gray-800 dark:text-white text-start mt-8 mb-8 px-0'>
          {areaFilter === 'all' ? 'All Cities' : `${areaFilter.charAt(0).toUpperCase() + areaFilter.slice(1)} India`} ({filteredCities.length})
        </h3>

        <div className="Availability-page-cities md:size-[100%] size-[100%] mx-auto flex flex-wrap justify-center">
          {currentCities.map(city => (
            <div key={city.key} className='h-20 w-65 flex justify-around items-around border border-gray-300 dark:border-gray-200/20 hover:border-green-500/70 m-2 px-4 rounded-md relative transition-all duration-300 bg-white dark:bg-transparent'>
              <Link className='text-lg text-gray-800 dark:text-white h-full w-full text-start flex flex-col justify-center'>
                {city.city} <br />
                <span className='text-sm text-start text-gray-500 dark:text-gray-400'>{city.state}</span>
              </Link>
              <i className="fas fa-map-marker-alt absolute right-2 top-2 text-green-600 p-1 rounded-full h-5 w-5 text-xs duration-200"></i>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="pagination mt-6 mb-9 flex justify-center items-center gap-2 flex-wrap">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="text-gray-800 dark:text-white px-3 py-1 bg-gray-200 dark:bg-gray-950 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 rounded-md 
              ${currentPage === index + 1
                    ? 'bg-green-600/80 text-white'
                    : 'bg-gray-200 dark:bg-gray-950 text-gray-800 dark:text-white hover:bg-green-700'}`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="text-gray-800 dark:text-white px-3 py-1 bg-gray-300 dark:bg-gray-600 rounded-md hover:bg-gray-400 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

<div className="Expansion-plans w-full  bg-gray-100 dark:bg-gray-800/95 pt-10 pb-2">
  <h3 className='text-3xl md:text-4xl font-bold dark:text-white text-gray-900'>Our Expansion Plans</h3>
  <p className='mt-5 w-[90%] md:w-[50%] text-lg dark:text-gray-400 text-gray-700 mx-auto'>
    GreenGlide is rapidly expanding to new cities across India. We're committed to bringing our eco-friendly, reliable transportation solutions to every corner of the country.
  </p>

  <div className="planDetails w-full md:px-0 px-3 md:flex justify-center mt-9">
    <div className="planDetails-card h-30 w-full md:w-52 dark:bg-gray-700/70 bg-gray-200 rounded-lg flex flex-col justify-center mt-2 md:mx-3 shadow-md">
      <span className='block text-3xl font-bold text-green-400/90'>500+</span>
      <span className='block text-base font-bold dark:text-gray-400 text-gray-800'>Current Cities</span>
    </div>
    <div className="planDetails-card h-30 w-full md:w-52 dark:bg-gray-700/70 bg-gray-200 rounded-lg flex flex-col justify-center mt-2 md:mx-3 shadow-md">
      <span className='block text-3xl font-bold text-green-400/90'>50+</span>
      <span className='block text-base font-bold dark:text-gray-400 text-gray-800'>New Cities This Year</span>
    </div>
    <div className="planDetails-card h-30 w-full md:w-52 dark:bg-gray-700/70 bg-gray-200 rounded-lg flex flex-col justify-center mt-2 md:mx-3 shadow-md">
      <span className='block text-3xl font-bold text-green-400/90'>28</span>
      <span className='block text-base font-bold dark:text-gray-400 text-gray-800'>State Covered</span>
    </div>
  </div>

  <button className='btn mt-10 mb-7 bg-green-500/80 hover:bg-green-600/80 h-10 w-39 rounded-lg text-white dark:text-gray-900 text-medium'>
    Partner With Us
  </button>
</div>
    </section>

  )
}

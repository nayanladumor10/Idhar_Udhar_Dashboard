import React from 'react'
import { Link } from 'react-router'

const coreValues = [
  {
    icon: "fab fa-pagelines",
    title: "Sustainability",
    description: "We're committed to reducing carbon emissions through electric vehicles and eco-friendly practices.",
  },
  {
    icon: "fas fa-shield-alt",
    title: "Safety",
    description: "The safety of our passengers, drivers, and communities is our top priority in everything we do.",
  },
  {
    icon: "fas fa-medal",
    title: "Innovation",
    description: "We constantly push the boundaries of what's possible to create better experiences and solutions.",
  },
  {
    icon: "fas fa-user-friends",
    title: "Community",
    description: "We believe in building stronger communities through accessible, affordable transportation for all.",
  },
];

const impactCards = [
  {
    value: "52K+",
    label: "Tons of CO₂ Saved",
    description: "Through our fleet of electric and low-emission vehicles, we've prevented thousands of tons of carbon from entering the atmosphere.",
  },
  {
    value: "10M+",
    label: "Green Rides Completed",
    description: "Millions of riders have chosen our eco-friendly transportation options, contributing to a greener future with every trip.",
  },
  {
    value: "75K+",
    label: "Driver Partners",
    description: "We've created economic opportunities for thousands of drivers while helping them transition to sustainable vehicles.",
  },
];

const leadership = [
  {
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Amit Kumar",
    role: "CO-Founder & CEO",
    desc: "Former head of sustainability at Tesla, Amit brings 15 years of experience in electric mobility and climate tech",
  },
  {
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Priya Sharma",
    role: "CO-Founder & CEO",
    desc: "With experience scaling operations at Uber and Ola, Priya oversees our rapid expansion across cities.",
  },
  {
    img: "https://randomuser.me/api/portraits/men/68.jpg",
    name: "Raj Patel",
    role: "CTO",
    desc: "Former head of sustainability at Tesla, Amit brings 15 years of experience in electric mobility and climate tech",
  },
];


export default function Aboutpage() {
  return (
    <>
      <section className="Hero bg-green-700 pt-20">
        <h3 className="md:text-5xl text-xl sm:text-2xl font-bold text-white mt-10">
          Driving the Future of <br />
          <span className="text-green-300 dark:text-green-500">Sustainable Mobility</span>
        </h3>
        <p className="text-gray-800 dark:text-gray-300 font-medium md:w-[50%] w-[90%] mx-auto mt-6">
          IdharUdhar is revolutionizing urban transportation with eco-friendly rides, cutting-edge technology, and a commitment to a greener planet.
        </p>
        <div className="aboutButtons flex sm:flex-row flex-col items-center mx-auto sm:w-100 gap-4 mt-12 mb-25">
          <button className="btn bg-white text-green-700 dark:text-green-600 shadow-sm rounded-lg h-11 sm:w-40 w-[80%] font-medium hover:bg-gray-200 dark:hover:bg-gray-950 transition-all duration-200">
            Join Our Team
          </button>
          <button className="btn bg-gray-300 dark:bg-gray-950 shadow-sm hover:bg-green-200 dark:hover:bg-green-500/60 border border-gray-300 dark:border-gray-700/30 rounded-lg h-11 sm:w-40 w-[80%] text-black dark:text-white font-medium transition-all duration-200">
            Learn More
          </button>
        </div>

        <div className="grdient w-full h-22 bg-gradient-to-b from-transparent to-gray-100 dark:to-gray-950" />

        <div className="OurMission w-full bg-white dark:bg-gray-950 flex flex-col md:flex-row pb-15">
          <div className="OurMissionImg md:h-100 h-90 md:w-[50%] w-full">
            <img src="" alt="IdharUdhar Mission" className="h-full w-full text-black dark:text-white pt-55" />
          </div>
          <div className="OurMission-text md:h-100 h-130 md:w-[50%] w-full ps-10 flex flex-col">
            <h3 className="text-4xl text-black dark:text-white font-bold text-start mt-19">Our Mission</h3>
            <p className="text-gray-700 dark:text-gray-400 font-medium text-start mt-9 text-lg">
              At IdharUdhar, our mission is to transform urban mobility by providing eco-friendly, affordable transportation options that reduce carbon emissions while enhancing the quality of urban life.


            </p>
            <p className="text-gray-700 dark:text-gray-400 font-medium text-start mt-5 text-lg">
              We believe that sustainable transportation shouldn't come at a premium cost. By leveraging cutting-edge technology, we're making green rides accessible to everyone, everywhere.
            </p>
            <button className="group btn bg-green-600 hover:bg-green-800 w-55 px-4 py-2 rounded-lg text-white font-medium transition-all duration-200 mt-10">
              Explore Our Services <i className="fas fa-arrow-right ml-3 group-hover:translate-x-2 transition-all duration-500"></i>
            </button>
          </div>
        </div>
      </section>

      <section className='StorySection bg-gray-100 dark:bg-gray-900 transition-colors duration-300'>
        <div className="OurStory pt-10 text-center">
          <h3 className='text-4xl font-bold text-gray-900 dark:text-white'>Our Story</h3>
          <p className='text-gray-700 dark:text-gray-300 md:w-[50%] w-[90%] mx-auto mt-5 text-lg'>
            Founded in 2023, IdharUdhar emerged from a simple yet powerful vision: to reinvent urban transportation with sustainability at its core.
          </p>
        </div>

        <div className="StoryList mt-20 space-y-10">
          {/* Story Block 1 */}
          <div className="StoryLine1 flex md:flex-row flex-col-reverse">
            <div className="StroryText md:w-[50%] w-full dark:border-3 md:border-r-green-800/40 border-gray-900 p-3 md:pr-10 relative flex flex-col justify-center md:items-end items-center gap-4">
              <h3 className='text-2xl font-bold text-gray-900 dark:text-white md:text-right'>2023: The Beginning</h3>
              <p className='text-gray-700 dark:text-gray-400 md:text-right md:w-[85%]'>
                IdharUdhar was founded in New Delhi by a team of environmental enthusiasts and tech innovators determined to reduce the carbon footprint of urban transportation.
              </p>
              <div className="dot absolute h-5 w-5 rounded-full hidden md:flex bg-green-700 dark:bg-green-400 -top-4 -right-3"></div>
            </div>
            <div className="StroryImg md:w-[50%] w-[95%] flex justify-center items-center">
              <img src="https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?w=800&auto=format&fit=crop&q=60"
                className='h-[100%] md:w-[60%] rounded-xl md:ml-10 ml-[5%] md:mb-5 mb-1'
                alt="Story 2023" />
            </div>
          </div>

          {/* Story Block 2 */}
          <div className="StoryLine2 flex md:flex-row flex-col-reverse">
            <div className="StroryText md:w-[50%] w-full dark:border-3 md:border-r-green-800/40 border-gray-900 p-3 md:pr-10 relative flex flex-col justify-center md:items-end gap-4">
              <h3 className='text-2xl font-bold text-gray-900 dark:text-white md:w-[86%] md:text-start'>2024: Rapid Expansion</h3>
              <p className='text-gray-700 dark:text-gray-400 md:text-start md:w-[85%]'>
                Within a year, IdharUdhar expanded to 50+ cities across India and partnered with major electric vehicle manufacturers to build a fleet of zero-emission vehicles.
              </p>
              <div className="dot absolute h-5 w-5 rounded-full hidden md:flex bg-green-700 dark:bg-green-400 -top-4 -right-3"></div>
            </div>
            <div className="StroryImg md:w-[50%] w-[95%] flex justify-start items-center">
              <img src="https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?w=800&auto=format&fit=crop&q=60"
                className='h-[100%] md:w-[60%] rounded-xl md:ml-0 ml-[5%] md:mb-5 mb-1'
                alt="Story 2024" />
            </div>
          </div>

          {/* Story Block 3 */}
          <div className="StoryLine3 flex md:flex-row flex-col-reverse">
            <div className="StroryText md:w-[50%] w-full dark:border-3 md:border-r-green-800/40 border-gray-900 p-3 md:pr-10 relative flex flex-col justify-center md:items-end items-center gap-4">
              <h3 className='text-2xl font-bold text-gray-900 dark:text-white md:text-right'>2025: Today & Beyond</h3>
              <p className='text-gray-700 dark:text-gray-400 md:text-right md:w-[85%]'>
                Today, IdharUdhar serves over 500 cities globally with a mission to make sustainable transportation the norm rather than the exception, while continuously innovating to reduce our environmental impact.
              </p>
              <div className="dot absolute h-5 w-5 rounded-full hidden md:flex bg-green-700 dark:bg-green-400 -top-4 -right-3"></div>
            </div>
            <div className="StroryImg md:w-[50%] w-[95%] flex justify-center items-center">
              <img src="https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?w=800&auto=format&fit=crop&q=60"
                className='h-[100%] md:w-[60%] rounded-xl md:ml-10 ml-[5%] md:mb-5 mb-1'
                alt="Story 2025" />
            </div>
          </div>
        </div>
      </section>


      <section className="coreValues bg-white dark:bg-gray-950 pt-12 pb-20">
        <h3 className="text-3xl text-black dark:text-white font-medium mt-5">Our Core Values</h3>
        <p className="text-gray-700 dark:text-gray-400 font-medium text-lg mt-3">
          The principles that guide every decision we make and every service we provide.
        </p>
        <div className="ValueCards flex flex-wrap justify-center mt-7">
          {coreValues.map((value, index) => (
            <div key={index} className="valueCard h-60 w-75 bg-gray-100 dark:bg-gray-700/40 rounded-xl flex flex-col ps-4 md:m-4 m-2">
              <i className={`${value.icon} h-12 w-12 rounded-full bg-green-100 dark:bg-green-600/15 flex items-center justify-center text-green-600 dark:text-green-500 text-2xl pt-[4.2%] mt-7`}></i>
              <h3 className="text-xl font-bold text-black dark:text-white text-start mt-3">{value.title}</h3>
              <p className="text-gray-700 dark:text-gray-400 text-start mt-3">{value.description}</p>
            </div>
          ))}
        </div>
      </section>



      <section className="impact bg-green-100 dark:bg-green-800 pt-18 pb-15">
        <h3 className="text-3xl font-bold text-black dark:text-white">Our Impact</h3>
        <p className="text-gray-700 dark:text-white font-medium text-lg mt-5">
          Since our founding, we've made meaningful contributions to creating a greener, more connected world.
        </p>
        <div className="impactcards mx-auto flex wrap justify-center flex-col md:flex-row mt-10">
          {impactCards.map((item, index) => (
            <div key={index} className="impactCard h-50 md:w-100 m-3">
              <h3 className="sm:text-5xl text-2xl font-bold text-green-700 dark:text-green-400 mt-5">{item.value}</h3>
              <h3 className="sm:text-xl text-md text-black dark:text-white mt-2">{item.label}</h3>
              <p className="text-gray-700 dark:text-gray-200 fw-medium mt-2">{item.description}</p>
            </div>
          ))}
        </div>
      </section>


      <section className="OurLeadership bg-white dark:bg-gray-950 pt-10 pb-15">
        <h3 className="text-3xl font-medium text-black dark:text-white">Our Leadership</h3>
        <p className="text-lg text-gray-700 dark:text-gray-200 w-[90%] mx-auto mt-5">
          Meet the team driving our mission to revolutionize urban mobility.
        </p>
        <div className="Leaders flex justify-center items-center lg:flex-row flex-col gap-9 mt-10 md:p-0 px-5">
          {leadership.map((person, index) => (
            <div key={index} className="Leader h-110 md:w-95">
              <img src={person.img} alt="" className="h-[55%] w-full rounded-t-lg" />
              <div className="LeaderInfo h-[45%] w-full bg-gray-100 dark:bg-gray-700/70 rounded-b-lg ps-5 pt-5">
                <h3 className="text-black dark:text-white text-2xl font-medium text-start">{person.name}</h3>
                <h3 className="text-green-600 dark:text-green-400 text-xl font-medium text-start mt-2">{person.role}</h3>
                <p className="text-gray-700 dark:text-gray-400 font-lg w-[90%] text-left mt-1">{person.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="group bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-200/20 rounded-xl px-5 py-3 text-black dark:text-white text-sm mt-10 hover:bg-green-100 dark:hover:bg-green-400/40 transition-all duration-200">
          View Full Team <i className="fas fa-angle-down ml-2 group-hover:rotate-180 transition-all duration-200"></i>
        </button>
      </section>


      <section className="greenRevolution bg-green-100 dark:bg-green-800 pt-18 pb-16">
        <h3 className="md:text-5xl text-xl sm:text-2xl font-bold text-black dark:text-white">Join the Green Revolution</h3>
        <p className="text-gray-700 dark:text-gray-100 text-xl font-medium md:w-[50%] w-[90%] mx-auto mt-15">
          Whether you're a rider, driver, or potential team member, be part of our journey to transform urban mobility and create a more sustainable future.
        </p>
        <div className="aboutButtons flex sm:flex-row flex-col items-center justify-center mx-auto w-full max-w-[90%] gap-4 mt-15 mb-10">
          <button className="btn bg-white text-green-700 dark:text-green-600 shadow-sm rounded-lg h-11 w-42 font-[500] hover:bg-gray-200 dark:hover:bg-gray-950 transition-all duration-200">
            <i className="fas fa-car-side"></i> Book a Ride
          </button>
          <button className="btn bg-gray-200 dark:bg-gray-950 shadow-sm hover:bg-green-200 dark:hover:bg-green-500/60 border border-gray-300 dark:border-gray-500/30 rounded-lg h-11 w-42 text-black dark:text-white font-[500] transition-all duration-200">
            <i className="fas fa-biking"></i> Become a Driver
          </button>
          <button className="btn bg-gray-200 dark:bg-gray-950 shadow-sm hover:bg-green-200 dark:hover:bg-green-500/60 border border-gray-300 dark:border-gray-500/30 rounded-lg h-11 w-42 text-black dark:text-white font-[500] transition-all duration-200">
            <i className="fas fa-user-friends"></i> Join Our Team
          </button>
        </div>
      </section>

      <section className="GlobalPresence bg-white dark:bg-gray-950 pt-14 pb-12 pb-5">
        <h3 className="text-5xl font-medium text-black dark:text-white">Our Global Presence</h3>
        <p className="text-gray-700 dark:text-gray-400 w-[45%] mx-auto mt-8">
          From bustling metropolises to emerging cities, we're bringing sustainable mobility solutions worldwide.
        </p>
        <div className="Map w-[90%] h-90 bg-gray-300 dark:bg-gray-600/80 flex justify-center items-center mx-auto rounded-xl mt-10 relative">
          <span className="text-gray-700 dark:text-gray-400 text-xl">Map will be Here</span>
          <div className="grdient w-full px-2 flex flex-wrap gap-2 justify-center items-center h-22 bg-gradient-to-b from-transparent to-gray-200 dark:to-gray-950 absolute bottom-0 r-0">
            <button className='px-2 bg-gray-500/90 text-white  text-md  rounded-full  h-7'>Pune</button>
            <button className='px-2 bg-gray-500/90 text-white  text-md  rounded-full  h-7'>Mumbai</button>
            <button className='px-2 bg-gray-500/90 text-white  text-md  rounded-full  h-7'>New Delhi</button>
            <button className='px-2 bg-gray-500/90 text-white  text-md  rounded-full  h-7'>Baglore</button>
            <button className='px-2 bg-gray-500/90 text-white  text-md  rounded-full  h-7'>Hydrabad</button>
            <button className='px-2 bg-gray-500/90 text-white  text-md  rounded-full  h-7'>Chennai</button>
            <button className='px-2 bg-gray-500/90 text-white  text-md  rounded-full  h-7'>Kolkata</button>
            <button className='px-2 bg-gray-500/90 text-white  text-md  rounded-full  h-7'>Ahmedabaad</button>
            <button className='px-2 bg-gray-500/90 text-white  text-md  rounded-full  h-7'>+495 more</button>
            <button className='px-2 bg-green-400/90 text-white text-md   rounded-full h-7 '><Link to='/allcities'>View All Cities</Link></button>
          </div>
        </div>
      </section>
    </>
  )
}

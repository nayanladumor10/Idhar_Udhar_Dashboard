"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import UserAvatar from "./User/UserAvatar"
import { Menu, Moon, Sun, Globe, X, Mail, Phone, ChevronDown } from "lucide-react"
import Logo from "./Logo"

const Header = () => {
  const { isAuthenticated } = useAuth()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)

  const location = useLocation()

  // Auto‐close dropdowns & mobile menu on any route change
  useEffect(() => {
    setServicesOpen(false)
    setHelpOpen(false)
    setMobileMenuOpen(false)
  }, [location.pathname])

  const toggleTheme = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    document.documentElement.classList.toggle("dark", newMode)
    localStorage.setItem("darkMode", newMode ? "true" : "false")
  }

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true"
    setIsDarkMode(savedMode)
    document.documentElement.classList.toggle("dark", savedMode)
  }, [])

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header className="w-full">
        {/* Top bar */}
        <div className="bg-green-700 text-white py-2 px-4 fixed top-0 left-0 w-full z-50 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <a href="mailto:support@idharudhar.com" className="text-sm flex items-center hover:text-green-200 transition-colors">
              <Mail className="mr-2" size={16} />
              <span className="hidden sm:inline">support@idharudhar.com</span>
              <span className="sm:hidden">Email Us</span>
            </a>
            <a href="tel:+919999988888" className="text-sm flex items-center hover:text-green-200 transition-colors">
              <Phone className="mr-2" size={16} />
              <span>+91 99999 88888</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            {/* social icons... */}
          </div>
        </div>

        {/* Main nav */}
        <div
          className={`bg-white text-black dark:bg-gray-900 dark:text-white py-4 px-4 fixed top-9 left-0 w-full z-40 transition-shadow duration-300 ${
            scrolled ? "shadow-lg" : ""
          }`}
        >
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-2xl font-bold">
              <Logo />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="font-medium hover:text-green-400 transition-colors">
                Home
              </Link>
              <div className="relative">
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="flex items-center font-medium hover:text-green-400 transition-colors"
                >
                  Services
                  <ChevronDown
                    size={16}
                    className={`ml-1 transition-transform duration-200 ease-in-out ${servicesOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`absolute left-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden transition-maxh duration-300 ease-in-out ${
                    servicesOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <Link to="/carrides" className="block px-4 py-2 hover:bg-green-200 dark:hover:bg-green-700 transition-colors">
                    Car Rides
                  </Link>
                  <Link to="/rentals" className="block px-4 py-2 hover:bg-green-200 dark:hover:bg-green-700 transition-colors">
                    Rentals
                  </Link>
                  <Link to="/Auto_rides" className="block px-4 py-2 hover:bg-green-200 dark:hover:bg-green-700 transition-colors">
                    Auto Rides
                  </Link>
                  <Link to="/Bike_rides" className="block px-4 py-2 hover:bg-green-200 dark:hover:bg-green-700 transition-colors">
                    Bike Rides
                  </Link>
                  <Link to="/Intercity" className="block px-4 py-2 hover:bg-green-200 dark:hover:bg-green-700 transition-colors">
                    Intercity
                  </Link>
                </div>
              </div>

              <Link to="/Safety" className="font-medium hover:text-green-400 transition-colors">
                Safety
              </Link>
              <Link to="/about" className="font-medium hover:text-green-400 transition-colors">
                About
              </Link>

              <div className="relative">
                <button
                  onClick={() => setHelpOpen(!helpOpen)}
                  className="flex items-center font-medium hover:text-green-400 transition-colors"
                >
                  Help
                  <ChevronDown
                    size={16}
                    className={`ml-1 transition-transform duration-200 ease-in-out ${helpOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`absolute left-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden transition-maxh duration-300 ease-in-out ${
                    helpOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <a href="#" className="block px-4 py-2 hover:bg-green-200 dark:hover:bg-green-700 transition-colors">
                    FAQs
                  </a>
                  <a href="#" className="block px-4 py-2 hover:bg-green-200 dark:hover:bg-green-700 transition-colors">
                    Contact Us
                  </a>
                  <a href="#" className="block px-4 py-2 hover:bg-green-200 dark:hover:bg-green-700 transition-colors">
                    Support
                  </a>
                </div>
              </div>
            </nav>

            {/* Right side */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-green-200 dark:hover:bg-gray-700 transition-colors"
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button className="p-2 rounded-full hover:bg-green-200 dark:hover:bg-gray-700 transition-colors" aria-label="Change language">
                <Globe size={20} />
              </button>
              {isAuthenticated ? (
                <UserAvatar />
              ) : (
                <>
                  <Link to="/login" className="bg-white dark:bg-[#0F141B] dark:hover:bg-[#0F5729] dark:text-white font-medium px-4 py-2 rounded-md border border-gray dark:border-gray-700 hover:border-[#0F5729] hover:bg-[#0F5729] hover:text-white">
                    Login
                  </Link>
                  <Link to="/signup" className="bg-green-500 text-white font-medium px-4 py-2 rounded-md hover:bg-green-600 transition-colors">
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-800 dark:text-white p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`fixed inset-0 bg-gray-900 z-30 pt-28 px-4 transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
        >
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="text-white text-lg font-medium py-2 border-b border-gray-700">
              Home
            </Link>
            <details className="group">
              <summary className="flex justify-between items-center text-white text-lg py-2 border-b border-gray-700 cursor-pointer">
                Services
                <ChevronDown size={16} className="transition-transform group-open:rotate-180" />
              </summary>
              <div className="mt-2 ml-4 space-y-2">
                <Link to="/Bike_rides" className="block text-white py-2">Bike Ride</Link>
                <Link to="/carrides" className="block text-white py-2">Car Ride</Link>
                <Link to="/Auto_rides" className="block text-white py-2">Auto Ride</Link>
                <Link to="/courier" className="block text-white py-2">Courier Delivery</Link>
                <Link to="/food" className="block text-white py-2">Food Delivery</Link>
                <Link to="/grocery" className="block text-white py-2">Grocery Delivery</Link>
              </div>
            </details>
            <Link to="/safety" className="text-white text-lg font-medium py-2 border-b border-gray-700">
              Safety
            </Link>
            <Link to="/about" className="text-white text-lg font-medium py-2 border-b border-gray-700">
              About
            </Link>
            <details className="group">
              <summary className="flex justify-between items-center text-white text-lg py-2 border-b border-gray-700 cursor-pointer">
                Help
                <ChevronDown size={16} className="transition-transform group-open:rotate-180" />
              </summary>
              <div className="mt-2 ml-4 space-y-2">
                <Link to="/faqs" className="block text-white py-2">FAQs</Link>
                <Link to="/contact" className="block text-white py-2">Contact Us</Link>
                <Link to="/support" className="block text-white py-2">Support</Link>
              </div>
            </details>

            <div className="flex space-x-4 py-4">
              <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-700 transition-colors" aria-label={isDarkMode ? "Light mode" : "Dark mode"}>
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button className="p-2 rounded-full hover:bg-gray-700 transition-colors" aria-label="Change language">
                <Globe size={20} />
              </button>
            </div>

            <div className="flex flex-col space-y-3 mt-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <UserAvatar size="lg" />
                  <span className="text-white font-medium">My Profile</span>
                </div>
              ) : (
                <>
                  <Link to="/login" className="bg-white dark:bg-[#0F141B] text-black dark:text-white font-medium px-4 py-2 rounded-md border border-gray-300 transition-colors">
                    Login
                  </Link>
                  <Link to="/signup" className="bg-green-500 text-white font-medium px-4 py-2 rounded-md hover:bg-green-600 transition-colors">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}

export default Header

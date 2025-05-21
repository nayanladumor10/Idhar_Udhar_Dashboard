"use client"

import { useState, useRef, useEffect } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { FiUser, FiBell, FiSettings, FiLogOut } from "react-icons/fi"

const UserAvatar = ({ size = "md" }) => {
  const { user, logout } = useAuth()
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    setShowDropdown(false)
  }, [location.pathname])

  if (!user) return null

  const firstName = user.name?.split(" ")[0] || user.fullName?.split(" ")[0] || ""
  const firstLetter = (firstName.charAt(0) || user.email?.charAt(0) || "?").toUpperCase()

  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
  }

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className={`${sizeClasses[size]} bg-green-600 text-white rounded-full flex items-center justify-center font-medium cursor-pointer hover:bg-green-700 transition-colors`}
        onClick={() => setShowDropdown((prev) => !prev)}
        title={user.name || user.fullName || user.email}
      >
        {firstLetter}
      </div>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-56 bg-white text-gray-900 dark:bg-gray-900 dark:text-white rounded-lg shadow-lg z-50 animate-fade-in">
          <div className="px-4 py-2 text-sm font-semibold border-b border-gray-200 dark:border-gray-700 text-start">My Account</div>

          <Link
            to="/profile"
            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-green-100 dark:hover:bg-green-700 rounded-md transition-colors"
          >
            <FiUser size={16} /> Profile
          </Link>

          <div className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors cursor-pointer">
            <FiBell size={16} /> Notifications
          </div>

          <div className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors cursor-pointer">
            <FiSettings size={16} /> Settings
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 my-1" />

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-500 hover:bg-red-100 dark:hover:bg-red-800 hover:text-red-800 dark:hover:text-white rounded-md w-full transition-colors"
          >
            <FiLogOut size={16} /> Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default UserAvatar

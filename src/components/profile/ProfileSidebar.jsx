import React from 'react'
import { Mail, Phone, MapPin, Shield } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext' // make sure the path is correct

const ProfileSidebar = ({ onEditClick }) => {
  const { user } = useAuth(); // 👈 get user from context

  if (!user) return null;

  // Function to get the first letter, handling null/undefined
  const getFirstLetter = (nameOrEmail) => {
    if (!nameOrEmail) return ''; // Return empty string if null or undefined
    return nameOrEmail.slice(0, 1).toUpperCase();
  };

  return (
    <div className="bg-white border dark:border-none shadow-lg dark:bg-gray-800 rounded-lg p-6">
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white text-3xl font-semibold mb-4">
          {getFirstLetter(user.fullName || user.name || user.email)}
        </div>
        <h2 className="text-2xl font-semibold text-black dark:text-white">
          {user.fullName || user.name || 'User'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">Member since March 2023</p>
        {/* Stars rating (same as before) */}
        {/* You would add the star rating component/code here */}
      </div>

      <div className="space-y-4">
        <div className="flex items-start">
          <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-1 mr-3" />
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm text-start">Email</p>
            <p className="text-black dark:text-white">{user.email}</p>
          </div>
        </div>

        <div className="flex items-start">
          <Phone className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-1 mr-3" />
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm text-start">Phone</p>
            <p className="text-black dark:text-white">{user.phone || 'Not added'}</p>
          </div>
        </div>

        <div className="flex items-start">
          <MapPin className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-1 mr-3" />
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm text-start">Address</p>
            <p className="text-black dark:text-white text-start">{user.address || 'Not added'}</p>
          </div>
        </div>

        <div className="flex items-start">
          <Shield className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-1 mr-3" />
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Account Status</p>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <p className="text-black dark:text-white">Verified</p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onEditClick}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg py-2 mt-6 flex items-center justify-center"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileSidebar;

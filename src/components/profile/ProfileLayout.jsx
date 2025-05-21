// ProfileLayout.js
import React, { useState, useEffect } from 'react';
import ProfileSidebar from './ProfileSidebar'; // Assuming default export
import SavedLocations from './SavedLocations'; // Assuming default export
import PaymentMethods from './PaymentMethods'; // Assuming default export
import MyRides from './MyRides'; // Assuming default export
import AccountSettings from './AccountSettings'; // Assuming default export
import EditProfileForm from './EditProfile'; // Assuming default export

const USER_DATA_KEY = 'user_profile_data';

const ProfileLayout = () => {
  const [activeTab, setActiveTab] = useState('locations');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(() => {
    const storedUserData = localStorage.getItem(USER_DATA_KEY);
    return storedUserData ? JSON.parse(storedUserData) : {
      fullName: 'John Doe',
      email: 'harsprajapati114@gmail.com',
      phone: '+1234567890',
      address: 'Andheri West, Mumbai, 400053'
    };
  });

  useEffect(() => {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
  }, [userData]);

  const renderContent = () => {
    switch (activeTab) {
      case 'locations':
        return <SavedLocations />;
      case 'payments':
        return <PaymentMethods />;
      case 'rides':
        return <MyRides />;
      case 'settings':
        return <AccountSettings />;
      default:
        return null;
    }
  };

  const handleSaveProfile = (data) => {
    setUserData(data);
    setIsEditing(false);
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen text-white flex justify-center mt-15">
      <div className="w-[350px] p-6">
        <ProfileSidebar
          userData={userData}
          onEditClick={() => setIsEditing(true)}
          isEditing={isEditing} // Pass isEditing to ProfileSidebar
        />
      </div>

      <div className="p-6 w-[800px]">
        {/* Tabs */}
        {!isEditing && (
          <div className="bg-white border shadow-lg dark:border-none dark:bg-gray-800 h-10 flex items-center space-x-4 mb-6 rounded-lg">
            {['locations', 'payments', 'rides', 'settings'].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-1 rounded-lg transition-colors h-lg flex items-center ${
                  activeTab === tab ? 'bg-green-500 text-white dark:bg-[#010514] text-white' : 'text-gray-600 dark:hover:text-white'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'locations' && 'Saved Locations'}
                {tab === 'payments' && 'Payment Methods'}
                {tab === 'rides' && 'My Rides'}
                {tab === 'settings' && 'Account Settings'}
              </button>
            ))}
            <div className="flex-grow" />
          </div>
        )}

        {/* Content or Edit Form */}
        <div className={`${activeTab !== 'settings' && !isEditing ? 'bg-white border dark:border-none shadow-lg dark:bg-[#010514] rounded-lg p-6' : (isEditing ? 'bg-white border shadow-lg dark:bg-[#010514] rounded-lg p-6' : '')}`}>
          {isEditing ? (
            <EditProfileForm
              initialData={userData}
              onCancel={() => setIsEditing(false)}
              onSave={handleSaveProfile}
            />
          ) : (
            renderContent()
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
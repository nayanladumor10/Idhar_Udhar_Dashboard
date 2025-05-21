import React, { useState, useEffect } from 'react';
import { Home, Briefcase, Heart, Plus, Trash2 } from 'lucide-react';

const iconMap = {
  home: { icon: <Home className="w-6 h-6" />, bg: 'bg-blue-500/20', color: 'text-blue-500' },
  briefcase: { icon: <Briefcase className="w-6 h-6" />, bg: 'bg-purple-500/20', color: 'text-purple-500' },
  heart: { icon: <Heart className="w-6 h-6" />, bg: 'bg-pink-500/20', color: 'text-pink-500' }
};

const SavedLocations = () => {
  const defaultLocations = [
    { name: 'Home', address: '123 Palm Grove, Andheri West, Mumbai, 400053', iconKey: 'home' },
    { name: 'Office', address: 'Techpark One, Goregaon East, Mumbai, 400063', iconKey: 'briefcase' },
    { name: 'Gym', address: 'Fitness Hub, Juhu, Mumbai, 400049', iconKey: 'heart' }
  ];

  const [locations, setLocations] = useState(() => {
    const saved = localStorage.getItem('savedLocations');
    return saved ? JSON.parse(saved) : defaultLocations;
  });

  const [showModal, setShowModal] = useState(false);
  const [newLocation, setNewLocation] = useState({ name: '', address: '' });

  useEffect(() => {
    localStorage.setItem('savedLocations', JSON.stringify(locations));
  }, [locations]);

  const handleAddLocation = () => {
    const keys = ['home', 'briefcase', 'heart'];
    const randomKey = keys[Math.floor(Math.random() * keys.length)];

    setLocations([
      ...locations,
      { name: newLocation.name, address: newLocation.address, iconKey: randomKey }
    ]);

    setNewLocation({ name: '', address: '' });
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
    setNewLocation({ name: '', address: '' });
  };

  const handleDeleteLocation = (index) => {
    const updated = locations.filter((_, i) => i !== index);
    setLocations(updated);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-black dark:text-white">Your Saved Locations</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Location
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#121829] border border-gray-600  p-6 rounded-lg w-96 space-y-4 shadow-xl">
            <h3 className="text-xl font-semibold text-black dark:text-white">Add New Location</h3>
            <input
              type="text"
              placeholder="Location Name"
              value={newLocation.name}
              onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
              className="w-full p-2 rounded bg-white dark:bg-[#121829] border border-gray-600 text-white border border-gray-600"
            />
            <textarea
              placeholder="Location Address"
              value={newLocation.address}
              onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })}
              className="w-full p-2 rounded bg-white dark:bg-[#121829] border border-gray-600 text-white border border-gray-600"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCancel}
                className="dark:bg-gray-700 dark:hover:bg-gray-600 border border-gray-600 text-black dark:text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddLocation}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {locations.map((location, index) => {
          const iconData = iconMap[location.iconKey];
          return (
            <div
              key={index}
              className="bg-white shadow-xl dark:bg-[#010514] rounded-lg p-4 flex items-center justify-between group transition-colors shadow-[0.5px_0_0_white,-0.5px_0_0_white,0_0.5px_0_white]"
            >
              <div className="flex items-center">
                <div
                  className={`w-12 h-12 ${iconData.bg} ${iconData.color} rounded-lg flex items-center justify-center mr-4`}
                >
                  {iconData.icon}
                </div>
                <div>
                  <h3 className="text-black dark:text-white font-medium">{location.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{location.address}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="dark:bg-gray-700 dark:hover:bg-gray-600 border border-gray-600 text-black dark:text-white px-4 py-2 rounded-lg">
                  Book from here
                </button>
                <button
                  onClick={() => handleDeleteLocation(index)}
                  className="text-red-500 hover:text-red-400 p-2 rounded-lg hover:bg-gray-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SavedLocations;

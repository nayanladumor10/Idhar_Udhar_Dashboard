import React, { useState } from 'react';
import { X } from 'lucide-react';

const EditProfileForm = ({ onCancel, onSave, initialData }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-xl dark:bg-[#010514] backdrop-blur-sm rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-black dark:text-white">Edit Your Profile</h2>
        <button type="button" onClick={onCancel}>
          <X className="text-gray-600 dark:text-gray-300 hover:text-white w-6 h-6" />
        </button>
      </div>

      <div className="space-y-4">
        <label className="block text-gray-800 dark:text-gray-400 text-start">Full Name</label>
        <input
          className="w-full p-2 rounded bg-white  dark:bg-gray-700 dark:hover:bg-gray-600 border border-gray-600 text-black dark:text-white placeholder-gray-400"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
        />

        <label className="block text-gray-800 dark:text-gray-400 text-start">Email Address</label>
        <input
          className="w-full p-2 rounded bg-white  dark:bg-gray-700 dark:hover:bg-gray-600 border border-gray-600 text-black dark:text-white placeholder-gray-400"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />

        <label className="block text-gray-800 dark:text-gray-400 text-start">Phone Number</label>
        <input
          className="w-full p-2 rounded bg-white  dark:bg-gray-700 dark:hover:bg-gray-600 border border-gray-600 text-black dark:text-white placeholder-gray-400"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
        />

        <label className="block text-gray-800 dark:text-gray-400 text-start">Address</label>
        <input
          className="w-full p-2 rounded bg-white  dark:bg-gray-700 dark:hover:bg-gray-600 border border-gray-600 text-black dark:text-white placeholder-gray-400"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
        />
      </div>

      <div className="flex justify-end mt-6 space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="dark:bg-gray-700 dark:hover:bg-gray-600 border border-gray-600 text-black dark:text-white px-4 py-2 rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default EditProfileForm;

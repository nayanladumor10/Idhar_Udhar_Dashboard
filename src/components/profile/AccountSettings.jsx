import React, { useState } from 'react';
import { Download, Check, ChevronDown, Trash2 } from 'lucide-react';

const DeleteAccountModal = ({ isOpen, onClose, onConfirm }) => {
  const [confirmText, setConfirmText] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-bold text-black dark:text-white mb-4 text-start">Delete Your Account</h3>
        <div className="mb-6">
          <p className="text-black dark:text-gray-300 mb-4 text-start">Before deleting your account, please understand:</p>
          <ul className="list-disc list-inside text-black dark:text-gray-300 space-y-2 text-start">
            <li>All your personal data will be permanently deleted</li>
            <li>Your ride history and payment information will be removed</li>
            <li>Your account will be permanently deleted within 7 days</li>
            <li>You can cancel this request by logging in again during this period</li>
          </ul>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-black dark:text-gray-300 mb-2 text-start">
            To proceed, type "delete" below:
          </label>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="w-full dark:bg-gray-700 text-white rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder='Type "delete" to confirm'
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="dark:bg-gray-700 dark:hover:bg-gray-600 border border-gray-600 text-black dark:text-white px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={confirmText !== 'delete'}
            className={`px-4 py-2 bg-red-600 text-white rounded-md transition-colors ${
              confirmText !== 'delete' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

const AccountSettings = () => {
  const [selectedType, setSelectedType] = useState('All Data');
  const [openType, setOpenType] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('JSON');
  const [openFormat, setOpenFormat] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const dataTypes = ['All Data', 'Ride History', 'Payment History', 'Personal Information'];
  const formats = ['JSON', 'CSV', 'PDF'];

  const handleDeleteAccount = () => {
    // Handle account deletion here
    setIsDeleteModalOpen(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-white dark:text-white mb-2 text-start">Account Settings</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4 text-start">Manage your account preferences and privacy settings</p>
      <h3 className="text-[22px] font-semibold text-white dark:text-white mb-4 text-start">Your Data</h3>

      <div className="bg-white shadow-xl dark:bg-gray-800 rounded-lg p-6 mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Download size={20} className="text-black dark:text-white" />
          <h3 className="text-xl font-semibold text-black dark:text-white">Download Your Data</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-5 text-start">
          You can download all your personal data or specific categories in various formats.
        </p>

        {/* Dropdown for Data Type */}
        <div className="mb-4">
          <label className="block text-gray-600 dark:text-gray-300 mb-1 text-sm text-start">Data Type</label>
          <div className="relative">
            <button
              onClick={() => setOpenType(!openType)}
              className="w-full bg-white dark:bg-[#010514] text-black dark:text-white p-2 rounded-md border border-gray-700 flex justify-between items-center"
            >
              {selectedType}
              <ChevronDown size={16} />
            </button>
            {openType && (
              <div className="absolute z-10 w-full mt-1 bg-white dark:bg-[#010514] border border-gray-700 rounded-md">
                {dataTypes.map((type) => (
                  <div
                    key={type}
                    onClick={() => {
                      setSelectedType(type);
                      setOpenType(false);
                    }}
                    className="flex justify-between items-center px-3 py-2 text-black dark:text-white cursor-pointer"
                  >
                    <span className="rounded-md hover:bg-green-500 px-3 py-2 flex justify-between items-center w-full">
                      {type}
                      {selectedType === type && <Check size={16} className="text-black dark:text-white" />}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Dropdown for Format */}
        <div className="mb-4">
          <label className="block text-gray-600 dark:text-gray-300 mb-1 text-sm text-start">Format</label>
          <div className="relative">
            <button
              onClick={() => setOpenFormat(!openFormat)}
              className="w-full bg-white dark:bg-[#010514] text-black dark:text-white p-2 rounded-md border border-gray-700 flex justify-between items-center"
            >
              {selectedFormat}
              <ChevronDown size={16} />
            </button>
            {openFormat && (
              <div className="absolute z-10 w-full mt-1 bg-white dark:bg-[#010514] border border-gray-700 rounded-md">
                {formats.map((format) => (
                  <div
                    key={format}
                    onClick={() => {
                      setSelectedFormat(format);
                      setOpenFormat(false);
                    }}
                    className="flex justify-between items-center px-3 py-2 text-black dark:text-white cursor-pointer"
                  >
                    <span className="rounded-md hover:bg-green-500 px-3 py-2 flex justify-between items-center w-full">
                      {format}
                      {selectedFormat === format && <Check size={16} className="ext-black dark:text-white" />}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-md flex items-center justify-center gap-2 transition-colors">
          <Download size={18} />
          Download My Data
        </button>
        <p className="text-gray-400 text-sm text-center mt-2">
          For large data exports, we'll email you a secure download link
        </p>
      </div>

      <h3 className="text-xl font-bold text-red-500 mb-2 text-start">Danger Zone</h3>
      <div className="shadow-xl bg-white dark:bg-gray-800 rounded-lg p-6">
        <div className="flex items-start">
          <Trash2 className="w-6 h-6 text-red-500 mr-4" />
          <div>
            <h4 className="text-lg font-semibold text-black dark:text-white text-start">Delete Account</h4>
            <p className="text-gray-600 dark:text-gray-400 mt-1 mb-4 text-start">
              Once you delete your account, all your data will be permanently removed. This action cannot be undone.
            </p>
            <div className="grid grid-cols-1 place-items-start">
  <button
    onClick={() => setIsDeleteModalOpen(true)}
    className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors justify-content-start"
  >
    Delete Account
  </button>
</div>
          </div>
        </div>
      </div>

      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteAccount}
      />
    </div>
  );
};

export default AccountSettings;

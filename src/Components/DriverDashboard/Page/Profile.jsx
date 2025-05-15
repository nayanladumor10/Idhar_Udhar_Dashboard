import React, { useState, useEffect } from 'react';

const Profile = () => {
  // Main profile data with common fields
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    fullName: 'John Alexander Doe',
    driverId: '89723415',
    rating: 4.8,
    rides: 845,
    level: 'Gold',
    levelNumber: 3,
    progressToNextLevel: 65,
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567'
  });

  const [personalInfo, setPersonalInfo] = useState([
    { label: 'Full Name', value: 'John Alexander Doe', icon: 'user', key: 'fullName', type: 'text', required: true, pattern: /^[a-zA-Z ]+$/ },
    { label: 'Date of Birth', value: 'June 15, 1985', icon: 'calendar', key: 'dob', type: 'date', required: true },
    { label: 'Email', value: 'john.doe@example.com', icon: 'envelope', key: 'email', type: 'email', required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    { label: 'Phone', value: '+1 (555) 123-4567', icon: 'phone', key: 'phone', type: 'tel', required: true, pattern: /^\+?[\d\s-]+$/ },
    { label: 'Address', value: '789 Pine Street, Anytown, ST 12345', icon: 'map-marker-alt', key: 'address', type: 'text', required: true },
    { label: 'Driver License', value: 'DL-5678901234 (Expires: 2027-08-15)', icon: 'id-card', key: 'license', type: 'text', required: true },
  ]);

  const [vehicleInfo, setVehicleInfo] = useState([
    { label: 'Make & Model', value: 'Toyota Camry XLE', icon: 'car', key: 'makeModel', type: 'text', required: true },
    { label: 'Year', value: '2020', icon: 'calendar', key: 'year', type: 'number', required: true, min: 1990, max: new Date().getFullYear() + 1 },
    { label: 'Color', value: 'Silver Metallic', icon: 'palette', key: 'color', type: 'text', required: true },
    { label: 'License Plate', value: 'ABC-1234', icon: 'tag', key: 'plate', type: 'text', required: true },
    { label: 'Registration', value: 'Valid until June 2026', icon: 'file-alt', key: 'registration', type: 'text', required: true },
    { label: 'Insurance', value: 'Comprehensive (Policy #INS-87654321)', icon: 'shield-alt', key: 'insurance', type: 'text', required: true },
  ]);

  const [ratingsBreakdown] = useState([
    { label: '5 stars', percent: 87, color: 'bg-green-600' },
    { label: '4 stars', percent: 10, color: 'bg-blue-400' },
    { label: '3 stars', percent: 3, color: 'bg-amber-400' },
    { label: '2 stars', percent: 0, color: 'bg-orange-400' },
    { label: '1 star', percent: 0, color: 'bg-red-400' },
  ]);

  const [stats] = useState([
    { label: 'Total Rides', value: '845', icon: 'route', className: 'dark:text-white text-gray-800' },
    { label: 'Acceptance Rate', value: '94%', icon: 'check-circle', className: 'text-green-400' },
    { label: 'Cancellation Rate', value: '1.2%', icon: 'times-circle', className: 'text-red-400' },
    { label: 'On-time Arrival', value: '97%', icon: 'clock', className: 'text-green-400' },
    { label: 'Average Trip Time', value: '18 min', icon: 'hourglass-half', className: 'dark:text-white text-gray-800' },
    { label: 'Weekly Earnings', value: '$1,245.50', icon: 'dollar-sign', className: 'text-green-400' },
  ]);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync common fields between profile and personal info
  useEffect(() => {
    setPersonalInfo(prev => prev.map(item => {
      if (profileData[item.key] && item.value !== profileData[item.key]) {
        return { ...item, value: profileData[item.key] };
      }
      return item;
    }));
  }, [profileData]);

  // Open modal with the appropriate data
  const openEditModal = (section, data) => {
    setEditingSection(section);
    
    const initialFormData = {};
    const initialErrors = {};
    
    data.forEach(item => {
      initialFormData[item.key] = item.value;
      initialErrors[item.key] = '';
    });
    
    setFormData(initialFormData);
    setFormErrors(initialErrors);
    setIsModalOpen(true);
  };

  // Handle form input changes with validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // for clear error
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form fields
  const validateForm = (fields) => {
    const errors = {};
    let isValid = true;

    fields.forEach(field => {
      if (field.required && !formData[field.key]?.trim()) {
        errors[field.key] = `${field.label} is required`;
        isValid = false;
      } else if (field.pattern && !field.pattern.test(formData[field.key])) {
        errors[field.key] = `Invalid ${field.label.toLowerCase()} format`;
        isValid = false;
      } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData[field.key])) {
        errors[field.key] = 'Please enter a valid email';
        isValid = false;
      } else if (field.type === 'number') {
        const numValue = Number(formData[field.key]);
        if (isNaN(numValue)) {
          errors[field.key] = 'Please enter a valid number';
          isValid = false;
        } else if (field.min !== undefined && numValue < field.min) {
          errors[field.key] = `Minimum value is ${field.min}`;
          isValid = false;
        } else if (field.max !== undefined && numValue > field.max) {
          errors[field.key] = `Maximum value is ${field.max}`;
          isValid = false;
        }
      }
    });

    setFormErrors(errors);
    return isValid;
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const currentFields = editingSection === 'personal' ? personalInfo : vehicleInfo;
    if (!validateForm(currentFields)) return;

    setIsSubmitting(true);
    
    setTimeout(() => {
      if (editingSection === 'personal') {
        // Update personal info
        const updatedPersonalInfo = personalInfo.map(item => ({
          ...item,
          value: formData[item.key] || item.value
        }));
        setPersonalInfo(updatedPersonalInfo);

        // Update common fields in profile data
        const commonFields = ['fullName', 'email', 'phone'];
        const updatedProfile = { ...profileData };
        
        commonFields.forEach(field => {
          if (formData[field]) {
            updatedProfile[field] = formData[field];
            // Update name
            if (field === 'fullName') {
              updatedProfile.name = formData[field].split(' ')[0] + ' ' + formData[field].split(' ').slice(-1)[0];
            }
          }
        });
        
        setProfileData(updatedProfile);
      } else if (editingSection === 'vehicle') {
        const updatedVehicleInfo = vehicleInfo.map(item => ({
          ...item,
          value: formData[item.key] || item.value
        }));
        setVehicleInfo(updatedVehicleInfo);
      }
      
      setIsSubmitting(false);
      setIsModalOpen(false);
    }, 1000);
  };

  // current fields based on section
  const getCurrentFields = () => {
    return editingSection === 'personal' ? personalInfo : vehicleInfo;
  };

  // Render appropriate input field based on type
  const renderInputField = (field) => {
    const commonProps = {
      name: field.key,
      value: formData[field.key] || '',
      onChange: handleInputChange,
      className: `w-full dark:bg-gray-800 bg-white border ${formErrors[field.key] ? 'border-red-500' : 'dark:border-gray-700 border-gray-300'} rounded-lg px-4 py-2 dark:text-white text-gray-800 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all`,
      placeholder: `Enter ${field.label.toLowerCase()}`,
      required: field.required
    };

    switch (field.type) {
      case 'date':
        return <input type="date" {...commonProps} />;
      case 'number':
        return <input type="number" {...commonProps} min={field.min} max={field.max} />;
      case 'email':
        return <input type="email" {...commonProps} />;
      case 'tel':
        return <input type="tel" {...commonProps} />;
      default:
        return <input type="text" {...commonProps} />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 dark:bg-gray-950 bg-gray-50 min-h-screen">
      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
          <div 
            className="dark:bg-gray-900 bg-white rounded-xl max-w-md w-full p-6 border dark:border-gray-700 border-gray-300 transform transition-all duration-300 scale-95 opacity-0 animate-[modalEnter_0.3s_ease-out_forwards]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold dark:text-gray-200 text-gray-800">
                Edit {editingSection === 'personal' ? 'Personal' : 'Vehicle'} Information
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-gray-800 transition-colors"
                disabled={isSubmitting}
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {getCurrentFields().map((field) => (
                  <div key={field.key} className="mb-4">
                    <label className="block text-sm font-medium dark:text-gray-400 text-gray-600 mb-1">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {renderInputField(field)}
                    {formErrors[field.key] && (
                      <p className="mt-1 text-sm text-red-500">{formErrors[field.key]}</p>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border dark:border-gray-600 border-gray-300 dark:text-gray-300 text-gray-700 hover:dark:bg-gray-800 hover:bg-gray-100 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors flex items-center ${isSubmitting ? 'opacity-70' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save mr-2"></i>
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 dark:text-gray-200 text-gray-800">Driver Profile</h1>
        <p className="dark:text-gray-400 text-gray-600">Manage your information and track performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {/* Left Column */}
        <div className="md:col-span-1 space-y-6 md:space-y-8">
          {/* Profile Card */}
          <div className="dark:bg-gray-200/10 bg-white rounded-xl p-6 shadow-sm dark:border-gray-700 border-gray-200 hover:shadow-lg transition-all">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 md:w-28 md:h-28 bg-green-600 rounded-full flex items-center justify-center mb-4 shadow-md">
                <i className="fas fa-user text-white text-4xl md:text-5xl"></i>
              </div>

              <h2 className="text-xl font-bold mb-1 dark:text-gray-200 text-gray-800">{profileData.name}</h2>
              <p className="dark:text-gray-400 text-gray-600 mb-4 text-sm">Driver ID: {profileData.driverId}</p>

              <div className="flex items-center mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <i
                    key={i}
                    className={`fas fa-star text-lg mr-1 ${
                      i < profileData.rating ? 'text-amber-400' : 'dark:text-gray-600 text-gray-300'
                    }`}
                  ></i>
                ))}
                <span className="ml-2 font-medium dark:text-gray-300 text-gray-700">
                  {profileData.rating} ({profileData.rides} rides)
                </span>
              </div>

              <button 
                className="bg-green-600 text-white px-6 py-3 rounded-lg w-full hover:opacity-90 transition-opacity shadow-sm font-medium"
                onClick={() => openEditModal('personal', personalInfo)}
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* Driver Level */}
          <div className="dark:bg-gray-200/10 bg-white rounded-xl p-6 shadow-sm dark:border-gray-700 border-gray-200 hover:shadow-lg transition-all">
            <h3 className="text-lg font-semibold mb-4 flex items-center dark:text-gray-200 text-gray-800">
              <i className="fas fa-medal text-amber-400 mr-3 text-xl"></i> Driver Level
            </h3>

            <div className="flex flex-col items-center text-center">
              <div className="relative w-20 h-20 md:w-24 md:h-24 dark:bg-amber-100/10 bg-amber-50 rounded-full flex items-center justify-center mb-4 border-4 border-amber-300 shadow-sm">
                <div className="text-amber-400 font-bold text-lg md:text-xl">{profileData.level}</div>
                <div className="absolute -bottom-2 bg-amber-400 text-white text-xs px-2 py-1 rounded-full">
                  Level {profileData.levelNumber}
                </div>
              </div>

              <p className="text-sm dark:text-gray-400 text-gray-600 mb-5 text-center">
                You're a {profileData.level} level driver! Complete 20 more rides this month to reach Platinum.
              </p>

              <div className="w-full">
                <div className="flex justify-between dark:text-gray-400 text-gray-600 text-xs mb-1">
                  <span>Progress to Platinum</span>
                  <span>{profileData.progressToNextLevel}%</span>
                </div>
                <div className="w-full dark:bg-gray-700 bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-amber-400 h-2.5 rounded-full shadow-sm"
                    style={{ width: `${profileData.progressToNextLevel}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2 space-y-6 md:space-y-8">
          {/* Personal Info */}
          <InfoSection 
            title="Personal Information" 
            data={personalInfo} 
            onEdit={() => openEditModal('personal', personalInfo)}
          />

          {/* Vehicle Info */}
          <InfoSection 
            title="Vehicle Information" 
            data={vehicleInfo} 
            icon="car"
            onEdit={() => openEditModal('vehicle', vehicleInfo)}
          />

          {/* Performance */}
          <div className="dark:bg-gray-200/10 bg-white rounded-xl p-6 shadow-sm dark:border-gray-700 border-gray-200 hover:shadow-lg transition-all hover:scale-[1.01]">
            <h3 className="text-xl font-semibold mb-6 dark:text-gray-200 text-gray-800">Performance Statistics</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {/* Ratings */}
              <div>
                <h4 className="font-medium mb-4 dark:text-gray-400 text-gray-600 flex items-center">
                  <i className="fas fa-star text-amber-400 mr-2"></i> Ratings Breakdown
                </h4>
                {ratingsBreakdown.map(({ label, percent, color }) => (
                  <div key={label} className="mb-3">
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="flex items-center dark:text-gray-300 text-gray-700">
                        <i className="fas fa-star text-amber-400 mr-2"></i> {label}
                      </span>
                      <span className="font-medium dark:text-white text-gray-800">{percent}%</span>
                    </div>
                    <div className="w-full dark:bg-gray-700 bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${color} shadow-sm`} style={{ width: `${percent}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Overall Stats */}
              <div>
                <h4 className="font-medium mb-4 dark:text-gray-400 text-gray-600 flex items-center">
                  <i className="fas fa-chart-line text-green-400 mr-2"></i> Overall Stats
                </h4>
                {stats.map((stat, idx) => (
                  <Stat key={idx} {...stat} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*animation */}
      <style jsx>{`
        @keyframes modalEnter {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

// InfoSection component
const InfoSection = ({ title, data, icon, onEdit }) => (
  <div className="dark:bg-gray-200/10 bg-white rounded-xl p-6 shadow-sm dark:border-gray-700 border-gray-200 hover:shadow-lg transition-all hover:scale-[1.01]">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-xl font-semibold dark:text-gray-200 text-gray-800 flex items-center">
        {icon && <i className={`fas fa-${icon} text-green-400 mr-3 text-lg`}></i>}
        {title}
      </h3>
      <button 
        onClick={onEdit}
        className="text-green-400 hover:text-green-300 text-sm font-medium flex items-center"
      >
        <i className="fas fa-pencil-alt mr-2"></i> Edit
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-sm">
      {data.map((item, index) => (
        <Info key={index} {...item} />
      ))}
    </div>
  </div>
);

// Info component
const Info = ({ label, value, icon }) => (
  <div className="flex items-start gap-3 md:gap-4">
    <div className="p-2 rounded-lg dark:bg-gray-800 bg-gray-100 text-green-500">
      <i className={`fas fa-${icon} text-sm`}></i>
    </div>
    <div className="flex flex-col">
      <span className="text-xs uppercase tracking-wide dark:text-gray-400 text-gray-600 text-start">{label}</span>
      <span className="mt-0.5 text-sm font-medium dark:text-white text-gray-800">{value}</span>
    </div>
  </div>
);

// Stat component
const Stat = ({ label, value, className = '', icon }) => (
  <div className="flex justify-between items-center mb-3 p-3 dark:bg-gray-800 bg-gray-100 rounded-lg hover:shadow transition">
    <div className="flex items-center">
      <i className={`fas fa-${icon} dark:text-gray-400 text-gray-600 mr-3 text-sm`}></i>
      <span className="dark:text-gray-300 text-gray-700 text-sm">{label}</span>
    </div>
    <span className={`font-medium ${className}`}>{value}</span>
  </div>
);

export default Profile;
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

export default function SignupPage() {
  // Personal Information
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Vehicle Information
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleName, setVehicleName] = useState('');
  const [location, setLocation] = useState('');
  
  // License Information
  const [licensePhoto, setLicensePhoto] = useState(null);
  const [licensePreview, setLicensePreview] = useState('');
  
  // Earning Goal
  const [dailyEarningGoal, setDailyEarningGoal] = useState('');
  
  // Form state
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleLicenseUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLicensePhoto(file);
      setLicensePreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    // Personal info validation
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all personal information fields');
      return false;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    
    // Vehicle info validation
    if (!vehicleNumber || !vehicleName || !location) {
      setError('Please fill in all vehicle information fields');
      return false;
    }
    
    // License validation
    if (!licensePhoto) {
      setError('Please upload your license photo');
      return false;
    }
    
    // Earning goal validation
    if (!dailyEarningGoal || isNaN(dailyEarningGoal)) {
      setError('Please enter a valid daily earning goal');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      //call your API here
      const userData = {
        email,
        name,
        password,
        vehicleNumber,
        vehicleName,
        location,
        dailyEarningGoal,
        licensePhoto: licensePhoto.name,
        token: "demo-token",
        role: "driver"
      };

      
      await signup(userData);
      navigate('/auth/login'); 
    } catch (err) {
      setError(err.message || 'Failed to sign up. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-green-700">Driver Registration</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information Section */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="col-span-2 md:col-span-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  placeholder="your@email.com"
                />
              </div>
              
              <div className="col-span-2 md:col-span-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  placeholder="••••••••"
                />
                <p className="mt-1 text-xs text-gray-500">Minimum 6 characters</p>
              </div>
              
              <div className="col-span-2 md:col-span-1">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>
          
          {/* Vehicle Information Section */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Vehicle Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="vehicleNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="vehicleNumber"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  placeholder="ABC 1234"
                />
              </div>
              
              <div>
                <label htmlFor="vehicleName" className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle Name/Model <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="vehicleName"
                  value={vehicleName}
                  onChange={(e) => setVehicleName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  placeholder="Toyota Corolla"
                />
              </div>
              
              <div className="col-span-2">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Operating Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  placeholder="City or region where you'll be driving"
                />
              </div>
            </div>
          </div>
          
          {/* License Photo Section */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Driver's License</h2>
            <div>
              <label htmlFor="licensePhoto" className="block text-sm font-medium text-gray-700 mb-1">
                Upload License Photo <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 flex items-center">
                <label
                  htmlFor="licensePhoto"
                  className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-lg shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  {licensePhoto ? 'Change File' : 'Select File'}
                </label>
                <input
                  id="licensePhoto"
                  name="licensePhoto"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={handleLicenseUpload}
                />
                {licensePhoto && (
                  <span className="ml-4 text-sm text-gray-500">{licensePhoto.name}</span>
                )}
              </div>
              {licensePreview && (
                <div className="mt-4">
                  <p className="text-sm text-gray-700 mb-2">License Preview:</p>
                  <img 
                    src={licensePreview} 
                    alt="License preview" 
                    className="h-40 border border-gray-200 rounded-lg"
                  />
                </div>
              )}
              <p className="mt-2 text-xs text-gray-500">
                Upload a clear photo of your valid driver's license
              </p>
            </div>
          </div>
          
          {/* Daily Earning Goal Section */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Earning Goals</h2>
            <div>
              <label htmlFor="dailyEarningGoal" className="block text-sm font-medium text-gray-700 mb-1">
                Daily Earning Goal ($) <span className="text-red-500">*</span>
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="dailyEarningGoal"
                  value={dailyEarningGoal}
                  onChange={(e) => setDailyEarningGoal(e.target.value)}
                  className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  placeholder="0.00"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">USD</span>
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Set your target daily earnings to help track your progress
              </p>
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Registering...' : 'Complete Registration'}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/auth/login" className="text-green-600 hover:underline font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
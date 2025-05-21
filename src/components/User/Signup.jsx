import React, { useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaPhone, FaLock, FaCar, FaIdCard, FaFileAlt, FaMoneyBillWave, FaMapMarkerAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [userType, setUserType] = useState('normal');

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        // Driver-specific fields
        vehicleNumber: '',
        vehicleModel: '',
        operatingLocation: '',
        monthlyEarningGoal: '',
        licenseNumber: '',
        aadhaarNumber: '',
        panNumber: '',
        // Files will be handled separately
        licensePhoto: null,
        aadhaarPhoto: null,
        panPhoto: null,
        vehiclePhoto: null
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    };

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { fullName, email, phone, password, confirmPassword } = formData;

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email.trim()) {
            setError("Email is required");
            return;
        }

        if (!emailRegex.test(email)) {
            setError("Enter a valid email");
            return;
        }

        if (!password || !confirmPassword) {
            setError("Password and Confirm Password are required");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        // Additional validation for drivers
        if (userType === 'driver') {
            const { vehicleNumber, vehicleModel, operatingLocation, licenseNumber, aadhaarNumber, panNumber } = formData;
            
            if (!vehicleNumber || !vehicleModel || !operatingLocation || !licenseNumber || !aadhaarNumber || !panNumber) {
                setError("All driver fields are required");
                return;
            }
        }

        try {
            // Create FormData for file uploads
            const formDataToSend = new FormData();
            formDataToSend.append('name', fullName);
            formDataToSend.append('email', email);
            formDataToSend.append('phone', phone);
            formDataToSend.append('password', password);
            formDataToSend.append('confirmPassword', confirmPassword);
            formDataToSend.append('userType', userType);

            if (userType === 'driver') {
                formDataToSend.append('vehicleNumber', formData.vehicleNumber);
                formDataToSend.append('vehicleModel', formData.vehicleModel);
                formDataToSend.append('operatingLocation', formData.operatingLocation);
                formDataToSend.append('monthlyEarningGoal', formData.monthlyEarningGoal);
                formDataToSend.append('licenseNumber', formData.licenseNumber);
                formDataToSend.append('aadhaarNumber', formData.aadhaarNumber);
                formDataToSend.append('panNumber', formData.panNumber);
                
                if (formData.licensePhoto) formDataToSend.append('licensePhoto', formData.licensePhoto);
                if (formData.aadhaarPhoto) formDataToSend.append('aadhaarPhoto', formData.aadhaarPhoto);
                if (formData.panPhoto) formDataToSend.append('panPhoto', formData.panPhoto);
                if (formData.vehiclePhoto) formDataToSend.append('vehiclePhoto', formData.vehiclePhoto);
            }

            const baseUrl = 'https://idharudhar-backend-1.onrender.com/api/auth';
            const signupUrl = userType === 'driver' ? `${baseUrl}/driver/signup` : `${baseUrl}/signup`;
            const otpUrl = userType === 'driver' ? `${baseUrl}/driver/send-otp` : `${baseUrl}/send-otp`;

            const response = await axios.post(signupUrl, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            await axios.post(otpUrl, { email });

            alert("Signup successful! OTP sent to your email.");
            console.log(response.data);
            setError("");

            if (userType === 'driver') {
                navigate("/auth");
            } else {
                navigate("/otpverification", { state: { email } });
            }

        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Signup failed!");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full bg-white dark:bg-[#0F141B] shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-bold text-center text-black dark:text-white mb-1">
                    Create a GreenGlide Account
                </h2>
                <p className="text-center text-gray-500 dark:text-gray-300 mb-6">
                    Sign up to access eco-friendly transportation options
                </p>

                <form onSubmit={handleSubmit}>
                    {error && (
                        <p className="text-red-500 text-sm text-center mb-4">{error}</p>
                    )}

                    {/* User Type Selection */}
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-200 text-start">
                            I am a:
                        </label>
                        <div className="flex">
                            <label className="inline-flex items-center mr-4">
                                <input
                                    type="radio"
                                    className="form-radio h-5 w-5 text-green-600"
                                    value="normal"
                                    checked={userType === 'normal'}
                                    onChange={handleUserTypeChange}
                                />
                                <span className="ml-2 text-gray-700 dark:text-gray-200">Normal User</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio h-5 w-5 text-green-600"
                                    value="driver"
                                    checked={userType === 'driver'}
                                    onChange={handleUserTypeChange}
                                />
                                <span className="ml-2 text-gray-700 dark:text-gray-200 flex items-center">
                                    <FaCar className="mr-1" />
                                    Driver
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* Full Name */}
                    <label className="block mb-2 text-sm text-gray-700 dark:text-gray-200 text-start">Full Name</label>
                    <div className="flex items-center mb-4 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-black">
                        <FaUser className="text-gray-400 dark:text-gray-300 mr-2" />
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="w-full bg-transparent text-black dark:text-white outline-none"
                            required
                        />
                    </div>

                    {/* Email */}
                    <label className="block mb-2 text-sm text-gray-700 dark:text-gray-200 text-start">Email Address</label>
                    <div className="flex items-center mb-4 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-black">
                        <FaEnvelope className="text-gray-400 dark:text-gray-300 mr-2" />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            className="w-full bg-transparent text-black dark:text-white outline-none"
                            required
                        />
                    </div>

                    {/* Phone */}
                    <label className="block mb-2 text-sm text-gray-700 dark:text-gray-200 text-start">Phone Number</label>
                    <div className="flex items-center mb-4 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-black">
                        <FaPhone className="text-gray-400 dark:text-gray-300 mr-2" />
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+1 (555) 123-4567"
                            className="w-full bg-transparent text-black dark:text-white outline-none"
                            required
                        />
                    </div>

                    {/* Password */}
                    <label className="block mb-2 text-sm text-gray-700 dark:text-gray-200 text-start">Password</label>
                    <div className="flex items-center mb-4 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-black">
                        <FaLock className="text-gray-400 dark:text-gray-300 mr-2" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full bg-transparent text-black dark:text-white outline-none"
                            required
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEyeSlash className="text-gray-500 dark:text-gray-300" /> : <FaEye className="text-gray-500 dark:text-gray-300" />}
                        </button>
                    </div>

                    {/* Confirm Password */}
                    <label className="block mb-2 text-sm text-gray-700 dark:text-gray-200 text-start">Confirm Password</label>
                    <div className="flex items-center mb-4 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-black">
                        <FaLock className="text-gray-400 dark:text-gray-300 mr-2" />
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full bg-transparent text-black dark:text-white outline-none"
                            required
                        />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <FaEyeSlash className="text-gray-500 dark:text-gray-300" /> : <FaEye className="text-gray-500 dark:text-gray-300" />}
                        </button>
                    </div>

                    {/* Driver-specific fields */}
                    {userType === 'driver' && (
                        <>
                            <div className="border-t border-gray-300 dark:border-gray-600 my-4 pt-4">
                                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center">
                                    <FaCar className="mr-2" /> Driver Information
                                </h3>

                                {/* Vehicle Number */}
                                <label className="block mb-2 text-sm text-gray-700 dark:text-gray-200 text-start">Vehicle Number</label>
                                <div className="flex items-center mb-4 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-black">
                                    <FaCar className="text-gray-400 dark:text-gray-300 mr-2" />
                                    <input
                                        type="text"
                                        name="vehicleNumber"
                                        value={formData.vehicleNumber}
                                        onChange={handleChange}
                                        placeholder="DL 01 AB 1234"
                                        className="w-full bg-transparent text-black dark:text-white outline-none"
                                    />
                                </div>

                                {/* Vehicle Model */}
                                <label className="block mb-2 text-sm text-gray-700 dark:text-gray-200 text-start">Vehicle Model</label>
                                <div className="flex items-center mb-4 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-black">
                                    <FaCar className="text-gray-400 dark:text-gray-300 mr-2" />
                                    <input
                                        type="text"
                                        name="vehicleModel"
                                        value={formData.vehicleModel}
                                        onChange={handleChange}
                                        placeholder="Toyota Prius 2020"
                                        className="w-full bg-transparent text-black dark:text-white outline-none"
                                    />
                                </div>

                                {/* Operating Location */}
                                <label className="block mb-2 text-sm text-gray-700 dark:text-gray-200 text-start">Operating Location</label>
                                <div className="flex items-center mb-4 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-black">
                                    <FaMapMarkerAlt className="text-gray-400 dark:text-gray-300 mr-2" />
                                    <input
                                        type="text"
                                        name="operatingLocation"
                                        value={formData.operatingLocation}
                                        onChange={handleChange}
                                        placeholder="New Delhi, India"
                                        className="w-full bg-transparent text-black dark:text-white outline-none"
                                    />
                                </div>

                                {/* Monthly Earning Goal */}
                                <label className="block mb-2 text-sm text-gray-700 dark:text-gray-200 text-start">Monthly Earning Goal (₹)</label>
                                <div className="flex items-center mb-4 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-black">
                                    <FaMoneyBillWave className="text-gray-400 dark:text-gray-300 mr-2" />
                                    <input
                                        type="number"
                                        name="monthlyEarningGoal"
                                        value={formData.monthlyEarningGoal}
                                        onChange={handleChange}
                                        placeholder="50000"
                                        className="w-full bg-transparent text-black dark:text-white outline-none"
                                    />
                                </div>

                                {/* License Number */}
                                <label className="block mb-2 text-sm text-gray-700 dark:text-gray-200 text-start">Driver's License Number</label>
                                <div className="flex items-center mb-4 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-black">
                                    <FaIdCard className="text-gray-400 dark:text-gray-300 mr-2" />
                                    <input
                                        type="text"
                                        name="licenseNumber"
                                        value={formData.licenseNumber}
                                        onChange={handleChange}
                                        placeholder="DL-1234567890123"
                                        className="w-full bg-transparent text-black dark:text-white outline-none"
                                    />
                                </div>

                                {/* License Photo Upload */}
                                <label className="block mb-2 text-sm text-gray-700 dark:text-gray-200 text-start">Driver's License Photo</label>
                                <div className="mb-4">
                                    <input
                                        type="file"
                                        name="licensePhoto"
                                        onChange={handleFileChange}
                                        className="block w-full text-sm text-gray-500
                                          file:mr-4 file:py-2 file:px-4
                                          file:rounded-md file:border-0
                                          file:text-sm file:font-semibold
                                          file:bg-green-50 file:text-green-700
                                          hover:file:bg-green-100
                                          dark:file:bg-green-900 dark:file:text-green-100
                                          dark:hover:file:bg-green-800"
                                        accept="image/*"
                                    />
                                </div>

                                {/* Aadhaar Number */}
                                <label className="block mb-2 text-sm text-gray-700 dark:text-gray-200 text-start">Aadhaar Number</label>
                                <div className="flex items-center mb-4 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-black">
                                    <FaIdCard className="text-gray-400 dark:text-gray-300 mr-2" />
                                    <input
                                        type="text"
                                        name="aadhaarNumber"
                                        value={formData.aadhaarNumber}
                                        onChange={handleChange}
                                        placeholder="1234 5678 9012"
                                        className="w-full bg-transparent text-black dark:text-white outline-none"
                                    />
                                </div>

                                {/* Aadhaar Photo Upload */}
                                <label className="block mb-2 text-sm text-gray-700 dark:text-gray-200 text-start">Aadhaar Card Photo</label>
                                <div className="mb-4">
                                    <input
                                        type="file"
                                        name="aadhaarPhoto"
                                        onChange={handleFileChange}
                                        className="block w-full text-sm text-gray-500
                                          file:mr-4 file:py-2 file:px-4
                                          file:rounded-md file:border-0
                                          file:text-sm file:font-semibold
                                          file:bg-green-50 file:text-green-700
                                          hover:file:bg-green-100
                                          dark:file:bg-green-900 dark:file:text-green-100
                                          dark:hover:file:bg-green-800"
                                        accept="image/*"
                                    />
                                </div>

                                {/* PAN Number */}
                                <label className="block mb-2 text-sm text-gray-700 dark:text-gray-200 text-start">PAN Number</label>
                                <div className="flex items-center mb-4 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-black">
                                    <FaFileAlt className="text-gray-400 dark:text-gray-300 mr-2" />
                                    <input
                                        type="text"
                                        name="panNumber"
                                        value={formData.panNumber}
                                        onChange={handleChange}
                                        placeholder="ABCDE1234F"
                                        className="w-full bg-transparent text-black dark:text-white outline-none"
                                    />
                                </div>

                                {/* PAN Photo Upload */}
                                <label className="block mb-2 text-sm text-gray-700 dark:text-gray-200 text-start">PAN Card Photo</label>
                                <div className="mb-4">
                                    <input
                                        type="file"
                                        name="panPhoto"
                                        onChange={handleFileChange}
                                        className="block w-full text-sm text-gray-500
                                          file:mr-4 file:py-2 file:px-4
                                          file:rounded-md file:border-0
                                          file:text-sm file:font-semibold
                                          file:bg-green-50 file:text-green-700
                                          hover:file:bg-green-100
                                          dark:file:bg-green-900 dark:file:text-green-100
                                          dark:hover:file:bg-green-800"
                                        accept="image/*"
                                    />
                                </div>

                                {/* Vehicle Photo Upload */}
                                <label className="block mb-2 text-sm text-gray-700 dark:text-gray-200 text-start">Vehicle Photo</label>
                                <div className="mb-4">
                                    <input
                                        type="file"
                                        name="vehiclePhoto"
                                        onChange={handleFileChange}
                                        className="block w-full text-sm text-gray-500
                                          file:mr-4 file:py-2 file:px-4
                                          file:rounded-md file:border-0
                                          file:text-sm file:font-semibold
                                          file:bg-green-50 file:text-green-700
                                          hover:file:bg-green-100
                                          dark:file:bg-green-900 dark:file:text-green-100
                                          dark:hover:file:bg-green-800"
                                        accept="image/*"
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {/* Terms */}
                    <div className="flex items-start mb-6">
                        <input type="checkbox" className="mr-2 mt-1" required />
                        <label className="text-sm text-gray-700 dark:text-gray-300">
                            I agree to the <span className="text-green-600 dark:text-green-400">Terms of Service</span> and <span className="text-green-600 dark:text-green-400">Privacy Policy</span>
                        </label>
                    </div>

                    <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md">
                        Create Account
                    </button>
                </form>

                <div className="text mt-4 text-center dark:text-gray-500">
                    <p>
                        Already have an account? <Link to='/login' className="text-green-600 font-semibold cursor-pointer">Sign in →</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
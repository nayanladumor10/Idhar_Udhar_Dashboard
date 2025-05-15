import { useState, useEffect } from 'react'
import { FaSun, FaMoon, FaCheck, FaTimes, FaSpinner, FaPlus, FaTrash, FaEdit } from 'react-icons/fa'
import { useAuth } from '../Context/AuthContext'
import { useTheme } from '../Context/ThemeContext'

const Settings = () => {
  const { isDarkMode, toggleTheme } = useTheme()
  const { logout, user } = useAuth()
  
  // State for all settings sections
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [activePaymentTab, setActivePaymentTab] = useState('methods')
  const [showAddPaymentMethod, setShowAddPaymentMethod] = useState(false)
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    type: 'card',
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: '',
    isDefault: false
  })
  
  // notifications with backend sync
  const [notifications, setNotifications] = useState({
    RideRequests: true,
    Earnings: true,
    Promotions: true,
    AppUpdates: false
  })
  
  // Form states with validation
  const [editMode, setEditMode] = useState({
    email: false,
    phone: false,
    vehicle: false
  })
  
  const [formData, setFormData] = useState({
    email: user?.email || 'john.doe@example.com',
    phone: user?.phone || '+1 (555) 123-4567',
    vehicleMake: 'Toyota',
    vehicleModel: 'Camry',
    vehicleYear: '2020',
    vehicleColor: 'Silver',
    licensePlate: 'ABC-1234'
  })
  
  const [errors, setErrors] = useState({})
  const [saveStatus, setSaveStatus] = useState({})
  const [isSaving, setIsSaving] = useState(false)
  
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: '1',
      type: 'card',
      last4: '4242',
      brand: 'visa',
      expiry: '12/25',
      name: 'John Doe',
      isDefault: true
    },
    {
      id: '2',
      type: 'bank',
      bankName: 'Chase',
      last4: '5678',
      accountType: 'checking',
      isDefault: false
    }
  ])

  // Simulate loading payment methods from API
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Loaded payment methods')
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  //  toggle functions with API simulation
  const toggleNotification = async (key) => {
    const newValue = !notifications[key]
    setNotifications(prev => ({ ...prev, [key]: newValue }))
    
    // Simulate API call to save notification preference
    setIsSaving(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      showSaveStatus(key, 'Notification preference saved')
    } catch (error) {
      // Revert if API call fails
      setNotifications(prev => ({ ...prev, [key]: !newValue }))
      showSaveStatus(key, 'Failed to save preference', true)
    } finally {
      setIsSaving(false)
    }
  }

  const handleAddPaymentMethod = async (e) => {
    e.preventDefault()
    const errors = validatePaymentMethod(newPaymentMethod)
    if (Object.keys(errors).length > 0) {
      setErrors(errors)
      return
    }
    
    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const methodToAdd = {
        ...newPaymentMethod,
        id: Math.random().toString(36).substr(2, 9),
        last4: newPaymentMethod.cardNumber.slice(-4),
        brand: detectCardType(newPaymentMethod.cardNumber)
      }
      
      setPaymentMethods(prev => {
        // If setting as default, remove default from others
        const updatedMethods = newPaymentMethod.isDefault
          ? prev.map(m => ({ ...m, isDefault: false }))
          : [...prev]
        return [...updatedMethods, methodToAdd]
      })
      
      setShowAddPaymentMethod(false)
      setNewPaymentMethod({
        type: 'card',
        cardNumber: '',
        expiry: '',
        cvc: '',
        name: '',
        isDefault: false
      })
      showSaveStatus('payment', 'Payment method added successfully')
    } catch (error) {
      showSaveStatus('payment', 'Failed to add payment method', true)
    } finally {
      setIsSaving(false)
    }
  }

  const setDefaultPaymentMethod = async (id) => {
    setIsSaving(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      setPaymentMethods(prev =>
        prev.map(method => ({
          ...method,
          isDefault: method.id === id
        }))
      )
      showSaveStatus('payment', 'Default payment method updated')
    } catch (error) {
      showSaveStatus('payment', 'Failed to update default method', true)
    } finally {
      setIsSaving(false)
    }
  }

  const deletePaymentMethod = async (id) => {
    if (paymentMethods.find(m => m.id === id)?.isDefault) {
      showSaveStatus('payment', 'Cannot delete default payment method', true)
      return
    }
    
    setIsSaving(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      setPaymentMethods(prev => prev.filter(method => method.id !== id))
      showSaveStatus('payment', 'Payment method removed')
    } catch (error) {
      showSaveStatus('payment', 'Failed to remove payment method', true)
    } finally {
      setIsSaving(false)
    }
  }

  // Helper functions
  const validatePaymentMethod = (method) => {
    const errors = {}
    if (method.type === 'card') {
      if (!method.cardNumber || !/^\d{13,16}$/.test(method.cardNumber)) {
        errors.cardNumber = 'Valid card number required'
      }
      if (!method.expiry || !/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(method.expiry)) {
        errors.expiry = 'MM/YY format required'
      }
      if (!method.cvc || !/^\d{3,4}$/.test(method.cvc)) {
        errors.cvc = '3-4 digit CVC required'
      }
      if (!method.name || method.name.trim().length < 3) {
        errors.name = 'Cardholder name required'
      }
    }
    return errors
  }

  const detectCardType = (number) => {
    // Simplified card type detection
    if (/^4/.test(number)) return 'visa'
    if (/^5[1-5]/.test(number)) return 'mastercard'
    if (/^3[47]/.test(number)) return 'amex'
    if (/^6(?:011|5)/.test(number)) return 'discover'
    return 'unknown'
  }

const showSaveStatus = (field, message, isError = false) => {
  setSaveStatus(prev => ({ 
    ...prev, 
    [field]: { 
      message, 
      isError 
    } 
  }))
  setTimeout(() => {
    setSaveStatus(prev => {
      const newStatus = { ...prev }
      delete newStatus[field]
      return newStatus
    })
  }, 3000)
}

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error 
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateField = (name, value) => {
    let error = ''
    switch (name) {
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Invalid email format'
        }
        break
      case 'phone':
        if (!/^\+?[\d\s-]+$/.test(value)) {
          error = 'Invalid phone number'
        }
        break
      case 'vehicleYear':
        if (value < 1990 || value > new Date().getFullYear() + 1) {
          error = 'Invalid year'
        }
        break
      default:
        if (!value.trim()) error = 'This field is required'
    }
    return error
  }

  const saveChanges = async (field) => {
    const error = validateField(field, formData[field])
    if (error) {
      setErrors(prev => ({ ...prev, [field]: error }))
      return
    }

    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    setEditMode(prev => ({ ...prev, [field]: false }))
    showSaveStatus(field, 'Changes saved successfully')
    setIsSaving(false)
  }



  const handleVehicleSave = async () => {
    // Validate all fields
    const newErrors = {}
    Object.keys(formData).forEach(key => {
      if (key.startsWith('vehicle') || key === 'licensePlate') {
        const error = validateField(key, formData[key])
        if (error) newErrors[key] = error
      }
    })
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    setEditMode(prev => ({ ...prev, vehicle: false }))
    showSaveStatus('vehicle', 'Vehicle information updated')
    setIsSaving(false)
  }

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true)
  }

  const confirmLogout = () => {
    logout()
    setShowLogoutConfirm(false)
  }

  const cancelLogout = () => {
    setShowLogoutConfirm(false)
  }

    const getPaymentMethodIcon = (type, brand) => {
    switch (type) {
      case 'card':
        switch (brand) {
          case 'visa': return 'fab fa-cc-visa'
          case 'mastercard': return 'fab fa-cc-mastercard'
          case 'amex': return 'fab fa-cc-amex'
          case 'discover': return 'fab fa-cc-discover'
          default: return 'far fa-credit-card'
        }
      case 'bank': return 'fas fa-university'
      case 'paypal': return 'fab fa-cc-paypal'
      default: return 'far fa-money-bill-alt'
    }
  }

  return (
    <div className={`min-h-screen p-4 md:p-8 ${isDarkMode ? 'dark' : ''} transition-colors duration-200`}>
      {/* Main container with dark/light mode classes */}
      <div className="dark:bg-gray-950 bg-gray-50 dark:text-gray-100 text-gray-900 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Settings</h1>
            <p className="dark:text-gray-400 text-gray-600">Manage your account preferences</p>
          </div>
          
          {/* Account Section */}
          <div className="dark:bg-gray-200/10 bg-white rounded-xl dark:border-gray-800 border-gray-200 mb-6 p-6 transition-all hover:shadow-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <i className="fas fa-lock text-green-400 mr-3" />
              <span>Account</span>
            </h2>
            
            <div className="space-y-6">
              {/* Email Field */}
              <div className="border-b dark:border-gray-800 border-gray-200 pb-4">
                <label className="block dark:text-gray-400 text-gray-600 mb-2 text-sm">Email Address</label>
                <div className="flex items-center">
                  {editMode.email ? (
                    <>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`flex-1 dark:bg-gray-900 bg-gray-50 border ${
                          errors.email ? 'border-red-500' : 'dark:border-gray-800 border-gray-300'
                        } rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500/50`}
                      />
                      <div className="flex ml-3 space-x-2">
                        <button 
                          onClick={() => saveChanges('email')}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition-colors font-medium flex items-center"
                          disabled={isSaving}
                        >
                          {isSaving ? (
                            <FaSpinner className="animate-spin mr-1" />
                          ) : (
                            <FaCheck className="mr-1" />
                          )}
                          Save
                        </button>
                        <button 
                          onClick={() => setEditMode({...editMode, email: false})}
                          className="dark:bg-gray-700 bg-gray-200 hover:dark:bg-gray-600 hover:bg-gray-300 text-white px-3 py-2 rounded-lg transition-colors font-medium flex items-center"
                        >
                          <FaTimes className="mr-1" />
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <input 
                        type="email" 
                        value={formData.email} 
                        readOnly
                        className="flex-1 dark:bg-gray-900 bg-gray-50 border dark:border-gray-800 border-gray-300 rounded-lg px-4 py-3"
                      />
                      <button 
                        onClick={() => setEditMode({...editMode, email: true})}
                        className="ml-3 text-green-400 hover:text-green-300 text-sm font-medium flex items-center"
                      >
                        <i className="fas fa-pencil-alt mr-1" />
                        Edit
                      </button>
                    </>
                  )}
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-500 animate-fadeIn">{errors.email}</p>}
                {saveStatus.email && (
  <div className={`mt-1 text-sm ${saveStatus.email.isError ? 'text-red-500' : 'text-green-500'} animate-fadeIn`}>
    {saveStatus.email.message}
  </div>
)}
              </div>
              
              {/* Phone Field */}
              <div className="border-b dark:border-gray-800 border-gray-200 pb-4">
                <label className="block dark:text-gray-400 text-gray-600 mb-2 text-sm">Phone Number</label>
                <div className="flex items-center">
                  {editMode.phone ? (
                    <>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`flex-1 dark:bg-gray-900 bg-gray-50 border ${
                          errors.phone ? 'border-red-500' : 'dark:border-gray-800 border-gray-300'
                        } rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500/50`}
                      />
                      <div className="flex ml-3 space-x-2">
                        <button 
                          onClick={() => saveChanges('phone')}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition-colors font-medium flex items-center"
                          disabled={isSaving}
                        >
                          {isSaving ? (
                            <FaSpinner className="animate-spin mr-1" />
                          ) : (
                            <FaCheck className="mr-1" />
                          )}
                          Save
                        </button>
                        <button 
                          onClick={() => setEditMode({...editMode, phone: false})}
                          className="dark:bg-gray-700 bg-gray-200 hover:dark:bg-gray-600 hover:bg-gray-300 text-white px-3 py-2 rounded-lg transition-colors font-medium flex items-center"
                        >
                          <FaTimes className="mr-1" />
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <input 
                        type="tel" 
                        value={formData.phone} 
                        readOnly
                        className="flex-1 dark:bg-gray-900 bg-gray-50 border dark:border-gray-800 border-gray-300 rounded-lg px-4 py-3"
                      />
                      <button 
                        onClick={() => setEditMode({...editMode, phone: true})}
                        className="ml-3 text-green-400 hover:text-green-300 text-sm font-medium flex items-center"
                      >
                        <i className="fas fa-pencil-alt mr-1" />
                        Edit
                      </button>
                    </>
                  )}
                </div>
                {errors.phone && <p className="mt-1 text-sm text-red-500 animate-fadeIn">{errors.phone}</p>}
                {saveStatus.phone && (
  <div className={`mt-1 text-sm ${saveStatus.phone.isError ? 'text-red-500' : 'text-green-500'} animate-fadeIn`}>
    {saveStatus.phone.message}
  </div>
)}
              </div>
              
              <div>
                <button className="w-full dark:bg-gray-900 bg-gray-100 hover:dark:bg-gray-800 hover:bg-gray-200 border dark:border-gray-800 border-gray-300 text-white px-4 py-3 rounded-lg transition-colors font-medium flex items-center justify-center">
                  <i className="fas fa-key mr-2" />
                  Change Password
                </button>
              </div>
            </div>
          </div>
          
          {/* Payment Section */}
      <div className="dark:bg-gray-200/10 bg-white rounded-xl dark:border-gray-800 border-gray-200 mb-6 p-6 transition-all hover:shadow-lg">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <i className="fas fa-credit-card text-green-400 mr-3" />
          <span>Payment</span>
        </h2>
        
        {/* Payment Tabs */}
        <div className="border-b dark:border-gray-800 border-gray-200 mb-6">
          <nav className="flex space-x-4">
            <button
              onClick={() => setActivePaymentTab('methods')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${activePaymentTab === 'methods' 
                ? 'border-green-500 text-green-600 dark:text-green-400' 
                : 'border-transparent dark:text-gray-400 text-gray-500 hover:dark:text-gray-300 hover:text-gray-700'}`}
            >
              Payment Methods
            </button>
            <button
              onClick={() => setActivePaymentTab('payouts')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${activePaymentTab === 'payouts' 
                ? 'border-green-500 text-green-600 dark:text-green-400' 
                : 'border-transparent dark:text-gray-400 text-gray-500 hover:dark:text-gray-300 hover:text-gray-700'}`}
            >
              Payout Settings
            </button>
            <button
              onClick={() => setActivePaymentTab('history')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${activePaymentTab === 'history' 
                ? 'border-green-500 text-green-600 dark:text-green-400' 
                : 'border-transparent dark:text-gray-400 text-gray-500 hover:dark:text-gray-300 hover:text-gray-700'}`}
            >
              Payment History
            </button>
          </nav>
        </div>
        
        {/* Payment Methods Tab */}
        {activePaymentTab === 'methods' && (
          <div className="space-y-6">
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="dark:bg-gray-900/50 bg-gray-50 rounded-lg p-4 border dark:border-gray-800 border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <i className={`${getPaymentMethodIcon(method.type, method.brand)} text-2xl mr-3 ${method.isDefault ? 'text-green-400' : 'dark:text-gray-400 text-gray-600'}`} />
                      <div>
                        <div className="font-medium">
                          {method.type === 'card' 
                            ? `${method.brand ? method.brand.charAt(0).toUpperCase() + method.brand.slice(1) : 'Card'} •••• ${method.last4}`
                            : `${method.bankName} •••• ${method.last4}`}
                        </div>
                        <div className="text-sm dark:text-gray-400 text-gray-600">
                          {method.type === 'card' 
                            ? `Expires ${method.expiry}` 
                            : `${method.accountType.charAt(0).toUpperCase() + method.accountType.slice(1)} Account`}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {method.isDefault ? (
                        <span className="text-xs bg-green-500/20 text-green-600 dark:text-green-400 px-2 py-1 rounded">
                          Default
                        </span>
                      ) : (
                        <button
                          onClick={() => setDefaultPaymentMethod(method.id)}
                          className="text-xs dark:bg-gray-700 bg-gray-200 hover:dark:bg-gray-600 hover:bg-gray-300 px-2 py-1 rounded transition-colors"
                          disabled={isSaving}
                        >
                          Set Default
                        </button>
                      )}
                      <button
                        onClick={() => deletePaymentMethod(method.id)}
                        className="text-red-500 hover:text-red-400"
                        disabled={isSaving}
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {showAddPaymentMethod ? (
              <div className="dark:bg-gray-900/50 bg-gray-50 rounded-lg p-4 border dark:border-gray-800 border-gray-200">
                <h3 className="font-medium mb-4 flex items-center justify-between">
                  <span>Add Payment Method</span>
                  <button onClick={() => setShowAddPaymentMethod(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                    <FaTimes />
                  </button>
                </h3>
                <form onSubmit={handleAddPaymentMethod}>
                  <div className="space-y-4">
                    <div>
                      <label className="block dark:text-gray-400 text-gray-600 mb-2 text-sm">Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={newPaymentMethod.cardNumber}
                        onChange={(e) => setNewPaymentMethod({...newPaymentMethod, cardNumber: e.target.value.replace(/\s/g, '')})}
                        className={`w-full dark:bg-gray-800 bg-white border ${
                          errors.cardNumber ? 'border-red-500' : 'dark:border-gray-700 border-gray-300'
                        } rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500/50`}
                      />
                      {errors.cardNumber && <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block dark:text-gray-400 text-gray-600 mb-2 text-sm">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={newPaymentMethod.expiry}
                          onChange={(e) => {
                            let value = e.target.value
                            if (value.length === 2 && !value.includes('/')) {
                              value = value + '/'
                            }
                            setNewPaymentMethod({...newPaymentMethod, expiry: value})
                          }}
                          className={`w-full dark:bg-gray-800 bg-white border ${
                            errors.expiry ? 'border-red-500' : 'dark:border-gray-700 border-gray-300'
                          } rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500/50`}
                        />
                        {errors.expiry && <p className="mt-1 text-sm text-red-500">{errors.expiry}</p>}
                      </div>
                      <div>
                        <label className="block dark:text-gray-400 text-gray-600 mb-2 text-sm">CVC</label>
                        <input
                          type="text"
                          placeholder="123"
                          value={newPaymentMethod.cvc}
                          onChange={(e) => setNewPaymentMethod({...newPaymentMethod, cvc: e.target.value})}
                          className={`w-full dark:bg-gray-800 bg-white border ${
                            errors.cvc ? 'border-red-500' : 'dark:border-gray-700 border-gray-300'
                          } rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500/50`}
                        />
                        {errors.cvc && <p className="mt-1 text-sm text-red-500">{errors.cvc}</p>}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block dark:text-gray-400 text-gray-600 mb-2 text-sm">Cardholder Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={newPaymentMethod.name}
                        onChange={(e) => setNewPaymentMethod({...newPaymentMethod, name: e.target.value})}
                        className={`w-full dark:bg-gray-800 bg-white border ${
                          errors.name ? 'border-red-500' : 'dark:border-gray-700 border-gray-300'
                        } rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500/50`}
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="defaultMethod"
                        checked={newPaymentMethod.isDefault}
                        onChange={(e) => setNewPaymentMethod({...newPaymentMethod, isDefault: e.target.checked})}
                        className="h-4 w-4 dark:bg-gray-800 bg-white border dark:border-gray-700 border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
                      />
                      <label htmlFor="defaultMethod" className="ml-2 block text-sm dark:text-gray-400 text-gray-600">
                        Set as default payment method
                      </label>
                    </div>
                    
                    <div className="flex space-x-3 pt-2">
                      <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-colors font-medium flex items-center justify-center flex-1"
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <>
                            <FaSpinner className="animate-spin mr-2" />
                            Adding...
                          </>
                        ) : (
                          <>
                            <FaCheck className="mr-2" />
                            Add Card
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddPaymentMethod(false)}
                        className="dark:bg-gray-700 bg-gray-200 hover:dark:bg-gray-600 hover:bg-gray-300 text-white px-4 py-3 rounded-lg transition-colors font-medium flex items-center justify-center flex-1"
                      >
                        <FaTimes className="mr-2" />
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <button
                onClick={() => setShowAddPaymentMethod(true)}
                className="w-full dark:bg-gray-900 bg-gray-100 hover:dark:bg-gray-800 hover:bg-gray-200 border dark:border-gray-800 border-gray-300 text-white px-4 py-3 rounded-lg transition-colors font-medium flex items-center justify-center"
              >
                <FaPlus className="mr-2" />
                Add Payment Method
              </button>
            )}
            
            {saveStatus.payment && (
  <div className={`text-sm ${saveStatus.payment.isError ? 'text-red-500' : 'text-green-500'} animate-fadeIn`}>
    {saveStatus.payment.message}
  </div>
)}
          </div>
        )}
        
        {/* Payout Settings Tab */}
        {activePaymentTab === 'payouts' && (
          <div className="space-y-6">
            <div className="border-b dark:border-gray-800 border-gray-200 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium mb-1 text-start">Auto Cash Out</div>
                  <div className="text-sm dark:text-gray-400 text-gray-600">Transfers happen every Monday</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={true} 
                    onChange={() => {}} 
                  />
                  <div className="w-11 h-6 dark:bg-gray-700 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
            </div>
            
            <div className="border-b dark:border-gray-800 border-gray-200 pb-4">
              <label className="block dark:text-gray-400 text-gray-600 mb-2 text-sm">Payout Method</label>
              <select className="w-full dark:bg-gray-900 bg-gray-50 border dark:border-gray-800 border-gray-300 rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500/50">
                {paymentMethods.filter(m => m.type === 'bank').map(method => (
                  <option key={method.id} value={method.id}>
                    {method.bankName} •••• {method.last4}
                  </option>
                ))}
                <option value="add">Add New Bank Account</option>
              </select>
            </div>
            
            <div className="border-b dark:border-gray-800 border-gray-200 pb-4">
              <label className="block dark:text-gray-400 text-gray-600 mb-2 text-sm">Payout Threshold</label>
              <div className="relative">
                <span className="absolute left-3 top-3 dark:text-gray-400 text-gray-600">$</span>
                <input
                  type="number"
                  defaultValue="100"
                  className="w-full dark:bg-gray-900 bg-gray-50 border dark:border-gray-800 border-gray-300 rounded-lg pl-8 pr-4 py-3 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500/50"
                />
              </div>
              <div className="text-sm dark:text-gray-400 text-gray-600 mt-1">
                Minimum balance required before automatic payout
              </div>
            </div>
            
            <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-colors font-medium flex items-center justify-center">
              <FaCheck className="mr-2" />
              Save Payout Settings
            </button>
          </div>
        )}
        
        {/* Payment History Tab */}
        {activePaymentTab === 'history' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Recent Transactions</h3>
              <select className="dark:bg-gray-900 bg-gray-50 border dark:border-gray-800 border-gray-300 rounded-lg px-3 py-1 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500/50">
                <option>Last 30 days</option>
                <option>Last 3 months</option>
                <option>Last 6 months</option>
                <option>All time</option>
              </select>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y dark:divide-gray-800 divide-gray-200">
                <thead className="dark:bg-gray-900/50 bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-500 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-500 uppercase tracking-wider">Description</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-500 uppercase tracking-wider">Amount</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="dark:bg-gray-900/30 bg-white divide-y dark:divide-gray-800 divide-gray-200">
                  {[
                    { id: 1, date: '2023-06-15', description: 'Weekly Payout', amount: 342.50, status: 'completed' },
                    { id: 2, date: '2023-06-08', description: 'Weekly Payout', amount: 287.75, status: 'completed' },
                    { id: 3, date: '2023-06-01', description: 'Weekly Payout', amount: 412.30, status: 'completed' },
                    { id: 4, date: '2023-05-25', description: 'Weekly Payout', amount: 365.90, status: 'completed' },
                    { id: 5, date: '2023-05-18', description: 'Weekly Payout', amount: 298.60, status: 'completed' },
                  ].map((txn) => (
                    <tr key={txn.id} className="hover:dark:bg-gray-800/50 hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm dark:text-gray-300 text-gray-700">{txn.date}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm dark:text-gray-300 text-gray-700">{txn.description}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium dark:text-green-400 text-green-600">${txn.amount.toFixed(2)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          txn.status === 'completed' 
                            ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200' 
                            : 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200'
                        }`}>
                          {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-between items-center pt-4">
              <button className="dark:bg-gray-700 bg-gray-200 hover:dark:bg-gray-600 hover:bg-gray-300 text-white px-4 py-2 rounded-lg transition-colors text-sm">
                Previous
              </button>
              <span className="text-sm dark:text-gray-400 text-gray-600">
                Page 1 of 3
              </span>
              <button className="dark:bg-gray-700 bg-gray-200 hover:dark:bg-gray-600 hover:bg-gray-300 text-white px-4 py-2 rounded-lg transition-colors text-sm">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
          
          {/* Notifications Section */}
          <div className="dark:bg-gray-200/10 bg-white rounded-xl dark:border-gray-800 border-gray-200 mb-6 p-6 transition-all hover:shadow-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <i className="fas fa-bell text-green-400 mr-3" />
              <span>Notifications</span>
            </h2>
            
            <div className="space-y-6">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between border-b dark:border-gray-800 border-gray-200 pb-4">
                  <div>
                    <div className="font-medium mb-1 text-start">
                      {key.split(/(?=[A-Z])/).join(' ')}
                    </div>
                    <div className="text-sm dark:text-gray-400 text-gray-600">
                      {key === 'RideRequests' && 'Alerts for new ride requests'}
                      {key === 'Earnings' && 'Updates about your earnings'}
                      {key === 'Promotions' && 'Special offers and incentives'}
                      {key === 'AppUpdates' && 'Notifications about new features'}
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={value} 
                      onChange={() => toggleNotification(key)} 
                    />
                    <div className="w-11 h-6 dark:bg-gray-700 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Vehicle Section */}
          <div className="dark:bg-gray-200/10 bg-white rounded-xl dark:border-gray-800 border-gray-200 mb-6 p-6 transition-all hover:shadow-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <i className="fas fa-car text-green-400 mr-3" />
              <span>Vehicle</span>
            </h2>
            
            <div className="space-y-6">
              {editMode.vehicle ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block dark:text-gray-400 text-gray-600 mb-2 text-sm">Make</label>
                      <input
                        name="vehicleMake"
                        value={formData.vehicleMake}
                        onChange={handleInputChange}
                        className={`w-full dark:bg-gray-900 bg-gray-50 border ${
                          errors.vehicleMake ? 'border-red-500' : 'dark:border-gray-800 border-gray-300'
                        } rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500/50`}
                      />
                      {errors.vehicleMake && <p className="mt-1 text-sm text-red-500 animate-fadeIn">{errors.vehicleMake}</p>}
                    </div>
                    <div>
                      <label className="block dark:text-gray-400 text-gray-600 mb-2 text-sm">Model</label>
                      <input
                        name="vehicleModel"
                        value={formData.vehicleModel}
                        onChange={handleInputChange}
                        className={`w-full dark:bg-gray-900 bg-gray-50 border ${
                          errors.vehicleModel ? 'border-red-500' : 'dark:border-gray-800 border-gray-300'
                        } rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500/50`}
                      />
                      {errors.vehicleModel && <p className="mt-1 text-sm text-red-500 animate-fadeIn">{errors.vehicleModel}</p>}
                    </div>
                    <div>
                      <label className="block dark:text-gray-400 text-gray-600 mb-2 text-sm">Year</label>
                      <input
                        type="number"
                        name="vehicleYear"
                        value={formData.vehicleYear}
                        onChange={handleInputChange}
                        className={`w-full dark:bg-gray-900 bg-gray-50 border ${
                          errors.vehicleYear ? 'border-red-500' : 'dark:border-gray-800 border-gray-300'
                        } rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500/50`}
                      />
                      {errors.vehicleYear && <p className="mt-1 text-sm text-red-500 animate-fadeIn">{errors.vehicleYear}</p>}
                    </div>
                    <div>
                      <label className="block dark:text-gray-400 text-gray-600 mb-2 text-sm">Color</label>
                      <input
                        name="vehicleColor"
                        value={formData.vehicleColor}
                        onChange={handleInputChange}
                        className={`w-full dark:bg-gray-900 bg-gray-50 border ${
                          errors.vehicleColor ? 'border-red-500' : 'dark:border-gray-800 border-gray-300'
                        } rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500/50`}
                      />
                      {errors.vehicleColor && <p className="mt-1 text-sm text-red-500 animate-fadeIn">{errors.vehicleColor}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block dark:text-gray-400 text-gray-600 mb-2 text-sm">License Plate</label>
                    <input
                      name="licensePlate"
                      value={formData.licensePlate}
                      onChange={handleInputChange}
                      className={`w-full dark:bg-gray-900 bg-gray-50 border ${
                        errors.licensePlate ? 'border-red-500' : 'dark:border-gray-800 border-gray-300'
                      } rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500/50`}
                    />
                    {errors.licensePlate && <p className="mt-1 text-sm text-red-500 animate-fadeIn">{errors.licensePlate}</p>}
                  </div>
                  <div className="flex space-x-3 pt-2">
                    <button
                      onClick={handleVehicleSave}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-colors font-medium flex items-center justify-center flex-1"
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <FaSpinner className="animate-spin mr-2" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <FaCheck className="mr-2" />
                          Save Changes
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setEditMode({...editMode, vehicle: false})}
                      className="dark:bg-gray-700 bg-gray-200 hover:dark:bg-gray-600 hover:bg-gray-300 text-white px-4 py-3 rounded-lg transition-colors font-medium flex items-center justify-center flex-1"
                    >
                      <FaTimes className="mr-2" />
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="border-b dark:border-gray-800 border-gray-200 pb-4">
                    <label className="block dark:text-gray-400 text-gray-600 mb-2 text-sm">Vehicle</label>
                    <div className="flex items-center justify-between">
                      <div>
                        {formData.vehicleMake} {formData.vehicleModel} ({formData.vehicleYear})
                      </div>
                      <button 
                        onClick={() => setEditMode({...editMode, vehicle: true})}
                        className="text-green-400 hover:text-green-300 text-sm font-medium flex items-center"
                      >
                        <i className="fas fa-pencil-alt mr-1" />
                        Edit
                      </button>
                    </div>
                  </div>
                  
                  <div className="border-b dark:border-gray-800 border-gray-200 pb-4">
                    <label className="block dark:text-gray-400 text-gray-600 mb-2 text-sm">License Plate</label>
                    <div className="flex items-center justify-between">
                      <div>{formData.licensePlate}</div>
                      <button 
                        onClick={() => setEditMode({...editMode, vehicle: true})}
                        className="text-green-400 hover:text-green-300 text-sm font-medium flex items-center"
                      >
                        <i className="fas fa-pencil-alt mr-1" />
                        Edit
                      </button>
                    </div>
                  </div>
                </>
              )}
             {saveStatus.vehicle && (
  <div className={`text-sm ${saveStatus.vehicle.isError ? 'text-red-500' : 'text-green-500'} animate-fadeIn`}>
    {saveStatus.vehicle.message}
  </div>
)}
            </div>
          </div>
          
          {/* Appearance Section */}
          <div className="dark:bg-gray-200/10 bg-white rounded-xl dark:border-gray-800 border-gray-200 mb-6 p-6 transition-all hover:shadow-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              {isDarkMode ? (
                <FaMoon className="text-green-400 mr-3" />
              ) : (
                <FaSun className="text-green-400 mr-3" />
              )}
              <span>Appearance</span>
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium mb-1 text-start">Dark Mode</div>
                  <div className="text-sm dark:text-gray-400 text-gray-600">
                    {isDarkMode ? 'Dark theme is enabled' : 'Light theme is enabled'}
                  </div>
                </div>
                <button
                  onClick={toggleTheme}
                  className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${
                    isDarkMode ? 'bg-green-600' : 'dark:bg-gray-700 bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block w-4 h-4 transform transition-transform rounded-full bg-white ${
                      isDarkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
          
          {/* About Section */}
          <div className="dark:bg-gray-200/10 bg-white rounded-xl dark:border-gray-800 border-gray-200 mb-6 p-6 transition-all hover:shadow-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <i className="fas fa-info-circle text-green-400 mr-3" />
              <span>About</span>
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b dark:border-gray-800 border-gray-200">
                <div>
                  <div className="font-medium text-start">App Version</div>
                  <div className="text-sm dark:text-gray-400 text-gray-600">Current installed version</div>
                </div>
                <div>1.0.0</div>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b dark:border-gray-800 border-gray-200">
                <div>
                  <div className="font-medium text-start">Terms of Service</div>
                  <div className="text-sm dark:text-gray-400 text-gray-600">Legal terms and conditions</div>
                </div>
                <a href="#" className="text-green-400 hover:text-green-300 font-medium flex items-center">
                  View <i className="fas fa-external-link-alt ml-1 text-xs" />
                </a>
              </div>
              
              <div className="flex justify-between items-center py-3">
                <div>
                  <div className="font-medium text-start">Privacy Policy</div>
                  <div className="text-sm dark:text-gray-400 text-gray-600">How we handle your data</div>
                </div>
                <a href="#" className="text-green-400 hover:text-green-300 font-medium flex items-center">
                  View <i className="fas fa-external-link-alt ml-1 text-xs" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button 
              className="dark:bg-red-900/50 bg-red-100 hover:dark:bg-red-900/70 hover:bg-red-200 border dark:border-red-800/50 border-red-300 text-white px-6 py-3 rounded-lg transition-colors font-medium flex items-center" 
              onClick={handleLogoutClick}
            >
              <i className="fas fa-sign-out-alt mr-2" />
              Sign Out
            </button>
          </div>

          {/* Logout Popup */}
          {showLogoutConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="dark:bg-gray-800 bg-white rounded-xl dark:border-gray-700 border-gray-300 p-6 max-w-md w-full shadow-xl">
                <div className="flex flex-col items-center">
                  <div className="text-2xl mb-4 text-center">
                    <i className="fas fa-exclamation-triangle text-yellow-400 mr-2" />
                    Are you sure you want to sign out?
                  </div>
                  
                  <div className="flex space-x-4 w-full mt-4">
                    <button
                      onClick={cancelLogout}
                      className="flex-1 dark:bg-gray-700 bg-gray-200 hover:dark:bg-gray-600 hover:bg-gray-300 text-white px-4 py-3 rounded-lg transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmLogout}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition-colors font-medium flex items-center justify-center"
                    >
                      <i className="fas fa-sign-out-alt mr-2" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Animation styles */}
          <style jsx>{`
            .animate-fadeIn {
              animation: fadeIn 0.3s ease-out forwards;
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(-5px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      </div>
    </div>
  )
}

export default Settings
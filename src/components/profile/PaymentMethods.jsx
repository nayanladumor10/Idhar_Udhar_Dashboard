import React, { useState, useEffect } from 'react';
import { CreditCard, Plus, Trash2 } from 'lucide-react';

const PAYMENT_METHODS_KEY = 'my_payment_methods';

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState(() => {
    const storedMethods = localStorage.getItem(PAYMENT_METHODS_KEY);
    return storedMethods ? JSON.parse(storedMethods) : [
      {
        type: 'HDFC Credit Card',
        number: '•••• 4242',
        expiry: '12/26',
        isDefault: true
      },
      {
        type: 'ICICI Debit Card',
        number: '•••• 5678',
        expiry: '08/25',
        isDefault: false
      },
      {
        type: 'user@upi',
        number: '',
        expiry: '',
        isDefault: false
      }
    ];
  });

  const [showModal, setShowModal] = useState(false);
  const [newMethod, setNewMethod] = useState({
    type: '',
    number: '',
    expiry: ''
  });

  useEffect(() => {
    localStorage.setItem(PAYMENT_METHODS_KEY, JSON.stringify(paymentMethods));
  }, [paymentMethods]);

  const handleAddMethod = () => {
    setPaymentMethods([...paymentMethods, { ...newMethod, isDefault: false }]);
    setNewMethod({ type: '', number: '', expiry: '' });
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
    setNewMethod({ type: '', number: '', expiry: '' });
  };

  const handleDelete = (index) => {
    const updated = paymentMethods.filter((_, i) => i !== index);
    setPaymentMethods(updated);
  };

  const handleSetDefault = (index) => {
    const updatedMethods = paymentMethods.map((method, i) => ({
      ...method,
      isDefault: i === index,
    }));
    setPaymentMethods(updatedMethods);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-black dark:text-white">Payment Methods</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#121829] border border-gray-60 p-6 rounded-lg w-96 space-y-4 shadow-xl">
            <h3 className="text-xl font-semibold text-black dark:text-white">Add Payment Method</h3>
            <input
              type="text"
              placeholder="Payment Type (e.g., HDFC Credit Card)"
              value={newMethod.type}
              onChange={(e) => setNewMethod({ ...newMethod, type: e.target.value })}
              className="w-full p-2 rounded bg-white dark:bg-[#121829] border border-gray-600 text-white border border-gray-600"
            />
            <input
              type="text"
              placeholder="Card Number (•••• 1234)"
              value={newMethod.number}
              onChange={(e) => setNewMethod({ ...newMethod, number: e.target.value })}
              className="w-full p-2 rounded bg-white dark:bg-[#121829] border border-gray-600 text-white border border-gray-600"
            />
            <input
              type="text"
              placeholder="Expiry (MM/YY)"
              value={newMethod.expiry}
              onChange={(e) => setNewMethod({ ...newMethod, expiry: e.target.value })}
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
                onClick={handleAddMethod}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* List of Payment Methods */}
      <div className="space-y-4">
        {paymentMethods.map((method, index) => (
          <div
            key={index}
            className="bg-white shadow-xl dark:bg-[#010514] rounded-lg p-4 flex items-center justify-between group transition-colors border border-gray-700 hover:bg-green-800/30 hover:border-green-500"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-500/30 dark:bg-gray-700 rounded-3xl flex items-center justify-center mr-4">
                <CreditCard className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <h3 className="text-black dark:text-white font-medium">{method.type}</h3>
                {method.number && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {method.number} {method.expiry && `• Expires ${method.expiry}`}
                  </p>
                )}
                {method.isDefault && (
                  <span className="text-green-800 dark:text-green-500 text-sm">Default</span>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {!method.isDefault && (
                <button
                  onClick={() => handleSetDefault(index)}
                  className="dark:bg-gray-700 dark:hover:bg-gray-600 border border-gray-600 text-black dark:text-white px-4 py-2 rounded-lg"
                >
                  Set Default
                </button>
              )}
              <button
                onClick={() => handleDelete(index)}
                className="text-red-500 hover:text-red-400 p-2 rounded-lg hover:bg-gray-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;
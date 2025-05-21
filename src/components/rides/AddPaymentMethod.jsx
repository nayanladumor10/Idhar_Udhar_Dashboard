
import React, { useState } from "react";

export default function AddPaymentMethod({ onClose, onAdd }) {
  const [activeTab, setActiveTab] = useState("credit");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");

  const handleAddPayment = () => {
    let paymentMethod;

    if (activeTab === "upi") {
      if (!upiId) return alert("Please enter a valid UPI ID.");
      paymentMethod = {
        title: upiId,
        detail: "",
        icon: "💳",
      };
    } else {
      if (!cardNumber || !cardHolder || !expiry || !cvv)
        return alert("Please fill in all card details.");
      const cardType = activeTab === "credit" ? "Credit Card" : "Debit Card";
      const last4 = cardNumber.slice(-4);
      paymentMethod = {
        title: `${cardHolder} (${cardType})`,
        detail: `xxxx ${last4}`,
        icon: "💳",
      };
    }

    onAdd(paymentMethod);
    setCardNumber("");
    setCardHolder("");
    setExpiry("");
    setCvv("");
    setUpiId("");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-[#0c1a2c] text-white rounded-xl p-6 w-full max-w-md max-h-[95vh] overflow-y-auto shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add Payment Method</h2>
          <button onClick={onClose} className="text-white text-xl font-bold">
            &times;
          </button>
        </div>

        <p className="text-sm text-gray-300 mb-4">
          Enter your payment details to add a new payment method.
        </p>

        <div className="flex space-x-2 mb-6">
          {["credit", "debit", "upi"].map((type) => (
            <button
              key={type}
              onClick={() => setActiveTab(type)}
              className={`flex-1 py-2 rounded text-sm font-medium transition ${
                activeTab === type
                  ? "bg-green-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {type === "credit"
                ? "Credit Card"
                : type === "debit"
                ? "Debit Card"
                : "UPI"}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {activeTab === "upi" ? (
            <input
              className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700"
              placeholder="Enter your UPI ID (e.g. user@bank)"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          ) : (
            <>
              <input
                className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              <input
                className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700"
                placeholder="Card Holder Name"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
              />
              <div className="flex space-x-2">
                <input
                  className="w-1/2 p-2 rounded bg-gray-900 text-white border border-gray-700"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                />
                <input
                  className="w-1/2 p-2 rounded bg-gray-900 text-white border border-gray-700"
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end mt-6 space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 rounded hover:bg-green-900 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleAddPayment}
            className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 text-sm"
          >
            Add Payment Method
          </button>
        </div>
      </div>
    </div>
  );
}

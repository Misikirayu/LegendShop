'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaCreditCard, FaCalendarAlt, FaLock, FaSpinner, FaCheckCircle } from 'react-icons/fa';

export default function Checkout() {
  const router = useRouter();
  const { cart, dispatch } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      dispatch({ type: 'CLEAR_CART' });
      setIsLoading(false);
      router.push('/confirmation');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white py-16 px-4">
      <motion.main 
        className="container mx-auto max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-extrabold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Mythical Checkout
        </h1>
        <AnimatePresence mode="wait">
          {!isLoading ? (
            <motion.form 
              key="checkoutForm"
              onSubmit={handleSubmit}
              className="bg-gray-800 p-8 rounded-lg shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Form fields... */}
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium mb-2 flex items-center">
                  <FaUser className="mr-2" /> Full Name
                </label>
                <input type="text" id="name" name="name" required
                  className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  onChange={handleInputChange}
                />
              </div>
              {/* Add other form fields here... */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between mb-2">
                    <span>{item.name} x {item.quantity}</span>
                    <span>${item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="border-t border-gray-600 pt-4 mt-4">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                </div>
              </div>
              <motion.button 
                type="submit"
                className="w-full bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-colors text-lg font-bold flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaCheckCircle className="mr-2" /> Complete Purchase
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="loadingSpinner"
              className="bg-gray-800 p-8 rounded-lg shadow-xl flex flex-col items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-20 h-20 border-t-4 border-purple-500 border-solid rounded-full mb-6"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-2xl font-semibold mb-2">Processing your legendary purchase...</p>
              <p className="text-lg text-gray-400">Please wait while we forge your destiny.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>
    </div>
  );
}
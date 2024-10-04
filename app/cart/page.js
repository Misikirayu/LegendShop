'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';

export default function Cart() {
  const { cart, dispatch } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: newQuantity } });
    }
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white py-16 px-4">
      <motion.main 
        className="container mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-extrabold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Your Legendary Cart
        </h1>
        {cart.length === 0 ? (
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
              className="inline-block mb-8"
            >
              <FaShoppingCart className="text-8xl text-purple-400 mx-auto" />
            </motion.div>
            <p className="text-2xl mb-8">Your cart is empty</p>
            <Link href="/products" className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-colors inline-flex items-center">
              <FaShoppingCart className="mr-2" />
              Explore Products
            </Link>
          </motion.div>
        ) : (
          <>
            <motion.div 
              className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {cart.map((item, index) => (
                <motion.div 
                  key={item.id} 
                  className="flex items-center justify-between mb-6 pb-6 border-b border-gray-700 last:border-b-0 last:mb-0 last:pb-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <div>
                    <h2 className="text-xl font-bold">{item.name}</h2>
                    <p className="text-purple-400">${item.price}</p>
                  </div>
                  <div className="flex items-center">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-purple-600 text-white w-8 h-8 rounded-full hover:bg-purple-700 transition-colors"
                    >
                      -
                    </button>
                    <span className="mx-4">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-purple-600 text-white w-8 h-8 rounded-full hover:bg-purple-700 transition-colors"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                      title="Remove from cart"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <motion.div 
              className="bg-gray-800 p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Total:</h3>
                <p className="text-3xl font-bold text-purple-400">${total}</p>
              </div>
              <Link href="/checkout" className="w-full bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-colors text-lg font-bold inline-block text-center">
                Proceed to Checkout
              </Link>
            </motion.div>
          </>
        )}
      </motion.main>
    </div>
  );
}
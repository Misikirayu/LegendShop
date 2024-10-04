'use client';

import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

export default function ProductDetails({ product, onAddToCart }) {
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    dispatch({ 
      type: 'ADD_TO_CART', 
      payload: { ...product, quantity } 
    });
    onAddToCart(quantity);
    setQuantity(1); // Reset quantity after adding to cart
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-300 mb-4">{product.description}</p>
      <p className="text-2xl font-bold text-purple-400 mb-6">${product.price}</p>
      
      <div className="flex items-center justify-between mb-6">
        <span className="text-lg font-semibold">Quantity:</span>
        <div className="flex items-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-purple-600 text-white p-2 rounded-full"
            onClick={decrementQuantity}
          >
            <FaMinus />
          </motion.button>
          <span className="mx-4 text-xl font-bold">{quantity}</span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-purple-600 text-white p-2 rounded-full"
            onClick={incrementQuantity}
          >
            <FaPlus />
          </motion.button>
        </div>
      </div>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full bg-purple-600 text-white py-2 px-4 rounded-full hover:bg-purple-700 transition-colors duration-300"
        onClick={handleAddToCart}
      >
        Add to Cart
      </motion.button>
    </div>
  );
}
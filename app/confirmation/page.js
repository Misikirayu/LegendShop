'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Confirmation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white py-16 px-4">
      <motion.main 
        className="container mx-auto max-w-2xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-5xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          Order Confirmed!
        </motion.h1>
        <motion.p 
          className="text-xl mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Thank you for your legendary purchase. Your mythical items are on their way!
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link href="/" className="bg-purple-600 text-white px-8 py-4 rounded-full hover:bg-purple-700 transition-colors text-lg font-bold">
            Return to Home
          </Link>
        </motion.div>
      </motion.main>
    </div>
  );
}
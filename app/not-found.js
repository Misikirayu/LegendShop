'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaDragon, FaHome } from 'react-icons/fa';

export default function NotFound() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white flex flex-col items-center justify-center relative overflow-hidden">
      <motion.div
        className="absolute w-full h-full pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 0% 0%, rgba(255,0,0,0.1) 0%, rgba(0,0,0,0) 50%)',
            'radial-gradient(circle at 100% 100%, rgba(0,255,0,0.1) 0%, rgba(0,0,0,0) 50%)',
            'radial-gradient(circle at 50% 50%, rgba(0,0,255,0.1) 0%, rgba(0,0,0,0) 50%)',
            'radial-gradient(circle at 0% 100%, rgba(255,255,0,0.1) 0%, rgba(0,0,0,0) 50%)',
            'radial-gradient(circle at 100% 0%, rgba(255,0,255,0.1) 0%, rgba(0,0,0,0) 50%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
      <motion.div
        className="text-9xl font-extrabold mb-8"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
      >
        404
      </motion.div>
      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-8 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Oops! You've ventured too far!
      </motion.h1>
      <motion.p
        className="text-xl md:text-2xl mb-12 text-center max-w-2xl"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Even the bravest heroes sometimes lose their way. Let's get you back on track!
      </motion.p>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Link
          href="/"
          className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors duration-300 inline-flex items-center"
        >
          <FaHome className="mr-2" />
          Return to Safety
        </Link>
      </motion.div>
      <motion.div
        className="absolute text-purple-400 text-9xl opacity-20"
        animate={{
          x: position.x - 100,
          y: position.y - 100,
          rotate: [0, 360],
        }}
        transition={{
          type: 'spring',
          stiffness: 50,
          damping: 30,
        }}
      >
        <FaDragon />
      </motion.div>
      <div className="mt-16 text-center">
        <p className="text-gray-400">Did you cast a teleport spell gone wrong?</p>
        <motion.p
          className="text-purple-400 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 2 }}
        >
          Don't worry, our wizards are working on it!
        </motion.p>
      </div>
    </div>
  );
}
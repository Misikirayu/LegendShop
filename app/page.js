'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import AnimatedSection from './components/AnimatedSection';

const featuredProducts = [
  { id: 1, name: "Excalibur", price: 9999, image: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" },
  { id: 2, name: "Dragon Scale Armor", price: 7999, image: "https://images.unsplash.com/photo-1595429035839-c99c298ffdde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" },
  { id: 3, name: "Wizard's Staff", price: 5999, image: "https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" },
];

const imageLoader = ({ src }) => {
  return src;
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white">
      <AnimatedSection className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to LegendShop
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Discover legendary items for your epic adventures
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Link href="/products" className="bg-purple-600 text-white px-6 py-2 md:px-8 md:py-3 rounded-full text-base md:text-lg font-semibold hover:bg-purple-700 transition-colors duration-300">
              Explore Products
            </Link>
          </motion.div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-16 px-4 bg-gray-800">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Featured Artifacts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div 
                key={product.id}
                className="bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.6, duration: 0.5 }}
              >
                <div className="relative h-64">
                  <Image 
                    loader={imageLoader}
                    src={product.image} 
                    alt={product.name} 
                    layout="fill" 
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-purple-400 text-lg mb-4">${product.price}</p>
                  <Link href={`/products/${product.id}`} className="text-white bg-purple-600 px-4 py-2 rounded-full hover:bg-purple-700 transition-colors duration-300">
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Start Your Legend?</h2>
          <p className="text-xl mb-12">Join our community of heroes and embark on epic quests with legendary gear!</p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/products" className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors duration-300 inline-flex items-center">
              Shop Now <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </AnimatedSection>
    </div>
  );
}
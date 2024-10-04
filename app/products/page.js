'use client';

import Link from "next/link";
import Image from "next/image";
import { motion } from 'framer-motion';
import { useState } from 'react';

// This would typically come from an API or database
const products = [
  { id: 1, name: "Legendary Sword", price: 999, image: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" },
  { id: 2, name: "Mythical Shield", price: 799, image: "https://images.unsplash.com/photo-1595429035839-c99c298ffdde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" },
  { id: 3, name: "Epic Helmet", price: 599, image: "https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" },
  { id: 4, name: "Dragon Scale Armor", price: 1299, image: "https://images.unsplash.com/photo-1514539079130-25950c84af65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80" },
  { id: 5, name: "Enchanted Bow", price: 899, image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80" },
  { id: 6, name: "Magical Staff", price: 1099, image: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const imageLoader = ({ src }) => {
  return src;
};

export default function Products() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white py-16 px-4">
      <motion.main 
        className="container mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-6xl font-extrabold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          variants={itemVariants}
        >
          Legendary Arsenal
        </motion.h1>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="relative group bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setHoveredId(product.id)}
              onHoverEnd={() => setHoveredId(null)}
            >
              <div className="relative h-64">
                <Image
                  loader={imageLoader}
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:opacity-0"></div>
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredId === product.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link 
                    href={`/products/${product.id}`} 
                    className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors duration-300 transform hover:scale-105"
                  >
                    View Details
                  </Link>
                </motion.div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors duration-300">{product.name}</h2>
                <p className="text-purple-400 text-xl mb-4">${product.price}</p>
                <motion.div 
                  className="w-full h-1 bg-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredId === product.id ? 1 : 0 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.main>
    </div>
  );
}
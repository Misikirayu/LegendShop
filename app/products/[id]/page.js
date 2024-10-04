'use client';

import ProductDetails from '../../components/ProductDetails';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useCart } from '../../context/CartContext';
import { FaTimes } from 'react-icons/fa';

// This would typically come from an API or database
const getProduct = (id) => {
  const products = [
    { id: 1, name: "Legendary Sword", price: 999, description: "A sword of unparalleled power and beauty. Forged in the depths of a dying star, this blade cuts through reality itself.", image: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" },
    { id: 2, name: "Mythical Shield", price: 799, description: "An impenetrable shield forged by the gods. It has protected heroes and kings for millennia.", image: "https://images.unsplash.com/photo-1595429035839-c99c298ffdde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" },
    { id: 3, name: "Epic Helmet", price: 599, description: "A helmet that grants wisdom and protection. Wearing it allows you to see beyond the veil of our world.", image: "https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" },
    { id: 4, name: "Dragon Scale Armor", price: 1299, description: "Armor crafted from the scales of an ancient dragon. It's as light as a feather but stronger than steel.", image: "https://images.unsplash.com/photo-1514539079130-25950c84af65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80" },
    { id: 5, name: "Enchanted Bow", price: 899, description: "A bow imbued with magical properties. Its arrows never miss their mark and can pierce through any material.", image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80" },
    { id: 6, name: "Magical Staff", price: 1099, description: "A staff that channels arcane energies. It amplifies the wielder's magical abilities tenfold.", image: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80" },
  ];
  return products.find(p => p.id === parseInt(id));
};

const imageLoader = ({ src }) => {
  return src;
};

export default function ProductDetailsPage({ params }) {
  const product = getProduct(params.id);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { dispatch } = useCart();

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = (quantity) => {
    dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity } });
    toast.custom((t) => (
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.3 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <img
                className="h-10 w-10 rounded-full"
                src={product.image}
                alt=""
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                {quantity} x {product.name} added to cart
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Your legendary items await!
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </motion.div>
    ), {
      duration: 2000,
    });
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white py-16 px-4">
      <Toaster position="bottom-right" reverseOrder={false} />
      <main className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row gap-12"
        >
          <motion.div 
            className="lg:w-1/2"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div 
              className="relative h-96 lg:h-[600px] rounded-lg overflow-hidden cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={openModal}
            >
              <Image
                loader={imageLoader}
                src={product.image}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-110"
              />
              <motion.div 
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-2xl font-bold">Click to enlarge</p>
              </motion.div>
            </div>
          </motion.div>
          <motion.div 
            className="lg:w-1/2"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <ProductDetails product={product} onAddToCart={handleAddToCart} />
          </motion.div>
        </motion.div>
        <motion.div 
          className="mt-12"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((id) => {
              const relatedProduct = getProduct(id);
              return (
                <Link href={`/products/${id}`} key={id}>
                  <div className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="relative h-48">
                      <Image
                        loader={imageLoader}
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-sm font-semibold">{relatedProduct.name}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </main>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full aspect-square"
            >
              <Image
                loader={imageLoader}
                src={product.image}
                alt={product.name}
                layout="fill"
                objectFit="contain"
              />
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white bg-purple-600 rounded-full p-2 hover:bg-purple-700 transition-colors duration-300"
              >
                <FaTimes size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
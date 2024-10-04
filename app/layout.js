'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import './globals.css';
import { CartProvider, useCart } from './context/CartContext';
import { FaShoppingCart, FaGem, FaHome, FaSignInAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

function NavLink({ href, icon: Icon, children, onClick }) {
  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Link href={href} className="flex items-center text-white hover:text-purple-400 transition-colors" onClick={onClick}>
        <Icon className="mr-2" />
        <span>{children}</span>
      </Link>
    </motion.div>
  );
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-gradient-to-r from-gray-900 to-purple-900 text-white py-4 sticky top-0 z-10 shadow-lg">
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="text-2xl font-extrabold tracking-tighter"
          >
            <Link href="/" className="flex items-center">
              <FaGem className="mr-2 text-purple-400" />
              <span>LEGEND<span className="text-purple-400">SHOP</span></span>
            </Link>
          </motion.div>
          <div className="hidden md:flex space-x-6 items-center">
            <NavLink href="/" icon={FaHome}>Home</NavLink>
            <NavLink href="/products" icon={FaGem}>Products</NavLink>
            <NavLink href="/login" icon={FaSignInAlt}>Login</NavLink>
            <CartIcon />
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-white focus:outline-none z-50">
              <span className="sr-only">Open main menu</span>
              <div className="relative w-8 h-8">
                <motion.span
                  className="absolute w-8 h-1 bg-white rounded-full"
                  animate={{
                    rotate: isOpen ? 45 : 0,
                    y: isOpen ? 9 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                ></motion.span>
                <motion.span
                  className="absolute w-8 h-1 bg-white rounded-full top-3"
                  animate={{
                    opacity: isOpen ? 0 : 1,
                    x: isOpen ? 20 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                ></motion.span>
                <motion.span
                  className="absolute w-8 h-1 bg-white rounded-full top-6"
                  animate={{
                    rotate: isOpen ? -45 : 0,
                    y: isOpen ? -9 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                ></motion.span>
              </div>
            </button>
          </div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4"
            >
              <div className="flex flex-col space-y-4">
                <NavLink href="/" icon={FaHome} onClick={toggleMenu}>Home</NavLink>
                <NavLink href="/products" icon={FaGem} onClick={toggleMenu}>Products</NavLink>
                <NavLink href="/login" icon={FaSignInAlt} onClick={toggleMenu}>Login</NavLink>
                <CartIcon />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-purple-900 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-xl font-bold tracking-tighter flex items-center">
              <FaGem className="mr-2 text-purple-400" />
              <span>LEGEND<span className="text-purple-400">SHOP</span></span>
            </Link>
            <p className="text-xs mt-1 text-gray-400">Legendary products for legendary people</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
        <div className="mt-4 text-center text-xs text-gray-400">
          © 2024 LegendShop. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function CartIcon() {
  const { cart } = useCart();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Link href="/cart" className="relative text-white hover:text-purple-400 transition-colors">
        <FaShoppingCart className="h-6 w-6" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-purple-400 text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
            {itemCount}
          </span>
        )}
      </Link>
    </motion.div>
  );
}

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-100">
        <CartProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

export default RootLayout;
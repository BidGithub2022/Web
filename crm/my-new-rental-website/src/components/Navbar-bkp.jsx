import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/">
              <a className="text-2xl font-bold text-blue-600">YourCompany</a>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link href="/properties">
                <a className="hover:text-blue-600">Properties</a>
              </Link>
              <Link href="/services">
                <a className="hover:text-blue-600">Services</a>
              </Link>
              <Link href="/about">
                <a className="hover:text-blue-600">About</a>
              </Link>
              <Link href="/contact">
                <a className="hover:text-blue-600">Contact</a>
              </Link>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-full">
                Book Now
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <span className="sr-only">Open main menu</span>
              {/* Add hamburger icon here */}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Add mobile menu items here */}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;

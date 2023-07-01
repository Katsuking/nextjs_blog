"use client"
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full py-2 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : ''
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <ul className="flex space-x-4 px-4">
          <li>
            <Link href="/" className="text-gray-600 hover:text-gray-800 font-serif">Home</Link>
          </li>
          <li>
          <Link href="/About" className="text-gray-600 hover:text-gray-800 font-serif">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
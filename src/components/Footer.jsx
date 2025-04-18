// src/components/Footer.jsx

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-6 md:flex md:items-center md:justify-between">
        <div className="flex justify-center md:justify-start">
          <p className="text-2xl text-blue-700 font-bold">
            <b>&copy; {new Date().getFullYear()} Operation Scheduler — All rights reserved.</b>
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex justify-between items-center space-x-6">
          <a href="/privacy-policy" className="text-black hover:text-blue-800 text-2xl">
            Privacy Policy
          </a>
          <a href="/terms-of-use" className="text-black hover:text-blue-800 text-2xl">
            Terms of Use
          </a>
          <a href="/contact" className="text-black hover:text-blue-800 text-2xl">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

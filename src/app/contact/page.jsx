"use client";

import { useState } from "react";

const ContactPage = () => {
  const [showContact, setShowContact] = useState(true);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-10">
      {showContact && (
        <div className="relative bg-gray-900 rounded-xl p-8 max-w-3xl w-full shadow-lg border border-gray-700">
          {/* Close Button */}
          <button
            onClick={() => setShowContact(false)}
            className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-xl font-bold"
            aria-label="Close"
          >
            &times;
          </button>

          <h1 className="text-3xl font-bold text-blue-400 mb-6 text-center">
            Contact Us
          </h1>

          <ul className="space-y-4 text-gray-300 text-base">
            <li>
              <span className="font-semibold text-blue-300">Hospital Name:</span> Apex Multispeciality Hospital
            </li>
            <li>
              <span className="font-semibold text-blue-300">Address:</span> 123 Health Blvd, Medicity, NY 45678
            </li>
            <li>
              <span className="font-semibold text-blue-300">Phone:</span> +1 (800) 123-4567
            </li>
            <li>
              <span className="font-semibold text-blue-300">Email:</span> contact@apexhospital.org
            </li>
            <li>
              <span className="font-semibold text-blue-300">Working Hours:</span> Mon–Sat, 9:00 AM – 8:00 PM
            </li>
            <li>
              <span className="font-semibold text-blue-300">Emergency Services:</span> Available 24/7
            </li>
          </ul>
        </div>
      )}

      {!showContact && (
        <p className="text-gray-400 text-lg text-center">
          Contact information closed. You can navigate elsewhere.
        </p>
      )}
    </div>
  );
};

export default ContactPage;

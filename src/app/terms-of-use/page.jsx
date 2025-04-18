"use client";

import { useState } from "react";

const TermsOfUsePage = () => {
  const [showTerms, setShowTerms] = useState(true);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-10">
      {showTerms && (
        <div className="relative bg-gray-900 rounded-xl p-8 max-w-3xl w-full shadow-lg border border-gray-700">
          {/* Close Button */}
          <button
            onClick={() => setShowTerms(false)}
            className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-xl font-bold"
            aria-label="Close"
          >
            &times;
          </button>

          <h1 className="text-3xl font-bold text-blue-400 mb-6 text-center">
            Hospital Terms of Use
          </h1>

          <ul className="list-disc space-y-4 text-gray-300 text-base pl-6">
            <li>By accessing our services, you agree to abide by all hospital policies and regulations.</li>
            <li>Use of false identity or impersonation is strictly prohibited.</li>
            <li>All information provided must be accurate and updated regularly.</li>
            <li>Patients and visitors must maintain respectful conduct toward staff and other patients.</li>
            <li>Unauthorized recording or distribution of hospital data is not allowed.</li>
            <li>Use of hospital systems for illegal or harmful activities is prohibited.</li>
            <li>The hospital reserves the right to refuse service in case of violation of terms.</li>
            <li>By continuing to use our services, you consent to the use of your data as outlined in our privacy policy.</li>
            <li>These terms are subject to change and will be communicated accordingly.</li>
          </ul>
        </div>
      )}
      {!showTerms && (
        <p className="text-gray-400 text-lg text-center">
          Terms of Use closed. You can navigate elsewhere.
        </p>
      )}
    </div>
  );
};
export default TermsOfUsePage;

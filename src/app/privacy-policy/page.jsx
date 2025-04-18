"use client";

import { useState } from "react";

const PrivacyPolicyPage = () => {
  const [showPolicy, setShowPolicy] = useState(true);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-10">
      {showPolicy && (
        <div className="relative bg-gray-900 rounded-xl p-8 max-w-3xl w-full shadow-lg border border-gray-700">
          {/* Close Button */}
          <button
            onClick={() => setShowPolicy(false)}
            className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-xl font-bold"
            aria-label="Close"
          >
            &times;
          </button>

          <h1 className="text-3xl font-bold text-blue-400 mb-6 text-center">
            Hospital Privacy Policy
          </h1>

          <ul className="list-disc space-y-4 text-gray-300 text-base pl-6">
            <li>All patient records are stored securely with restricted access.</li>
            <li>We do not share personal or medical information with third parties.</li>
            <li>Electronic data is encrypted both at rest and in transit.</li>
            <li>Staff access is granted based on role and necessity only.</li>
            <li>Patients may request copies of their records any time.</li>
            <li>All consent forms and disclosures are documented and maintained.</li>
            <li>We comply with national healthcare data privacy laws and standards.</li>
            <li>Cookies and analytics are used only for internal improvement purposes.</li>
            <li>Data is never sold or used for marketing without consent.</li>
          </ul>
        </div>
      )}

      {!showPolicy && (
        <p className="text-gray-400 text-lg text-center">
          Privacy Policy closed. You can navigate elsewhere.
        </p>
      )}
    </div>
  );
};

export default PrivacyPolicyPage;

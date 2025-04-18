"use client";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-blue-400 mb-12">
        Hospital Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">

        {/* Types of Surgeries */}
        <div className="bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-700">
          <h2 className="text-2xl font-bold text-pink-400 mb-4">Types of Surgeries</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>Cardiac Surgery</li>
            <li>Neurosurgery</li>
            <li>Orthopedic Surgery</li>
            <li>General Surgery</li>
            <li>Plastic Surgery</li>
            <li>ENT Surgery</li>
          </ul>
        </div>

        {/* Types of Doctors */}
        <div className="bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-700">
          <h2 className="text-2xl font-bold text-green-400 mb-4">Types of Doctors</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>Cardiologist</li>
            <li>Neurologist</li>
            <li>Orthopedic Surgeon</li>
            <li>General Physician</li>
            <li>Plastic Surgeon</li>
            <li>ENT Specialist</li>
          </ul>
        </div>

        {/* Hospital Info */}
        <div className="bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-700">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">Hospital Information</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>24x7 Emergency Services</li>
            <li>Advanced Operation Theaters</li>
            <li>Digital Patient Record System</li>
            <li>ICU & Recovery Rooms</li>
            <li>Certified Medical Staff</li>
            <li>Insurance & Billing Services</li>
          </ul>
        </div>

        {/* Surgical Instruments */}
        <div className="bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-700">
          <h2 className="text-2xl font-bold text-purple-400 mb-4">Surgical Instruments</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>Scalpel</li>
            <li>Forceps</li>
            <li>Retractors</li>
            <li>Surgical Scissors</li>
            <li>Clamps</li>
            <li>Needle Holders</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;

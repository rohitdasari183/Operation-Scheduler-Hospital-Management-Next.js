"use client";

import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/lib/firebase"; // make sure this exports your Firebase app

const PatientDashboard = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const auth = getAuth(app);
    await signOut(auth);
    router.push("/doctorLogin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-10">
      {/* Header + Logout */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-blue-400 animate-fade-in">
          Patient Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded-md font-semibold text-sm transition duration-300"
        >
          Logout
        </button>
      </div>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12 animate-fade-in-up">
        <button
          onClick={() => router.push("/patients/register")}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg text-lg font-semibold transition duration-300"
        >
          Register Patient
        </button>
        <button
          onClick={() => router.push("/datafetchpatient/patients")}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg shadow-lg text-lg font-semibold transition duration-300"
        >
          View Patient Data
        </button>
        <button
          onClick={() => router.push("/surgeryForm")}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg shadow-lg text-lg font-semibold transition duration-300"
        >
          Surgery Form
        </button>
      </div>

      {/* Patient Policy Info */}
      <div className="max-w-4xl mx-auto bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-700 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-blue-400 mb-4">Hospital Patient Policy</h2>
        <ul className="list-disc pl-6 space-y-3 text-gray-300 text-base">
          <li>All patients must provide accurate personal and medical information.</li>
          <li>Appointments should be scheduled in advance except in emergencies.</li>
          <li>Confidentiality of patient data is strictly maintained.</li>
          <li>Patients are entitled to respectful and non-discriminatory care.</li>
          <li>Post-treatment follow-up is mandatory as per doctor instructions.</li>
          <li>Patients have the right to access their reports and medical records.</li>
          <li>All surgical procedures require documented consent.</li>
          <li>Insurance and billing details must be provided before admission.</li>
        </ul>
      </div>
    </div>
  );
};

export default PatientDashboard;

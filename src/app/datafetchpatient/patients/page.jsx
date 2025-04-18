"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useRouter } from "next/navigation";

const PatientListPage = () => {
    const router=useRouter()
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPatients = async () => {
    try {
      const q = query(collection(db, "patients"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-3xl font-bold text-blue-500 mb-6 text-center">All Patients</h1>
      <button
          onClick={() => router.push("/patientDashboard")}
          className="px-6 py-3 bg-red-600 hover:bg-blue-700 rounded-lg shadow-lg text-lg font-semibold transition duration-300"
        >Back</button>
      {loading ? (
        <p className="text-center text-gray-400">Loading patient data...</p>
      ) : patients.length === 0 ? (
        <p className="text-center text-red-400">No patients found.</p>
      ) : (
        <div className="max-h-[70vh] overflow-y-auto border border-gray-700 rounded-xl shadow-lg">
          <table className="min-w-full text-left bg-gray-900 rounded-lg">
            <thead className="sticky top-0 bg-gray-800 text-blue-400">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Gender</th>
                <th className="px-6 py-3">Contact</th>
                <th className="px-6 py-3">Condition</th>
                <th className="px-6 py-3">Disease</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-800 transition">
                  <td className="px-6 py-4">{patient.name}</td>
                  <td className="px-6 py-4">{patient.email}</td>
                  <td className="px-6 py-4">{patient.gender}</td>
                  <td className="px-6 py-4">{patient.contact}</td>
                  <td className="px-6 py-4">{patient.condition}</td>
                  <td className="px-6 py-4">{patient.disease}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PatientListPage;

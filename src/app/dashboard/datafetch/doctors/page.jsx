"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";

const DoctorListPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "doctors"));
        const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDoctors(docs);
        setFilteredDoctors(docs);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = doctors.filter(doc =>
      doc.name.toLowerCase().includes(query)
    );
    setFilteredDoctors(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-8 overflow-y-auto">
      {/* Login Link */}
      <div className="flex justify-end mb-4">
        <Link
          href="/doctorLogin"
          className="text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition duration-200"
        >
          Login
        </Link>
      </div>

      <h1 className="text-4xl font-bold text-center text-blue-400 mb-6 animate-fade-in">
        Registered Doctors
      </h1>

      {/* Search Input */}
      <div className="max-w-xl mx-auto mb-10">
        <input
          type="text"
          placeholder="Search doctors by name..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring focus:ring-blue-500"
        />
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 animate-fade-in-up">
        {filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            className="bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 p-6 flex flex-col items-center text-center space-y-4"
          >
            <Image
              src={doc.gender.toLowerCase() === "male" ? "/maledoctor.jpg" : "/femaledoctor.jpg"}
              alt="Doctor Image"
              width={120}
              height={120}
              className="rounded-full border-4 border-blue-500"
            />
            <div>
              <h2 className="text-xl font-semibold text-blue-400">{doc.name}</h2>
              <p className="text-gray-300">{doc.specialization}</p>
              <p className="text-sm text-gray-400">{doc.email}</p>
              <p className="text-sm text-gray-400">Contact: {doc.contact}</p>
              <p className="text-sm text-gray-400">Experience: {doc.experience} years</p>
              <p className="text-sm text-gray-400 capitalize">Gender: {doc.gender}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorListPage;

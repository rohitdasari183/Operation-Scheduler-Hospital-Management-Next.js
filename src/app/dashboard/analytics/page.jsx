"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00c49f"];

const AnalyticsPage = () => {
  const [doctorCount, setDoctorCount] = useState(0);
  const [patientCount, setPatientCount] = useState(0);
  const [specializations, setSpecializations] = useState({});
  const [experienceLevels, setExperienceLevels] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const doctorsSnap = await getDocs(collection(db, "doctors"));
      const patientsSnap = await getDocs(collection(db, "patients"));

      setDoctorCount(doctorsSnap.size);
      setPatientCount(patientsSnap.size);

      const specCount = {};
      const expLevel = { "0-5": 0, "6-10": 0, "11-20": 0, "20+": 0 };

      doctorsSnap.forEach((doc) => {
        const data = doc.data();

        specCount[data.specialization] = (specCount[data.specialization] || 0) + 1;

        const years = parseInt(data.experience);
        if (years <= 5) expLevel["0-5"]++;
        else if (years <= 10) expLevel["6-10"]++;
        else if (years <= 20) expLevel["11-20"]++;
        else expLevel["20+"]++;
      });

      setSpecializations(specCount);
      setExperienceLevels(expLevel);
    };

    fetchData();
  }, []);

  const specData = Object.entries(specializations).map(([key, value]) => ({
    name: key,
    value,
  }));

  const expData = Object.entries(experienceLevels).map(([key, value]) => ({
    name: key,
    value,
  }));

  return (
    <div className="min-h-screen bg-black text-white py-10 px-5">
      <h1 className="text-4xl font-bold text-center text-blue-400 mb-10">
        Operational Analytics Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-gray-900 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Doctors vs Patients Count</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[{ name: "Counts", Doctors: doctorCount, Patients: patientCount }]}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Doctors" fill="#8884d8" />
              <Bar dataKey="Patients" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-900 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Specialization Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={specData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {specData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-900 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Doctor Experience Levels</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={expData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#ffc658" name="Doctors" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-900 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Recommendations & Insights</h2>
          <ul className="list-disc pl-6 space-y-3 text-sm">
            <li>Optimize OT schedules for underutilized specializations.</li>
            <li>Recruit more doctors in high-demand specializations.</li>
            <li>Balance doctor experience across departments.</li>
            <li>Consider hiring strategies to handle increasing patient load.</li>
            <li>Analyze peak hours and distribute staff accordingly.</li>
            <li>Introduce automation in repetitive tasks for better scalability.</li>
            <li>Upgrade infrastructure based on patient trends and department growth.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;

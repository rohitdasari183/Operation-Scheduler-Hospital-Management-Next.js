"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

const DataFetchSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSchedules = async () => {
    try {
      const snapshot = await getDocs(collection(db, "schedules"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSchedules(data);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">
        Operation Schedules
      </h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading schedules...</p>
      ) : schedules.length === 0 ? (
        <p className="text-center text-gray-400">No schedules found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg shadow-md">
            <thead className="bg-gray-700 text-blue-400">
              <tr>
                <th className="px-4 py-3 text-left">Surgery ID</th>
                <th className="px-4 py-3 text-left">OT Name</th>
                <th className="px-4 py-3 text-left">Doctor</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Time</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map(schedule => (
                <tr key={schedule.id} className="border-t border-gray-700 hover:bg-gray-700/40">
                  <td className="px-4 py-2">{schedule.id}</td>
                  <td className="px-4 py-2">{schedule.otName}</td>
                  <td className="px-4 py-2">{schedule.doctorName}</td>
                  <td className="px-4 py-2">{schedule.date}</td>
                  <td className="px-4 py-2">{schedule.time}</td>
                  <td className="px-4 py-2">{schedule.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DataFetchSchedule;

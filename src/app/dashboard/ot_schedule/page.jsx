'use client';

import { useEffect, useState } from 'react';

const dummySurgeries = [
  {
    id: '1',
    patientName: 'John Doe',
    doctorName: 'Dr. Smith',
    otId: 'OT-1',
    date: '2025-04-20',
    time: '09:00 AM',
    type: 'Appendectomy',
    status: 'Scheduled',
  },
  {
    id: '2',
    patientName: 'Jane Roe',
    doctorName: 'Dr. Lee',
    otId: 'OT-2',
    date: '2025-04-21',
    time: '01:00 PM',
    type: 'Knee Replacement',
    status: 'Completed',
  },
  {
    id: '3',
    patientName: 'Bob Martin',
    doctorName: 'Dr. Allen',
    otId: 'OT-1',
    date: '2025-04-22',
    time: '11:30 AM',
    type: 'Gallbladder Removal',
    status: 'Pending',
  },
];

export default function OTSchedulePage() {
  const [surgeries, setSurgeries] = useState([]);

  useEffect(() => {
    // Simulate fetching data
    setSurgeries(dummySurgeries);
  }, []);

  return (
    <div className="min-h-screen p-10 bg-gray-100 text-gray-800">
    <h1 className="text-3xl font-bold mb-6 text-blue-700 text-center">
      Operation Theatre Schedule
    </h1>
  
    <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
      <table className="min-w-full table-auto">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-3 px-6 text-left text-sm uppercase font-semibold">Patient</th>
            <th className="py-3 px-6 text-left text-sm uppercase font-semibold">Doctor</th>
            <th className="py-3 px-6 text-left text-sm uppercase font-semibold">OT ID</th>
            <th className="py-3 px-6 text-left text-sm uppercase font-semibold">Date</th>
            <th className="py-3 px-6 text-left text-sm uppercase font-semibold">Time</th>
            <th className="py-3 px-6 text-left text-sm uppercase font-semibold">Surgery Type</th>
            <th className="py-3 px-6 text-left text-sm uppercase font-semibold">Status</th>
          </tr>
        </thead>
  
        <tbody>
          {surgeries.map((surgery) => (
            <tr
              key={surgery.id}
              className="border-b hover:bg-blue-50 transition duration-200"
            >
              <td className="py-4 px-6">{surgery.patientName}</td>
              <td className="py-4 px-6">{surgery.doctorName}</td>
              <td className="py-4 px-6">{surgery.otId}</td>
              <td className="py-4 px-6">{surgery.date}</td>
              <td className="py-4 px-6">{surgery.time}</td>
              <td className="py-4 px-6">{surgery.type}</td>
              <td className="py-4 px-6">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    surgery.status === 'Scheduled'
                      ? 'bg-yellow-100 text-yellow-800'
                      : surgery.status === 'Completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {surgery.status}
                </span>
              </td>
            </tr>
          ))}
  
          {surgeries.length === 0 && (
            <tr>
              <td colSpan="7" className="py-6 px-6 text-center text-gray-500">
                No surgeries scheduled.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
  
  );
}

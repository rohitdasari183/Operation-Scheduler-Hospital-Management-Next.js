"use client";

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ReportsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [surgeries, setSurgeries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctorsSnap = await getDocs(collection(db, 'doctors'));
        const patientsSnap = await getDocs(collection(db, 'patients'));
        const schedulesSnap = await getDocs(collection(db, 'schedules'));
        const surgeriesSnap = await getDocs(collection(db, 'surgeries'));

        setDoctors(doctorsSnap.docs.map(doc => doc.data()));
        setPatients(patientsSnap.docs.map(doc => doc.data()));
        setSchedules(schedulesSnap.docs.map(doc => doc.data()));
        setSurgeries(surgeriesSnap.docs.map(doc => doc.data()));
      } catch (err) {
        console.error("Error fetching reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Hospital Report", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [['Doctor Name', 'Email', 'Specialization', 'Experience']],
      body: doctors.map(d => [d.name, d.email, d.specialization, d.experience]),
    });

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [['Patient Name', 'Age', 'Gender', 'Condition']],
      body: patients.map(p => [p.name, p.age, p.gender, p.condition]),
    });

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [['OT Name', 'Patient Name', 'Doctor Name', 'date','time','status']],
      body: schedules.map(s => [s.otName, s.patientName, s.doctorName, s.date,s.time,s.status]),
    });

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [['Type', 'Doctor Name', 'Patient Name', 'Remarks']],
      body: surgeries.map(s => [s.typeOfSurgery, s.doctorName, s.patientName, s.remarks]),
    });

    doc.save("hospital_report.pdf");
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-4xl font-bold text-center text-blue-500 mb-10">Comprehensive Hospital Report</h1>
      {loading ? (
        <p className="text-center text-xl">Loading data...</p>
      ) : (
        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">Doctors</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-800 rounded-xl overflow-hidden">
                <thead className="bg-blue-700 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left">Name</th>
                    <th className="px-6 py-3 text-left">Email</th>
                    <th className="px-6 py-3 text-left">Specialization</th>
                    <th className="px-6 py-3 text-left">Experience</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map((doc, idx) => (
                    <tr key={idx} className="border-b border-gray-700 hover:bg-gray-700">
                      <td className="px-6 py-4">{doc.name}</td>
                      <td className="px-6 py-4">{doc.email}</td>
                      <td className="px-6 py-4">{doc.specialization}</td>
                      <td className="px-6 py-4">{doc.experience} yrs</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">Patients</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-800 rounded-xl overflow-hidden">
                <thead className="bg-blue-700 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left">Name</th>
                    <th className="px-6 py-3 text-left">Age</th>
                    <th className="px-6 py-3 text-left">Gender</th>
                    <th className="px-6 py-3 text-left">Condition</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((pat, idx) => (
                    <tr key={idx} className="border-b border-gray-700 hover:bg-gray-700">
                      <td className="px-6 py-4">{pat.name}</td>
                      <td className="px-6 py-4">{pat.age}</td>
                      <td className="px-6 py-4">{pat.gender}</td>
                      <td className="px-6 py-4">{pat.condition}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">OT Schedules</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-800 rounded-xl overflow-hidden">
                <thead className="bg-blue-700 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left">OtName</th>
                    <th className="px-6 py-3 text-left">patientName</th>
                    <th className="px-6 py-3 text-left">doctorName</th>
                    <th className="px-6 py-3 text-left">Date</th>
                    <th className="px-6 py-3 text-left">Time</th>
                    <th className="px-6 py-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {schedules.map((sch, idx) => (
                    <tr key={idx} className="border-b border-gray-700 hover:bg-gray-700">
                      <td className="px-6 py-4">{sch.otName}</td>
                      <td className="px-6 py-4">{sch.patientName}</td>
                      <td className="px-6 py-4">{sch.doctorName}</td>
                      <td className="px-6 py-4">{sch.date}</td>
                      <td className="px-6 py-4">{sch.time}</td>
                      <td className="px-6 py-4">{sch.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">Surgeries</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-800 rounded-xl overflow-hidden">
                <thead className="bg-blue-700 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left">Type</th>
                    <th className="px-6 py-3 text-left">Doctor</th>
                    <th className="px-6 py-3 text-left">Patient</th>
                    <th className="px-6 py-3 text-left">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {surgeries.map((surg, idx) => (
                    <tr key={idx} className="border-b border-gray-700 hover:bg-gray-700">
                      <td className="px-6 py-4">{surg.typeOfSurgery}</td>
                      <td className="px-6 py-4">{surg.doctorName}</td>
                      <td className="px-6 py-4">{surg.patientName}</td>
                      <td className="px-6 py-4">{surg.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div className="text-center mt-10">
            <button
              onClick={downloadPDF}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-300"
            >
              Download Report as PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default ReportsPage;
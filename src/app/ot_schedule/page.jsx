"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const OTScheduleForm = () => {
  const [form, setForm] = useState({
    surgeryId: "",
    otName: "",
    patientName:"",
    doctorName: "",
    date: "",
    time: "",
    status: "",
  });

  const [surgeryIds, setSurgeryIds] = useState([]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchSurgeryIds = async () => {
      const snapshot = await getDocs(collection(db, "surgeries"));
      const ids = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSurgeryIds(ids);
    };
    fetchSurgeryIds();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateDoctorInSurgeries = async (doctorName) => {
    const q = query(collection(db, "surgeries"), where("doctorName", "==", doctorName));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const { surgeryId, otName,patientName,doctorName, date, time, status } = form;

    if (!surgeryId || !otName || !patientName || !doctorName || !date || !time || !status) {
      setError("Please fill in all fields.");
      setSubmitting(false);
      return;
    }

    try {
      const doctorExists = await validateDoctorInSurgeries(doctorName);
      if (!doctorExists) {
        setError("Doctor not found in surgeries collection.");
        setSubmitting(false);
        return;
      }

      await addDoc(collection(db, "schedules"), {
        surgeryId,
        otName,
        patientName,
        doctorName,
        date,
        time,
        status,
        createdAt: new Date(),
      });

      router.push("/patientDashboard");
    } catch (err) {
      console.error(err);
      setError("Failed to submit form.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-start py-16 px-4">
      <div className="w-full max-w-2xl bg-gray-900 rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-400 mb-6">OT Schedule Form</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
        <h1>Make sure to update status after operation is completed again by adding all details</h1>

          <div>
            <label className="block mb-2 font-semibold">Surgery ID</label>
            <select
              name="surgeryId"
              value={form.surgeryId}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md"
            >
              <option value="">Select Surgery ID</option>
              {surgeryIds.map((surgery) => (
                <option key={surgery.id} value={surgery.id}>
                  {surgery.id} — {surgery.patientName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold">OT Name</label>
            <input
              type="text"
              name="otName"
              value={form.otName}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Patient Name</label>
            <input
              type="text"
              name="patientName"
              value={form.patientName}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Doctor Name</label>
            <input
              type="text"
              name="doctorName"
              value={form.doctorName}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Time</label>
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Status(Completed/Pending)</label>
            <input
              type="text"
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md"
              placeholder="e.g., Scheduled / Completed / Cancelled"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold"
          >
            {submitting ? "Submitting..." : "Submit OT Schedule"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTScheduleForm;

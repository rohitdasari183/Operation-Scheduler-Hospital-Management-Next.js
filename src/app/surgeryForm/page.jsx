"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const SurgeryForm = () => {
  const [form, setForm] = useState({
    typeOfSurgery: "",
    patientName: "",
    doctorName: "",
    remarks: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateExistence = async (collectionName, fieldName, value) => {
    const q = query(collection(db, collectionName), where(fieldName, "==", value));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    const { typeOfSurgery, patientName, doctorName, remarks } = form;

    if (!typeOfSurgery || !patientName || !doctorName || !remarks) {
      setErrorMsg("All fields are required.");
      setSubmitting(false);
      return;
    }

    try {
      const patientExists = await validateExistence("patients", "name", patientName);
      const doctorExists = await validateExistence("doctors", "name", doctorName);

      if (!patientExists) {
        setErrorMsg("Patient not found in database.");
        setSubmitting(false);
        return;
      }

      if (!doctorExists) {
        setErrorMsg("Doctor not found in database.");
        setSubmitting(false);
        return;
      }

      await addDoc(collection(db, "surgeries"), {
        typeOfSurgery,
        patientName,
        doctorName,
        remarks,
        createdAt: new Date(),
      });

      router.push("/ot_schedule");
    } catch (error) {
      console.error("Error submitting surgery form:", error);
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-start py-16">
      <div className="w-full max-w-2xl bg-gray-900 rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-500 mb-8">Surgery Form</h2>

        {errorMsg && <p className="text-red-400 text-center mb-4">{errorMsg}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-semibold">Type of Surgery</label>
            <input
              type="text"
              name="typeOfSurgery"
              value={form.typeOfSurgery}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold">Patient Name</label>
            <input
              type="text"
              name="patientName"
              value={form.patientName}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold">Doctor Name</label>
            <input
              type="text"
              name="doctorName"
              value={form.doctorName}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold">Remarks</label>
            <textarea
              name="remarks"
              rows={4}
              value={form.remarks}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold transition duration-200"
          >
            {submitting ? "Submitting..." : "Submit Surgery"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SurgeryForm;

"use client";

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
const PatientRegistrationPage = () => {
 const router=useRouter()
  const [form, setForm] = useState({
    name: '',
    email: '',
    age:'',
    gender: '',
    contact: '',
    condition: '',
    disease: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg('');

    if (
      !form.name.trim() ||
      !form.email.trim()||
      !form.age.trim() ||
      !form.gender.trim() ||
      !form.contact.trim() ||
      !form.condition.trim() ||
      !form.disease.trim()
    ) {
      alert('All fields are mandatory!');
      setSubmitting(false);
      return;
    }

    try {
      await addDoc(collection(db, 'patients'), {
        ...form,
        createdAt: new Date(),
      });

      setForm({
        name: '',
        email: '',
        age:'',
        gender: '',
        contact: '',
        condition: '',
        disease: '',
      });
      setSuccessMsg('Patient registered successfully!');
    } catch (error) {
      console.error("Error registering patient:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-start py-16">
      <div className="w-full max-w-2xl bg-gray-900 rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-500 mb-8">Register Patient</h2>
        <button
          onClick={() => router.push("/patientDashboard")}
          className="px-6 py-3 bg-red-600 hover:bg-blue-700 rounded-lg shadow-lg text-lg font-semibold transition duration-300"
        >Back</button>
        {successMsg && <p className="text-green-400 text-center mb-4">{successMsg}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-semibold">Patient Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold">Email(optional)</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring focus:ring-blue-500"
            />
            
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold">Age</label>
            <input
              type="text"
              name="age"
              value={form.age}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring focus:ring-blue-500"
            />
            
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold">Gender</label>
            <input
              type="text"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold">Contact</label>
            <input
              type="text"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold">Medical Condition</label>
            <textarea
              name="condition"
              value={form.condition}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring focus:ring-blue-500 resize-none"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold">Disease</label>
            <input
              type="text"
              name="disease"
              value={form.disease}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold transition duration-200"
          >
            {submitting ? 'Registering...' : 'Register Patient'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientRegistrationPage;

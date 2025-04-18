"use client";

import { useState } from 'react';
import { db, storage } from '@/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const DoctorRegistrationPage = () => {
  const [form, setForm] = useState({
    name: '',
    email:'',
    gender:'',
    specialization: '',
    contact: '',
    experience: '',
    
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
      !form.email.trim() ||
      !form.gender.trim() ||
      !form.specialization.trim() ||
      !form.contact.trim() ||
      !form.experience.trim()
    ) {
      alert('All fields are mandatory!');
      setSubmitting(false);
      return;
    }

    try {
      await addDoc(collection(db, 'doctors'), {
        name: form.name,
        email:form.email,
        gender:form.gender,
        specialization: form.specialization,
        contact: form.contact,
        experience: form.experience,
        createdAt: new Date(),
      });

      setForm({
        name: '',
        email:'',
        gender:'',
        specialization: '',
        contact: '',
        experience: '',
      });
      setSuccessMsg('Doctor registered successfully!');
    } catch (error) {
      console.error("Error registering doctor:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-start py-16">
      <div className="w-full max-w-2xl bg-gray-900 rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-500 mb-8">Register Doctor</h2>
        {successMsg && <p className="text-green-400 text-center mb-4">{successMsg}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-semibold">Doctor Name</label>
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
            <label className="block mb-2 text-sm font-semibold">Email</label>
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
            <label className="block mb-2 text-sm font-semibold">Specialization</label>
            <input
              type="text"
              name="specialization"
              value={form.specialization}
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
            <label className="block mb-2 text-sm font-semibold">Experience (Years)</label>
            <input
              type="number"
              name="experience"
              value={form.experience}
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
            {submitting ? 'Registering...' : 'Register Doctor'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorRegistrationPage;

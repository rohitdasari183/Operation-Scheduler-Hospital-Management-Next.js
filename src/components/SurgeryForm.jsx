// src/components/SurgeryForm.jsx

import React, { useState } from 'react';

const SurgeryForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    surgeryDateTime: '',
    otId: '',
    surgeon: '',
    anesthesiologist: '',
    assistants: '',
    nurses: '',
    remarks: '',
    requiredItems: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Format assistants, nurses, items into arrays
    const payload = {
      ...formData,
      assistants: formData.assistants.split(',').map((a) => a.trim()),
      nurses: formData.nurses.split(',').map((n) => n.trim()),
      requiredItems: formData.requiredItems.split(',').map((i) => i.trim()),
    };

    if (onSubmit) onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-2xl p-6 space-y-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-blue-700 mb-4">Schedule Surgery</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date & Time</label>
          <input
            type="datetime-local"
            name="surgeryDateTime"
            value={formData.surgeryDateTime}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">OT ID</label>
          <input
            type="text"
            name="otId"
            value={formData.otId}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Surgeon</label>
          <input
            type="text"
            name="surgeon"
            value={formData.surgeon}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Anesthesiologist</label>
          <input
            type="text"
            name="anesthesiologist"
            value={formData.anesthesiologist}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Assistants (comma-separated)</label>
          <input
            type="text"
            name="assistants"
            value={formData.assistants}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Nurses (comma-separated)</label>
          <input
            type="text"
            name="nurses"
            value={formData.nurses}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Remarks</label>
        <textarea
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Required Items (comma-separated)</label>
        <input
          type="text"
          name="requiredItems"
          value={formData.requiredItems}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
        >
          Submit Surgery Schedule
        </button>
      </div>
    </form>
  );
};

export default SurgeryForm;

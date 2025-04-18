// src/components/ScheduleCard.jsx

import React from 'react';
import { formatDateTime, truncateText } from '@/lib/helpers';
import { Calendar, User, Stethoscope, ClipboardList } from 'lucide-react';

const ScheduleCard = ({ schedule }) => {
  const {
    surgeryDateTime,
    otId,
    anesthesiologist,
    surgeon,
    assistants,
    nurses,
    remarks,
    requiredItems,
  } = schedule;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 hover:shadow-md transition">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-blue-700">
          OT ID: {otId}
        </h3>
        <p className="text-sm text-gray-500 flex items-center gap-1">
          <Calendar size={16} /> {formatDateTime(surgeryDateTime)}
        </p>
      </div>

      <div className="text-sm text-gray-700 space-y-1">
        <p className="flex items-center gap-2">
          <Stethoscope size={16} className="text-blue-600" />
          Surgeon: <span className="font-medium">{surgeon}</span>
        </p>
        {assistants?.length > 0 && (
          <p className="ml-6 text-gray-600">Assistant(s): {assistants.join(', ')}</p>
        )}
        <p className="flex items-center gap-2">
          <User size={16} className="text-blue-600" />
          Anesthesiologist: <span className="font-medium">{anesthesiologist}</span>
        </p>
        {nurses?.length > 0 && (
          <p className="ml-6 text-gray-600">Nurse(s): {nurses.join(', ')}</p>
        )}
        <p className="flex items-start gap-2 pt-2">
          <ClipboardList size={16} className="text-blue-600 mt-1" />
          <span>
            <span className="font-medium">Remarks:</span>{' '}
            {truncateText(remarks, 120)}
          </span>
        </p>
      </div>

      {requiredItems?.length > 0 && (
        <div className="mt-3">
          <h4 className="text-sm font-semibold text-gray-700">Required Items:</h4>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {requiredItems.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ScheduleCard;

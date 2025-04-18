// src/dashboard/patients/index.jsx

import DashboardLayout from '../layout';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import UserCard from '@/components/UserCard';
import { sortPatientsByName } from './utils';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState('asc');

  const fetchPatients = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'patients'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPatients(sortPatientsByName(data, sortType));
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [sortType]);

  return (
    <DashboardLayout>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Patient Records</h2>
        <select
          value={sortType}
          onChange={e => setSortType(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-md shadow-sm"
        >
          <option value="asc">Sort A–Z</option>
          <option value="desc">Sort Z–A</option>
        </select>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading patient records...</p>
      ) : patients.length === 0 ? (
        <p className="text-gray-500">No patients found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patients.map(patient => (
            <UserCard key={patient.id} data={patient} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default PatientList;

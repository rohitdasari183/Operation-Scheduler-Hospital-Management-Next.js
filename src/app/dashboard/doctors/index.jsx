// src/dashboard/doctors/index.jsx

import DashboardLayout from '../layout';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import UserCard from '@/components/UserCard';
import { sortDoctorsByName } from './utils';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState('asc');

  const fetchDoctors = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'doctors'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDoctors(sortDoctorsByName(data, sortType));
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [sortType]);

  return (
    <DashboardLayout>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Doctor Directory</h2>
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
        <p className="text-gray-500">Loading doctor records...</p>
      ) : doctors.length === 0 ? (
        <p className="text-gray-500">No doctors found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map(doctor => (
            <UserCard key={doctor.id} data={doctor} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default DoctorList;

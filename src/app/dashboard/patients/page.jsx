'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import UserCard from '@/components/UserCard';

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const snapshot = await db.collection('patients').get();
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPatients(data);
    };
    fetchPatients();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Patients</h1>
      <div className="grid gap-4">
        {patients.map((patient) => (
          <UserCard key={patient.id} user={patient} />
        ))}
      </div>
    </div>
  );
}

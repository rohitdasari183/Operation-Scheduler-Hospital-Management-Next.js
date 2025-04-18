// src/dashboard/ot_schedule/index.jsx

import DashboardLayout from '../layout';
import { useEffect, useState } from 'react';
import ScheduleCard from '@/components/ScheduleCard';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { filterByDate } from './utils';

const OTSchedulePage = () => {
  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [filter, setFilter] = useState('upcoming');

  const fetchSchedules = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'schedules'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSchedules(data);
      setFilteredSchedules(filterByDate(data, filter));
    } catch (error) {
      console.error('Error fetching schedules:', error);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  useEffect(() => {
    setFilteredSchedules(filterByDate(schedules, filter));
  }, [filter]);

  return (
    <DashboardLayout>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">OT Schedule</h2>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-md shadow-sm"
        >
          <option value="upcoming">Upcoming</option>
          <option value="past">Past</option>
          <option value="all">All</option>
        </select>
      </div>

      {filteredSchedules.length === 0 ? (
        <p className="text-gray-500">No records found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchedules.map(schedule => (
            <ScheduleCard key={schedule.id} data={schedule} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default OTSchedulePage;

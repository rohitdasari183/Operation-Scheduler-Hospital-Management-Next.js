// src/dashboard/reports/index.jsx

import DashboardLayout from '../layout';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { formatDateTime } from './utils';

const ReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'reports'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReports(data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <DashboardLayout>
      <div className="mb-4">
        <h2 className="text-2xl font-semibold">Surgical Reports</h2>
        <p className="text-gray-600">Review all submitted operation reports and observations.</p>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading reports...</p>
      ) : reports.length === 0 ? (
        <p className="text-gray-500">No reports available.</p>
      ) : (
        <div className="space-y-4">
          {reports.map(report => (
            <div
              key={report.id}
              className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg">{report.patientName}</h3>
                <span className="text-sm text-gray-500">{formatDateTime(report.timestamp)}</span>
              </div>
              <p className="text-gray-700 mb-2"><strong>Surgery Type:</strong> {report.surgeryType}</p>
              <p className="text-gray-700 mb-2"><strong>Performed by:</strong> {report.doctorName}</p>
              <p className="text-gray-600 text-sm whitespace-pre-line">{report.observations}</p>

              {report.reportUrl && (
                <a
                  href={report.reportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-sm mt-2 inline-block"
                >
                  View Full Report PDF
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default ReportsPage;

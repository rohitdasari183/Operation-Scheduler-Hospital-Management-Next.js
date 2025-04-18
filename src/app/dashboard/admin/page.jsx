'use client';
import { useAuthContext } from '@/context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const { role, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && role !== 'admin') {
      router.push('/');
    }
  }, [role, loading]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p>Welcome, admin! You have access to restricted admin tools.</p>
      {/* You can add more admin-specific tools here */}
    </div>
  );
}

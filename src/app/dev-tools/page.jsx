'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';

export default function DeveloperPage() {
  const { user, role, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && role !== 'developer') {
      router.replace('/unauthorized');
    }
  }, [role, loading]);

  if (loading || role !== 'developer') {
    return <div className="p-6 text-center">Loading or Access Denied...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Developer Tools</h1>
      <p>Only visible to users with the 'developer' role.</p>
      {/* Add your dev features here */}
    </div>
  );
}

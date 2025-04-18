// app/developer/page.jsx
'use client';

import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DeveloperPage() {
  const { user, role, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && role !== 'developer') {
      router.push('/unauthorized'); // redirect if not dev
    }
  }, [loading, role]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-blue-600">Developer Tools</h1>
      <p className="mt-4">Only accessible by developers.</p>
    </div>
  );
}

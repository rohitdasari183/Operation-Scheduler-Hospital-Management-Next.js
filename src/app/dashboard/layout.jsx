"use client";
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';

const DashboardLayout = ({ children }) => {
  const { user, authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading]);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <span className="text-xl font-semibold">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content with scrolling */}
        {/* Navbar */}
        

        {/* Scrollable main */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      
    </div>
  );
};

export default DashboardLayout;

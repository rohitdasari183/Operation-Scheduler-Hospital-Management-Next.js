'use client';

import Link from 'next/link';
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, role, logout } = useAuthContext();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="text-2xl font-bold text-blue-700">
        <Link href="/">Operation Scheduler</Link>
      </div>

      <div className="flex space-x-6 items-center text-gray-700 font-medium">
        <Link href="/" className="hover:text-blue-600 transition">Home</Link>
        {user && (
          <>
            <Link href="/dashboard" className="hover:text-blue-600 transition">Dashboard</Link>
            <Link href="/dashboard/doctors" className="hover:text-blue-600 transition">Doctors</Link>
            <Link href="/dashboard/reports" className="hover:text-blue-600 transition">Reports</Link>
            <Link href="/dashboard/analytics" className="hover:text-blue-600 transition">Analytics</Link>
            
            
            <button
              onClick={handleLogout}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              Logout
            </button>
          </>
        )}
        {!user && (
          <>
            <Link href="/login" className="hover:text-blue-600 transition">Login</Link>
            <Link href="/register" className="hover:text-blue-600 transition">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

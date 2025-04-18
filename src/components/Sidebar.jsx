import React from 'react';
import Link from 'next/link';
import { Home, Calendar, User, LogOut, FileText } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="h-screen w-64 bg-gray-900 text-white p-6">
      <div className="flex items-center mb-10">
        <h1 className="text-3xl font-semibold text-blue-400 tracking-wide">Hospital OT</h1>
      </div>
      <nav className="flex flex-col space-y-4">
        <Link href="/dashboard">
          <div className="flex items-center px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition-colors duration-200 text-gray-300">
            <span className="mr-3"><Home size={18} /></span>
            Dashboard
          </div>
        </Link>

        <Link href="/dashboard/datafetchschedule">
          <div className="flex items-center px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition-colors duration-200 text-gray-300">
            <span className="mr-3"><Calendar size={18} /></span>
            Schedule
          </div>
        </Link>

        <Link href="/dashboard/datafetch/doctors">
          <div className="flex items-center px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition-colors duration-200 text-gray-300">
            <span className="mr-3"><User size={18} /></span>
            All Doctors Data
          </div>
        </Link>

        <Link href="/dashboard/reports">
          <div className="flex items-center px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition-colors duration-200 text-gray-300">
            <span className="mr-3"><FileText size={18} /></span>
            Reports
          </div>
        </Link>

        
      </nav>
    </aside>
  );
};
export default Sidebar;

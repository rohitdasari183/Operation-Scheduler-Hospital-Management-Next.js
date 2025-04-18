'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (err) {
      console.error('Login Error:', err.message);
      setError(err.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 p-6">
      <form
        onSubmit={handleLogin}
        className="bg-black px-12 py-10 rounded-2xl shadow-2xl w-full max-w-2xl space-y-6"
      >
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-4">Hospital Admin Login</h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded text-sm text-center font-medium">
            {error}
          </div>
        )}

        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-xl transition duration-200 text-lg"
        >
          Sign In
        </button>
        <p className="text-center text-sm text-gray-600">
  Don’t have an account?{' '}
  <a href="/register" className="text-blue-600 hover:underline">
    Register
  </a>
</p>

      </form>
    </div>
  );
}

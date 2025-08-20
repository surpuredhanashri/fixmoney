'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AdminPanel from '@/components/AdminPanel';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      if (window.location.pathname !== '/auth/signin') {
        window.location.href = '/auth/signin';
      }
      return;
    }

    // Check if user is admin - exception for surpuredhanashri@gmail.com
    if (session.user?.email !== 'surpuredhanashri@gmail.com') {
      if (window.location.pathname !== '/profile') {
        window.location.href = '/profile';
      }
      return;
    }
  }, [session, status]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!session || session.user?.email !== 'surpuredhanashri@gmail.com') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Admin Panel
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Welcome, {session.user?.name || 'Admin'}! Manage blogs, calculators, and site content. Monitor site performance and user engagement.
          </p>
        </div>
        
        <AdminPanel />
      </div>
    </div>
  );
} 
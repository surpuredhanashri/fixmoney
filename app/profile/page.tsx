'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  Settings, 
  LogOut,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }
      return;
    }

    // If user is admin, redirect to admin page
    if (session.user?.email === 'surpuredhanashri@gmail.com') {
      if (window.location.pathname !== '/admin') {
        window.location.href = '/admin';
      }
      return;
    }
  }, [session, status]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const handleSignOut = async () => {
    try {
      console.log('Signing out from profile...');
      await signOut({ 
        callbackUrl: '/',
        redirect: true 
      });
      console.log('Sign out successful');
    } catch (error) {
      console.error('Sign out error:', error);
      // Force redirect to home page even if signOut fails
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <section className="py-8 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden"
          >
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-primary-600 to-success-600 px-8 py-12 text-center text-white">
              <div className="w-24 h-24 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                {session.user?.image ? (
                  <img 
                    src={session.user.image} 
                    alt="Profile" 
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-white" />
                )}
              </div>
              <h1 className="text-3xl font-bold mb-2">{session.user?.name || 'User'}</h1>
              <p className="text-primary-100 opacity-90">Welcome to your FixMoney profile</p>
            </div>

            {/* Profile Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                    <User className="w-6 h-6 text-primary-600" />
                    <span>Personal Information</span>
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                      <Mail className="w-5 h-5 text-primary-600" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                        <p className="font-medium text-gray-900 dark:text-white">{session.user?.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                      <Calendar className="w-5 h-5 text-success-600" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {new Date().toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                      <Shield className="w-5 h-5 text-warning-600" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Account Type</p>
                        <p className="font-medium text-gray-900 dark:text-white">Standard User</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                    <Settings className="w-6 h-6 text-primary-600" />
                    <span>Quick Actions</span>
                  </h2>
                  
                  <div className="space-y-4">
                    <Link 
                      href="/budget-fixer"
                      className="block p-4 bg-gradient-to-r from-primary-50 to-success-50 dark:from-primary-900/30 dark:to-success-900/30 border border-primary-200 dark:border-primary-700 rounded-2xl hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                    >
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Budget Fixer</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Analyze and fix your budget with AI-powered insights
                      </p>
                    </Link>
                    
                    <Link 
                      href="/calculators"
                      className="block p-4 bg-gradient-to-r from-success-50 to-blue-50 dark:from-success-900/30 dark:to-blue-900/30 border border-success-200 dark:border-success-700 rounded-2xl hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                    >
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Financial Calculators</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Access all our financial planning calculators
                      </p>
                    </Link>
                    
                    <Link 
                      href="/blogs"
                      className="block p-4 bg-gradient-to-r from-warning-50 to-purple-50 dark:from-warning-900/30 dark:to-purple-900/30 border border-warning-200 dark:border-warning-700 rounded-2xl hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                    >
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Financial Blog</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Read expert financial advice and tips
                      </p>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Sign Out Button */}
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleSignOut}
                  className="w-full md:w-auto bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 
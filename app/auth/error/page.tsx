'use client';

import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = (errorCode: string | null) => {
    switch (errorCode) {
      case 'Configuration':
        return 'There is a problem with the server configuration. Please contact support.';
      case 'AccessDenied':
        return 'You do not have permission to sign in.';
      case 'Verification':
        return 'The verification link has expired or has already been used.';
      case 'Default':
      default:
        return 'An error occurred during authentication. Please try again.';
    }
  };

  const handleRetry = () => {
    window.location.href = '/auth/signin';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <section className="py-8 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </section>

      {/* Error Section */}
      <section className="py-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 p-8 text-center"
          >
            {/* Error Icon */}
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>

            {/* Error Title */}
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Authentication Error
            </h1>

            {/* Error Message */}
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {getErrorMessage(error)}
            </p>

            {/* Error Code (for debugging) */}
            {error && (
              <div className="mb-6 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Error Code: <span className="font-mono text-gray-700 dark:text-gray-300">{error}</span>
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleRetry}
                className="w-full bg-gradient-to-r from-primary-600 to-success-600 hover:from-primary-700 hover:to-success-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Try Again</span>
              </button>

              <Link
                href="/"
                className="inline-block w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 font-semibold py-3 px-6 rounded-2xl transition-all duration-300"
              >
                Go to Homepage
              </Link>
            </div>

            {/* Help Text */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                If this problem persists, please{' '}
                <Link href="/contact" className="text-primary-600 dark:text-primary-400 hover:underline">
                  contact support
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 
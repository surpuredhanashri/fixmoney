'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, AlertTriangle, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function SignInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [buttonsRendered, setButtonsRendered] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  const errorParam = searchParams.get('error');

  // Test if component is rendering
  console.log('SignInPage component rendered');

  useEffect(() => {
    setButtonsRendered(true);
    console.log('Buttons should now be rendered');
    
    // Set current time to avoid hydration mismatch
    setCurrentTime(new Date().toLocaleTimeString());
  }, []);

  useEffect(() => {
    if (status === 'loading') return;

    if (session) {
      console.log('Session found:', session);
      // Use setTimeout to prevent redirect loops
      setTimeout(() => {
        // If user is admin, redirect to admin page
        if (session.user?.email === 'surpuredhanashri@gmail.com') {
          console.log('Redirecting admin to /admin');
          if (window.location.pathname !== '/admin') {
            window.location.href = '/admin';
          }
        } else {
          console.log('Redirecting user to /profile');
          if (window.location.pathname !== '/profile') {
            window.location.href = '/profile';
          }
        }
      }, 100);
    }
  }, [session, status]);

  useEffect(() => {
    if (errorParam) {
      setError(errorParam);
    }
  }, [errorParam]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300">Redirecting...</p>
        </div>
      </div>
    );
  }

  const handleGoogleSignIn = async () => {
    console.log('handleGoogleSignIn function called!');
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('=== GOOGLE SIGN-IN DEBUG START ===');
      console.log('Starting Google sign-in...');
      console.log('Environment check:', {
        NODE_ENV: process.env.NODE_ENV,
        hasGoogleClientId: !!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
      });
      
      // Check available providers
      console.log('Available providers:', ['google']);
      console.log('About to call signIn("google")...');
      
      const result = await signIn('google', { 
        callbackUrl: '/',
        redirect: false 
      });
      
      console.log('Sign-in result received:', result);
      console.log('Result type:', typeof result);
      console.log('Result keys:', result ? Object.keys(result) : 'null');
      console.log('Result value:', result);
      console.log('Result === null:', result === null);
      console.log('Result === undefined:', result === undefined);
      
      if (result?.error) {
        console.error('Sign-in error detected:', result.error);
        setError(result.error);
      } else if (result?.ok) {
        console.log('Sign-in successful, redirecting...');
        // Force a page refresh to ensure session is properly loaded
        window.location.href = '/';
      } else {
        console.log('Sign-in result is neither error nor ok:', result);
        console.log('Full result object:', JSON.stringify(result, null, 2));
        
        // Check if this is a redirect response
        if (result && typeof result === 'object' && 'url' in result && result.url) {
          console.log('This appears to be a redirect response:', result.url);
          // Handle redirect manually
          window.location.href = result.url;
        } else {
          setError('Unexpected sign-in response. Please try again.');
        }
      }
      console.log('=== GOOGLE SIGN-IN DEBUG END ===');
    } catch (error) {
      console.error('Sign-in exception caught:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Test if functions are properly defined
  console.log('After function definition - handleGoogleSignIn exists:', typeof handleGoogleSignIn);
  console.log('After function definition - signIn exists:', typeof signIn);

  // Test if button element is rendered
  useEffect(() => {
    // Test multiple times with different delays
    const testButton = (delay: number) => {
      const timer = setTimeout(() => {
        console.log(`Testing buttons after ${delay}ms delay...`);
        
        // Find buttons by their text content instead of broken querySelector
        const allButtons = document.querySelectorAll('button');
        console.log(`Total buttons on page (${delay}ms):`, allButtons.length);
        
        // Look for our specific buttons
        let testButtonFound = false;
        let googleButtonFound = false;
        
        allButtons.forEach((btn, index) => {
          const text = btn.textContent?.trim() || '';
          console.log(`Button ${index}: "${text}" onClick: ${!!btn.onclick}`);
          
          if (text.includes('Test Button')) {
            testButtonFound = true;
            console.log('✅ Test button found!');
          }
          if (text.includes('Continue with Google')) {
            googleButtonFound = true;
            console.log('✅ Google button found!');
          }
        });
        
        console.log(`Button status (${delay}ms): Test button: ${testButtonFound}, Google button: ${googleButtonFound}`);
        
        if (testButtonFound && googleButtonFound) {
          console.log('🎉 Both buttons are properly rendered and clickable!');
        }
        
      }, delay);
      return timer;
    };

    // Test at different intervals
    const timers = [
      testButton(100),
      testButton(500),
      testButton(1000),
      testButton(2000)
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

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

      {/* Sign In Section */}
      <section className="py-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 p-8"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary-500 to-success-500 rounded-2xl flex items-center justify-center">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Sign in to access your FixMoney profile and tools
              </p>
            </div>

            {/* Error Display */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-2xl"
              >
                <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-medium">Authentication Error</span>
                </div>
                <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                  {error === 'OAuthSignin' && 'Failed to initiate Google sign-in. Please try again.'}
                  {error === 'OAuthCallback' && 'Google sign-in callback failed. Please try again.'}
                  {error === 'OAuthCreateAccount' && 'Failed to create account. Please try again.'}
                  {error === 'OAuthAccountNotLinked' && 'This email is already associated with another account.'}
                  {error === 'EmailCreateAccount' && 'Failed to create account with email. Please try again.'}
                  {error === 'Callback' && 'Authentication callback failed. Please try again.'}
                  {error === 'OAuthSignin' && 'OAuth sign-in failed. Please try again.'}
                  {error === 'EmailSignin' && 'Email sign-in failed. Please try again.'}
                  {error === 'CredentialsSignin' && 'Invalid credentials. Please try again.'}
                  {error === 'SessionRequired' && 'Please sign in to access this page.'}
                  {error === 'Default' && 'An error occurred during authentication. Please try again.'}
                  {!['OAuthSignin', 'OAuthCallback', 'OAuthCreateAccount', 'OAuthAccountNotLinked', 'EmailCreateAccount', 'Callback', 'OAuthSignin', 'EmailSignin', 'CredentialsSignin', 'SessionRequired', 'Default'].includes(error) && error}
                </p>
              </motion.div>
            )}

            {/* Sign In Form */}
            <div className="space-y-6">
              {/* Debug Info */}
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg">
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  Component rendered at: {currentTime}
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  Buttons rendered: {buttonsRendered ? 'Yes' : 'No'}
                </p>
              </div>

              {/* Test Button */}
              <button
                onClick={() => console.log('Test button clicked!')}
                className="w-full bg-red-500 text-white py-2 px-4 rounded-lg mb-4"
              >
                Test Button - Click Me!
              </button>

              {/* Google Sign In Button */}
              <button
                onClick={() => {
                  console.log('Button clicked! Testing click event...');
                  handleGoogleSignIn();
                }}
                disabled={isLoading}
                className="w-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3 hover:border-primary-500 dark:hover:border-primary-400 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <RefreshCw className="w-6 h-6 animate-spin" />
                ) : (
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                )}
                <span>{isLoading ? 'Signing in...' : 'Continue with Google'}</span>
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  By signing in, you agree to our{' '}
                  <Link href="/terms" className="text-primary-600 dark:text-primary-400 hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-primary-600 dark:text-primary-400 hover:underline">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Don't have an account?{' '}
                <span className="text-primary-600 dark:text-primary-400">
                  Sign up automatically with Google
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 
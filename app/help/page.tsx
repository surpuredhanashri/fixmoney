import { Metadata } from 'next';
import HelpCentre from '@/components/HelpCentre';

export const metadata: Metadata = {
  title: 'Help Centre - Get Support & Answers | FixMoney.in',
  description: 'Find answers to common questions, get support for our financial tools, and chat with our AI assistant for personalized help.',
  keywords: ['help centre', 'support', 'FAQ', 'live chat', 'customer service', 'financial tools help'],
};

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Help Centre
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Find answers to common questions, get support for our financial tools, 
            and chat with our AI assistant for personalized help.
          </p>
        </div>
        
        <HelpCentre />
      </div>
    </div>
  );
} 
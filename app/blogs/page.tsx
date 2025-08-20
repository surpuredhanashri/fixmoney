import { Metadata } from 'next';
import BlogList from '@/components/BlogList';

export const metadata: Metadata = {
  title: 'Financial Blogs & Articles | FixMoney.in',
  description: 'Read expert financial advice, investment tips, tax planning strategies, and money management articles. Stay updated with the latest financial trends and insights.',
  keywords: ['financial blogs', 'investment tips', 'tax planning', 'money management', 'financial advice', 'personal finance'],
};

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Financial Blogs & Insights
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Expert financial advice, investment tips, tax planning strategies, and money management articles. 
            Stay updated with the latest financial trends and insights.
          </p>
        </div>
        
        <BlogList />
      </div>
    </div>
  );
} 
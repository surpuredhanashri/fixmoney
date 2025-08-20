import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User, Tag, BookOpen } from 'lucide-react';

interface BlogData {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
  category: string;
  featured: boolean;
}

// Sample blog data - in a real app, this would come from a database
const sampleBlogs: Record<string, BlogData> = {
  '1': {
    id: '1',
    title: 'Complete Guide to Tax Planning for FY 2024-25',
    excerpt: 'Learn how to optimize your tax planning with the new tax regime changes. Understand deductions, exemptions, and strategies to minimize your tax liability.',
    content: `
      <h2>Introduction to Tax Planning</h2>
      <p>Tax planning is a crucial aspect of financial management that can help you save significant amounts of money while staying compliant with tax laws. With the introduction of the new tax regime in FY 2023-24, understanding the differences between old and new regimes has become more important than ever.</p>
      
      <h2>New Tax Regime vs Old Tax Regime</h2>
      <p>The new tax regime offers lower tax rates but removes most deductions and exemptions. It's the default option from FY 2023-24, but you can still opt for the old regime during filing.</p>
      
      <h3>New Tax Regime Benefits:</h3>
      <ul>
        <li>Lower tax rates across all income slabs</li>
        <li>Simplified tax structure</li>
        <li>No need to maintain investment proofs</li>
      </ul>
      
      <h3>Old Tax Regime Benefits:</h3>
      <ul>
        <li>Section 80C deductions (EPF, ELSS, etc.)</li>
        <li>Section 80D (Health insurance)</li>
        <li>Standard deduction of ₹50,000</li>
        <li>HRA and LTA exemptions</li>
      </ul>
      
      <h2>Key Deductions Under Section 80C</h2>
      <p>Section 80C allows deductions up to ₹1.5 lakh for various investments and expenses:</p>
      <ul>
        <li>Employee Provident Fund (EPF)</li>
        <li>Public Provident Fund (PPF)</li>
        <li>Equity Linked Saving Scheme (ELSS)</li>
        <li>National Savings Certificate (NSC)</li>
        <li>Tax-saving Fixed Deposits</li>
        <li>Life Insurance Premiums</li>
        <li>Children's Tuition Fees</li>
      </ul>
      
      <h2>Health Insurance Deductions</h2>
      <p>Section 80D provides deductions for health insurance premiums:</p>
      <ul>
        <li>Self, spouse, and children: Up to ₹25,000</li>
        <li>Parents (below 60 years): Up to ₹25,000</li>
        <li>Parents (60 years and above): Up to ₹50,000</li>
        <li>Preventive health checkup: Up to ₹5,000</li>
      </ul>
      
      <h2>Tax Planning Strategies</h2>
      <p>Here are some effective tax planning strategies for FY 2024-25:</p>
      
      <h3>1. Optimize Section 80C Investments</h3>
      <p>Start early in the financial year to maximize the power of compounding. Consider a mix of debt and equity instruments based on your risk appetite.</p>
      
      <h3>2. Health Insurance Planning</h3>
      <p>Ensure adequate health coverage for your family. Consider family floater plans for better value.</p>
      
      <h3>3. Home Loan Benefits</h3>
      <p>If you have a home loan, you can claim deductions for:</p>
      <ul>
        <li>Interest paid on home loan: Up to ₹2 lakh</li>
        <li>Principal repayment: Up to ₹1.5 lakh under Section 80C</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Effective tax planning requires understanding both tax regimes and choosing the one that benefits you most. Consider consulting a tax professional for personalized advice based on your financial situation.</p>
    `,
    author: 'FixMoney Team',
    publishedAt: '2024-01-15',
    readTime: 8,
    tags: ['tax planning', 'new tax regime', 'deductions', 'FY 2024-25'],
    category: 'Tax Planning',
    featured: true,
  },
  '2': {
    id: '2',
    title: 'Investment Strategies for Beginners: Start Your Wealth Journey',
    excerpt: 'New to investing? Discover the fundamentals of investment planning, risk management, and building a diversified portfolio for long-term wealth creation.',
    content: `
      <h2>Why Start Investing Early?</h2>
      <p>Investing early is one of the most powerful wealth-building strategies. Thanks to compound interest, even small amounts invested regularly can grow into substantial wealth over time.</p>
      
      <h2>Understanding Investment Basics</h2>
      <p>Before diving into specific investment options, it's essential to understand some fundamental concepts:</p>
      
      <h3>Risk and Return</h3>
      <p>Generally, higher potential returns come with higher risk. Understanding your risk tolerance is crucial for building a suitable investment portfolio.</p>
      
      <h3>Diversification</h3>
      <p>Don't put all your eggs in one basket. Diversifying across different asset classes helps reduce overall portfolio risk.</p>
      
      <h2>Investment Options for Beginners</h2>
      
      <h3>1. Mutual Funds</h3>
      <p>Mutual funds are excellent for beginners as they provide professional management and diversification. Start with index funds or large-cap funds.</p>
      
      <h3>2. Public Provident Fund (PPF)</h3>
      <p>PPF offers guaranteed returns and tax benefits. It's a safe option for conservative investors.</p>
      
      <h3>3. Equity-Linked Saving Scheme (ELSS)</h3>
      <p>ELSS provides tax benefits under Section 80C while offering exposure to equity markets.</p>
      
      <h3>4. Fixed Deposits</h3>
      <p>Fixed deposits offer guaranteed returns and are suitable for short-term goals.</p>
      
      <h2>Building Your Investment Portfolio</h2>
      <p>Follow these steps to build a solid investment portfolio:</p>
      
      <ol>
        <li>Set clear financial goals</li>
        <li>Assess your risk tolerance</li>
        <li>Choose appropriate investment vehicles</li>
        <li>Start with small amounts</li>
        <li>Invest regularly (SIP)</li>
        <li>Review and rebalance periodically</li>
      </ol>
      
      <h2>Common Investment Mistakes to Avoid</h2>
      <ul>
        <li>Investing without a plan</li>
        <li>Letting emotions drive decisions</li>
        <li>Not diversifying enough</li>
        <li>Timing the market</li>
        <li>Ignoring fees and charges</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Investing is a journey, not a destination. Start early, stay consistent, and focus on long-term wealth creation rather than short-term gains.</p>
    `,
    author: 'Financial Expert',
    publishedAt: '2024-01-12',
    readTime: 12,
    tags: ['investment', 'beginners', 'portfolio', 'wealth creation'],
    category: 'Investment',
    featured: true,
  },
  '6': {
    id: '6',
    title: 'Emergency Fund Planning: Your Financial Safety Net',
    excerpt: 'Learn why emergency funds are crucial and how to build one. Discover the right amount to save and where to keep your emergency fund.',
    content: `
      <h2>What is an Emergency Fund?</h2>
      <p>An emergency fund is a dedicated savings account that provides financial security during unexpected situations like job loss, medical emergencies, or major home repairs.</p>
      
      <h2>Why You Need an Emergency Fund</h2>
      <p>Emergency funds serve several crucial purposes:</p>
      <ul>
        <li>Prevents debt accumulation during emergencies</li>
        <li>Provides peace of mind and financial security</li>
        <li>Allows you to make better financial decisions</li>
        <li>Protects your long-term investments</li>
      </ul>
      
      <h2>How Much Should You Save?</h2>
      <p>The general recommendation is to save 3-6 months of your monthly expenses. However, consider these factors:</p>
      
      <h3>Factors to Consider:</h3>
      <ul>
        <li>Job stability and industry</li>
        <li>Family responsibilities</li>
        <li>Existing insurance coverage</li>
        <li>Access to other financial resources</li>
      </ul>
      
      <h2>Where to Keep Your Emergency Fund</h2>
      <p>Your emergency fund should be:</p>
      <ul>
        <li>Easily accessible</li>
        <li>Safe from market fluctuations</li>
        <li>Separate from regular savings</li>
      </ul>
      
      <h3>Recommended Options:</h3>
      <ul>
        <li>High-yield savings accounts</li>
        <li>Liquid mutual funds</li>
        <li>Short-term fixed deposits</li>
      </ul>
      
      <h2>Building Your Emergency Fund</h2>
      <p>Follow these steps to build your emergency fund:</p>
      
      <ol>
        <li>Set a target amount</li>
        <li>Create a monthly savings goal</li>
        <li>Automate your savings</li>
        <li>Use windfalls and bonuses</li>
        <li>Cut unnecessary expenses</li>
      </ol>
      
      <h2>When to Use Your Emergency Fund</h2>
      <p>Only use your emergency fund for genuine emergencies:</p>
      <ul>
        <li>Job loss</li>
        <li>Medical emergencies</li>
        <li>Major home or car repairs</li>
        <li>Unexpected travel for family emergencies</li>
      </ul>
      
      <h2>Rebuilding Your Emergency Fund</h2>
      <p>After using your emergency fund, prioritize rebuilding it:</p>
      <ul>
        <li>Increase your monthly savings temporarily</li>
        <li>Use any extra income or bonuses</li>
        <li>Cut back on discretionary spending</li>
        <li>Consider a side hustle for additional income</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>An emergency fund is the foundation of financial security. Start building yours today, even if it's with small amounts. Remember, consistency is key to building a robust financial safety net.</p>
    `,
    author: 'Financial Planner',
    publishedAt: '2024-01-03',
    readTime: 5,
    tags: ['emergency fund', 'financial planning', 'safety net', 'savings'],
    category: 'Personal Finance',
    featured: false,
  }
};

interface BlogPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const blog = sampleBlogs[params.id];
  
  if (!blog) {
    return {
      title: 'Blog Not Found | FixMoney.in',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${blog.title} | FixMoney.in`,
    description: blog.excerpt,
    keywords: blog.tags,
  };
}

export default function BlogPage({ params }: BlogPageProps) {
  const blog = sampleBlogs[params.id];

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Blog Not Found
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              The requested blog post could not be found.
            </p>
            <Link
              href="/blogs"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Blogs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back to Blogs */}
        <div className="mb-8">
          <Link
            href="/blogs"
            className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Blogs
          </Link>
        </div>

        {/* Blog Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-sm font-medium rounded-full">
              {blog.category}
            </span>
            {blog.featured && (
              <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm font-medium rounded-full">
                Featured
              </span>
            )}
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {blog.title}
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            {blog.excerpt}
          </p>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {blog.author}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formatDate(blog.publishedAt)}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {blog.readTime} min read
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {blog.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>

        {/* Related Articles CTA */}
        <div className="mt-12 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <BookOpen className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Want More Financial Insights?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Explore our collection of expert financial advice, investment tips, and money management strategies.
            </p>
            <Link
              href="/blogs"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Browse All Blogs
              <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 
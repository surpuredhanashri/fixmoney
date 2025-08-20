import type { Metadata } from 'next';
import BudgetFixer from '@/components/BudgetFixer';

export const metadata: Metadata = {
  title: 'Budget Fixer - Fix Your Budget & Detect Spending Leaks | FixMoney.in',
  description: 'Fix your budget with our AI-powered budget health checker, spending leak detector, and emergency fund analyzer. Upload bank statements and get personalized financial advice.',
  keywords: [
    'budget fixer',
    'budget health checker',
    'spending leak detector',
    'emergency fund calculator',
    'budget analysis',
    'financial health check',
    'money management tools',
    'budget optimization'
  ],
  openGraph: {
    title: 'Budget Fixer - Fix Your Budget & Detect Spending Leaks | FixMoney.in',
    description: 'Fix your budget with our AI-powered budget health checker, spending leak detector, and emergency fund analyzer.',
    url: 'https://fixmoney.in/budget-fixer',
  },
  alternates: {
    canonical: '/budget-fixer',
  },
};

export default function BudgetFixerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Budget Fixer
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Upload your bank statements, analyze your spending patterns, and get personalized 
              recommendations to fix your budget and build wealth faster.
            </p>
          </div>
          
          {/* Budget Fixer Component */}
          <BudgetFixer />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What You'll Get
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive budget analysis and actionable insights
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Budget Health Score</h3>
              <p className="text-gray-600">
                Get a comprehensive score from 0-100 with detailed breakdown of your financial health
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-success-600">🔍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Spending Leak Detection</h3>
              <p className="text-gray-600">
                Identify unnecessary expenses and subscription leaks that are draining your money
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-warning-600">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Emergency Fund Analysis</h3>
              <p className="text-gray-600">
                Check if your emergency fund is adequate and get a plan to build it up
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Your Statements</h3>
                <p className="text-gray-600">
                  Upload your bank statements in CSV format. We support all major Indian banks and 
                  ensure your data is processed securely and privately.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Analysis</h3>
                <p className="text-gray-600">
                  Our AI analyzes your spending patterns, categorizes transactions, and identifies 
                  areas where you can save money and optimize your budget.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Actionable Insights</h3>
                <p className="text-gray-600">
                  Receive personalized recommendations, spending leak alerts, and a step-by-step 
                  plan to fix your budget and improve your financial health.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Budget Fixer",
            "description": "AI-powered budget analysis and spending leak detection tool",
            "url": "https://fixmoney.in/budget-fixer",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR"
            },
            "featureList": [
              "Budget Health Checker",
              "Spending Leak Detector",
              "Emergency Fund Analyzer",
              "AI-Powered Analysis",
              "Personalized Recommendations"
            ]
          })
        }}
      />
    </div>
  );
} 
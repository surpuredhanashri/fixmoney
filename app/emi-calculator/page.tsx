import type { Metadata } from 'next';
import EMICalculator from '@/components/EMICalculator';

export const metadata: Metadata = {
  title: 'EMI Calculator - Calculate Loan EMI & Interest | FixMoney.in',
  description: 'Free EMI Calculator to calculate loan EMI, total interest, and repayment schedule. Plan your home loan, car loan, or personal loan with our advanced calculator.',
  keywords: [
    'EMI calculator',
    'loan EMI calculator',
    'home loan calculator',
    'car loan calculator',
    'personal loan calculator',
    'loan repayment calculator',
    'interest calculator',
    'loan planning tools'
  ],
  openGraph: {
    title: 'EMI Calculator - Calculate Loan EMI & Interest | FixMoney.in',
    description: 'Free EMI Calculator to calculate loan EMI, total interest, and repayment schedule.',
    url: 'https://fixmoney.in/emi-calculator',
  },
  alternates: {
    canonical: '/emi-calculator',
  },
};

export default function EMICalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              EMI Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calculate your loan EMI, total interest, and repayment schedule. Plan your home loan, 
              car loan, or personal loan with our comprehensive calculator.
            </p>
          </div>
          
          {/* Calculator Component */}
          <EMICalculator />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Use Our EMI Calculator?
            </h2>
            <p className="text-lg text-gray-600">
              Get accurate calculations and insights to make informed borrowing decisions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">✓</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Accurate Calculations</h3>
              <p className="text-gray-600">
                Get precise EMI calculations with our advanced formula engine
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-success-600">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Detailed Breakdown</h3>
              <p className="text-gray-600">
                See month-by-month repayment schedule and interest breakdown
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-warning-600">💡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Insights</h3>
              <p className="text-gray-600">
                Get personalized loan recommendations and optimization tips
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What is EMI (Equated Monthly Installment)?
              </h3>
              <p className="text-gray-600">
                EMI is a fixed payment amount made by a borrower to a lender at a specified date each month. 
                It includes both principal and interest components.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How is EMI calculated?
              </h3>
              <p className="text-gray-600">
                EMI is calculated using the formula: EMI = P × r × (1 + r)^n / ((1 + r)^n - 1), 
                where P is the principal amount, r is the monthly interest rate, and n is the number of months.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What factors affect EMI amount?
              </h3>
              <p className="text-gray-600">
                EMI amount depends on three main factors: loan amount (principal), interest rate, 
                and loan tenure (duration). Higher principal or interest rates increase EMI, while longer tenure reduces it.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How can I reduce my EMI?
              </h3>
              <p className="text-gray-600">
                You can reduce EMI by: 1) Increasing the down payment to reduce loan amount, 
                2) Choosing a longer loan tenure, 3) Negotiating for lower interest rates, 
                4) Making prepayments when possible.
              </p>
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
            "name": "EMI Calculator",
            "description": "Free EMI Calculator to calculate loan EMI, total interest, and repayment schedule",
            "url": "https://fixmoney.in/emi-calculator",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR"
            },
            "featureList": [
              "EMI Calculation",
              "Interest Breakdown",
              "Repayment Schedule",
              "Loan Planning Tools"
            ]
          })
        }}
      />
    </div>
  );
} 
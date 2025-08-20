import type { Metadata } from 'next';
import SIPCalculator from '@/components/SIPCalculator';

export const metadata: Metadata = {
  title: 'SIP Calculator - Calculate SIP Returns & Investment Growth | FixMoney.in',
  description: 'Free SIP Calculator to calculate SIP returns, investment growth, and wealth creation. Plan your mutual fund SIP investments with our advanced calculator. Start investing smartly today!',
  keywords: [
    'SIP calculator',
    'SIP returns calculator',
    'mutual fund SIP calculator',
    'investment calculator',
    'wealth calculator',
    'SIP investment planning',
    'monthly SIP calculator',
    'SIP growth calculator'
  ],
  openGraph: {
    title: 'SIP Calculator - Calculate SIP Returns & Investment Growth | FixMoney.in',
    description: 'Free SIP Calculator to calculate SIP returns, investment growth, and wealth creation. Plan your mutual fund SIP investments with our advanced calculator.',
    url: 'https://fixmoney.in/sip-calculator',
  },
  alternates: {
    canonical: '/sip-calculator',
  },
};

export default function SIPCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              SIP Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calculate your SIP returns, plan your investments, and see how small monthly investments 
              can grow into substantial wealth over time.
            </p>
          </div>
          
          {/* Calculator Component */}
          <SIPCalculator />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Use Our SIP Calculator?
            </h2>
            <p className="text-lg text-gray-600">
              Get accurate calculations and insights to make informed investment decisions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">✓</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Accurate Calculations</h3>
              <p className="text-gray-600">
                Get precise SIP returns with our advanced calculation engine
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-success-600">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Visual Insights</h3>
              <p className="text-gray-600">
                Understand your investment growth with interactive charts
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-warning-600">💡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Tips</h3>
              <p className="text-gray-600">
                Get personalized investment advice and optimization tips
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
                What is SIP (Systematic Investment Plan)?
              </h3>
              <p className="text-gray-600">
                SIP is an investment strategy where you invest a fixed amount regularly (monthly/weekly) 
                in mutual funds. It helps in rupee cost averaging and building wealth over time.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How does the SIP calculator work?
              </h3>
              <p className="text-gray-600">
                Our SIP calculator uses the compound interest formula to calculate your investment growth. 
                It considers your monthly investment amount, expected return rate, and investment duration.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What is the expected return rate for SIP investments?
              </h3>
              <p className="text-gray-600">
                Expected returns vary based on the type of mutual fund. Equity funds may offer 12-15% 
                returns, while debt funds may offer 6-8% returns. Past performance doesn't guarantee future results.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How much should I invest in SIP?
              </h3>
              <p className="text-gray-600">
                Start with an amount you're comfortable with, typically 10-20% of your monthly income. 
                You can always increase or decrease the amount based on your financial goals.
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
            "name": "SIP Calculator",
            "description": "Free SIP Calculator to calculate SIP returns, investment growth, and wealth creation",
            "url": "https://fixmoney.in/sip-calculator",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR"
            },
            "featureList": [
              "SIP Returns Calculation",
              "Investment Growth Projection",
              "Visual Charts and Graphs",
              "Investment Planning Tools"
            ]
          })
        }}
      />
    </div>
  );
} 
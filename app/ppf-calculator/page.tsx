import PPFCalculator from '@/components/PPFCalculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PPF Calculator - Calculate PPF Returns & Tax Benefits | FixMoney.in',
  description: 'Calculate PPF returns, maturity amount, and tax benefits with our PPF calculator. Plan your Public Provident Fund investments with accurate calculations.',
  keywords: ['PPF calculator', 'public provident fund calculator', 'PPF returns', 'tax benefits', 'Section 80C', 'investment planning'],
};

export default function PPFCalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            PPF Calculator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Calculate Public Provident Fund returns, maturity amount, and tax benefits. 
            Plan your long-term investments with guaranteed returns and tax deductions.
          </p>
        </div>
        
        <PPFCalculator />
        
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Understanding PPF (Public Provident Fund)
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                What is PPF?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                PPF is a long-term investment scheme backed by the Government of India, 
                offering guaranteed returns and tax benefits under Section 80C.
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>• 15-year lock-in period with extension options</li>
                <li>• Current interest rate: 7.1% per annum (compounded yearly)</li>
                <li>• Minimum investment: ₹500 per year</li>
                <li>• Maximum investment: ₹1.5 lakh per year</li>
                <li>• Tax-free returns and Section 80C benefits</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Key Benefits
              </h3>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>• <strong>Tax Benefits:</strong> Deduction up to ₹1.5 lakh under Section 80C</li>
                <li>• <strong>Guaranteed Returns:</strong> Government-backed scheme with fixed returns</li>
                <li>• <strong>Compound Interest:</strong> Interest earned is reinvested for higher returns</li>
                <li>• <strong>Flexibility:</strong> Choose investment frequency (monthly, quarterly, yearly)</li>
                <li>• <strong>Liquidity:</strong> Partial withdrawals after 6 years</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
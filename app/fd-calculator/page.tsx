import FDCalculator from '@/components/FDCalculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FD Calculator - Calculate Fixed Deposit Returns | FixMoney.in',
  description: 'Calculate Fixed Deposit returns, maturity amount, and interest earnings with our FD calculator. Plan your investments with accurate calculations for Indian banks.',
  keywords: ['FD calculator', 'fixed deposit calculator', 'FD returns', 'maturity amount', 'interest calculator', 'investment planning'],
};

export default function FDCalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            FD Calculator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Calculate Fixed Deposit returns, maturity amount, and interest earnings. 
            Plan your investments with accurate calculations for Indian banks.
          </p>
        </div>
        
        <FDCalculator />
        
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Understanding Fixed Deposits
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                What is a Fixed Deposit?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                A Fixed Deposit (FD) is a financial instrument where you deposit a lump sum amount 
                with a bank or financial institution for a fixed period at a predetermined interest rate.
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>• Guaranteed returns with fixed interest rates</li>
                <li>• Higher interest rates than savings accounts</li>
                <li>• Flexible tenures from 7 days to 10 years</li>
                <li>• Tax benefits under Section 80C (5-year tax-saving FDs)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Benefits of Fixed Deposits
              </h3>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>• <strong>Safety:</strong> Backed by RBI and DICGC insurance</li>
                <li>• <strong>Predictable Returns:</strong> Fixed interest rates throughout tenure</li>
                <li>• <strong>Flexibility:</strong> Choose from various tenures and interest payout options</li>
                <li>• <strong>Liquidity:</strong> Premature withdrawal available (with penalties)</li>
                <li>• <strong>Tax Benefits:</strong> 5-year tax-saving FDs eligible for deduction</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
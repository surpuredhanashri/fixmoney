import TaxCalculator from '@/components/TaxCalculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Income Tax Calculator - Calculate Tax for FY 2024-25 | FixMoney.in',
  description: 'Calculate income tax for FY 2024-25 with our comprehensive tax calculator. Support for new tax regime, old tax regime, deductions, and tax planning.',
  keywords: ['income tax calculator', 'tax calculation', 'FY 2024-25', 'new tax regime', 'old tax regime', 'deductions', 'tax planning'],
};

export default function TaxCalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Income Tax Calculator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Calculate income tax for FY 2024-25 with our comprehensive tax calculator. 
            Compare new vs old tax regime and optimize your tax planning.
          </p>
        </div>
        
        <TaxCalculator />
        
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Understanding Income Tax in India
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                New Tax Regime (Default)
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The new tax regime offers lower tax rates but removes most deductions 
                and exemptions. It's the default option from FY 2023-24.
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>• Lower tax rates across all income slabs</li>
                <li>• No deductions under Section 80C, 80D, etc.</li>
                <li>• No standard deduction</li>
                <li>• No HRA exemption</li>
                <li>• No LTA exemption</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Old Tax Regime (Optional)
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The old tax regime allows various deductions and exemptions but has 
                higher tax rates. You can opt for this regime during filing.
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>• Higher tax rates</li>
                <li>• Section 80C deductions (EPF, ELSS, etc.)</li>
                <li>• Section 80D (Health insurance)</li>
                <li>• Standard deduction of ₹50,000</li>
                <li>• HRA and LTA exemptions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
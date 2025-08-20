import GSTCalculator from '@/components/GSTCalculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GST Calculator - Calculate GST on Goods & Services | FixMoney.in',
  description: 'Calculate GST amount, total price, and tax breakdown with our GST calculator. Support for all GST rates (5%, 12%, 18%, 28%) and reverse charge calculations.',
  keywords: ['GST calculator', 'goods and services tax calculator', 'GST rates', 'tax calculation', 'reverse charge', 'CGST', 'SGST', 'IGST'],
};

export default function GSTCalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            GST Calculator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Calculate GST amount, total price, and tax breakdown. Support for all GST rates 
            and reverse charge calculations for Indian businesses and consumers.
          </p>
        </div>
        
        <GSTCalculator />
        
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Understanding GST (Goods and Services Tax)
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                What is GST?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                GST is a comprehensive indirect tax levied on the supply of goods and services 
                in India, replacing multiple taxes like VAT, excise duty, and service tax.
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>• Single tax system across India</li>
                <li>• Input tax credit available</li>
                <li>• Different rates for different goods/services</li>
                <li>• Applicable on interstate and intrastate supplies</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                GST Rates in India
              </h3>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>• <strong>0%:</strong> Essential items, unprocessed food</li>
                <li>• <strong>5%:</strong> Basic necessities, transport</li>
                <li>• <strong>12%:</strong> Processed food, computers</li>
                <li>• <strong>18%:</strong> Most goods and services</li>
                <li>• <strong>28%:</strong> Luxury items, automobiles</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
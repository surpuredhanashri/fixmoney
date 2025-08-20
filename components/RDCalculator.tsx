'use client';

import { useState } from 'react';
import { Calculator, TrendingUp, Calendar, DollarSign, Info } from 'lucide-react';

interface RDCalculation {
  month: number;
  installment: number;
  interest: number;
  balance: number;
  totalInterest: number;
}

export default function RDCalculator() {
  const [monthlyDeposit, setMonthlyDeposit] = useState<number>(5000);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [tenure, setTenure] = useState<number>(12);
  const [tenureType, setTenureType] = useState<'months' | 'years'>('months');
  const [calculations, setCalculations] = useState<RDCalculation[]>([]);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const calculateRD = () => {
    const months = tenureType === 'years' ? tenure * 12 : tenure;
    const monthlyRate = interestRate / 12 / 100;
    
    const results: RDCalculation[] = [];
    let totalInterest = 0;
    
    for (let month = 1; month <= months; month++) {
      const installment = monthlyDeposit;
      const balance = monthlyDeposit * month;
      const interest = balance * monthlyRate;
      totalInterest += interest;
      
      results.push({
        month,
        installment,
        interest,
        balance: balance + totalInterest,
        totalInterest
      });
    }
    
    setCalculations(results);
  };

  const getTotalDeposit = () => {
    const months = tenureType === 'years' ? tenure * 12 : tenure;
    return monthlyDeposit * months;
  };

  const getMaturityAmount = () => {
    if (calculations.length === 0) return 0;
    return calculations[calculations.length - 1].balance;
  };

  const getTotalInterest = () => {
    if (calculations.length === 0) return 0;
    return calculations[calculations.length - 1].totalInterest;
  };

  const getEffectiveRate = () => {
    const totalDeposit = getTotalDeposit();
    const totalInterest = getTotalInterest();
    if (totalDeposit === 0) return 0;
    return (totalInterest / totalDeposit) * 100;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-success-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calculator className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            RD Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Calculate your Recurring Deposit returns and plan your savings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Calculator className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" />
              Calculate RD Returns
            </h2>

            <div className="space-y-4">
              {/* Monthly Deposit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Monthly Deposit Amount (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">₹</span>
                  <input
                    type="number"
                    value={monthlyDeposit}
                    onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                    placeholder="5000"
                    min="100"
                    step="100"
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Minimum ₹100 per month
                </p>
              </div>

              {/* Interest Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Interest Rate (% per annum)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full pr-8 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                    placeholder="6.5"
                    min="1"
                    max="15"
                    step="0.1"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">%</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Current bank rates: 5.5% - 7.5%
                </p>
              </div>

              {/* Tenure */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Tenure
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                    placeholder="12"
                    min="6"
                    max={tenureType === 'years' ? '30' : '360'}
                  />
                  <select
                    value={tenureType}
                    onChange={(e) => setTenureType(e.target.value as 'months' | 'years')}
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                  >
                    <option value="months">Months</option>
                    <option value="years">Years</option>
                  </select>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Minimum 6 months, Maximum {tenureType === 'years' ? '30 years' : '360 months'}
                </p>
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculateRD}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Calculate RD Returns
              </button>
            </div>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p className="font-medium mb-1">How RD Calculator Works:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Interest is calculated on the cumulative balance</li>
                    <li>• Compounding happens monthly</li>
                    <li>• Early withdrawal may have penalties</li>
                    <li>• TDS applies if interest exceeds ₹40,000</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-success-600 dark:text-success-400" />
              RD Calculation Results
            </h2>

            {calculations.length > 0 ? (
              <div className="space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-700 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                      ₹{getTotalDeposit().toLocaleString('en-IN')}
                    </div>
                    <div className="text-sm text-primary-700 dark:text-primary-300">Total Deposit</div>
                  </div>
                  
                  <div className="bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-700 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-success-600 dark:text-success-400 mb-1">
                      ₹{getTotalInterest().toLocaleString('en-IN')}
                    </div>
                    <div className="text-sm text-success-700 dark:text-success-300">Total Interest</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-success-50 to-primary-50 dark:from-success-900/20 dark:to-primary-900/20 border border-success-200 dark:border-success-700 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    ₹{getMaturityAmount().toLocaleString('en-IN')}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Maturity Amount</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    Effective Rate: {getEffectiveRate().toFixed(2)}%
                  </div>
                </div>

                {/* Breakdown Toggle */}
                <div className="text-center">
                  <button
                    onClick={() => setShowBreakdown(!showBreakdown)}
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium"
                  >
                    {showBreakdown ? 'Hide' : 'Show'} Monthly Breakdown
                  </button>
                </div>

                {/* Monthly Breakdown */}
                {showBreakdown && (
                  <div className="max-h-96 overflow-y-auto">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-3">Monthly Breakdown</h3>
                      <div className="space-y-2 text-sm">
                        {calculations.map((calc) => (
                          <div key={calc.month} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600 last:border-b-0">
                            <span className="text-gray-600 dark:text-gray-400">Month {calc.month}</span>
                            <div className="text-right">
                              <div className="text-gray-900 dark:text-white font-medium">
                                ₹{calc.balance.toLocaleString('en-IN')}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-500">
                                Interest: ₹{calc.interest.toFixed(0)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calculator className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  Enter your RD details and click calculate to see results
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Benefits of Recurring Deposits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Regular Savings</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Build wealth through disciplined monthly investments
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-success-600 dark:text-success-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Guaranteed Returns</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Fixed interest rates with no market risk
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-6 h-6 text-warning-600 dark:text-warning-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Tax Benefits</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Interest earned is taxable but principal is safe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
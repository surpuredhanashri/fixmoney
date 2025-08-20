'use client';

import { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Info, Calendar, Shield } from 'lucide-react';

interface PPFCalculation {
  year: number;
  contribution: number;
  interest: number;
  balance: number;
  totalInterest: number;
}

export default function PPFCalculator() {
  const [monthlyContribution, setMonthlyContribution] = useState<number>(5000);
  const [interestRate, setInterestRate] = useState<number>(7.1);
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(15);
  const [calculations, setCalculations] = useState<PPFCalculation[]>([]);
  const [showYearlyBreakdown, setShowYearlyBreakdown] = useState(false);

  const calculatePPF = () => {
    const results: PPFCalculation[] = [];
    let balance = 0;
    let totalInterest = 0;
    
    for (let year = 1; year <= investmentPeriod; year++) {
      const contribution = monthlyContribution * 12;
      balance += contribution;
      
      // PPF interest is calculated on the balance at the end of previous year
      const interest = balance * (interestRate / 100);
      totalInterest += interest;
      balance += interest;
      
      results.push({
        year,
        contribution,
        interest,
        balance,
        totalInterest
      });
    }
    
    setCalculations(results);
  };

  const getTotalContribution = () => {
    return monthlyContribution * 12 * investmentPeriod;
  };

  const getTotalInterest = () => {
    if (calculations.length === 0) return 0;
    return calculations[calculations.length - 1].totalInterest;
  };

  const getMaturityAmount = () => {
    if (calculations.length === 0) return 0;
    return calculations[calculations.length - 1].balance;
  };

  const getEffectiveRate = () => {
    const totalContribution = getTotalContribution();
    if (totalContribution === 0) return 0;
    return (getTotalInterest() / totalContribution) * 100;
  };

  const getTaxSavings = () => {
    // PPF contributions are eligible for deduction under Section 80C
    const annualContribution = monthlyContribution * 12;
    const maxDeduction = Math.min(annualContribution, 150000);
    const taxRate = 0.3; // Assuming 30% tax bracket
    return maxDeduction * taxRate;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-success-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            PPF Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Calculate your Public Provident Fund returns and tax benefits
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Calculator className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" />
              Calculate PPF Returns
            </h2>

            <div className="space-y-4">
              {/* Monthly Contribution */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Monthly Contribution (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">₹</span>
                  <input
                    type="number"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                    placeholder="5000"
                    min="500"
                    max="12500"
                    step="100"
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Min: ₹500, Max: ₹12,500 per month
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
                    className="w-full pr-8 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                    placeholder="7.1"
                    min="5"
                    max="10"
                    step="0.1"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">%</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Current rate: 7.1% (quarterly reviewed by government)
                </p>
              </div>

              {/* Investment Period */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Investment Period (Years)
                </label>
                <input
                  type="number"
                  value={investmentPeriod}
                  onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                  placeholder="15"
                  min="15"
                  max="50"
                  step="1"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Minimum 15 years, can extend in blocks of 5 years
                </p>
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculatePPF}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Calculate PPF Returns
              </button>
            </div>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p className="font-medium mb-1">PPF Key Features:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Tax-free returns under Section 80C</li>
                    <li>• Government-backed, guaranteed returns</li>
                    <li>• Lock-in period: 15 years minimum</li>
                    <li>• Partial withdrawal allowed from 7th year</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-success-600 dark:text-success-400" />
              PPF Calculation Results
            </h2>

            {calculations.length > 0 ? (
              <div className="space-y-6">
                {/* Maturity Amount Display */}
                <div className="bg-gradient-to-r from-success-50 to-primary-50 dark:from-success-900/20 dark:to-primary-900/20 border border-success-200 dark:border-success-700 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    ₹{getMaturityAmount().toLocaleString('en-IN')}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Maturity Amount</div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-700 rounded-lg p-4 text-center">
                    <div className="text-lg font-bold text-primary-600 dark:text-primary-400 mb-1">
                      ₹{getTotalContribution().toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-primary-700 dark:text-primary-300">Total Contribution</div>
                  </div>
                  
                  <div className="bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-700 rounded-lg p-4 text-center">
                    <div className="text-lg font-bold text-success-600 dark:text-success-400 mb-1">
                      ₹{getTotalInterest().toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-success-700 dark:text-success-300">Total Interest</div>
                  </div>
                </div>

                {/* Additional Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-700 rounded-lg p-4 text-center">
                    <div className="text-lg font-bold text-warning-600 dark:text-warning-400 mb-1">
                      {getEffectiveRate().toFixed(2)}%
                    </div>
                    <div className="text-xs text-warning-700 dark:text-warning-300">Effective Return</div>
                  </div>
                  
                  <div className="bg-info-50 dark:bg-info-900/20 border border-info-200 dark:border-info-700 rounded-lg p-4 text-center">
                    <div className="text-lg font-bold text-info-600 dark:text-info-400 mb-1">
                      ₹{getTaxSavings().toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-info-700 dark:text-info-300">Annual Tax Savings</div>
                  </div>
                </div>

                {/* Breakdown Toggle */}
                <div className="text-center">
                  <button
                    onClick={() => setShowYearlyBreakdown(!showYearlyBreakdown)}
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium"
                  >
                    {showYearlyBreakdown ? 'Hide' : 'Show'} Yearly Breakdown
                  </button>
                </div>

                {/* Yearly Breakdown */}
                {showYearlyBreakdown && (
                  <div className="max-h-96 overflow-y-auto">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-3">Yearly Breakdown</h3>
                      <div className="space-y-2 text-sm">
                        {calculations.map((calc) => (
                          <div key={calc.year} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600 last:border-b-0">
                            <span className="text-gray-600 dark:text-gray-400">Year {calc.year}</span>
                            <div className="text-right">
                              <div className="text-gray-900 dark:text-white font-medium">
                                ₹{calc.balance.toLocaleString('en-IN')}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-500">
                                Contribution: ₹{calc.contribution.toLocaleString('en-IN')} | Interest: ₹{calc.interest.toFixed(0)}
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
                  Enter your PPF details and click calculate to see results
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Benefits of PPF Investment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Government Backed</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Safe investment with sovereign guarantee
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-6 h-6 text-success-600 dark:text-success-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Tax Benefits</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                EEE benefits - Exempt at all three stages
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-warning-600 dark:text-warning-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Long-term Growth</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Compounding effect over 15+ years
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
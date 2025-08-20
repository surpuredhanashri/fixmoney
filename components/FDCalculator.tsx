'use client';

import { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Info, Calendar } from 'lucide-react';

interface FDCalculation {
  year: number;
  principal: number;
  interest: number;
  maturityValue: number;
  cumulativeInterest: number;
}

export default function FDCalculator() {
  const [principal, setPrincipal] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(7.5);
  const [tenure, setTenure] = useState<number>(5);
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');
  const [compoundingFrequency, setCompoundingFrequency] = useState<'monthly' | 'quarterly' | 'annually'>('quarterly');
  const [calculations, setCalculations] = useState<FDCalculation[]>([]);
  const [showYearlyBreakdown, setShowYearlyBreakdown] = useState(false);

  const calculateFD = () => {
    const years = tenureType === 'years' ? tenure : tenure / 12;
    let effectiveRate = interestRate;
    let compoundingTimes = 1;
    
    // Adjust rate based on compounding frequency
    switch (compoundingFrequency) {
      case 'monthly':
        compoundingTimes = 12;
        effectiveRate = interestRate / 12;
        break;
      case 'quarterly':
        compoundingTimes = 4;
        effectiveRate = interestRate / 4;
        break;
      case 'annually':
        compoundingTimes = 1;
        effectiveRate = interestRate;
        break;
    }
    
    const results: FDCalculation[] = [];
    let cumulativeInterest = 0;
    
    for (let year = 1; year <= years; year++) {
      const yearInterest = principal * Math.pow(1 + effectiveRate / 100, compoundingTimes * year) - principal;
      cumulativeInterest = yearInterest;
      const maturityValue = principal + cumulativeInterest;
      
      results.push({
        year,
        principal,
        interest: yearInterest,
        maturityValue,
        cumulativeInterest
      });
    }
    
    setCalculations(results);
  };

  const getTotalInterest = () => {
    if (calculations.length === 0) return 0;
    return calculations[calculations.length - 1].cumulativeInterest;
  };

  const getMaturityAmount = () => {
    if (calculations.length === 0) return 0;
    return calculations[calculations.length - 1].maturityValue;
  };

  const getEffectiveRate = () => {
    const totalInterest = getTotalInterest();
    if (principal === 0) return 0;
    return (totalInterest / principal) * 100;
  };

  const getCompoundingInfo = () => {
    switch (compoundingFrequency) {
      case 'monthly':
        return '12 times per year';
      case 'quarterly':
        return '4 times per year';
      case 'annually':
        return '1 time per year';
    }
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
            FD Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Calculate your Fixed Deposit returns and plan your investments
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Calculator className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" />
              Calculate FD Returns
            </h2>

            <div className="space-y-4">
              {/* Principal Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Principal Amount (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">₹</span>
                  <input
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                    placeholder="100000"
                    min="1000"
                    step="1000"
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Minimum ₹1,000 for most banks
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
                    placeholder="7.5"
                    min="1"
                    max="15"
                    step="0.1"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">%</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Current rates: 6.5% - 8.5% (varies by bank and tenure)
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
                    placeholder="5"
                    min="7"
                    max={tenureType === 'years' ? '10' : '120'}
                  />
                  <select
                    value={tenureType}
                    onChange={(e) => setTenureType(e.target.value as 'years' | 'months')}
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                  >
                    <option value="years">Years</option>
                    <option value="months">Months</option>
                  </select>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Minimum 7 days, Maximum {tenureType === 'years' ? '10 years' : '120 months'}
                </p>
              </div>

              {/* Compounding Frequency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Compounding Frequency
                </label>
                <select
                  value={compoundingFrequency}
                  onChange={(e) => setCompoundingFrequency(e.target.value as 'monthly' | 'quarterly' | 'annually')}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="annually">Annually</option>
                </select>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {getCompoundingInfo()} - Higher frequency = better returns
                </p>
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculateFD}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Calculate FD Returns
              </button>
            </div>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p className="font-medium mb-1">FD Key Features:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Guaranteed returns with no market risk</li>
                    <li>• Interest rates vary by bank and tenure</li>
                    <li>• TDS applies if interest exceeds ₹40,000</li>
                    <li>• Early withdrawal may have penalties</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-success-600 dark:text-success-400" />
              FD Calculation Results
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
                      ₹{principal.toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-primary-700 dark:text-primary-300">Principal Amount</div>
                  </div>
                  
                  <div className="bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-700 rounded-lg p-4 text-center">
                    <div className="text-lg font-bold text-success-600 dark:text-success-400 mb-1">
                      ₹{getTotalInterest().toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-success-700 dark:text-success-300">Total Interest</div>
                  </div>
                </div>

                <div className="bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-700 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-warning-600 dark:text-warning-400 mb-1">
                    {getEffectiveRate().toFixed(2)}%
                  </div>
                  <div className="text-sm text-warning-700 dark:text-warning-300">Effective Return Rate</div>
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
                                ₹{calc.maturityValue.toLocaleString('en-IN')}
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
                  Enter your FD details and click calculate to see results
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Benefits of Fixed Deposits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Guaranteed Returns</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Fixed interest rates with no market risk
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-success-600 dark:text-success-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Flexible Tenure</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Choose from 7 days to 10 years
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-warning-600 dark:text-warning-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Higher Rates</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Better returns than regular savings accounts
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
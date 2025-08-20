'use client';

import { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Info, BarChart3, PieChart } from 'lucide-react';

interface CompoundCalculation {
  year: number;
  principal: number;
  interest: number;
  totalAmount: number;
  cumulativeInterest: number;
}

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(8);
  const [timePeriod, setTimePeriod] = useState<number>(10);
  const [compoundingFrequency, setCompoundingFrequency] = useState<'annually' | 'semi-annually' | 'quarterly' | 'monthly' | 'daily'>('annually');
  const [calculations, setCalculations] = useState<CompoundCalculation[]>([]);

  const calculateCompoundInterest = () => {
    let compoundingTimes = 1;
    let effectiveRate = interestRate;
    
    switch (compoundingFrequency) {
      case 'annually':
        compoundingTimes = 1;
        effectiveRate = interestRate;
        break;
      case 'semi-annually':
        compoundingTimes = 2;
        effectiveRate = interestRate / 2;
        break;
      case 'quarterly':
        compoundingTimes = 4;
        effectiveRate = interestRate / 4;
        break;
      case 'monthly':
        compoundingTimes = 12;
        effectiveRate = interestRate / 12;
        break;
      case 'daily':
        compoundingTimes = 365;
        effectiveRate = interestRate / 365;
        break;
    }

    const results: CompoundCalculation[] = [];
    let cumulativeInterest = 0;
    
    for (let year = 1; year <= timePeriod; year++) {
      const totalCompoundingPeriods = compoundingTimes * year;
      const amount = principal * Math.pow(1 + effectiveRate / 100, totalCompoundingPeriods);
      const yearInterest = amount - principal - cumulativeInterest;
      cumulativeInterest += yearInterest;
      
      results.push({
        year,
        principal,
        interest: yearInterest,
        totalAmount: amount,
        cumulativeInterest
      });
    }
    
    setCalculations(results);
  };

  const getTotalInterest = () => {
    if (calculations.length === 0) return 0;
    return calculations[calculations.length - 1].cumulativeInterest;
  };

  const getFinalAmount = () => {
    if (calculations.length === 0) return 0;
    return calculations[calculations.length - 1].totalAmount;
  };

  const getEffectiveAnnualRate = () => {
    const finalAmount = getFinalAmount();
    if (principal === 0 || timePeriod === 0) return 0;
    return (Math.pow(finalAmount / principal, 1 / timePeriod) - 1) * 100;
  };

  const getCompoundingInfo = () => {
    switch (compoundingFrequency) {
      case 'annually': return '1 time per year';
      case 'semi-annually': return '2 times per year';
      case 'quarterly': return '4 times per year';
      case 'monthly': return '12 times per year';
      case 'daily': return '365 times per year';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-success-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Compound Interest Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Calculate compound interest growth with interactive charts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Calculator className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" />
              Calculate Compound Interest
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
                    placeholder="8"
                    min="0.1"
                    max="30"
                    step="0.1"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">%</span>
                </div>
              </div>

              {/* Time Period */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Time Period (Years)
                </label>
                <input
                  type="number"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                  placeholder="10"
                  min="1"
                  max="50"
                  step="1"
                />
              </div>

              {/* Compounding Frequency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Compounding Frequency
                </label>
                <select
                  value={compoundingFrequency}
                  onChange={(e) => setCompoundingFrequency(e.target.value as any)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                >
                  <option value="annually">Annually</option>
                  <option value="semi-annually">Semi-annually</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="monthly">Monthly</option>
                  <option value="daily">Daily</option>
                </select>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {getCompoundingInfo()} - Higher frequency = better returns
                </p>
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculateCompoundInterest}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Calculate Compound Interest
              </button>
            </div>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p className="font-medium mb-1">Compound Interest Formula:</p>
                  <p className="text-xs">A = P × (1 + r/n)^(n×t)</p>
                  <p className="text-xs mt-1">Where: P = Principal, r = Rate, n = Compounding frequency, t = Time</p>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-success-600 dark:text-success-400" />
              Compound Interest Results
            </h2>

            {calculations.length > 0 ? (
              <div className="space-y-6">
                {/* Final Amount Display */}
                <div className="bg-gradient-to-r from-success-50 to-primary-50 dark:from-success-900/20 dark:to-primary-900/20 border border-success-200 dark:border-success-700 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    ₹{getFinalAmount().toLocaleString('en-IN')}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Final Amount</div>
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

                {/* Additional Metrics */}
                <div className="bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-700 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-warning-600 dark:text-warning-400 mb-1">
                    {getEffectiveAnnualRate().toFixed(2)}%
                  </div>
                  <div className="text-sm text-warning-700 dark:text-warning-300">Effective Annual Rate</div>
                </div>

                {/* Yearly Breakdown */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 max-h-64 overflow-y-auto">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">Yearly Breakdown</h3>
                  <div className="space-y-2 text-sm">
                    {calculations.map((calc) => (
                      <div key={calc.year} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600 last:border-b-0">
                        <span className="text-gray-600 dark:text-gray-400">Year {calc.year}</span>
                        <div className="text-right">
                          <div className="text-gray-900 dark:text-white font-medium">
                            ₹{calc.totalAmount.toLocaleString('en-IN')}
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
            ) : (
              <div className="text-center py-12">
                <Calculator className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  Enter your details and click calculate to see results
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Visual Charts */}
        {calculations.length > 0 && (
          <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              Visual Analysis
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pie Chart */}
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Principal vs Interest</h3>
                <div className="relative w-48 h-48 mx-auto">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    {/* Principal Circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="#3B82F6"
                      stroke="#1E40AF"
                      strokeWidth="2"
                    />
                    {/* Interest Arc */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="8"
                      strokeDasharray={`${(getTotalInterest() / getFinalAmount()) * 251.2} 251.2`}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {((getTotalInterest() / getFinalAmount()) * 100).toFixed(1)}%
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Interest</div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center space-x-4 mt-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-gray-600 dark:text-gray-400">Principal</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-gray-600 dark:text-gray-400">Interest</span>
                  </div>
                </div>
              </div>

              {/* Growth Chart */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Growth Over Time</h3>
                <div className="space-y-2">
                  {calculations.slice(0, 8).map((calc) => (
                    <div key={calc.year} className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400 w-8">Y{calc.year}</span>
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-green-500 h-4 rounded-full transition-all duration-300"
                          style={{ width: `${(calc.totalAmount / getFinalAmount()) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white w-20">
                        ₹{calc.totalAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Benefits Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Power of Compound Interest
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Exponential Growth</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Interest earns interest, creating exponential wealth growth
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <PieChart className="w-6 h-6 text-success-600 dark:text-success-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Frequency Matters</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                More frequent compounding leads to higher returns
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-6 h-6 text-warning-600 dark:text-warning-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Time is Key</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Longer time periods maximize compound growth
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
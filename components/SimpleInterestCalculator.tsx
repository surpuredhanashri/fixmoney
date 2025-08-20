'use client';

import { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Info, BarChart3 } from 'lucide-react';

interface InterestCalculation {
  year: number;
  principal: number;
  interest: number;
  totalAmount: number;
}

export default function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(8);
  const [timePeriod, setTimePeriod] = useState<number>(5);
  const [timeUnit, setTimeUnit] = useState<'years' | 'months' | 'days'>('years');
  const [calculations, setCalculations] = useState<InterestCalculation[]>([]);

  const calculateSimpleInterest = () => {
    let timeInYears = timePeriod;
    if (timeUnit === 'months') timeInYears = timePeriod / 12;
    if (timeUnit === 'days') timeInYears = timePeriod / 365;

    const results: InterestCalculation[] = [];
    
    for (let year = 1; year <= Math.ceil(timeInYears); year++) {
      const actualTime = Math.min(year, timeInYears);
      const interest = (principal * interestRate * actualTime) / 100;
      const totalAmount = principal + interest;
      
      results.push({
        year,
        principal,
        interest,
        totalAmount
      });
    }
    
    setCalculations(results);
  };

  const getTotalInterest = () => {
    if (calculations.length === 0) return 0;
    const timeInYears = timeUnit === 'years' ? timePeriod : 
                        timeUnit === 'months' ? timePeriod / 12 : 
                        timePeriod / 365;
    return (principal * interestRate * timeInYears) / 100;
  };

  const getTotalAmount = () => {
    return principal + getTotalInterest();
  };

  const getEffectiveRate = () => {
    const timeInYears = timeUnit === 'years' ? timePeriod : 
                        timeUnit === 'months' ? timePeriod / 12 : 
                        timePeriod / 365;
    if (timeInYears === 0) return 0;
    return (getTotalInterest() / principal) * (1 / timeInYears) * 100;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
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
            Simple Interest Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Calculate simple interest with interactive sliders and visual breakdown
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form with Sliders */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Calculator className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" />
              Calculate Simple Interest
            </h2>

            <div className="space-y-6">
              {/* Principal Amount Slider */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Principal Amount: ₹{principal.toLocaleString('en-IN')}
                </label>
                <input
                  type="range"
                  min="1000"
                  max="1000000"
                  step="1000"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>₹1,000</span>
                  <span>₹10,00,000</span>
                </div>
              </div>

              {/* Interest Rate Slider */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Interest Rate: {interestRate}% per annum
                </label>
                <input
                  type="range"
                  min="1"
                  max="25"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>1%</span>
                  <span>25%</span>
                </div>
              </div>

              {/* Time Period Slider */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Time Period: {timePeriod} {timeUnit}
                </label>
                <input
                  type="range"
                  min="1"
                  max={timeUnit === 'years' ? '30' : timeUnit === 'months' ? '360' : '3650'}
                  step="1"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>1 {timeUnit}</span>
                  <span>{timeUnit === 'years' ? '30' : timeUnit === 'months' ? '360' : '3650'} {timeUnit}</span>
                </div>
              </div>

              {/* Time Unit Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Time Unit
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['years', 'months', 'days'] as const).map((unit) => (
                    <button
                      key={unit}
                      onClick={() => setTimeUnit(unit)}
                      className={`py-2 px-4 rounded-lg border transition-colors ${
                        timeUnit === unit
                          ? 'bg-primary-600 text-white border-primary-600'
                          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      {unit.charAt(0).toUpperCase() + unit.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculateSimpleInterest}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Calculate Simple Interest
              </button>
            </div>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p className="font-medium mb-1">Simple Interest Formula:</p>
                  <p className="text-xs">I = P × R × T</p>
                  <p className="text-xs mt-1">Where: P = Principal, R = Rate, T = Time</p>
                  <p className="text-xs mt-1">Simple interest doesn't compound over time</p>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-success-600 dark:text-success-400" />
              Interest Calculation Results
            </h2>

            {calculations.length > 0 ? (
              <div className="space-y-6">
                {/* Total Amount Display */}
                <div className="bg-gradient-to-r from-success-50 to-primary-50 dark:from-success-900/20 dark:to-primary-900/20 border border-success-200 dark:border-success-700 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    ₹{getTotalAmount().toLocaleString('en-IN')}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Amount</div>
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
                    {getEffectiveRate().toFixed(2)}%
                  </div>
                  <div className="text-sm text-warning-700 dark:text-warning-300">Effective Annual Rate</div>
                </div>

                {/* Yearly Breakdown */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
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
                  Use the sliders above and click calculate to see results
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Visual Representation */}
        {calculations.length > 0 && (
          <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              Visual Breakdown
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Pie Chart Representation */}
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
                      strokeDasharray={`${(getTotalInterest() / getTotalAmount()) * 251.2} 251.2`}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {((getTotalInterest() / getTotalAmount()) * 100).toFixed(1)}%
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

              {/* Bar Chart Representation */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Growth Over Time</h3>
                <div className="space-y-2">
                  {calculations.slice(0, 5).map((calc) => (
                    <div key={calc.year} className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400 w-8">Y{calc.year}</span>
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-green-500 h-4 rounded-full transition-all duration-300"
                          style={{ width: `${(calc.totalAmount / getTotalAmount()) * 100}%` }}
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
            When to Use Simple Interest
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Short-term Loans</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Personal loans, car loans, and short-term borrowing
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-6 h-6 text-success-600 dark:text-success-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Easy Calculation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Simple formula for quick interest calculations
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-warning-600 dark:text-warning-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Predictable Returns</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Fixed interest amount that doesn't compound
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
} 
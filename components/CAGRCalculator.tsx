'use client';

import { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Info, BarChart3, PieChart, Target } from 'lucide-react';

interface CAGRCalculation {
  year: number;
  value: number;
  growth: number;
  percentageGrowth: number;
}

export default function CAGRCalculator() {
  const [initialValue, setInitialValue] = useState<number>(100000);
  const [finalValue, setFinalValue] = useState<number>(200000);
  const [timePeriod, setTimePeriod] = useState<number>(5);
  const [calculations, setCalculations] = useState<CAGRCalculation[]>([]);
  const [showYearlyBreakdown, setShowYearlyBreakdown] = useState(false);
  const [showGrowthAnalysis, setShowGrowthAnalysis] = useState(false);

  const calculateCAGR = () => {
    if (initialValue <= 0 || finalValue <= 0 || timePeriod <= 0) return;
    
    const results: CAGRCalculation[] = [];
    const cagr = Math.pow(finalValue / initialValue, 1 / timePeriod) - 1;
    
    for (let year = 0; year <= timePeriod; year++) {
      const value = initialValue * Math.pow(1 + cagr, year);
      const growth = year === 0 ? 0 : value - results[year - 1]?.value || initialValue;
      const percentageGrowth = year === 0 ? 0 : (growth / (results[year - 1]?.value || initialValue)) * 100;
      
      results.push({
        year,
        value,
        growth,
        percentageGrowth
      });
    }
    
    setCalculations(results);
  };

  const getCAGR = () => {
    if (initialValue <= 0 || finalValue <= 0 || timePeriod <= 0) return 0;
    return (Math.pow(finalValue / initialValue, 1 / timePeriod) - 1) * 100;
  };

  const getAbsoluteReturn = () => {
    if (initialValue <= 0) return 0;
    return ((finalValue - initialValue) / initialValue) * 100;
  };

  const getTotalGrowth = () => {
    return finalValue - initialValue;
  };

  const getAverageAnnualGrowth = () => {
    if (timePeriod <= 0) return 0;
    return getTotalGrowth() / timePeriod;
  };

  const getDoublingTime = () => {
    const cagr = getCAGR() / 100;
    if (cagr <= 0) return 0;
    return Math.log(2) / Math.log(1 + cagr);
  };

  const getTriplingTime = () => {
    const cagr = getCAGR() / 100;
    if (cagr <= 0) return 0;
    return Math.log(3) / Math.log(1 + cagr);
  };

  const getProjectedValue = (years: number) => {
    const cagr = getCAGR() / 100;
    return initialValue * Math.pow(1 + cagr, years);
  };

  const getRiskAdjustedCAGR = () => {
    const cagr = getCAGR();
    // Simple risk adjustment based on time period
    if (timePeriod < 3) return cagr * 0.8; // Short term - more volatile
    if (timePeriod > 10) return cagr * 1.1; // Long term - more stable
    return cagr;
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
            CAGR Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Calculate Compound Annual Growth Rate and investment growth analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Calculator className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" />
              Calculate CAGR
            </h2>

            <div className="space-y-4">
              {/* Initial Value */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Initial Investment Value (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">₹</span>
                  <input
                    type="number"
                    value={initialValue}
                    onChange={(e) => setInitialValue(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                    placeholder="100000"
                    min="0"
                    step="1000"
                  />
                </div>
              </div>

              {/* Final Value */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Final Investment Value (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">₹</span>
                  <input
                    type="number"
                    value={finalValue}
                    onChange={(e) => setFinalValue(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                    placeholder="200000"
                    min="0"
                    step="1000"
                  />
                </div>
              </div>

              {/* Time Period */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Investment Period (Years)
                </label>
                <input
                  type="number"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                  placeholder="5"
                  min="0.1"
                  max="50"
                  step="0.1"
                />
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculateCAGR}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Calculate CAGR
              </button>
            </div>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p className="font-medium mb-1">CAGR Formula:</p>
                  <p className="text-xs">
                    CAGR = (Final Value / Initial Value)^(1/Time Period) - 1
                  </p>
                  <p className="text-xs mt-1">
                    CAGR shows the mean annual growth rate over a specified time period
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-success-600 dark:text-success-400" />
              CAGR Results
            </h2>

            {calculations.length > 0 ? (
              <div className="space-y-6">
                {/* CAGR Display */}
                <div className="bg-gradient-to-r from-success-50 to-primary-50 dark:from-success-900/20 dark:to-primary-900/20 border border-success-200 dark:border-success-700 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {getCAGR().toFixed(2)}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Compound Annual Growth Rate</div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-700 rounded-lg p-4 text-center">
                    <div className="text-lg font-bold text-primary-600 dark:text-primary-400 mb-1">
                      {getAbsoluteReturn().toFixed(2)}%
                    </div>
                    <div className="text-xs text-primary-700 dark:text-primary-300">Absolute Return</div>
                  </div>
                  
                  <div className="bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-700 rounded-lg p-4 text-center">
                    <div className="text-lg font-bold text-success-600 dark:text-success-400 mb-1">
                      ₹{getTotalGrowth().toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-success-700 dark:text-success-300">Total Growth</div>
                  </div>
                </div>

                {/* Additional Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-700 rounded-lg p-4 text-center">
                    <div className="text-lg font-bold text-warning-600 dark:text-warning-400 mb-1">
                      {getDoublingTime().toFixed(1)}y
                    </div>
                    <div className="text-xs text-warning-700 dark:text-warning-300">Doubling Time</div>
                  </div>
                  
                  <div className="bg-info-50 dark:bg-info-900/20 border border-info-200 dark:border-info-700 rounded-lg p-4 text-center">
                    <div className="text-lg font-bold text-info-600 dark:text-info-400 mb-1">
                      ₹{getAverageAnnualGrowth().toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-info-700 dark:text-info-300">Avg Annual Growth</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowYearlyBreakdown(!showYearlyBreakdown)}
                    className="flex-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 py-2 px-4 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
                  >
                    {showYearlyBreakdown ? 'Hide' : 'Show'} Breakdown
                  </button>
                  <button
                    onClick={() => setShowGrowthAnalysis(!showGrowthAnalysis)}
                    className="flex-1 bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-300 py-2 px-4 rounded-lg hover:bg-success-200 dark:hover:bg-success-900/50 transition-colors"
                  >
                    {showGrowthAnalysis ? 'Hide' : 'Show'} Analysis
                  </button>
                </div>

                {/* Yearly Breakdown */}
                {showYearlyBreakdown && (
                  <div className="max-h-64 overflow-y-auto">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-3">Yearly Growth</h3>
                      <div className="space-y-2 text-sm">
                        {calculations.map((calc) => (
                          <div key={calc.year} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600 last:border-b-0">
                            <span className="text-gray-600 dark:text-gray-400">Year {calc.year}</span>
                            <div className="text-right">
                              <div className="text-gray-900 dark:text-white font-medium">
                                ₹{calc.value.toLocaleString('en-IN')}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-500">
                                +{calc.percentageGrowth.toFixed(1)}%
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Growth Analysis */}
                {showGrowthAnalysis && (
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-3">Growth Analysis</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <span className="text-gray-600 dark:text-gray-400">Risk Adjusted CAGR</span>
                        <span className="font-medium text-blue-600 dark:text-blue-400">
                          {getRiskAdjustedCAGR().toFixed(2)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <span className="text-gray-600 dark:text-gray-400">Tripling Time</span>
                        <span className="font-medium text-green-600 dark:text-green-400">
                          {getTriplingTime().toFixed(1)} years
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <span className="text-gray-600 dark:text-gray-400">Projected Value (10y)</span>
                        <span className="font-medium text-yellow-600 dark:text-yellow-400">
                          ₹{getProjectedValue(10).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calculator className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  Enter your investment details and click calculate to see results
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Visual Charts */}
        {calculations.length > 0 && (
          <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              Growth Analysis
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Growth Chart */}
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Investment Growth</h3>
                <div className="relative w-48 h-48 mx-auto">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    {/* Initial Value Circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="#3B82F6"
                      stroke="#1E40AF"
                      strokeWidth="2"
                    />
                    {/* Growth Arc */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="8"
                      strokeDasharray={`${(getTotalGrowth() / finalValue) * 251.2} 251.2`}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {((getTotalGrowth() / finalValue) * 100).toFixed(1)}%
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Growth</div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center space-x-4 mt-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-gray-600 dark:text-gray-400">Initial</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-gray-600 dark:text-gray-400">Growth</span>
                  </div>
                </div>
              </div>

              {/* CAGR Comparison */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">CAGR Comparison</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400 w-20">Your CAGR</span>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                      <div
                        className="bg-green-500 h-4 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((getCAGR() / 20) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white w-16">
                      {getCAGR().toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400 w-20">Risk Adjusted</span>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                      <div
                        className="bg-blue-500 h-4 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((getRiskAdjustedCAGR() / 20) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white w-16">
                      {getRiskAdjustedCAGR().toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400 w-20">Benchmark</span>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                      <div
                        className="bg-yellow-500 h-4 rounded-full transition-all duration-300"
                        style={{ width: '60%' }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white w-16">
                      12.00%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Benefits Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            CAGR Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Growth Measurement</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Standardized way to measure investment performance
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-6 h-6 text-success-600 dark:text-success-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Comparison Tool</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Compare different investments and time periods
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-warning-600 dark:text-warning-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Future Planning</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Project future values and plan investments
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
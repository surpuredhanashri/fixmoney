'use client';

import { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Info, PieChart, Calendar } from 'lucide-react';

interface SIPCalculation {
  year: number;
  investment: number;
  returns: number;
  totalValue: number;
  wealthGained: number;
}

export default function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(5000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(10);
  const [periodType, setPeriodType] = useState<'years' | 'months'>('years');
  const [calculations, setCalculations] = useState<SIPCalculation[]>([]);
  const [showYearlyBreakdown, setShowYearlyBreakdown] = useState(false);

  const calculateSIP = () => {
    const months = periodType === 'years' ? investmentPeriod * 12 : investmentPeriod;
    const monthlyRate = expectedReturn / 12 / 100;
    
    // SIP Formula: FV = P × (((1 + r)^n - 1) / r) × (1 + r)
    // Where: P = Monthly Investment, r = Monthly Rate, n = Total Months
    const futureValue = monthlyInvestment * 
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
      (1 + monthlyRate);
    
    const results: SIPCalculation[] = [];
    let totalInvestment = 0;
    
    for (let year = 1; year <= Math.ceil(months / 12); year++) {
      const yearMonths = Math.min(12, months - (year - 1) * 12);
      const yearInvestment = monthlyInvestment * yearMonths;
      totalInvestment += yearInvestment;
      
      // Calculate returns for this year
      const yearReturns = futureValue * (year / Math.ceil(months / 12)) - totalInvestment;
      
      results.push({
        year,
        investment: yearInvestment,
        returns: Math.max(0, yearReturns),
        totalValue: totalInvestment + yearReturns,
        wealthGained: yearReturns
      });
    }
    
    setCalculations(results);
  };

  const getTotalInvestment = () => {
    const months = periodType === 'years' ? investmentPeriod * 12 : investmentPeriod;
    return monthlyInvestment * months;
  };

  const getTotalReturns = () => {
    if (calculations.length === 0) return 0;
    const months = periodType === 'years' ? investmentPeriod * 12 : investmentPeriod;
    const monthlyRate = expectedReturn / 12 / 100;
    const futureValue = monthlyInvestment * 
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
      (1 + monthlyRate);
    return futureValue - getTotalInvestment();
  };

  const getMaturityValue = () => {
    return getTotalInvestment() + getTotalReturns();
  };

  const getAbsoluteReturn = () => {
    const totalInvestment = getTotalInvestment();
    if (totalInvestment === 0) return 0;
    return (getTotalReturns() / totalInvestment) * 100;
  };

  const getCAGR = () => {
    const months = periodType === 'years' ? investmentPeriod * 12 : investmentPeriod;
    const years = months / 12;
    const totalInvestment = getTotalInvestment();
    const maturityValue = getMaturityValue();
    
    if (totalInvestment === 0 || years === 0) return 0;
    return (Math.pow(maturityValue / totalInvestment, 1 / years) - 1) * 100;
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
            SIP Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Calculate your SIP returns and plan your wealth creation journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Calculator className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" />
              Calculate SIP Returns
            </h2>

            <div className="space-y-4">
              {/* Monthly Investment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Monthly Investment (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">₹</span>
                  <input
                    type="number"
                    value={monthlyInvestment}
                    onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
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

              {/* Expected Return */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Expected Annual Return (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(Number(e.target.value))}
                    className="w-full pr-8 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                    placeholder="12"
                    min="1"
                    max="30"
                    step="0.1"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">%</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Historical equity returns: 10-15% per annum
                </p>
              </div>

              {/* Investment Period */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Investment Period
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    value={investmentPeriod}
                    onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                    placeholder="10"
                    min="1"
                    max={periodType === 'years' ? '50' : '600'}
                  />
                  <select
                    value={periodType}
                    onChange={(e) => setPeriodType(e.target.value as 'years' | 'months')}
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                  >
                    <option value="years">Years</option>
                    <option value="months">Months</option>
                  </select>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Maximum period: {periodType === 'years' ? '50 years' : '600 months'}
                </p>
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculateSIP}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Calculate SIP Returns
              </button>
            </div>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p className="font-medium mb-1">SIP Benefits:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Rupee cost averaging reduces market risk</li>
                    <li>• Compounding effect over long term</li>
                    <li>• Disciplined investment approach</li>
                    <li>• Start with small amounts</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-success-600 dark:text-success-400" />
              SIP Calculation Results
            </h2>

            {calculations.length > 0 ? (
              <div className="space-y-6">
                {/* Maturity Value Display */}
                <div className="bg-gradient-to-r from-success-50 to-primary-50 dark:from-success-900/20 dark:to-primary-900/20 border border-success-200 dark:border-success-700 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    ₹{getMaturityValue().toLocaleString('en-IN')}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Maturity Value</div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-700 rounded-lg p-4 text-center">
                    <div className="text-lg font-bold text-primary-600 dark:text-primary-400 mb-1">
                      ₹{getTotalInvestment().toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-primary-700 dark:text-primary-300">Total Investment</div>
                  </div>
                  
                  <div className="bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-700 rounded-lg p-4 text-center">
                    <div className="text-lg font-bold text-success-600 dark:text-success-400 mb-1">
                      ₹{getTotalReturns().toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-success-700 dark:text-success-300">Total Returns</div>
                  </div>
                </div>

                {/* Additional Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-700 rounded-lg p-4 text-center">
                    <div className="text-lg font-bold text-warning-600 dark:text-warning-400 mb-1">
                      {getAbsoluteReturn().toFixed(2)}%
                    </div>
                    <div className="text-xs text-warning-700 dark:text-warning-300">Absolute Return</div>
                  </div>
                  
                  <div className="bg-info-50 dark:bg-info-900/20 border border-info-200 dark:border-info-700 rounded-lg p-4 text-center">
                    <div className="text-lg font-bold text-info-600 dark:text-info-400 mb-1">
                      {getCAGR().toFixed(2)}%
                    </div>
                    <div className="text-xs text-info-700 dark:text-info-300">CAGR</div>
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
                                ₹{calc.totalValue.toLocaleString('en-IN')}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-500">
                                Investment: ₹{calc.investment.toLocaleString('en-IN')} | Returns: ₹{calc.returns.toLocaleString('en-IN')}
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
                  Enter your SIP details and click calculate to see results
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Benefits of SIP Investment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Disciplined Investing</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Regular monthly investments build wealth systematically
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-success-600 dark:text-success-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Rupee Cost Averaging</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Buy more units when prices are low, fewer when high
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-6 h-6 text-warning-600 dark:text-warning-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Compounding Growth</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Long-term compounding creates significant wealth
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
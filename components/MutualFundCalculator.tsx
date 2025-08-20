'use client';

import { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Info, BarChart3, PieChart, Target } from 'lucide-react';

interface MFCalculation {
  year: number;
  investment: number;
  returns: number;
  totalValue: number;
  wealthGained: number;
}

interface FundCategory {
  name: string;
  expectedReturn: number;
  risk: 'Low' | 'Medium' | 'High';
  color: string;
  description: string;
}

export default function MutualFundCalculator() {
  const [investmentType, setInvestmentType] = useState<'sip' | 'lumpsum'>('sip');
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(5000);
  const [lumpsumAmount, setLumpsumAmount] = useState<number>(100000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(10);
  const [fundCategory, setFundCategory] = useState<string>('equity');
  const [calculations, setCalculations] = useState<MFCalculation[]>([]);
  const [showYearlyBreakdown, setShowYearlyBreakdown] = useState(false);
  const [showCategoryComparison, setShowCategoryComparison] = useState(false);

  const fundCategories: FundCategory[] = [
    { name: 'Liquid Funds', expectedReturn: 6, risk: 'Low', color: 'bg-green-500', description: 'Ultra-short term, low risk' },
    { name: 'Debt Funds', expectedReturn: 8, risk: 'Low', color: 'bg-blue-500', description: 'Fixed income, stable returns' },
    { name: 'Hybrid Funds', expectedReturn: 10, risk: 'Medium', color: 'bg-yellow-500', description: 'Balanced equity-debt mix' },
    { name: 'Equity Funds', expectedReturn: 12, risk: 'High', color: 'bg-red-500', description: 'Stock market exposure' },
    { name: 'Small Cap', expectedReturn: 15, risk: 'High', color: 'bg-purple-500', description: 'High growth potential' },
  ];

  const calculateMF = () => {
    const results: MFCalculation[] = [];
    let totalInvestment = 0;
    
    if (investmentType === 'sip') {
      for (let year = 1; year <= investmentPeriod; year++) {
        const yearInvestment = monthlyInvestment * 12;
        totalInvestment += yearInvestment;
        
        // SIP Formula: FV = P × (((1 + r)^n - 1) / r) × (1 + r)
        const months = year * 12;
        const monthlyRate = expectedReturn / 12 / 100;
        const futureValue = monthlyInvestment * 
          ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
          (1 + monthlyRate);
        
        const yearReturns = futureValue - totalInvestment;
        
        results.push({
          year,
          investment: yearInvestment,
          returns: yearReturns,
          totalValue: futureValue,
          wealthGained: yearReturns
        });
      }
    } else {
      // Lumpsum calculation
      for (let year = 1; year <= investmentPeriod; year++) {
        const futureValue = lumpsumAmount * Math.pow(1 + expectedReturn / 100, year);
        const yearReturns = futureValue - lumpsumAmount;
        
        results.push({
          year,
          investment: lumpsumAmount,
          returns: yearReturns,
          totalValue: futureValue,
          wealthGained: yearReturns
        });
      }
    }
    
    setCalculations(results);
  };

  const getTotalInvestment = () => {
    if (investmentType === 'sip') {
      return monthlyInvestment * 12 * investmentPeriod;
    }
    return lumpsumAmount;
  };

  const getTotalReturns = () => {
    if (calculations.length === 0) return 0;
    return calculations[calculations.length - 1].totalValue - getTotalInvestment();
  };

  const getMaturityValue = () => {
    if (calculations.length === 0) return 0;
    return calculations[calculations.length - 1].totalValue;
  };

  const getAbsoluteReturn = () => {
    const totalInvestment = getTotalInvestment();
    if (totalInvestment === 0) return 0;
    return (getTotalReturns() / totalInvestment) * 100;
  };

  const getCAGR = () => {
    const totalInvestment = getTotalInvestment();
    const maturityValue = getMaturityValue();
    
    if (totalInvestment === 0 || investmentPeriod === 0) return 0;
    return (Math.pow(maturityValue / totalInvestment, 1 / investmentPeriod) - 1) * 100;
  };

  const getRiskAdjustedReturn = () => {
    const selectedFund = fundCategories.find(f => f.name.toLowerCase().includes(fundCategory));
    if (!selectedFund) return expectedReturn;
    
    // Adjust return based on risk category
    switch (selectedFund.risk) {
      case 'Low': return expectedReturn * 0.8; // Conservative estimate
      case 'Medium': return expectedReturn * 0.9; // Moderate estimate
      case 'High': return expectedReturn * 1.1; // Aggressive estimate
      default: return expectedReturn;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-success-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Mutual Fund Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Calculate mutual fund returns with SIP and lumpsum options
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Calculator className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" />
              Calculate MF Returns
            </h2>

            <div className="space-y-4">
              {/* Investment Type Toggle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Investment Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['sip', 'lumpsum'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setInvestmentType(type)}
                      className={`py-3 px-4 rounded-lg border transition-colors ${
                        investmentType === type
                          ? 'bg-primary-600 text-white border-primary-600'
                          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      {type === 'sip' ? 'SIP' : 'Lumpsum'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Investment Amount */}
              {investmentType === 'sip' ? (
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
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Lumpsum Amount (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">₹</span>
                    <input
                      type="number"
                      value={lumpsumAmount}
                      onChange={(e) => setLumpsumAmount(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                      placeholder="100000"
                      min="1000"
                      step="1000"
                    />
                  </div>
                </div>
              )}

              {/* Fund Category Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Fund Category
                </label>
                <select
                  value={fundCategory}
                  onChange={(e) => setFundCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                >
                  <option value="equity">Equity Funds (12%)</option>
                  <option value="debt">Debt Funds (8%)</option>
                  <option value="hybrid">Hybrid Funds (10%)</option>
                  <option value="liquid">Liquid Funds (6%)</option>
                  <option value="smallcap">Small Cap (15%)</option>
                </select>
              </div>

              {/* Expected Return */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Expected Return (% per annum)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(Number(e.target.value))}
                    className="w-full pr-8 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                    placeholder="12"
                    min="1"
                    max="25"
                    step="0.1"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">%</span>
                </div>
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
                  placeholder="10"
                  min="1"
                  max="30"
                  step="1"
                />
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculateMF}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Calculate Returns
              </button>
            </div>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p className="font-medium mb-1">Mutual Fund Benefits:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Professional fund management</li>
                    <li>• Diversification across assets</li>
                    <li>• SIP for rupee cost averaging</li>
                    <li>• Tax benefits under Section 80C</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-success-600 dark:text-success-400" />
              Investment Results
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

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowYearlyBreakdown(!showYearlyBreakdown)}
                    className="flex-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 py-2 px-4 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
                  >
                    {showYearlyBreakdown ? 'Hide' : 'Show'} Breakdown
                  </button>
                  <button
                    onClick={() => setShowCategoryComparison(!showCategoryComparison)}
                    className="flex-1 bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-300 py-2 px-4 rounded-lg hover:bg-success-200 dark:hover:bg-success-900/50 transition-colors"
                  >
                    {showCategoryComparison ? 'Hide' : 'Show'} Categories
                  </button>
                </div>

                {/* Yearly Breakdown */}
                {showYearlyBreakdown && (
                  <div className="max-h-64 overflow-y-auto">
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
                                Returns: ₹{calc.returns.toFixed(0)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Fund Category Comparison */}
                {showCategoryComparison && (
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-3">Fund Categories</h3>
                    <div className="space-y-2 text-sm">
                      {fundCategories.map((fund) => (
                        <div key={fund.name} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-600 last:border-b-0">
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${fund.color}`}></div>
                            <span className="text-gray-600 dark:text-gray-400">{fund.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-gray-900 dark:text-white font-medium">
                              {fund.expectedReturn}%
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-500">
                              {fund.risk} Risk
                            </div>
                          </div>
                        </div>
                      ))}
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
              Investment Analysis
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pie Chart */}
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Investment vs Returns</h3>
                <div className="relative w-48 h-48 mx-auto">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    {/* Investment Circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="#3B82F6"
                      stroke="#1E40AF"
                      strokeWidth="2"
                    />
                    {/* Returns Arc */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="8"
                      strokeDasharray={`${(getTotalReturns() / getMaturityValue()) * 251.2} 251.2`}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {((getTotalReturns() / getMaturityValue()) * 100).toFixed(1)}%
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Returns</div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center space-x-4 mt-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-gray-600 dark:text-gray-400">Investment</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-gray-600 dark:text-gray-400">Returns</span>
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
                          style={{ width: `${(calc.totalValue / getMaturityValue()) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white w-20">
                        ₹{calc.totalValue.toLocaleString('en-IN')}
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
            Mutual Fund Advantages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Professional Management</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Expert fund managers handle your investments
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-6 h-6 text-success-600 dark:text-success-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Diversification</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Spread risk across multiple assets and sectors
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-6 h-6 text-warning-600 dark:text-warning-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Flexible Investment</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Choose between SIP and lumpsum options
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
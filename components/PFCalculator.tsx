'use client';

import { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Info, Users, Building } from 'lucide-react';

interface PFCalculation {
  year: number;
  employeeContribution: number;
  employerContribution: number;
  totalContribution: number;
  interest: number;
  balance: number;
  cumulativeInterest: number;
}

export default function PFCalculator() {
  const [basicSalary, setBasicSalary] = useState<number>(50000);
  const [daPercentage, setDaPercentage] = useState<number>(50);
  const [pfRate, setPfRate] = useState<number>(12);
  const [serviceYears, setServiceYears] = useState<number>(25);
  const [calculations, setCalculations] = useState<PFCalculation[]>([]);
  const [showYearlyBreakdown, setShowYearlyBreakdown] = useState(false);
  const [showContributionBreakdown, setShowContributionBreakdown] = useState(false);

  const calculatePF = () => {
    const daAmount = (basicSalary * daPercentage) / 100;
    const totalSalary = basicSalary + daAmount;
    
    // PF is calculated on Basic + DA (capped at ₹15,000 for calculation)
    const pfBase = Math.min(totalSalary, 15000);
    
    // Employee contribution: 12% of Basic + DA
    const employeeContribution = (pfBase * pfRate) / 100;
    
    // Employer contribution: 12% of Basic + DA (3.67% to EPF, 8.33% to EPS)
    const employerContribution = (pfBase * pfRate) / 100;
    const epfContribution = (pfBase * 3.67) / 100;
    const epsContribution = (pfBase * 8.33) / 100;
    
    const results: PFCalculation[] = [];
    let balance = 0;
    let cumulativeInterest = 0;
    
    for (let year = 1; year <= serviceYears; year++) {
      const yearEmployeeContribution = employeeContribution * 12;
      const yearEmployerContribution = epfContribution * 12; // Only EPF part
      const yearTotalContribution = yearEmployeeContribution + yearEmployerContribution;
      
      balance += yearTotalContribution;
      
      // PF interest rate (currently 8.15%)
      const interest = balance * 0.0815;
      cumulativeInterest += interest;
      balance += interest;
      
      results.push({
        year,
        employeeContribution: yearEmployeeContribution,
        employerContribution: yearEmployerContribution,
        totalContribution: yearTotalContribution,
        interest,
        balance,
        cumulativeInterest
      });
    }
    
    setCalculations(results);
  };

  const getTotalEmployeeContribution = () => {
    if (calculations.length === 0) return 0;
    return calculations.reduce((sum, calc) => sum + calc.employeeContribution, 0);
  };

  const getTotalEmployerContribution = () => {
    if (calculations.length === 0) return 0;
    return calculations.reduce((sum, calc) => sum + calc.employerContribution, 0);
  };

  const getTotalContribution = () => {
    return getTotalEmployeeContribution() + getTotalEmployerContribution();
  };

  const getTotalInterest = () => {
    if (calculations.length === 0) return 0;
    return calculations[calculations.length - 1].cumulativeInterest;
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

  const getMonthlyPension = () => {
    const daAmount = (basicSalary * daPercentage) / 100;
    const totalSalary = basicSalary + daAmount;
    const pfBase = Math.min(totalSalary, 15000);
    const epsContribution = (pfBase * 8.33) / 100;
    
    // EPS pension calculation (simplified)
    const totalEpsContribution = epsContribution * 12 * serviceYears;
    return Math.min(totalEpsContribution / 8.33, 15000); // Capped at ₹15,000
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-success-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            PF Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Calculate Provident Fund contributions and retirement benefits
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Calculator className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" />
              Calculate PF
            </h2>

            <div className="space-y-4">
              {/* Basic Salary */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Basic Salary (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">₹</span>
                  <input
                    type="number"
                    value={basicSalary}
                    onChange={(e) => setBasicSalary(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                    placeholder="50000"
                    min="0"
                    step="1000"
                  />
                </div>
              </div>

              {/* DA Percentage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Dearness Allowance (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={daPercentage}
                    onChange={(e) => setDaPercentage(Number(e.target.value))}
                    className="w-full pr-8 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                    placeholder="50"
                    min="0"
                    max="200"
                    step="1"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">%</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Current DA rate: 50% (varies by government orders)
                </p>
              </div>

              {/* PF Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  PF Rate (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={pfRate}
                    onChange={(e) => setPfRate(Number(e.target.value))}
                    className="w-full pr-8 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                    placeholder="12"
                    min="8"
                    max="15"
                    step="0.1"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">%</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Standard rate: 12% (can vary by organization)
                </p>
              </div>

              {/* Service Years */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Service Period (Years)
                </label>
                <input
                  type="number"
                  value={serviceYears}
                  onChange={(e) => setServiceYears(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                  placeholder="25"
                  min="1"
                  max="40"
                  step="1"
                />
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculatePF}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Calculate PF
              </button>
            </div>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p className="font-medium mb-1">PF Structure:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Employee: 12% of Basic + DA</li>
                    <li>• Employer: 12% (3.67% EPF + 8.33% EPS)</li>
                    <li>• PF base capped at ₹15,000</li>
                    <li>• Interest rate: 8.15% (FY 2023-24)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-success-600 dark:text-success-400" />
              PF Calculation Results
            </h2>

            {calculations.length > 0 ? (
              <div className="space-y-6">
                {/* Maturity Amount Display */}
                <div className="bg-gradient-to-r from-success-50 to-primary-50 dark:from-success-900/20 dark:to-primary-900/20 border border-success-200 dark:border-success-700 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    ₹{getMaturityAmount().toLocaleString('en-IN')}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">PF Maturity Amount</div>
                </div>

                {/* Contribution Breakdown */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-700 rounded-lg p-4 text-center">
                    <div className="text-lg font-bold text-primary-600 dark:text-primary-400 mb-1">
                      ₹{getTotalEmployeeContribution().toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-primary-700 dark:text-primary-300">Employee Contribution</div>
                  </div>
                  
                  <div className="bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-700 rounded-lg p-4 text-center">
                    <div className="text-lg font-bold text-success-600 dark:text-success-400 mb-1">
                      ₹{getTotalEmployerContribution().toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-success-700 dark:text-success-300">Employer Contribution</div>
                  </div>
                </div>

                {/* Additional Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-700 rounded-lg p-4 text-center">
                    <div className="text-lg font-bold text-warning-600 dark:text-warning-400 mb-1">
                      ₹{getTotalInterest().toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-warning-700 dark:text-warning-300">Total Interest</div>
                  </div>
                  
                  <div className="bg-info-50 dark:bg-info-900/20 border border-info-200 dark:border-info-700 rounded-lg p-4 text-center">
                    <div className="text-lg font-bold text-info-600 dark:text-info-400 mb-1">
                      ₹{getMonthlyPension().toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-info-700 dark:text-info-300">Monthly Pension</div>
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
                    onClick={() => setShowContributionBreakdown(!showContributionBreakdown)}
                    className="flex-1 bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-300 py-2 px-4 rounded-lg hover:bg-success-200 dark:hover:bg-success-900/50 transition-colors"
                  >
                    {showContributionBreakdown ? 'Hide' : 'Show'} Details
                  </button>
                </div>

                {/* Yearly Breakdown */}
                {showYearlyBreakdown && (
                  <div className="max-h-64 overflow-y-auto">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-3">Yearly Breakdown</h3>
                      <div className="space-y-2 text-sm">
                        {calculations.slice(0, 10).map((calc) => (
                          <div key={calc.year} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600 last:border-b-0">
                            <span className="text-gray-600 dark:text-gray-400">Year {calc.year}</span>
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
                        {calculations.length > 10 && (
                          <div className="text-center text-sm text-gray-500 dark:text-gray-500 py-2">
                            ... and {calculations.length - 10} more years
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Contribution Breakdown */}
                {showContributionBreakdown && (
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-3">Contribution Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Employee PF (12%)</span>
                        <span className="font-medium text-blue-600 dark:text-blue-400">
                          ₹{(getTotalEmployeeContribution() / 12).toFixed(0)}/month
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Employer EPF (3.67%)</span>
                        <span className="font-medium text-green-600 dark:text-green-400">
                          ₹{(getTotalEmployerContribution() / 12).toFixed(0)}/month
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Employer EPS (8.33%)</span>
                        <span className="font-medium text-yellow-600 dark:text-yellow-400">
                          ₹{(getTotalEmployerContribution() * 2.27).toFixed(0)}/month
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
                  Enter your PF details and click calculate to see results
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Visual Charts */}
        {calculations.length > 0 && (
          <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              PF Analysis
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pie Chart */}
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Contribution vs Interest</h3>
                <div className="relative w-48 h-48 mx-auto">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    {/* Contribution Circle */}
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
                      strokeDasharray={`${(getTotalInterest() / getMaturityAmount()) * 251.2} 251.2`}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {((getTotalInterest() / getMaturityAmount()) * 100).toFixed(1)}%
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Interest</div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center space-x-4 mt-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-gray-600 dark:text-gray-400">Contribution</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-gray-600 dark:text-gray-400">Interest</span>
                  </div>
                </div>
              </div>

              {/* Growth Chart */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">PF Growth Over Time</h3>
                <div className="space-y-2">
                  {calculations.slice(0, 8).map((calc) => (
                    <div key={calc.year} className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400 w-8">Y{calc.year}</span>
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-green-500 h-4 rounded-full transition-all duration-300"
                          style={{ width: `${(calc.balance / getMaturityAmount()) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white w-20">
                        ₹{calc.balance.toLocaleString('en-IN')}
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
            PF Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Employer Matching</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Free money from employer contributions
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <Building className="w-6 h-6 text-success-600 dark:text-success-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Tax Benefits</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Tax-free contributions and returns
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-6 h-6 text-warning-600 dark:text-warning-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Guaranteed Returns</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Government-backed interest rates
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
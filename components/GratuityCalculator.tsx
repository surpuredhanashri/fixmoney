'use client';

import { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Info, Calendar, Gift } from 'lucide-react';

interface GratuityCalculation {
  year: number;
  basicSalary: number;
  da: number;
  totalSalary: number;
  gratuityEarned: number;
  cumulativeGratuity: number;
}

export default function GratuityCalculator() {
  const [basicSalary, setBasicSalary] = useState<number>(50000);
  const [daPercentage, setDaPercentage] = useState<number>(50);
  const [serviceYears, setServiceYears] = useState<number>(20);
  const [serviceMonths, setServiceMonths] = useState<number>(0);
  const [serviceDays, setServiceDays] = useState<number>(0);
  const [calculations, setCalculations] = useState<GratuityCalculation[]>([]);
  const [showYearlyBreakdown, setShowYearlyBreakdown] = useState(false);

  const calculateGratuity = () => {
    const totalServiceYears = serviceYears + (serviceMonths / 12) + (serviceDays / 365);
    const daAmount = (basicSalary * daPercentage) / 100;
    const totalSalary = basicSalary + daAmount;
    
    // Gratuity formula: (Basic + DA) × Years of Service × 15/26
    const gratuityPerYear = (totalSalary * 15) / 26;
    const totalGratuity = gratuityPerYear * totalServiceYears;
    
    const results: GratuityCalculation[] = [];
    let cumulativeGratuity = 0;
    
    for (let year = 1; year <= Math.ceil(totalServiceYears); year++) {
      const actualYears = Math.min(year, totalServiceYears);
      const yearGratuity = gratuityPerYear * actualYears;
      cumulativeGratuity = yearGratuity;
      
      results.push({
        year,
        basicSalary,
        da: daAmount,
        totalSalary,
        gratuityEarned: yearGratuity,
        cumulativeGratuity
      });
    }
    
    setCalculations(results);
  };

  const getTotalGratuity = () => {
    if (calculations.length === 0) return 0;
    return calculations[calculations.length - 1].cumulativeGratuity;
  };

  const getTaxableAmount = () => {
    const totalGratuity = getTotalGratuity();
    // Gratuity up to ₹20 lakh is tax-free
    return Math.max(0, totalGratuity - 2000000);
  };

  const getTaxFreeAmount = () => {
    const totalGratuity = getTotalGratuity();
    return Math.min(totalGratuity, 2000000);
  };

  const getServicePeriod = () => {
    return `${serviceYears} years, ${serviceMonths} months, ${serviceDays} days`;
  };

  const getGratuityPerYear = () => {
    const daAmount = (basicSalary * daPercentage) / 100;
    const totalSalary = basicSalary + daAmount;
    return (totalSalary * 15) / 26;
  };

  const getEligibilityStatus = () => {
    const totalServiceYears = serviceYears + (serviceMonths / 12) + (serviceDays / 365);
    if (totalServiceYears >= 5) return 'Eligible';
    if (totalServiceYears >= 4) return 'Almost Eligible';
    return 'Not Eligible';
  };

  const getEligibilityColor = () => {
    const status = getEligibilityStatus();
    if (status === 'Eligible') return 'text-success-600 dark:text-success-400';
    if (status === 'Almost Eligible') return 'text-warning-600 dark:text-warning-400';
    return 'text-danger-600 dark:text-danger-400';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-success-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Gratuity Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Calculate your gratuity amount on retirement or resignation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Calculator className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" />
              Calculate Gratuity
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

              {/* Service Period */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Service Period
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Years</label>
                    <input
                      type="number"
                      value={serviceYears}
                      onChange={(e) => setServiceYears(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent text-sm"
                      placeholder="20"
                      min="0"
                      max="50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Months</label>
                    <input
                      type="number"
                      value={serviceMonths}
                      onChange={(e) => setServiceMonths(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent text-sm"
                      placeholder="0"
                      min="0"
                      max="11"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Days</label>
                    <input
                      type="number"
                      value={serviceDays}
                      onChange={(e) => setServiceDays(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent text-sm"
                      placeholder="0"
                      min="0"
                      max="30"
                    />
                  </div>
                </div>
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculateGratuity}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Calculate Gratuity
              </button>
            </div>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p className="font-medium mb-1">Gratuity Rules:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Minimum 5 years of service required</li>
                    <li>• Formula: (Basic + DA) × Years × 15/26</li>
                    <li>• Maximum ₹20 lakh is tax-free</li>
                    <li>• Paid on retirement, resignation, or death</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-success-600 dark:text-success-400" />
              Gratuity Calculation Results
            </h2>

            {calculations.length > 0 ? (
              <div className="space-y-6">
                {/* Total Gratuity Display */}
                <div className="bg-gradient-to-r from-success-50 to-primary-50 dark:from-success-900/20 dark:to-primary-900/20 border border-success-200 dark:border-success-700 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    ₹{getTotalGratuity().toLocaleString('en-IN')}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Gratuity Amount</div>
                </div>

                {/* Eligibility Status */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                  <div className={`text-lg font-bold mb-1 ${getEligibilityColor()}`}>
                    {getEligibilityStatus()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Service Period: {getServicePeriod()}
                  </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-700 rounded-lg p-4 text-center">
                    <div className="text-lg font-bold text-primary-600 dark:text-primary-400 mb-1">
                      ₹{getTaxFreeAmount().toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-primary-700 dark:text-primary-300">Tax-Free Amount</div>
                  </div>
                  
                  <div className="bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-700 rounded-lg p-4 text-center">
                    <div className="text-lg font-bold text-warning-600 dark:text-warning-400 mb-1">
                      ₹{getTaxableAmount().toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-warning-700 dark:text-warning-300">Taxable Amount</div>
                  </div>
                </div>

                {/* Additional Metrics */}
                <div className="bg-info-50 dark:bg-info-900/20 border border-info-200 dark:border-info-700 rounded-lg p-4 text-center">
                  <div className="text-lg font-bold text-info-600 dark:text-info-400 mb-1">
                    ₹{getGratuityPerYear().toLocaleString('en-IN')}
                  </div>
                  <div className="text-sm text-info-700 dark:text-info-300">Gratuity Earned Per Year</div>
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
                  <div className="max-h-64 overflow-y-auto">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-3">Yearly Breakdown</h3>
                      <div className="space-y-2 text-sm">
                        {calculations.map((calc) => (
                          <div key={calc.year} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600 last:border-b-0">
                            <span className="text-gray-600 dark:text-gray-400">Year {calc.year}</span>
                            <div className="text-right">
                              <div className="text-gray-900 dark:text-white font-medium">
                                ₹{calc.cumulativeGratuity.toLocaleString('en-IN')}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-500">
                                Yearly: ₹{calc.gratuityEarned.toFixed(0)}
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
                  Enter your details and click calculate to see gratuity results
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Service Period Visualization */}
        {calculations.length > 0 && (
          <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              Service Period Visualization
            </h2>
            <div className="space-y-4">
              {/* Service Timeline */}
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">0 Years</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">5 Years (Eligible)</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{serviceYears} Years</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-3 rounded-full transition-all duration-300 relative">
                    <div className="absolute right-0 top-0 w-1 h-3 bg-white rounded-full shadow"></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>Not Eligible</span>
                  <span>Eligible</span>
                </div>
              </div>

              {/* Gratuity Growth Chart */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Gratuity Growth</h3>
                  <div className="space-y-2">
                    {calculations.slice(0, 6).map((calc) => (
                      <div key={calc.year} className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400 w-8">Y{calc.year}</span>
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${(calc.cumulativeGratuity / getTotalGratuity()) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white w-20">
                          ₹{calc.cumulativeGratuity.toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Tax Implications</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Tax-Free Amount</span>
                      <span className="font-medium text-green-600 dark:text-green-400">
                        ₹{getTaxFreeAmount().toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Taxable Amount</span>
                      <span className="font-medium text-yellow-600 dark:text-yellow-400">
                        ₹{getTaxableAmount().toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      * Amount above ₹20 lakh is taxable as per income tax rules
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Benefits Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Gratuity Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <Gift className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Retirement Benefit</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Financial security after years of service
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-6 h-6 text-success-600 dark:text-success-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Tax Benefits</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Up to ₹20 lakh is tax-free
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-warning-600 dark:text-warning-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Service Recognition</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Rewards long-term employment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
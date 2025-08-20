'use client';

import { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Info, User, PieChart, BarChart3 } from 'lucide-react';

interface SalaryBreakdown {
  component: string;
  amount: number;
  percentage: number;
  color: string;
}

interface TaxCalculation {
  slab: string;
  taxableIncome: number;
  taxRate: number;
  taxAmount: number;
}

export default function SalaryCalculator() {
  const [ctc, setCtc] = useState<number>(800000);
  const [basicSalary, setBasicSalary] = useState<number>(400000);
  const [hra, setHra] = useState<number>(200000);
  const [da, setDa] = useState<number>(0);
  const [specialAllowance, setSpecialAllowance] = useState<number>(200000);
  const [pfRate, setPfRate] = useState<number>(12);
  const [gratuity, setGratuity] = useState<number>(0);
  const [otherAllowances, setOtherAllowances] = useState<number>(0);
  const [showTaxBreakdown, setShowTaxBreakdown] = useState(false);
  const [showSalaryBreakdown, setShowSalaryBreakdown] = useState(false);

  const calculateSalary = () => {
    // Auto-calculate basic salary if not provided (50% of CTC)
    if (basicSalary === 0) {
      setBasicSalary(ctc * 0.5);
    }
    
    // Auto-calculate HRA if not provided (50% of basic for metro cities)
    if (hra === 0) {
      setHra(basicSalary * 0.5);
    }
    
    // Auto-calculate DA if not provided (based on basic)
    if (da === 0) {
      setDa(basicSalary * 0.5);
    }
    
    // Auto-calculate special allowance
    if (specialAllowance === 0) {
      setSpecialAllowance(ctc - basicSalary - hra - da - otherAllowances);
    }
    
    // Auto-calculate gratuity
    if (gratuity === 0) {
      setGratuity(basicSalary * 0.048);
    }
  };

  const getGrossSalary = () => {
    return basicSalary + hra + da + specialAllowance + otherAllowances;
  };

  const getPFContribution = () => {
    return Math.min(basicSalary * (pfRate / 100), 1800 * 12); // Capped at ₹1,800 per month
  };

  const getGratuityContribution = () => {
    return basicSalary * 0.048; // 4.8% of basic
  };

  const getTotalDeductions = () => {
    return getPFContribution() + getGratuityContribution();
  };

  const getTakeHomeSalary = () => {
    return getGrossSalary() - getTotalDeductions();
  };

  const getMonthlyTakeHome = () => {
    return getTakeHomeSalary() / 12;
  };

  const getTaxableIncome = () => {
    // Standard deduction of ₹50,000
    const standardDeduction = 50000;
    // Section 80C benefits (PF, ELSS, etc.)
    const section80C = Math.min(getPFContribution(), 150000);
    
    return Math.max(0, getGrossSalary() - standardDeduction - section80C);
  };

  const getTaxBreakdown = (): TaxCalculation[] => {
    const taxableIncome = getTaxableIncome();
    const breakdown: TaxCalculation[] = [];
    
    if (taxableIncome <= 300000) {
      breakdown.push({ slab: '0 - 3 Lakhs', taxableIncome: Math.min(taxableIncome, 300000), taxRate: 0, taxAmount: 0 });
    } else if (taxableIncome <= 600000) {
      breakdown.push({ slab: '0 - 3 Lakhs', taxableIncome: 300000, taxRate: 0, taxAmount: 0 });
      breakdown.push({ slab: '3 - 6 Lakhs', taxableIncome: taxableIncome - 300000, taxRate: 5, taxAmount: (taxableIncome - 300000) * 0.05 });
    } else if (taxableIncome <= 900000) {
      breakdown.push({ slab: '0 - 3 Lakhs', taxableIncome: 300000, taxRate: 0, taxAmount: 0 });
      breakdown.push({ slab: '3 - 6 Lakhs', taxableIncome: 300000, taxRate: 5, taxAmount: 15000 });
      breakdown.push({ slab: '6 - 9 Lakhs', taxableIncome: taxableIncome - 600000, taxRate: 10, taxAmount: (taxableIncome - 600000) * 0.10 });
    } else if (taxableIncome <= 1200000) {
      breakdown.push({ slab: '0 - 3 Lakhs', taxableIncome: 300000, taxRate: 0, taxAmount: 0 });
      breakdown.push({ slab: '3 - 6 Lakhs', taxableIncome: 300000, taxRate: 5, taxAmount: 15000 });
      breakdown.push({ slab: '6 - 9 Lakhs', taxableIncome: 300000, taxRate: 10, taxAmount: 30000 });
      breakdown.push({ slab: '9 - 12 Lakhs', taxableIncome: taxableIncome - 900000, taxRate: 15, taxAmount: (taxableIncome - 900000) * 0.15 });
    } else if (taxableIncome <= 1500000) {
      breakdown.push({ slab: '0 - 3 Lakhs', taxableIncome: 300000, taxRate: 0, taxAmount: 0 });
      breakdown.push({ slab: '3 - 6 Lakhs', taxableIncome: 300000, taxRate: 5, taxAmount: 15000 });
      breakdown.push({ slab: '6 - 9 Lakhs', taxableIncome: 300000, taxRate: 10, taxAmount: 30000 });
      breakdown.push({ slab: '9 - 12 Lakhs', taxableIncome: 300000, taxRate: 15, taxAmount: 45000 });
      breakdown.push({ slab: '12 - 15 Lakhs', taxableIncome: taxableIncome - 1200000, taxRate: 20, taxAmount: (taxableIncome - 1200000) * 0.20 });
    } else {
      breakdown.push({ slab: '0 - 3 Lakhs', taxableIncome: 300000, taxRate: 0, taxAmount: 0 });
      breakdown.push({ slab: '3 - 6 Lakhs', taxableIncome: 300000, taxRate: 5, taxAmount: 15000 });
      breakdown.push({ slab: '6 - 9 Lakhs', taxableIncome: 300000, taxRate: 10, taxAmount: 30000 });
      breakdown.push({ slab: '9 - 12 Lakhs', taxableIncome: 300000, taxRate: 15, taxAmount: 45000 });
      breakdown.push({ slab: '12 - 15 Lakhs', taxableIncome: 300000, taxRate: 20, taxAmount: 60000 });
      breakdown.push({ slab: '15+ Lakhs', taxableIncome: taxableIncome - 1500000, taxRate: 30, taxAmount: (taxableIncome - 1500000) * 0.30 });
    }
    
    return breakdown;
  };

  const getTotalTax = () => {
    return getTaxBreakdown().reduce((sum, slab) => sum + slab.taxAmount, 0);
  };

  const getSalaryBreakdown = (): SalaryBreakdown[] => {
    const gross = getGrossSalary();
    return [
      { component: 'Basic Salary', amount: basicSalary, percentage: (basicSalary / gross) * 100, color: 'bg-blue-500' },
      { component: 'HRA', amount: hra, percentage: (hra / gross) * 100, color: 'bg-green-500' },
      { component: 'DA', amount: da, percentage: (da / gross) * 100, color: 'bg-yellow-500' },
      { component: 'Special Allowance', amount: specialAllowance, percentage: (specialAllowance / gross) * 100, color: 'bg-purple-500' },
      { component: 'Other Allowances', amount: otherAllowances, percentage: (otherAllowances / gross) * 100, color: 'bg-pink-500' },
    ];
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-success-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Salary Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Calculate take home salary with detailed breakdown and tax analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Calculator className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" />
              Calculate Salary
            </h2>

            <div className="space-y-4">
              {/* CTC */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Cost to Company (CTC) (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">₹</span>
                  <input
                    type="number"
                    value={ctc}
                    onChange={(e) => setCtc(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                    placeholder="800000"
                    min="0"
                    step="1000"
                  />
                </div>
              </div>

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
                    placeholder="400000"
                    min="0"
                    step="1000"
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Usually 40-60% of CTC
                </p>
              </div>

              {/* HRA */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  House Rent Allowance (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">₹</span>
                  <input
                    type="number"
                    value={hra}
                    onChange={(e) => setHra(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                    placeholder="200000"
                    min="0"
                    step="1000"
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Usually 40-50% of basic salary
                </p>
              </div>

              {/* DA */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Dearness Allowance (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">₹</span>
                  <input
                    type="number"
                    value={da}
                    onChange={(e) => setDa(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                    placeholder="0"
                    min="0"
                    step="1000"
                  />
                </div>
              </div>

              {/* Special Allowance */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Special Allowance (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">₹</span>
                  <input
                    type="number"
                    value={specialAllowance}
                    onChange={(e) => setSpecialAllowance(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                    placeholder="200000"
                    min="0"
                    step="1000"
                  />
                </div>
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
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculateSalary}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Calculate Salary
              </button>
            </div>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p className="font-medium mb-1">Salary Components:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Basic: Foundation for PF and gratuity</li>
                    <li>• HRA: Tax benefits on rent paid</li>
                    <li>• DA: Inflation adjustment</li>
                    <li>• Special Allowance: Flexible component</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-success-600 dark:text-success-400" />
              Salary Breakdown
            </h2>

            <div className="space-y-6">
              {/* Take Home Salary Display */}
              <div className="bg-gradient-to-r from-success-50 to-primary-50 dark:from-success-900/20 dark:to-primary-900/20 border border-success-200 dark:border-success-700 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  ₹{getMonthlyTakeHome().toLocaleString('en-IN')}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Monthly Take Home</div>
                <div className="text-lg font-medium text-gray-700 dark:text-gray-300 mt-2">
                  ₹{getTakeHomeSalary().toLocaleString('en-IN')} annually
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-700 rounded-lg p-4 text-center">
                  <div className="text-lg font-bold text-primary-600 dark:text-primary-400 mb-1">
                    ₹{getGrossSalary().toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-primary-700 dark:text-primary-300">Gross Salary</div>
                </div>
                
                <div className="bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-700 rounded-lg p-4 text-center">
                  <div className="text-lg font-bold text-warning-600 dark:text-warning-400 mb-1">
                    ₹{getTotalDeductions().toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-warning-700 dark:text-warning-300">Total Deductions</div>
                </div>
              </div>

              {/* Tax Information */}
              <div className="bg-info-50 dark:bg-info-900/20 border border-info-200 dark:border-info-700 rounded-lg p-4 text-center">
                <div className="text-lg font-bold text-info-600 dark:text-info-400 mb-1">
                  ₹{getTotalTax().toLocaleString('en-IN')}
                </div>
                <div className="text-sm text-info-700 dark:text-info-300">Estimated Tax</div>
                <div className="text-xs text-info-600 dark:text-info-300 mt-1">
                  Taxable Income: ₹{getTaxableIncome().toLocaleString('en-IN')}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowSalaryBreakdown(!showSalaryBreakdown)}
                  className="flex-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 py-2 px-4 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
                >
                  {showSalaryBreakdown ? 'Hide' : 'Show'} Breakdown
                </button>
                <button
                  onClick={() => setShowTaxBreakdown(!showTaxBreakdown)}
                  className="flex-1 bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-300 py-2 px-4 rounded-lg hover:bg-success-200 dark:hover:bg-success-900/50 transition-colors"
                >
                  {showTaxBreakdown ? 'Hide' : 'Show'} Tax Details
                </button>
              </div>

              {/* Salary Breakdown */}
              {showSalaryBreakdown && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">Salary Components</h3>
                  <div className="space-y-2 text-sm">
                    {getSalaryBreakdown().map((item) => (
                      <div key={item.component} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600 last:border-b-0">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                          <span className="text-gray-600 dark:text-gray-400">{item.component}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-gray-900 dark:text-white font-medium">
                            ₹{item.amount.toLocaleString('en-IN')}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-500">
                            {item.percentage.toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tax Breakdown */}
              {showTaxBreakdown && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">Tax Slabs</h3>
                  <div className="space-y-2 text-sm">
                    {getTaxBreakdown().map((slab, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600 last:border-b-0">
                        <span className="text-gray-600 dark:text-gray-400">{slab.slab}</span>
                        <div className="text-right">
                          <div className="text-gray-900 dark:text-white font-medium">
                            ₹{slab.taxAmount.toFixed(0)}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-500">
                            {slab.taxRate}% on ₹{slab.taxableIncome.toLocaleString('en-IN')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Visual Charts */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Salary Analysis
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pie Chart */}
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Salary Components</h3>
              <div className="relative w-48 h-48 mx-auto">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {getSalaryBreakdown().map((item, index) => {
                    const total = getSalaryBreakdown().reduce((sum, i) => sum + i.amount, 0);
                    const percentage = (item.amount / total) * 100;
                    const radius = 40;
                    const circumference = 2 * Math.PI * radius;
                    const strokeDasharray = (percentage / 100) * circumference;
                    
                    return (
                      <circle
                        key={item.component}
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="none"
                        stroke={item.color.replace('bg-', '').replace('-500', '')}
                        strokeWidth="8"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={index === 0 ? 0 : -circumference}
                        transform={`rotate(${index * 72} 50 50)`}
                      />
                    );
                  })}
                </svg>
              </div>
              <div className="flex flex-wrap justify-center space-x-4 mt-4 text-sm">
                {getSalaryBreakdown().map((item) => (
                  <div key={item.component} className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <span className="text-gray-600 dark:text-gray-400 ml-1">{item.component}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bar Chart */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Take Home vs Deductions</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-20">Take Home</span>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                    <div
                      className="bg-green-500 h-4 rounded-full transition-all duration-300"
                      style={{ width: `${(getTakeHomeSalary() / getGrossSalary()) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white w-20">
                    ₹{getTakeHomeSalary().toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-20">Deductions</span>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                    <div
                      className="bg-red-500 h-4 rounded-full transition-all duration-300"
                      style={{ width: `${(getTotalDeductions() / getGrossSalary()) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white w-20">
                    ₹{getTotalDeductions().toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Salary Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <User className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Tax Benefits</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                HRA, PF, and other allowances reduce tax liability
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <PieChart className="w-6 h-6 text-success-600 dark:text-success-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Component Analysis</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Understand how each component affects your take home
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-6 h-6 text-warning-600 dark:text-warning-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Planning Tool</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Plan your finances with accurate salary calculations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
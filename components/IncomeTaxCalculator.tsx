'use client';

import { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Info, FileText } from 'lucide-react';

interface TaxCalculation {
  regime: 'old' | 'new';
  grossIncome: number;
  deductions: number;
  taxableIncome: number;
  taxAmount: number;
  cess: number;
  totalTax: number;
  effectiveRate: number;
}

export default function IncomeTaxCalculator() {
  const [grossIncome, setGrossIncome] = useState<number>(800000);
  const [regime, setRegime] = useState<'old' | 'new'>('old');
  const [deductions, setDeductions] = useState({
    section80C: 150000,
    section80D: 25000,
    section80G: 10000,
    section80TTA: 10000,
    hra: 120000,
    standardDeduction: 50000,
    otherDeductions: 0
  });
  const [calculations, setCalculations] = useState<TaxCalculation[]>([]);

  const calculateTax = () => {
    const results: TaxCalculation[] = [];
    
    // Calculate for both regimes
    ['old', 'new'].forEach((taxRegime) => {
      const regimeType = taxRegime as 'old' | 'new';
      let totalDeductions = 0;
      
      if (regimeType === 'old') {
        totalDeductions = Object.values(deductions).reduce((sum, val) => sum + val, 0);
      } else {
        // New regime: Only standard deduction of ₹50,000
        totalDeductions = 50000;
      }
      
      const taxableIncome = Math.max(0, grossIncome - totalDeductions);
      const taxAmount = calculateTaxAmount(taxableIncome, regimeType);
      const cess = taxAmount * 0.04; // 4% health and education cess
      const totalTax = taxAmount + cess;
      const effectiveRate = (totalTax / grossIncome) * 100;
      
      results.push({
        regime: regimeType,
        grossIncome,
        deductions: totalDeductions,
        taxableIncome,
        taxAmount,
        cess,
        totalTax,
        effectiveRate
      });
    });
    
    setCalculations(results);
  };

  const calculateTaxAmount = (income: number, regime: 'old' | 'new'): number => {
    if (regime === 'old') {
      return calculateOldRegimeTax(income);
    } else {
      return calculateNewRegimeTax(income);
    }
  };

  const calculateOldRegimeTax = (income: number): number => {
    let tax = 0;
    
    if (income <= 250000) {
      tax = 0;
    } else if (income <= 500000) {
      tax = (income - 250000) * 0.05;
    } else if (income <= 1000000) {
      tax = 12500 + (income - 500000) * 0.20;
    } else {
      tax = 112500 + (income - 1000000) * 0.30;
    }
    
    return tax;
  };

  const calculateNewRegimeTax = (income: number): number => {
    let tax = 0;
    
    if (income <= 300000) {
      tax = 0;
    } else if (income <= 600000) {
      tax = (income - 300000) * 0.05;
    } else if (income <= 900000) {
      tax = 15000 + (income - 600000) * 0.10;
    } else if (income <= 1200000) {
      tax = 45000 + (income - 900000) * 0.15;
    } else if (income <= 1500000) {
      tax = 90000 + (income - 1200000) * 0.20;
    } else {
      tax = 150000 + (income - 1500000) * 0.30;
    }
    
    return tax;
  };

  const getOldRegimeResult = () => calculations.find(calc => calc.regime === 'old');
  const getNewRegimeResult = () => calculations.find(calc => calc.regime === 'new');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-success-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calculator className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Income Tax Calculator FY 2024-25
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Calculate your income tax liability with both old and new tax regimes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Calculator className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" />
              Calculate Income Tax
            </h2>

            <div className="space-y-4">
              {/* Gross Income */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Gross Total Income (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">₹</span>
                  <input
                    type="number"
                    value={grossIncome}
                    onChange={(e) => setGrossIncome(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                    placeholder="800000"
                    min="0"
                    step="1000"
                  />
                </div>
              </div>

              {/* Tax Regime Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Tax Regime
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setRegime('old')}
                    className={`py-3 px-4 rounded-lg border transition-colors ${
                      regime === 'old'
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    Old Regime
                  </button>
                  <button
                    onClick={() => setRegime('new')}
                    className={`py-3 px-4 rounded-lg border transition-colors ${
                      regime === 'new'
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    New Regime
                  </button>
                </div>
              </div>

              {/* Deductions (Old Regime Only) */}
              {regime === 'old' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Deductions (Old Regime)</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Section 80C (EPF, ELSS, etc.) - Max ₹1.5L
                    </label>
                    <input
                      type="number"
                      value={deductions.section80C}
                      onChange={(e) => setDeductions({...deductions, section80C: Number(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                      placeholder="150000"
                      min="0"
                      max="150000"
                      step="1000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Section 80D (Health Insurance) - Max ₹25,000
                    </label>
                    <input
                      type="number"
                      value={deductions.section80D}
                      onChange={(e) => setDeductions({...deductions, section80D: Number(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                      placeholder="25000"
                      min="0"
                      max="25000"
                      step="1000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Section 80G (Donations) - Max ₹10,000
                    </label>
                    <input
                      type="number"
                      value={deductions.section80G}
                      onChange={(e) => setDeductions({...deductions, section80G: Number(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                      placeholder="10000"
                      min="0"
                      max="10000"
                      step="1000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      HRA Exemption
                    </label>
                    <input
                      type="number"
                      value={deductions.hra}
                      onChange={(e) => setDeductions({...deductions, hra: Number(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                      placeholder="120000"
                      min="0"
                      step="1000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Other Deductions
                    </label>
                    <input
                      type="number"
                      value={deductions.otherDeductions}
                      onChange={(e) => setDeductions({...deductions, otherDeductions: Number(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                      placeholder="0"
                      min="0"
                      step="1000"
                    />
                  </div>
                </div>
              )}

              {/* Calculate Button */}
              <button
                onClick={calculateTax}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Calculate Tax
              </button>
            </div>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p className="font-medium mb-1">Tax Regime Comparison:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Old Regime: More deductions, higher tax rates</li>
                    <li>• New Regime: Fewer deductions, lower tax rates</li>
                    <li>• Standard deduction: ₹50,000 in both regimes</li>
                    <li>• Choose based on your deduction eligibility</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-success-600 dark:text-success-400" />
              Tax Calculation Results
            </h2>

            {calculations.length > 0 ? (
              <div className="space-y-6">
                {/* Regime Comparison */}
                <div className="grid grid-cols-1 gap-4">
                  {/* Old Regime */}
                  <div className="border-2 border-primary-200 dark:border-primary-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-primary-600 dark:text-primary-400">Old Tax Regime</h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">With Deductions</span>
                    </div>
                    {getOldRegimeResult() && (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Gross Income:</span>
                          <span className="font-medium">₹{getOldRegimeResult()?.grossIncome.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Total Deductions:</span>
                          <span className="font-medium text-success-600 dark:text-success-400">₹{getOldRegimeResult()?.deductions.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Taxable Income:</span>
                          <span className="font-medium">₹{getOldRegimeResult()?.taxableIncome.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Tax Amount:</span>
                          <span className="font-medium">₹{getOldRegimeResult()?.taxAmount.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Cess (4%):</span>
                          <span className="font-medium">₹{getOldRegimeResult()?.cess.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total Tax:</span>
                          <span className="text-primary-600 dark:text-primary-400">₹{getOldRegimeResult()?.totalTax.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                          Effective Rate: {getOldRegimeResult()?.effectiveRate.toFixed(2)}%
                        </div>
                      </div>
                    )}
                  </div>

                  {/* New Regime */}
                  <div className="border-2 border-success-200 dark:border-success-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-success-600 dark:text-success-400">New Tax Regime</h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Minimal Deductions</span>
                    </div>
                    {getNewRegimeResult() && (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Gross Income:</span>
                          <span className="font-medium">₹{getNewRegimeResult()?.grossIncome.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Standard Deduction:</span>
                          <span className="font-medium text-success-600 dark:text-success-400">₹{getNewRegimeResult()?.deductions.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Taxable Income:</span>
                          <span className="font-medium">₹{getNewRegimeResult()?.taxableIncome.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Tax Amount:</span>
                          <span className="font-medium">₹{getNewRegimeResult()?.taxAmount.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Cess (4%):</span>
                          <span className="font-medium">₹{getNewRegimeResult()?.cess.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total Tax:</span>
                          <span className="text-success-600 dark:text-success-400">₹{getNewRegimeResult()?.totalTax.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                          Effective Rate: {getNewRegimeResult()?.effectiveRate.toFixed(2)}%
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Recommendation */}
                {calculations.length > 0 && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                    <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Recommendation:</h3>
                    {(() => {
                      const oldTax = getOldRegimeResult()?.totalTax || 0;
                      const newTax = getNewRegimeResult()?.totalTax || 0;
                      const savings = Math.abs(oldTax - newTax);
                      
                      if (oldTax < newTax) {
                        return (
                          <p className="text-sm text-blue-700 dark:text-blue-300">
                            <strong>Choose Old Regime:</strong> You'll save ₹{savings.toLocaleString('en-IN')} in taxes by using the old regime with deductions.
                          </p>
                        );
                      } else if (newTax < oldTax) {
                        return (
                          <p className="text-sm text-blue-700 dark:text-blue-300">
                            <strong>Choose New Regime:</strong> You'll save ₹{savings.toLocaleString('en-IN')} in taxes by using the new regime.
                          </p>
                        );
                      } else {
                        return (
                          <p className="text-sm text-blue-700 dark:text-blue-300">
                            <strong>Both regimes are equal:</strong> Choose based on your preference for deductions vs. simplicity.
                          </p>
                        );
                      }
                    })()}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calculator className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  Enter your income details and click calculate to see tax comparison
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Tax Slabs Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Income Tax Slabs FY 2024-25
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Old Regime Slabs */}
            <div>
              <h3 className="text-lg font-medium text-primary-600 dark:text-primary-400 mb-4">Old Tax Regime</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                  <span>Up to ₹2.5 lakh</span>
                  <span className="font-medium">Nil</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                  <span>₹2.5 lakh - ₹5 lakh</span>
                  <span className="font-medium">5%</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                  <span>₹5 lakh - ₹10 lakh</span>
                  <span className="font-medium">20%</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>Above ₹10 lakh</span>
                  <span className="font-medium">30%</span>
                </div>
              </div>
            </div>

            {/* New Regime Slabs */}
            <div>
              <h3 className="text-lg font-medium text-success-600 dark:text-success-400 mb-4">New Tax Regime</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                  <span>Up to ₹3 lakh</span>
                  <span className="font-medium">Nil</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                  <span>₹3 lakh - ₹6 lakh</span>
                  <span className="font-medium">5%</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                  <span>₹6 lakh - ₹9 lakh</span>
                  <span className="font-medium">10%</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                  <span>₹9 lakh - ₹12 lakh</span>
                  <span className="font-medium">15%</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                  <span>₹12 lakh - ₹15 lakh</span>
                  <span className="font-medium">20%</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>Above ₹15 lakh</span>
                  <span className="font-medium">30%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
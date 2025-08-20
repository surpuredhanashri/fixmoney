'use client';

import { useState, useEffect } from 'react';
import { Calculator, TrendingUp, DollarSign, Percent, FileText, Shield } from 'lucide-react';

interface TaxCalculation {
  grossIncome: number;
  regime: 'new' | 'old';
  deductions: {
    section80C: number;
    section80D: number;
    section80TTA: number;
    standardDeduction: number;
    hra: number;
    lta: number;
    otherDeductions: number;
  };
  taxableIncome: number;
  taxAmount: number;
  cess: number;
  totalTax: number;
  effectiveRate: number;
  monthlyTax: number;
  yearlyTax: number;
}

export default function TaxCalculator() {
  const [formData, setFormData] = useState({
    grossIncome: 1000000,
    regime: 'new' as 'new' | 'old',
    section80C: 150000,
    section80D: 25000,
    section80TTA: 10000,
    hra: 120000,
    lta: 20000,
    otherDeductions: 0,
  });

  const [calculation, setCalculation] = useState<TaxCalculation | null>(null);

  // New Tax Regime slabs for FY 2024-25
  const newRegimeSlabs = [
    { min: 0, max: 300000, rate: 0 },
    { min: 300000, max: 600000, rate: 5 },
    { min: 600000, max: 900000, rate: 10 },
    { min: 900000, max: 1200000, rate: 15 },
    { min: 1200000, max: 1500000, rate: 20 },
    { min: 1500000, max: Infinity, rate: 30 },
  ];

  // Old Tax Regime slabs for FY 2024-25
  const oldRegimeSlabs = [
    { min: 0, max: 250000, rate: 0 },
    { min: 250000, max: 500000, rate: 5 },
    { min: 500000, max: 1000000, rate: 20 },
    { min: 1000000, max: Infinity, rate: 30 },
  ];

  const calculateTax = () => {
    const { grossIncome, regime, section80C, section80D, section80TTA, hra, lta, otherDeductions } = formData;
    
    let taxableIncome = grossIncome;
    let totalDeductions = 0;

    if (regime === 'old') {
      // Old regime allows deductions
      totalDeductions = Math.min(section80C, 150000) + 
                       Math.min(section80D, 25000) + 
                       Math.min(section80TTA, 10000) + 
                       50000 + // Standard deduction
                       Math.min(hra, 120000) + 
                       Math.min(lta, 20000) + 
                       otherDeductions;
      
      taxableIncome = Math.max(0, grossIncome - totalDeductions);
    }

    // Calculate tax based on regime
    const slabs = regime === 'new' ? newRegimeSlabs : oldRegimeSlabs;
    let taxAmount = 0;

    for (let i = 0; i < slabs.length; i++) {
      const slab = slabs[i];
      if (taxableIncome > slab.min) {
        const slabAmount = Math.min(taxableIncome - slab.min, slab.max - slab.min);
        taxAmount += (slabAmount * slab.rate) / 100;
      }
    }

    // Add surcharge for high income (old regime)
    let surcharge = 0;
    if (regime === 'old' && taxableIncome > 5000000) {
      if (taxableIncome <= 10000000) {
        surcharge = taxAmount * 0.10;
      } else if (taxableIncome <= 20000000) {
        surcharge = taxAmount * 0.15;
      } else if (taxableIncome <= 50000000) {
        surcharge = taxAmount * 0.25;
      } else {
        surcharge = taxAmount * 0.37;
      }
    }

    // Add surcharge for high income (new regime)
    if (regime === 'new' && taxableIncome > 5000000) {
      if (taxableIncome <= 10000000) {
        surcharge = taxAmount * 0.10;
      } else if (taxableIncome <= 20000000) {
        surcharge = taxAmount * 0.15;
      } else if (taxableIncome <= 50000000) {
        surcharge = taxAmount * 0.25;
      } else {
        surcharge = taxAmount * 0.37;
      }
    }

    const totalTaxBeforeCess = taxAmount + surcharge;
    const cess = totalTaxBeforeCess * 0.04; // 4% health and education cess
    const totalTax = totalTaxBeforeCess + cess;
    const effectiveRate = (totalTax / grossIncome) * 100;

    const result: TaxCalculation = {
      grossIncome,
      regime,
      deductions: {
        section80C,
        section80D,
        section80TTA,
        standardDeduction: regime === 'old' ? 50000 : 0,
        hra: regime === 'old' ? Math.min(hra, 120000) : 0,
        lta: regime === 'old' ? Math.min(lta, 20000) : 0,
        otherDeductions,
      },
      taxableIncome,
      taxAmount,
      cess,
      totalTax,
      effectiveRate,
      monthlyTax: totalTax / 12,
      yearlyTax: totalTax,
    };

    setCalculation(result);
  };

  useEffect(() => {
    calculateTax();
  }, [formData]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (rate: number) => {
    return `${rate.toFixed(2)}%`;
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Calculator Form */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="flex items-center mb-6">
          <Calculator className="w-8 h-8 text-primary-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Calculate Income Tax</h2>
        </div>

        <div className="space-y-6">
          {/* Tax Regime Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Tax Regime
            </label>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="regime"
                  checked={formData.regime === 'new'}
                  onChange={() => setFormData({ ...formData, regime: 'new' })}
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  <Shield className="w-4 h-4 inline mr-1" />
                  New Tax Regime (Default) - Lower rates, no deductions
                </span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="radio"
                  name="regime"
                  checked={formData.regime === 'old'}
                  onChange={() => setFormData({ ...formData, regime: 'old' })}
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  <FileText className="w-4 h-4 inline mr-1" />
                  Old Tax Regime (Optional) - Higher rates, with deductions
                </span>
              </label>
            </div>
          </div>

          {/* Gross Income */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Gross Annual Income (₹)
            </label>
            <input
              type="number"
              value={formData.grossIncome}
              onChange={(e) => setFormData({ ...formData, grossIncome: Number(e.target.value) })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="1000000"
              min="0"
              step="1000"
            />
          </div>

          {/* Deductions (only for old regime) */}
          {formData.regime === 'old' && (
            <>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Deductions</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Section 80C (EPF, ELSS, etc.) - Max ₹1.5L
                    </label>
                    <input
                      type="number"
                      value={formData.section80C}
                      onChange={(e) => setFormData({ ...formData, section80C: Number(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="150000"
                      min="0"
                      max="150000"
                      step="1000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Section 80D (Health Insurance) - Max ₹25K
                    </label>
                    <input
                      type="number"
                      value={formData.section80D}
                      onChange={(e) => setFormData({ ...formData, section80D: Number(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="25000"
                      min="0"
                      max="25000"
                      step="1000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Section 80TTA (Savings Account) - Max ₹10K
                    </label>
                    <input
                      type="number"
                      value={formData.section80TTA}
                      onChange={(e) => setFormData({ ...formData, section80TTA: Number(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="10000"
                      min="0"
                      max="10000"
                      step="1000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      HRA Exemption - Max ₹1.2L
                    </label>
                    <input
                      type="number"
                      value={formData.hra}
                      onChange={(e) => setFormData({ ...formData, hra: Number(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="120000"
                      min="0"
                      max="120000"
                      step="1000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      LTA Exemption - Max ₹20K
                    </label>
                    <input
                      type="number"
                      value={formData.lta}
                      onChange={(e) => setFormData({ ...formData, lta: Number(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="20000"
                      min="0"
                      max="20000"
                      step="1000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Other Deductions
                    </label>
                    <input
                      type="number"
                      value={formData.otherDeductions}
                      onChange={(e) => setFormData({ ...formData, otherDeductions: Number(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="0"
                      min="0"
                      step="1000"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">
        {calculation && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-6 text-white">
                <div className="flex items-center mb-2">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Total Tax</span>
                </div>
                <div className="text-2xl font-bold">{formatCurrency(calculation.totalTax)}</div>
              </div>
              
              <div className="bg-gradient-to-br from-success-500 to-success-600 rounded-xl p-6 text-white">
                <div className="flex items-center mb-2">
                  <Percent className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Effective Rate</span>
                </div>
                <div className="text-2xl font-bold">{formatPercentage(calculation.effectiveRate)}</div>
              </div>
            </div>

            {/* Tax Breakdown */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tax Breakdown</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Gross Income</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(calculation.grossIncome)}</span>
                </div>
                
                {calculation.regime === 'old' && (
                  <>
                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Total Deductions</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {formatCurrency(Object.values(calculation.deductions).reduce((a, b) => a + b, 0))}
                      </span>
                    </div>
                    
                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Taxable Income</span>
                      <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(calculation.taxableIncome)}</span>
                    </div>
                  </>
                )}
                
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Basic Tax</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(calculation.taxAmount)}</span>
                </div>
                
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Health & Education Cess (4%)</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(calculation.cess)}</span>
                </div>
                
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Total Tax</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(calculation.totalTax)}</span>
                </div>
              </div>
            </div>

            {/* Monthly Breakdown */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Breakdown</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Monthly Tax</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(calculation.monthlyTax)}</span>
                </div>
                
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Monthly Take Home</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency((calculation.grossIncome - calculation.totalTax) / 12)}
                  </span>
                </div>
                
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Yearly Take Home</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(calculation.grossIncome - calculation.totalTax)}
                  </span>
                </div>
              </div>
            </div>

            {/* Tax Regime Comparison */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tax Regime Details</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Selected Regime</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {calculation.regime === 'new' ? 'New Tax Regime' : 'Old Tax Regime'}
                  </span>
                </div>
                
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Tax Rate</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {calculation.regime === 'new' ? 'Lower rates, no deductions' : 'Higher rates, with deductions'}
                  </span>
                </div>
                
                {calculation.regime === 'old' && (
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Tip:</strong> You can compare both regimes to see which one saves you more tax. 
                      Old regime might be beneficial if you have significant deductions.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 
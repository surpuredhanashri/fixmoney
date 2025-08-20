'use client';

import { useState, useEffect } from 'react';
import { Calculator, TrendingUp, DollarSign, Percent, Building, MapPin } from 'lucide-react';

interface GSTCalculation {
  baseAmount: number;
  gstRate: number;
  gstAmount: number;
  totalAmount: number;
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
  isInterstate: boolean;
  reverseCharge: boolean;
}

export default function GSTCalculator() {
  const [formData, setFormData] = useState({
    baseAmount: 1000,
    gstRate: 18,
    isInterstate: false,
    reverseCharge: false,
  });

  const [calculation, setCalculation] = useState<GSTCalculation | null>(null);

  const gstRates = [
    { value: 0, label: '0% - Essential items, unprocessed food' },
    { value: 5, label: '5% - Basic necessities, transport' },
    { value: 12, label: '12% - Processed food, computers' },
    { value: 18, label: '18% - Most goods and services' },
    { value: 28, label: '28% - Luxury items, automobiles' },
  ];

  const calculateGST = () => {
    const { baseAmount, gstRate, isInterstate, reverseCharge } = formData;
    
    const gstAmount = (baseAmount * gstRate) / 100;
    const totalAmount = baseAmount + gstAmount;
    
    let cgstAmount = 0;
    let sgstAmount = 0;
    let igstAmount = 0;

    if (isInterstate) {
      // Interstate supply - IGST applies
      igstAmount = gstAmount;
    } else {
      // Intrastate supply - CGST and SGST apply
      cgstAmount = gstAmount / 2;
      sgstAmount = gstAmount / 2;
    }

    const result: GSTCalculation = {
      baseAmount,
      gstRate,
      gstAmount,
      totalAmount,
      cgstAmount,
      sgstAmount,
      igstAmount,
      isInterstate,
      reverseCharge,
    };

    setCalculation(result);
  };

  useEffect(() => {
    calculateGST();
  }, [formData]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatPercentage = (rate: number) => {
    return `${rate}%`;
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Calculator Form */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="flex items-center mb-6">
          <Calculator className="w-8 h-8 text-primary-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Calculate GST</h2>
        </div>

        <div className="space-y-6">
          {/* Base Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Base Amount (₹)
            </label>
            <input
              type="number"
              value={formData.baseAmount}
              onChange={(e) => setFormData({ ...formData, baseAmount: Number(e.target.value) })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="1000"
              min="0"
              step="0.01"
            />
          </div>

          {/* GST Rate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              GST Rate
            </label>
            <select
              value={formData.gstRate}
              onChange={(e) => setFormData({ ...formData, gstRate: Number(e.target.value) })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {gstRates.map((rate) => (
                <option key={rate.value} value={rate.value}>
                  {rate.label}
                </option>
              ))}
            </select>
          </div>

          {/* Supply Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Supply Type
            </label>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="supplyType"
                  checked={!formData.isInterstate}
                  onChange={() => setFormData({ ...formData, isInterstate: false })}
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Intrastate (Same State) - CGST + SGST
                </span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="radio"
                  name="supplyType"
                  checked={formData.isInterstate}
                  onChange={() => setFormData({ ...formData, isInterstate: true })}
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  <Building className="w-4 h-4 inline mr-1" />
                  Interstate (Different State) - IGST
                </span>
              </label>
            </div>
          </div>

          {/* Reverse Charge */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.reverseCharge}
                onChange={(e) => setFormData({ ...formData, reverseCharge: e.target.checked })}
                className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Reverse Charge Mechanism (RCM)
              </span>
            </label>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              When the recipient is liable to pay GST instead of the supplier
            </p>
          </div>
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
                  <span className="text-sm font-medium">Total Amount</span>
                </div>
                <div className="text-2xl font-bold">{formatCurrency(calculation.totalAmount)}</div>
              </div>
              
              <div className="bg-gradient-to-br from-success-500 to-success-600 rounded-xl p-6 text-white">
                <div className="flex items-center mb-2">
                  <DollarSign className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">GST Amount</span>
                </div>
                <div className="text-2xl font-bold">{formatCurrency(calculation.gstAmount)}</div>
              </div>
            </div>

            {/* Detailed Results */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tax Breakdown</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Base Amount</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(calculation.baseAmount)}</span>
                </div>
                
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">GST Rate</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formatPercentage(calculation.gstRate)}</span>
                </div>
                
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">GST Amount</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(calculation.gstAmount)}</span>
                </div>
                
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Total Amount</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(calculation.totalAmount)}</span>
                </div>
              </div>
            </div>

            {/* Tax Components */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tax Components</h3>
              
              {calculation.isInterstate ? (
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">IGST (Integrated GST)</span>
                    <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(calculation.igstAmount)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">CGST</span>
                    <span className="font-medium text-gray-900 dark:text-white">₹0.00</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">SGST</span>
                    <span className="font-medium text-gray-900 dark:text-white">₹0.00</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">CGST (Central GST)</span>
                    <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(calculation.cgstAmount)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(calculation.sgstAmount)}</span>
                    <span className="text-gray-600 dark:text-gray-400">SGST (State GST)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">IGST</span>
                    <span className="font-medium text-gray-900 dark:text-white">₹0.00</span>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Information */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Additional Information</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Supply Type</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {calculation.isInterstate ? 'Interstate (IGST)' : 'Intrastate (CGST + SGST)'}
                  </span>
                </div>
                
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Reverse Charge</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {calculation.reverseCharge ? 'Yes' : 'No'}
                  </span>
                </div>
                
                {calculation.reverseCharge && (
                  <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      <strong>Note:</strong> Under Reverse Charge Mechanism (RCM), the recipient 
                      is liable to pay GST and can claim input tax credit.
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
'use client';

import { useState } from 'react';
import { Calculator, Home, TrendingUp, DollarSign, Info, PieChart } from 'lucide-react';

interface EMICalculation {
  month: number;
  emi: number;
  principal: number;
  interest: number;
  remainingBalance: number;
  totalPaid: number;
}

export default function HomeLoanEMICalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(5000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTenure, setLoanTenure] = useState<number>(20);
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');
  const [downPayment, setDownPayment] = useState<number>(1000000);
  const [propertyValue, setPropertyValue] = useState<number>(6000000);
  const [calculations, setCalculations] = useState<EMICalculation[]>([]);
  const [showAmortization, setShowAmortization] = useState(false);

  const calculateEMI = () => {
    const principal = loanAmount;
    const months = tenureType === 'years' ? loanTenure * 12 : loanTenure;
    const monthlyRate = interestRate / 12 / 100;
    
    // Calculate EMI using formula: EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
    
    const results: EMICalculation[] = [];
    let remainingBalance = principal;
    let totalPaid = 0;
    
    for (let month = 1; month <= months; month++) {
      const interest = remainingBalance * monthlyRate;
      const principalPaid = emi - interest;
      remainingBalance -= principalPaid;
      totalPaid += emi;
      
      results.push({
        month,
        emi: Math.round(emi),
        principal: Math.round(principalPaid),
        interest: Math.round(interest),
        remainingBalance: Math.max(0, Math.round(remainingBalance)),
        totalPaid: Math.round(totalPaid)
      });
    }
    
    setCalculations(results);
  };

  const getTotalInterest = () => {
    if (calculations.length === 0) return 0;
    return calculations.reduce((sum, calc) => sum + calc.interest, 0);
  };

  const getTotalAmount = () => {
    if (calculations.length === 0) return 0;
    return calculations[calculations.length - 1].totalPaid;
  };

  const getEMI = () => {
    if (calculations.length === 0) return 0;
    return calculations[0].emi;
  };

  const getLoanToValue = () => {
    return (loanAmount / propertyValue) * 100;
  };

  const getDownPaymentPercentage = () => {
    return (downPayment / propertyValue) * 100;
  };

  const getAffordability = () => {
    const monthlyIncome = 100000; // Assuming ₹1 lakh monthly income
    const emi = getEMI();
    const emiToIncomeRatio = (emi / monthlyIncome) * 100;
    
    if (emiToIncomeRatio <= 30) return 'Excellent';
    if (emiToIncomeRatio <= 40) return 'Good';
    if (emiToIncomeRatio <= 50) return 'Moderate';
    return 'High Risk';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-success-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Home className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Home Loan EMI Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Calculate your home loan EMI and plan your dream home purchase
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Calculator className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" />
              Calculate Home Loan EMI
            </h2>

            <div className="space-y-4">
              {/* Property Value */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Property Value (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">₹</span>
                  <input
                    type="number"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                    placeholder="6000000"
                    min="100000"
                    step="100000"
                  />
                </div>
              </div>

              {/* Down Payment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Down Payment (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">₹</span>
                  <input
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                    placeholder="1000000"
                    min="0"
                    max={propertyValue}
                    step="100000"
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {getDownPaymentPercentage().toFixed(1)}% of property value
                </p>
              </div>

              {/* Loan Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Loan Amount (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">₹</span>
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                    placeholder="5000000"
                    min="100000"
                    max={propertyValue - downPayment}
                    step="100000"
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  LTV: {getLoanToValue().toFixed(1)}% (Max 90% for most banks)
                </p>
              </div>

              {/* Interest Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Interest Rate (% per annum)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full pr-8 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                    placeholder="8.5"
                    min="5"
                    max="20"
                    step="0.1"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">%</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Current rates: 8.5% - 10.5% (varies by bank and profile)
                </p>
              </div>

              {/* Loan Tenure */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Loan Tenure
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                    placeholder="20"
                    min="1"
                    max={tenureType === 'years' ? '30' : '360'}
                  />
                  <select
                    value={tenureType}
                    onChange={(e) => setTenureType(e.target.value as 'years' | 'months')}
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                  >
                    <option value="years">Years</option>
                    <option value="months">Months</option>
                  </select>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Maximum tenure: {tenureType === 'years' ? '30 years' : '360 months'}
                </p>
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculateEMI}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Calculate EMI
              </button>
            </div>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p className="font-medium mb-1">Home Loan Tips:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Down payment: 10-20% of property value</li>
                    <li>• EMI should not exceed 40-50% of monthly income</li>
                    <li>• Longer tenure = lower EMI but higher total interest</li>
                    <li>• Compare rates from multiple banks</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-success-600 dark:text-success-400" />
              EMI Calculation Results
            </h2>

            {calculations.length > 0 ? (
              <div className="space-y-6">
                {/* EMI Display */}
                <div className="bg-gradient-to-r from-primary-50 to-success-50 dark:from-primary-900/20 dark:to-success-900/20 border border-primary-200 dark:border-primary-700 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    ₹{getEMI().toLocaleString('en-IN')}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Monthly EMI</div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-700 rounded-lg p-4 text-center">
                    <div className="text-lg font-bold text-primary-600 dark:text-primary-400 mb-1">
                      ₹{loanAmount.toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-primary-700 dark:text-primary-300">Loan Amount</div>
                  </div>
                  
                  <div className="bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-700 rounded-lg p-4 text-center">
                    <div className="text-lg font-bold text-success-600 dark:text-success-400 mb-1">
                      ₹{getTotalInterest().toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-success-700 dark:text-success-300">Total Interest</div>
                  </div>
                </div>

                <div className="bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-700 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-warning-600 dark:text-warning-400 mb-1">
                    ₹{getTotalAmount().toLocaleString('en-IN')}
                  </div>
                  <div className="text-sm text-warning-700 dark:text-warning-300">Total Amount to Pay</div>
                </div>

                {/* Affordability Check */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">Affordability Check</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">EMI to Income Ratio:</span>
                      <span className="font-medium">{((getEMI() / 100000) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Risk Level:</span>
                      <span className={`font-medium ${
                        getAffordability() === 'Excellent' ? 'text-success-600 dark:text-success-400' :
                        getAffordability() === 'Good' ? 'text-primary-600 dark:text-primary-400' :
                        getAffordability() === 'Moderate' ? 'text-warning-600 dark:text-warning-400' :
                        'text-danger-600 dark:text-danger-400'
                      }`}>
                        {getAffordability()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Breakdown Toggle */}
                <div className="text-center">
                  <button
                    onClick={() => setShowAmortization(!showAmortization)}
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium"
                  >
                    {showAmortization ? 'Hide' : 'Show'} Amortization Schedule
                  </button>
                </div>

                {/* Amortization Schedule */}
                {showAmortization && (
                  <div className="max-h-96 overflow-y-auto">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-3">Amortization Schedule</h3>
                      <div className="space-y-2 text-sm">
                        {calculations.slice(0, 12).map((calc) => (
                          <div key={calc.month} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600 last:border-b-0">
                            <span className="text-gray-600 dark:text-gray-400">Month {calc.month}</span>
                            <div className="text-right">
                              <div className="text-gray-900 dark:text-white font-medium">
                                EMI: ₹{calc.emi.toLocaleString('en-IN')}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-500">
                                Principal: ₹{calc.principal.toLocaleString('en-IN')} | Interest: ₹{calc.interest.toLocaleString('en-IN')}
                              </div>
                            </div>
                          </div>
                        ))}
                        {calculations.length > 12 && (
                          <div className="text-center text-sm text-gray-500 dark:text-gray-500 py-2">
                            ... and {calculations.length - 12} more months
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calculator className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  Enter your loan details and click calculate to see EMI results
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Benefits of Home Loans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <Home className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Own Your Home</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Build equity and create a valuable asset for your future
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-6 h-6 text-success-600 dark:text-success-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Tax Benefits</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Deduct interest up to ₹2 lakh under Section 24(b)
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-warning-600 dark:text-warning-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Long-term Investment</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Property values typically appreciate over time
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
'use client';

import { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Info, Percent, ShoppingCart, Tag } from 'lucide-react';

interface DiscountScenario {
  name: string;
  originalPrice: number;
  discountType: 'percentage' | 'amount' | 'buyXGetY' | 'stacked';
  discountValue: number;
  finalPrice: number;
  savings: number;
  savingsPercentage: number;
}

export default function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState<number>(1000);
  const [discountType, setDiscountType] = useState<'percentage' | 'amount' | 'buyXGetY' | 'stacked'>('percentage');
  const [discountValue, setDiscountValue] = useState<number>(20);
  const [quantity, setQuantity] = useState<number>(1);
  const [taxRate, setTaxRate] = useState<number>(18);
  const [showComparison, setShowComparison] = useState(false);
  const [showTaxAnalysis, setShowTaxAnalysis] = useState(false);

  const calculateDiscount = () => {
    // This function will be called when needed
  };

  const getDiscountAmount = () => {
    if (discountType === 'percentage') {
      return (originalPrice * discountValue) / 100;
    } else if (discountType === 'amount') {
      return discountValue;
    } else if (discountType === 'buyXGetY') {
      // Buy X Get Y discount (e.g., Buy 2 Get 1 Free)
      const freeItems = Math.floor(quantity / (discountValue + 1));
      return freeItems * originalPrice;
    } else if (discountType === 'stacked') {
      // Stacked discounts (e.g., 20% + 10% additional)
      const firstDiscount = (originalPrice * discountValue) / 100;
      const secondDiscount = ((originalPrice - firstDiscount) * 10) / 100;
      return firstDiscount + secondDiscount;
    }
    return 0;
  };

  const getFinalPrice = () => {
    return Math.max(0, originalPrice - getDiscountAmount());
  };

  const getSavings = () => {
    return getDiscountAmount();
  };

  const getSavingsPercentage = () => {
    if (originalPrice === 0) return 0;
    return (getSavings() / originalPrice) * 100;
  };

  const getPriceAfterTax = () => {
    return getFinalPrice() * (1 + taxRate / 100);
  };

  const getTotalSavings = () => {
    return originalPrice - getPriceAfterTax();
  };

  const getEffectiveDiscount = () => {
    if (originalPrice === 0) return 0;
    return ((originalPrice - getPriceAfterTax()) / originalPrice) * 100;
  };

  const getDiscountScenarios = (): DiscountScenario[] => {
    const scenarios: DiscountScenario[] = [];
    
    // Percentage discount
    scenarios.push({
      name: 'Percentage Discount',
      originalPrice,
      discountType: 'percentage',
      discountValue: 20,
      finalPrice: originalPrice * 0.8,
      savings: originalPrice * 0.2,
      savingsPercentage: 20
    });
    
    // Amount discount
    scenarios.push({
      name: 'Fixed Amount Discount',
      originalPrice,
      discountType: 'amount',
      discountValue: 200,
      finalPrice: Math.max(0, originalPrice - 200),
      savings: Math.min(200, originalPrice),
      savingsPercentage: Math.min((200 / originalPrice) * 100, 100)
    });
    
    // Buy X Get Y
    scenarios.push({
      name: 'Buy 2 Get 1 Free',
      originalPrice,
      discountType: 'buyXGetY',
      discountValue: 2,
      finalPrice: originalPrice * 2, // Pay for 2, get 3
      savings: originalPrice,
      savingsPercentage: 33.33
    });
    
    // Stacked discounts
    scenarios.push({
      name: 'Stacked Discounts',
      originalPrice,
      discountType: 'stacked',
      discountValue: 20,
      finalPrice: originalPrice * 0.8 * 0.9, // 20% + 10%
      savings: originalPrice - (originalPrice * 0.8 * 0.9),
      savingsPercentage: 28
    });
    
    return scenarios;
  };

  const getBestDeal = () => {
    const scenarios = getDiscountScenarios();
    return scenarios.reduce((best, current) => 
      current.savingsPercentage > best.savingsPercentage ? current : best
    );
  };

  const getWorstDeal = () => {
    const scenarios = getDiscountScenarios();
    return scenarios.reduce((worst, current) => 
      current.savingsPercentage < worst.savingsPercentage ? current : worst
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-success-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Tag className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Discount Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Calculate discounts, final prices, and savings with multiple discount types
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Calculator className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" />
              Calculate Discount
            </h2>

            <div className="space-y-4">
              {/* Original Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Original Price (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">₹</span>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                    placeholder="1000"
                    min="0"
                    step="10"
                  />
                </div>
              </div>

              {/* Discount Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Discount Type
                </label>
                <select
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value as any)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                >
                  <option value="percentage">Percentage Discount (%)</option>
                  <option value="amount">Fixed Amount Discount (₹)</option>
                  <option value="buyXGetY">Buy X Get Y Free</option>
                  <option value="stacked">Stacked Discounts</option>
                </select>
              </div>

              {/* Discount Value */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  {discountType === 'percentage' ? 'Discount Percentage' : 
                   discountType === 'amount' ? 'Discount Amount' :
                   discountType === 'buyXGetY' ? 'Buy X Items' : 'First Discount %'}
                </label>
                <div className="relative">
                  {discountType !== 'amount' && (
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                      {discountType === 'percentage' || discountType === 'stacked' ? '%' : ''}
                    </span>
                  )}
                  {discountType === 'amount' && (
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">₹</span>
                  )}
                  <input
                    type="number"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                    className={`w-full py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent ${
                      discountType === 'amount' ? 'pl-8 pr-4' : 'px-4 pr-8'
                    }`}
                    placeholder={discountType === 'percentage' ? '20' : discountType === 'amount' ? '200' : '2'}
                    min="0"
                    max={discountType === 'percentage' ? 100 : undefined}
                    step={discountType === 'percentage' ? 0.1 : 1}
                  />
                </div>
              </div>

              {/* Quantity (for Buy X Get Y) */}
              {discountType === 'buyXGetY' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Quantity to Purchase
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                    placeholder="3"
                    min="1"
                    step="1"
                  />
                </div>
              )}

              {/* Tax Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Tax Rate (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={taxRate}
                    onChange={(e) => setTaxRate(Number(e.target.value))}
                    className="w-full pr-8 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                    placeholder="18"
                    min="0"
                    max="50"
                    step="0.1"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">%</span>
                </div>
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculateDiscount}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Calculate Discount
              </button>
            </div>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p className="font-medium mb-1">Discount Types:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Percentage: Standard % off</li>
                    <li>• Amount: Fixed ₹ off</li>
                    <li>• Buy X Get Y: Bundle offers</li>
                    <li>• Stacked: Multiple discounts</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-success-600 dark:text-success-400" />
              Discount Results
            </h2>

            <div className="space-y-6">
              {/* Final Price Display */}
              <div className="bg-gradient-to-r from-success-50 to-primary-50 dark:from-success-900/20 dark:to-primary-900/20 border border-success-200 dark:border-success-700 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  ₹{getFinalPrice().toLocaleString('en-IN')}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Final Price</div>
                <div className="text-lg font-medium text-gray-700 dark:text-gray-300 mt-2">
                  ₹{getPriceAfterTax().toLocaleString('en-IN')} with tax
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-700 rounded-lg p-4 text-center">
                  <div className="text-lg font-bold text-primary-600 dark:text-primary-400 mb-1">
                    ₹{getSavings().toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-primary-700 dark:text-primary-300">Total Savings</div>
                </div>
                
                <div className="bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-700 rounded-lg p-4 text-center">
                  <div className="text-lg font-bold text-success-600 dark:text-success-400 mb-1">
                    {getSavingsPercentage().toFixed(1)}%
                  </div>
                  <div className="text-xs text-success-700 dark:text-success-300">Savings %</div>
                </div>
              </div>

              {/* Additional Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-700 rounded-lg p-4 text-center">
                  <div className="text-lg font-bold text-warning-600 dark:text-warning-400 mb-1">
                    ₹{getTotalSavings().toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-warning-700 dark:text-warning-300">Total Savings</div>
                </div>
                
                <div className="bg-info-50 dark:bg-info-900/20 border border-info-200 dark:border-info-700 rounded-lg p-4 text-center">
                  <div className="text-lg font-bold text-info-600 dark:text-info-400 mb-1">
                    {getEffectiveDiscount().toFixed(1)}%
                  </div>
                  <div className="text-xs text-info-700 dark:text-info-300">Effective Discount</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowComparison(!showComparison)}
                  className="flex-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 py-2 px-4 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
                >
                  {showComparison ? 'Hide' : 'Show'} Comparison
                </button>
                <button
                  onClick={() => setShowTaxAnalysis(!showTaxAnalysis)}
                  className="flex-1 bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-300 py-2 px-4 rounded-lg hover:bg-success-200 dark:hover:bg-success-900/50 transition-colors"
                >
                  {showTaxAnalysis ? 'Hide' : 'Show'} Tax Analysis
                </button>
              </div>

              {/* Discount Comparison */}
              {showComparison && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">Discount Comparison</h3>
                  <div className="space-y-3 text-sm">
                    {getDiscountScenarios().map((scenario) => (
                      <div key={scenario.name} className="flex justify-between items-center p-3 bg-white dark:bg-gray-600 rounded-lg">
                        <span className="text-gray-600 dark:text-gray-400">{scenario.name}</span>
                        <div className="text-right">
                          <div className="text-gray-900 dark:text-white font-medium">
                            ₹{scenario.finalPrice.toFixed(0)}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-500">
                            Save {scenario.savingsPercentage.toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-green-700 dark:text-green-300">Best Deal</span>
                      <span className="text-sm font-medium text-green-700 dark:text-green-300">
                        {getBestDeal().name} - Save {getBestDeal().savingsPercentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tax Analysis */}
              {showTaxAnalysis && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">Tax Analysis</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-400">Price before tax</span>
                      <span className="font-medium text-blue-600 dark:text-blue-400">
                        ₹{getFinalPrice().toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-400">Tax amount</span>
                      <span className="font-medium text-red-600 dark:text-red-400">
                        ₹{(getFinalPrice() * taxRate / 100).toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-400">Final price with tax</span>
                      <span className="font-medium text-green-600 dark:text-green-400">
                        ₹{getPriceAfterTax().toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Visual Charts */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Discount Analysis
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Savings Chart */}
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Price vs Savings</h3>
              <div className="relative w-48 h-48 mx-auto">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Final Price Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="#10B981"
                    stroke="#059669"
                    strokeWidth="2"
                  />
                  {/* Savings Arc */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="8"
                    strokeDasharray={`${(getSavings() / originalPrice) * 251.2} 251.2`}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {getSavingsPercentage().toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Saved</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center space-x-4 mt-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-gray-600 dark:text-gray-400">Final Price</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-gray-600 dark:text-gray-400">Savings</span>
                </div>
              </div>
            </div>

            {/* Discount Comparison Chart */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Discount Comparison</h3>
              <div className="space-y-2">
                {getDiscountScenarios().map((scenario) => (
                  <div key={scenario.name} className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400 w-24 truncate">{scenario.name}</span>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                      <div
                        className="bg-blue-500 h-4 rounded-full transition-all duration-300"
                        style={{ width: `${scenario.savingsPercentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white w-16">
                      {scenario.savingsPercentage.toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Discount Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <ShoppingCart className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Smart Shopping</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Compare different discount types for best deals
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <Percent className="w-6 h-6 text-success-600 dark:text-success-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Multiple Types</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Handle percentage, amount, and bundle discounts
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <Tag className="w-6 h-6 text-warning-600 dark:text-warning-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Tax Inclusive</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Calculate final prices including taxes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
'use client';

import { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Info, Home, MapPin, Receipt } from 'lucide-react';

interface CityHRA {
  name: string;
  category: 'Metro' | 'Non-Metro';
  hraRate: number;
  description: string;
}

export default function HRACalculator() {
  const [basicSalary, setBasicSalary] = useState<number>(500000);
  const [hraReceived, setHraReceived] = useState<number>(200000);
  const [rentPaid, setRentPaid] = useState<number>(180000);
  const [cityCategory, setCityCategory] = useState<string>('metro');
  const [showDetailedBreakdown, setShowDetailedBreakdown] = useState(false);
  const [showCityComparison, setShowCityComparison] = useState(false);

  const cities: CityHRA[] = [
    { name: 'Mumbai', category: 'Metro', hraRate: 50, description: 'Maximum HRA exemption' },
    { name: 'Delhi', category: 'Metro', hraRate: 50, description: 'Maximum HRA exemption' },
    { name: 'Kolkata', category: 'Metro', hraRate: 50, description: 'Maximum HRA exemption' },
    { name: 'Chennai', category: 'Metro', hraRate: 50, description: 'Maximum HRA exemption' },
    { name: 'Bangalore', category: 'Non-Metro', hraRate: 40, description: 'Standard HRA exemption' },
    { name: 'Hyderabad', category: 'Non-Metro', hraRate: 40, description: 'Standard HRA exemption' },
    { name: 'Pune', category: 'Non-Metro', hraRate: 40, description: 'Standard HRA exemption' },
    { name: 'Ahmedabad', category: 'Non-Metro', hraRate: 40, description: 'Standard HRA exemption' },
    { name: 'Other Cities', category: 'Non-Metro', hraRate: 40, description: 'Standard HRA exemption' },
  ];

  const calculateHRA = () => {
    // HRA calculation logic will be implemented here
  };

  const getHRAExemption = () => {
    const selectedCity = cities.find(c => c.name.toLowerCase().includes(cityCategory) || c.category.toLowerCase() === cityCategory);
    if (!selectedCity) return 0;
    
    const hraRate = selectedCity.hraRate / 100;
    
    // HRA Exemption = Minimum of:
    // 1. Actual HRA received
    // 2. Rent paid - 10% of basic salary
    // 3. 50% of basic salary (metro) or 40% (non-metro)
    
    const option1 = hraReceived;
    const option2 = Math.max(0, rentPaid - (basicSalary * 0.1));
    const option3 = basicSalary * hraRate;
    
    return Math.min(option1, option2, option3);
  };

  const getTaxableHRA = () => {
    return Math.max(0, hraReceived - getHRAExemption());
  };

  const getTaxSaved = () => {
    // Assuming 30% tax bracket for calculation
    return getHRAExemption() * 0.3;
  };

  const getEffectiveRent = () => {
    return rentPaid - getTaxSaved();
  };

  const getHRAUtilization = () => {
    if (hraReceived === 0) return 0;
    return (getHRAExemption() / hraReceived) * 100;
  };

  const getRentToSalaryRatio = () => {
    if (basicSalary === 0) return 0;
    return (rentPaid / basicSalary) * 100;
  };

  const getOptimalHRA = () => {
    const selectedCity = cities.find(c => c.name.toLowerCase().includes(cityCategory) || c.category.toLowerCase() === cityCategory);
    if (!selectedCity) return 0;
    
    const hraRate = selectedCity.hraRate / 100;
    return basicSalary * hraRate;
  };

  const getHRAEfficiency = () => {
    const optimal = getOptimalHRA();
    if (optimal === 0) return 0;
    return (hraReceived / optimal) * 100;
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
            HRA Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Calculate HRA tax benefits and exemptions with city-wise rates
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Calculator className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" />
              Calculate HRA Benefits
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
                    placeholder="500000"
                    min="0"
                    step="1000"
                  />
                </div>
              </div>

              {/* HRA Received */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  HRA Received (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">₹</span>
                  <input
                    type="number"
                    value={hraReceived}
                    onChange={(e) => setHraReceived(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                    placeholder="200000"
                    min="0"
                    step="1000"
                  />
                </div>
              </div>

              {/* Rent Paid */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Annual Rent Paid (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">₹</span>
                  <input
                    type="number"
                    value={rentPaid}
                    onChange={(e) => setRentPaid(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                    placeholder="180000"
                    min="0"
                    step="1000"
                  />
                </div>
              </div>

              {/* City Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  City Category
                </label>
                <select
                  value={cityCategory}
                  onChange={(e) => setCityCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                >
                  <option value="metro">Metro Cities (50% HRA)</option>
                  <option value="non-metro">Non-Metro Cities (40% HRA)</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="delhi">Delhi</option>
                  <option value="kolkata">Kolkata</option>
                  <option value="chennai">Chennai</option>
                  <option value="bangalore">Bangalore</option>
                  <option value="hyderabad">Hyderabad</option>
                  <option value="pune">Pune</option>
                  <option value="ahmedabad">Ahmedabad</option>
                </select>
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculateHRA}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Calculate HRA Benefits
              </button>
            </div>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p className="font-medium mb-1">HRA Calculation:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Metro cities: 50% of basic salary</li>
                    <li>• Non-metro: 40% of basic salary</li>
                    <li>• Actual rent paid - 10% of basic</li>
                    <li>• Actual HRA received</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-success-600 dark:text-success-400" />
              HRA Analysis Results
            </h2>

            <div className="space-y-6">
              {/* Tax Saved Display */}
              <div className="bg-gradient-to-r from-success-50 to-primary-50 dark:from-success-900/20 dark:to-primary-900/20 border border-success-200 dark:border-success-700 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  ₹{getTaxSaved().toLocaleString('en-IN')}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Annual Tax Saved</div>
                <div className="text-lg font-medium text-gray-700 dark:text-gray-300 mt-2">
                  ₹{(getTaxSaved() / 12).toFixed(0)} monthly
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-700 rounded-lg p-4 text-center">
                  <div className="text-lg font-bold text-primary-600 dark:text-primary-400 mb-1">
                    ₹{getHRAExemption().toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-primary-700 dark:text-primary-300">HRA Exemption</div>
                </div>
                
                <div className="bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-700 rounded-lg p-4 text-center">
                  <div className="text-lg font-bold text-warning-600 dark:text-warning-400 mb-1">
                    ₹{getTaxableHRA().toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-warning-700 dark:text-warning-300">Taxable HRA</div>
                </div>
              </div>

              {/* Additional Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-info-50 dark:bg-info-900/20 border border-info-200 dark:border-info-700 rounded-lg p-4 text-center">
                  <div className="text-lg font-bold text-info-600 dark:text-info-400 mb-1">
                    ₹{getEffectiveRent().toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-info-700 dark:text-info-300">Effective Rent</div>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg p-4 text-center">
                  <div className="text-lg font-bold text-purple-600 dark:text-purple-400 mb-1">
                    {getHRAUtilization().toFixed(1)}%
                  </div>
                  <div className="text-xs text-purple-700 dark:text-purple-300">HRA Utilization</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDetailedBreakdown(!showDetailedBreakdown)}
                  className="flex-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 py-2 px-4 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
                >
                  {showDetailedBreakdown ? 'Hide' : 'Show'} Breakdown
                </button>
                <button
                  onClick={() => setShowCityComparison(!showCityComparison)}
                  className="flex-1 bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-300 py-2 px-4 rounded-lg hover:bg-success-200 dark:hover:bg-success-900/50 transition-colors"
                >
                  {showCityComparison ? 'Hide' : 'Show'} Cities
                </button>
              </div>

              {/* Detailed Breakdown */}
              {showDetailedBreakdown && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">HRA Calculation Breakdown</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-400">Actual HRA Received</span>
                      <span className="font-medium text-blue-600 dark:text-blue-400">
                        ₹{hraReceived.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-400">Rent Paid - 10% Basic</span>
                      <span className="font-medium text-green-600 dark:text-green-400">
                        ₹{Math.max(0, rentPaid - (basicSalary * 0.1)).toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-400">50%/40% of Basic</span>
                      <span className="font-medium text-yellow-600 dark:text-yellow-400">
                        ₹{getOptimalHRA().toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-400">HRA Exemption (Min of above)</span>
                      <span className="font-medium text-purple-600 dark:text-purple-400">
                        ₹{getHRAExemption().toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* City Comparison */}
              {showCityComparison && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">City-wise HRA Rates</h3>
                  <div className="space-y-2 text-sm">
                    {cities.map((city) => (
                      <div key={city.name} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-600 last:border-b-0">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${city.category === 'Metro' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                          <span className="text-gray-600 dark:text-gray-400">{city.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-gray-900 dark:text-white font-medium">
                            {city.hraRate}%
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-500">
                            {city.category}
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
            HRA Analysis
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pie Chart */}
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">HRA vs Taxable Amount</h3>
              <div className="relative w-48 h-48 mx-auto">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* HRA Exemption Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="#10B981"
                    stroke="#059669"
                    strokeWidth="2"
                  />
                  {/* Taxable HRA Arc */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="8"
                    strokeDasharray={`${(getTaxableHRA() / hraReceived) * 251.2} 251.2`}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {getHRAUtilization().toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Exempt</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center space-x-4 mt-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-gray-600 dark:text-gray-400">Exempt</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-gray-600 dark:text-gray-400">Taxable</span>
                </div>
              </div>
            </div>

            {/* Efficiency Chart */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">HRA Efficiency</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-20">HRA Utilization</span>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                    <div
                      className="bg-green-500 h-4 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(getHRAUtilization(), 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white w-16">
                    {getHRAUtilization().toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-20">Rent Ratio</span>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                    <div
                      className="bg-blue-500 h-4 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(getRentToSalaryRatio(), 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white w-16">
                    {getRentToSalaryRatio().toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-20">HRA Efficiency</span>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                    <div
                      className="bg-purple-500 h-4 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(getHRAEfficiency(), 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white w-16">
                    {getHRAEfficiency().toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            HRA Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <Receipt className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Tax Savings</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Reduce your tax liability with HRA exemptions
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6 text-success-600 dark:text-success-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">City Benefits</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Higher exemptions in metro cities
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <Home className="w-6 h-6 text-warning-600 dark:text-warning-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Rent Support</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Financial support for housing expenses
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
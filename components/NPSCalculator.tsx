'use client';

import { useState } from 'react';
import { Calculator, TrendingUp, Calendar, DollarSign, Info, PieChart } from 'lucide-react';

interface NPSCalculation {
  year: number;
  age: number;
  contribution: number;
  employerContribution: number;
  totalContribution: number;
  returns: number;
  corpus: number;
}

export default function NPSCalculator() {
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(60);
  const [monthlySalary, setMonthlySalary] = useState<number>(50000);
  const [expectedReturn, setExpectedReturn] = useState<number>(10);
  const [employeeContribution, setEmployeeContribution] = useState<number>(10);
  const [employerContribution, setEmployerContribution] = useState<number>(10);
  const [calculations, setCalculations] = useState<NPSCalculation[]>([]);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const calculateNPS = () => {
    const years = retirementAge - currentAge;
    const monthlyEmployeeContribution = (monthlySalary * employeeContribution) / 100;
    const monthlyEmployerContribution = (monthlySalary * employerContribution) / 100;
    const totalMonthlyContribution = monthlyEmployeeContribution + monthlyEmployerContribution;
    const annualContribution = totalMonthlyContribution * 12;
    const monthlyRate = expectedReturn / 12 / 100;
    
    const results: NPSCalculation[] = [];
    let corpus = 0;
    
    for (let year = 1; year <= years; year++) {
      const age = currentAge + year;
      const employeeContributionYear = monthlyEmployeeContribution * 12;
      const employerContributionYear = monthlyEmployerContribution * 12;
      const totalContributionYear = employeeContributionYear + employerContributionYear;
      
      // Calculate returns on existing corpus
      const returnsOnCorpus = corpus * (expectedReturn / 100);
      
      // Calculate returns on new contributions (average 6 months)
      const returnsOnNewContribution = (totalContributionYear * expectedReturn / 100) * 0.5;
      
      const totalReturns = returnsOnCorpus + returnsOnNewContribution;
      corpus += totalContributionYear + totalReturns;
      
      results.push({
        year,
        age,
        contribution: employeeContributionYear,
        employerContribution: employerContributionYear,
        totalContribution: totalContributionYear,
        returns: totalReturns,
        corpus: Math.round(corpus)
      });
    }
    
    setCalculations(results);
  };

  const getTotalEmployeeContribution = () => {
    if (calculations.length === 0) return 0;
    return calculations.reduce((sum, calc) => sum + calc.contribution, 0);
  };

  const getTotalEmployerContribution = () => {
    if (calculations.length === 0) return 0;
    return calculations.reduce((sum, calc) => sum + calc.employerContribution, 0);
  };

  const getTotalCorpus = () => {
    if (calculations.length === 0) return 0;
    return calculations[calculations.length - 1].corpus;
  };

  const getTotalReturns = () => {
    if (calculations.length === 0) return 0;
    return calculations.reduce((sum, calc) => sum + calc.returns, 0);
  };

  const getMonthlyPension = () => {
    const corpus = getTotalCorpus();
    // Assuming 40% of corpus is used for annuity and 6% return on annuity
    const annuityCorpus = corpus * 0.4;
    const monthlyPension = (annuityCorpus * 0.06) / 12;
    return Math.round(monthlyPension);
  };

  const getLumpSumAmount = () => {
    const corpus = getTotalCorpus();
    // 60% can be withdrawn as lump sum
    return Math.round(corpus * 0.6);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-success-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calculator className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            NPS Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Calculate your National Pension Scheme returns and retirement corpus
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Calculator className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" />
              Calculate NPS Returns
            </h2>

            <div className="space-y-4">
              {/* Age Inputs */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Current Age
                  </label>
                  <input
                    type="number"
                    value={currentAge}
                    onChange={(e) => setCurrentAge(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                    placeholder="30"
                    min="18"
                    max="65"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Retirement Age
                  </label>
                  <input
                    type="number"
                    value={retirementAge}
                    onChange={(e) => setRetirementAge(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                    placeholder="60"
                    min="50"
                    max="70"
                  />
                </div>
              </div>

              {/* Salary */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Monthly Basic Salary (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">₹</span>
                  <input
                    type="number"
                    value={monthlySalary}
                    onChange={(e) => setMonthlySalary(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                    placeholder="50000"
                    min="10000"
                    step="1000"
                  />
                </div>
              </div>

              {/* Contribution Rates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Employee Contribution (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={employeeContribution}
                      onChange={(e) => setEmployeeContribution(Number(e.target.value))}
                      className="w-full pr-8 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                      placeholder="10"
                      min="5"
                      max="20"
                      step="1"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">%</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Employer Contribution (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={employerContribution}
                      onChange={(e) => setEmployerContribution(Number(e.target.value))}
                      className="w-full pr-8 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                      placeholder="10"
                      min="0"
                      max="20"
                      step="1"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">%</span>
                  </div>
                </div>
              </div>

              {/* Expected Return */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Expected Annual Return (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(Number(e.target.value))}
                    className="w-full pr-8 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                    placeholder="10"
                    min="5"
                    max="15"
                    step="0.5"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">%</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Historical NPS returns: 8-12% per annum
                </p>
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculateNPS}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Calculate NPS Returns
              </button>
            </div>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p className="font-medium mb-1">NPS Key Features:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Tax deduction up to ₹1.5 lakh under Section 80C</li>
                    <li>• Additional ₹50,000 under Section 80CCD(1B)</li>
                    <li>• 40% corpus used for annuity, 60% tax-free withdrawal</li>
                    <li>• Minimum contribution: ₹6,000 per year</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-success-600 dark:text-success-400" />
              NPS Calculation Results
            </h2>

            {calculations.length > 0 ? (
              <div className="space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-700 rounded-lg p-4 text-center">
                    <div className="text-lg font-bold text-primary-600 dark:text-primary-400 mb-1">
                      ₹{getTotalEmployeeContribution().toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-primary-700 dark:text-primary-300">Your Contribution</div>
                  </div>
                  
                  <div className="bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-700 rounded-lg p-4 text-center">
                    <div className="text-lg font-bold text-success-600 dark:text-success-400 mb-1">
                      ₹{getTotalEmployerContribution().toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-success-700 dark:text-success-300">Employer Contribution</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-success-50 to-primary-50 dark:from-success-900/20 dark:to-primary-900/20 border border-success-200 dark:border-success-700 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    ₹{getTotalCorpus().toLocaleString('en-IN')}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Corpus at Retirement</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    Returns: ₹{getTotalReturns().toLocaleString('en-IN')}
                  </div>
                </div>

                {/* Pension & Lump Sum */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-700 rounded-lg p-4 text-center">
                    <div className="text-lg font-bold text-warning-600 dark:text-warning-400 mb-1">
                      ₹{getMonthlyPension().toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-warning-700 dark:text-warning-300">Monthly Pension</div>
                  </div>
                  
                  <div className="bg-info-50 dark:bg-info-900/20 border border-info-200 dark:border-info-700 rounded-lg p-4 text-center">
                    <div className="text-lg font-bold text-info-600 dark:text-info-400 mb-1">
                      ₹{getLumpSumAmount().toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-info-700 dark:text-info-300">Lump Sum (60%)</div>
                  </div>
                </div>

                {/* Breakdown Toggle */}
                <div className="text-center">
                  <button
                    onClick={() => setShowBreakdown(!showBreakdown)}
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium"
                  >
                    {showBreakdown ? 'Hide' : 'Show'} Yearly Breakdown
                  </button>
                </div>

                {/* Yearly Breakdown */}
                {showBreakdown && (
                  <div className="max-h-96 overflow-y-auto">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-3">Yearly Breakdown</h3>
                      <div className="space-y-2 text-sm">
                        {calculations.map((calc) => (
                          <div key={calc.year} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600 last:border-b-0">
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Year {calc.year}</span>
                              <div className="text-xs text-gray-500 dark:text-gray-500">Age: {calc.age}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-gray-900 dark:text-white font-medium">
                                ₹{calc.corpus.toLocaleString('en-IN')}
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
              </div>
            ) : (
              <div className="text-center py-12">
                <Calculator className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  Enter your NPS details and click calculate to see results
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Benefits of National Pension Scheme (NPS)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Tax Benefits</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Up to ₹2 lakh tax deduction under Section 80C and 80CCD(1B)
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-success-600 dark:text-success-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Market Returns</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Potential for higher returns through equity and debt investments
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-warning-600 dark:text-warning-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Retirement Security</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Regular pension income and lump sum withdrawal at retirement
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
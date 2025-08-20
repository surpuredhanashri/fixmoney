import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Calculator, 
  TrendingUp, 
  Home, 
  Car, 
  GraduationCap, 
  Heart,
  Bitcoin,
  DollarSign,
  PiggyBank,
  Target,
  Building,
  Users,
  Gift,
  Clock,
  BarChart3
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Financial Calculators - Calculate Investments Online | FixMoney.in',
  description: 'Comprehensive collection of financial calculators including EMI, SIP, FD, PPF, Tax, and more. Plan your investments and loans with our accurate Indian financial calculators.',
  keywords: 'financial calculators, EMI calculator, SIP calculator, FD calculator, PPF calculator, tax calculator, investment calculator',
};

const calculatorCategories = [
  {
    title: 'Loan & EMI Calculators',
    icon: <Calculator className="w-6 h-6" />,
    calculators: [
      { name: 'EMI Calculator', path: '/calculators/emi', description: 'Calculate loan EMI for any amount and tenure' },
      { name: 'Home Loan EMI Calculator', path: '/calculators/home-loan-emi', description: 'Calculate home loan EMI with interest rates' },
      { name: 'Personal Loan EMI Calculator', path: '/calculators/personal-loan-emi', description: 'Calculate personal loan EMI and total cost' },
      { name: 'Car Loan EMI Calculator', path: '/calculators/car-loan-emi', description: 'Calculate car loan EMI and down payment' },
      { name: 'Education Loan EMI Calculator', path: '/calculators/education-loan-emi', description: 'Plan your education loan with EMI calculator' },
      { name: 'Mortgage Calculator', path: '/calculators/mortgage', description: 'Calculate mortgage payments and interest' },
      { name: 'Lease Calculator', path: '/calculators/lease', description: 'Calculate lease payments and total cost' },
    ]
  },
  {
    title: 'Investment Calculators',
    icon: <TrendingUp className="w-6 h-6" />,
    calculators: [
      { name: 'SIP Calculator', path: '/calculators/sip', description: 'Calculate SIP returns and wealth creation' },
      { name: 'FD Calculator', path: '/calculators/fd', description: 'Calculate fixed deposit returns and maturity amount' },
      { name: 'PPF Calculator', path: '/calculators/ppf', description: 'Calculate PPF returns and tax benefits' },
      { name: 'RD Calculator', path: '/calculators/rd', description: 'Calculate recurring deposit returns' },
      { name: 'Mutual Fund Calculator', path: '/calculators/mutual-fund', description: 'Calculate mutual fund returns and SIP' },
      { name: 'NPS Calculator', path: '/calculators/nps', description: 'Calculate National Pension Scheme returns' },
      { name: 'SSY Calculator', path: '/calculators/ssy', description: 'Calculate Sukanya Samriddhi Yojana returns' },
      { name: 'Lumpsum Calculator', path: '/calculators/lumpsum', description: 'Calculate one-time investment returns' },
      { name: 'SWP Calculator', path: '/calculators/swp', description: 'Calculate Systematic Withdrawal Plan' },
    ]
  },
  {
    title: 'Tax & Salary Calculators',
    icon: <DollarSign className="w-6 h-6" />,
    calculators: [
      { name: 'Income Tax Calculator', path: '/calculators/income-tax', description: 'Calculate income tax for FY 2024-25' },
      { name: 'PF Calculator', path: '/calculators/pf', description: 'Calculate EPF contributions and interest' },
      { name: 'Salary Calculator', path: '/calculators/salary', description: 'Calculate take-home salary and deductions' },
      { name: 'HRA Calculator', path: '/calculators/hra', description: 'Calculate HRA exemption and tax benefits' },
      { name: 'Gratuity Calculator', path: '/calculators/gratuity', description: 'Calculate gratuity amount on retirement' },
      { name: 'Tax Saving Calculator', path: '/calculators/tax-saving', description: 'Calculate tax savings from investments' },
      { name: 'LTCG Calculator', path: '/calculators/ltcg', description: 'Calculate Long Term Capital Gains tax' },
      { name: 'Bitcoin Tax Calculator', path: '/calculators/bitcoin-tax', description: 'Calculate crypto trading tax liability' },
    ]
  },
  {
    title: 'Interest & Growth Calculators',
    icon: <BarChart3 className="w-6 h-6" />,
    calculators: [
      { name: 'Simple Interest Calculator', path: '/calculators/simple-interest', description: 'Calculate simple interest on loans' },
      { name: 'Compound Interest Calculator', path: '/calculators/compound-interest', description: 'Calculate compound interest growth' },
      { name: 'CAGR Calculator', path: '/calculators/cagr', description: 'Calculate Compound Annual Growth Rate' },
      { name: 'ROI Calculator', path: '/calculators/roi', description: 'Calculate Return on Investment percentage' },
      { name: 'Future Value Calculator', path: '/calculators/future-value', description: 'Calculate future value of investments' },
      { name: 'Present Value Calculator', path: '/calculators/present-value', description: 'Calculate present value of future amounts' },
      { name: 'NPV Calculator', path: '/calculators/npv', description: 'Calculate Net Present Value of investments' },
    ]
  },
  {
    title: 'Planning & Goal Calculators',
    icon: <Target className="w-6 h-6" />,
    calculators: [
      { name: 'Goal Planner', path: '/calculators/goal-planner', description: 'Plan and achieve your financial goals' },
      { name: 'Retirement Calculator', path: '/calculators/retirement', description: 'Calculate retirement corpus needed' },
      { name: 'Child Education Planning Calculator', path: '/calculators/child-education', description: 'Plan for your child\'s education' },
      { name: 'Marriage Calculator', path: '/calculators/marriage', description: 'Calculate marriage expenses and savings' },
      { name: 'Savings Calculator', path: '/calculators/savings', description: 'Calculate savings rate and goals' },
      { name: 'Down Payment Calculator', path: '/calculators/down-payment', description: 'Calculate down payment for properties' },
    ]
  },
  {
    title: 'Business & Utility Calculators',
    icon: <Building className="w-6 h-6" />,
    calculators: [
      { name: 'Discount Calculator', path: '/calculators/discount', description: 'Calculate discounts and final prices' },
      { name: 'Currency Converter', path: '/calculators/currency-converter', description: 'Convert between different currencies' },
      { name: 'Depreciation Calculator', path: '/calculators/depreciation', description: 'Calculate asset depreciation over time' },
      { name: 'Payback Period Calculator', path: '/calculators/payback-period', description: 'Calculate investment payback period' },
    ]
  }
];

export default function CalculatorsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Financial Calculators
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive collection of financial calculators to help you plan investments, 
            calculate loans, estimate taxes, and achieve your financial goals.
          </p>
        </div>

        {/* Calculator Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {calculatorCategories.map((category, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-6 text-white">
                <div className="flex items-center mb-3">
                  {category.icon}
                  <h2 className="text-xl font-semibold ml-3">{category.title}</h2>
                </div>
                <p className="text-primary-100 text-sm">
                  {category.calculators.length} calculators available
                </p>
              </div>
              
              <div className="p-6">
                <div className="space-y-3">
                  {category.calculators.map((calculator, calcIndex) => (
                    <Link
                      key={calcIndex}
                      href={calculator.path}
                      className="block p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200 group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {calculator.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {calculator.description}
                          </p>
                        </div>
                        <div className="ml-4 text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Access Section */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Quick Access to Popular Calculators
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'EMI', path: '/calculators/emi', icon: <Calculator className="w-5 h-5" /> },
              { name: 'SIP', path: '/calculators/sip', icon: <TrendingUp className="w-5 h-5" /> },
              { name: 'FD', path: '/calculators/fd', icon: <PiggyBank className="w-5 h-5" /> },
              { name: 'Tax', path: '/calculators/income-tax', icon: <DollarSign className="w-5 h-5" /> },
              { name: 'PPF', path: '/calculators/ppf', icon: <Target className="w-5 h-5" /> },
              { name: 'Home Loan', path: '/calculators/home-loan-emi', icon: <Home className="w-5 h-5" /> },
            ].map((calc, index) => (
              <Link
                key={index}
                href={calc.path}
                className="flex flex-col items-center p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200 group"
              >
                <div className="text-primary-500 mb-2 group-hover:scale-110 transition-transform">
                  {calc.icon}
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                  {calc.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calculator className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Accurate Calculations
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              All calculators use industry-standard formulas for precise financial planning
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-success-600 dark:text-success-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Indian Context
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Tailored for Indian financial products, tax rates, and investment options
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-warning-100 dark:bg-warning-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-warning-600 dark:text-warning-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Goal Planning
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Plan your financial goals with our comprehensive planning calculators
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 
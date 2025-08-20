'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';
import { 
  Home, 
  Calculator, 
  BarChart3, 
  MessageCircle, 
  Info, 
  ChevronDown,
  Sparkles,
  Menu,
  MessageSquare,
  User,
  LogOut,
  LogIn
} from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Calculators', href: '/calculators', icon: Calculator },
  { name: 'Tools', href: '/budget-fixer', icon: BarChart3 },
  { name: 'Blogs', href: '/blogs', icon: MessageSquare },
  { name: 'Contact', href: '/contact', icon: MessageCircle },
  { name: 'About', href: '/about', icon: Info },
];

const calculators = [
  { name: 'EMI Calculator', href: '/calculators/emi', icon: Calculator, description: 'Calculate loan EMIs' },
  { name: 'SIP Calculator', href: '/calculators/sip', icon: Calculator, description: 'Plan your investments' },
  { name: 'FD Calculator', href: '/calculators/fd', icon: Calculator, description: 'Fixed deposit returns' },
  { name: 'PPF Calculator', href: '/calculators/ppf', icon: Calculator, description: 'Public Provident Fund' },
  { name: 'Income Tax Calculator', href: '/calculators/income-tax', icon: Calculator, description: 'Calculate income tax' },
  { name: 'GST Calculator', href: '/calculators/gst', icon: Calculator, description: 'Calculate GST' },
  { name: 'RD Calculator', href: '/calculators/rd', icon: Calculator, description: 'Recurring Deposit' },
  { name: 'Home Loan EMI', href: '/calculators/home-loan-emi', icon: Calculator, description: 'Home loan calculations' },
  { name: 'Personal Loan EMI', href: '/calculators/personal-loan-emi', icon: Calculator, description: 'Personal loan EMI' },
  { name: 'Car Loan EMI', href: '/calculators/car-loan-emi', icon: Calculator, description: 'Car loan calculations' },
  { name: 'Mutual Fund Calculator', href: '/calculators/mutual-fund', icon: Calculator, description: 'Mutual fund returns' },
  { name: 'PF Calculator', href: '/calculators/pf', icon: Calculator, description: 'Employee Provident Fund' },
  { name: 'Salary Calculator', href: '/calculators/salary', icon: Calculator, description: 'Salary and tax calculation' },
  { name: 'HRA Calculator', href: '/calculators/hra', icon: Calculator, description: 'House Rent Allowance' },
  { name: 'CAGR Calculator', href: '/calculators/cagr', icon: Calculator, description: 'Compound Annual Growth Rate' },
  { name: 'Discount Calculator', href: '/calculators/discount', icon: Calculator, description: 'Calculate discounts' },
  { name: 'Retirement Calculator', href: '/calculators/retirement', icon: Calculator, description: 'Plan your retirement' },
  { name: 'Future Value Calculator', href: '/calculators/future-value', icon: Calculator, description: 'Calculate future value' },
  { name: 'SWP Calculator', href: '/calculators/swp', icon: Calculator, description: 'Systematic Withdrawal Plan' },
  { name: 'Lumpsum Calculator', href: '/calculators/lumpsum', icon: Calculator, description: 'Lumpsum investment returns' },
  { name: 'Education Loan EMI', href: '/calculators/education-loan-emi', icon: Calculator, description: 'Education loan calculations' },
  { name: 'SSY Calculator', href: '/calculators/ssy', icon: Calculator, description: 'Sukanya Samriddhi Yojana' },
  { name: 'Mortgage Calculator', href: '/calculators/mortgage', icon: Calculator, description: 'Mortgage calculations' },
  { name: 'Marriage Calculator', href: '/calculators/marriage', icon: Calculator, description: 'Marriage expense planning' },
  { name: 'ROI Calculator', href: '/calculators/roi', icon: Calculator, description: 'Return on Investment' },
  { name: 'Present Value Calculator', href: '/calculators/present-value', icon: Calculator, description: 'Calculate present value' },
  { name: 'NPV Calculator', href: '/calculators/npv', icon: Calculator, description: 'Net Present Value' },
  { name: 'LTCG Calculator', href: '/calculators/ltcg', icon: Calculator, description: 'Long Term Capital Gains' },
  { name: 'Savings Calculator', href: '/calculators/savings', icon: Calculator, description: 'Plan your savings' },
  { name: 'Child Education Planning', href: '/calculators/child-education', icon: Calculator, description: 'Plan child education' },
  { name: 'Tax Saving Calculator', href: '/calculators/tax-saving', icon: Calculator, description: 'Maximize tax savings' },
  { name: 'Goal Planner', href: '/calculators/goal-planner', icon: Calculator, description: 'Financial goal planning' },
  { name: 'Down Payment Calculator', href: '/calculators/down-payment', icon: Calculator, description: 'Calculate down payment' },
  { name: 'Lease Calculator', href: '/calculators/lease', icon: Calculator, description: 'Lease vs buy analysis' },
  { name: 'Bitcoin Tax Calculator', href: '/calculators/bitcoin-tax', icon: Calculator, description: 'Cryptocurrency tax' },
  { name: 'Payback Period', href: '/calculators/payback-period', icon: Calculator, description: 'Investment payback period' },
  { name: 'Compound Interest', href: '/calculators/compound-interest', icon: Calculator, description: 'Compound interest calculator' },
  { name: 'Depreciation Calculator', href: '/calculators/depreciation', icon: Calculator, description: 'Asset depreciation' },
  { name: 'Currency Converter', href: '/calculators/currency-converter', icon: Calculator, description: 'Convert currencies' },
];

const tools = [
  { name: 'Budget Fixer', href: '/budget-fixer', icon: BarChart3, description: 'AI-powered budget analysis' },
  { name: 'Financial Health Check', href: '/financial-health-check', icon: BarChart3, description: 'Assess your financial health' },
  { name: 'Expense Tracker', href: '/expense-tracker', icon: BarChart3, description: 'Track your expenses' },
  { name: 'Investment Portfolio', href: '/investment-portfolio', icon: BarChart3, description: 'Manage your investments' },
  { name: 'Debt Calculator', href: '/debt-calculator', icon: BarChart3, description: 'Debt management tools' },
  { name: 'Emergency Fund Planner', href: '/emergency-fund-planner', icon: BarChart3, description: 'Plan your emergency fund' },
];

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 }
};

const dropdownVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -10, scale: 0.95 }
};

export default function Navigation() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [calculatorsDropdownOpen, setCalculatorsDropdownOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      
      // Check if click is outside both dropdowns
      if (!target.closest('.dropdown-container')) {
        setCalculatorsDropdownOpen(false);
        setToolsDropdownOpen(false);
      }
    };

    // Use mousedown instead of click for better responsiveness
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      console.log('Signing out...');
      await signOut({ 
        callbackUrl: '/',
        redirect: true 
      });
      console.log('Sign out successful');
    } catch (error) {
      console.error('Sign out error:', error);
      // Force redirect to home page even if signOut fails
      window.location.href = '/';
    }
  };

  // Admin check with exception for surpuredhanashri@gmail.com
  const isAdmin = session?.user?.email === 'surpuredhanashri@gmail.com';

  // Add session refresh on mount to ensure session is loaded
  useEffect(() => {
    if (status === 'unauthenticated' && typeof window !== 'undefined') {
      // Try to refresh the session
      console.log('Navigation - Attempting to refresh session...');
    }
  }, [status]);

  return (
    <motion.nav 
      className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-lg"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div className="flex-shrink-0" variants={itemVariants}>
            <Link href="/" className="flex items-center space-x-2 group" aria-label="FixMoney.in - Home">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-success-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-success-600 bg-clip-text text-transparent">
                FixMoney.in
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Home */}
            <motion.div variants={itemVariants}>
              <Link
                href="/"
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  isActive('/')
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 shadow-md'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                aria-label="Go to home page"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
            </motion.div>

            {/* Calculators Dropdown */}
            <motion.div className="relative dropdown-container" variants={itemVariants}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCalculatorsDropdownOpen(!calculatorsDropdownOpen);
                  setToolsDropdownOpen(false);
                }}
                aria-expanded={calculatorsDropdownOpen}
                aria-haspopup="true"
                aria-label="Calculators menu"
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname.startsWith('/calculators')
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 shadow-md'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Calculator className="w-4 h-4" />
                <span>Calculators</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${calculatorsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {calculatorsDropdownOpen && (
                  <motion.div
                    className="absolute left-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2 z-[100] max-h-96 overflow-y-auto"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">Financial Calculators</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">30+ professional calculators</div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-1 p-2">
                      {calculators.map((calc) => (
                        <Link
                          key={calc.name}
                          href={calc.href}
                          className="flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                          aria-label={`Go to ${calc.name} calculator`}
                        >
                          <calc.icon className="w-5 h-5" />
                          <span>{calc.name}</span>
                        </Link>
                      ))}
                    </div>
                    
                    <div className="border-t border-gray-200 dark:border-gray-700 p-2">
                      <Link
                        href="/calculators"
                        className="flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-base font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors duration-200"
                        aria-label="View all financial calculators"
                      >
                        <span>View All Calculators</span>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Tools Dropdown */}
            <motion.div className="relative dropdown-container" variants={itemVariants}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setToolsDropdownOpen(!toolsDropdownOpen);
                  setCalculatorsDropdownOpen(false);
                }}
                aria-expanded={toolsDropdownOpen}
                aria-haspopup="true"
                aria-label="Tools menu"
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname.startsWith('/budget-fixer')
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 shadow-md'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Tools</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {toolsDropdownOpen && (
                  <motion.div
                    className="absolute left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2 z-[100]"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                  >
                    {tools.map((tool) => (
                      <Link
                        key={tool.name}
                        href={tool.href}
                        className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                        aria-label={`Go to ${tool.name} tool`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                            <tool.icon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {tool.name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {tool.description}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Blogs */}
            <motion.div variants={itemVariants}>
              <Link
                href="/blogs"
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  isActive('/blogs')
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 shadow-md'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                aria-label="Go to blogs page"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Blogs</span>
              </Link>
            </motion.div>

            {/* Admin - Only show if user is admin */}
            {isAdmin && (
              <motion.div variants={itemVariants}>
                <Link
                  href="/admin"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                    isActive('/admin')
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 shadow-md'
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  aria-label="Go to admin page"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Admin</span>
                </Link>
              </motion.div>
            )}

            {/* Contact */}
            <motion.div variants={itemVariants}>
              <Link
                href="/contact"
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  isActive('/contact')
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 shadow-md'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                aria-label="Go to contact page"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contact</span>
              </Link>
            </motion.div>

            {/* About */}
            <motion.div variants={itemVariants}>
              <Link
                href="/about"
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  isActive('/about')
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 shadow-md'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                aria-label="Go to about page"
              >
                <Info className="w-4 h-4" />
                <span>About</span>
              </Link>
            </motion.div>
          </div>

          {/* Right side - Auth, Theme Switcher and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Auth Section */}
            {status === 'loading' ? (
              <div className="w-8 h-8 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            ) : session ? (
              <div className="flex items-center space-x-3">
                {/* Profile/Admin Link */}
                <Link
                  href={isAdmin ? '/admin' : '/profile'}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                >
                  {session.user?.image ? (
                    <img 
                      src={session.user.image} 
                      alt="Profile" 
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                  <span className="hidden sm:inline">
                    {isAdmin ? 'Admin' : 'Profile'}
                  </span>
                </Link>
                
                {/* Sign Out Button */}
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all duration-200"
                  aria-label="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>

                {/* Debug Info (only in development) */}
                {process.env.NODE_ENV === 'development' && (
                  <div className="hidden lg:block text-xs text-gray-500 dark:text-gray-400 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
                    {session.user?.email}
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-success-600 hover:from-primary-700 hover:to-success-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                aria-label="Sign in"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Sign In</span>
              </Link>
            )}
            
            <ThemeSwitcher />
            <button 
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200 dark:border-gray-700">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30'
                        : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                    aria-label={`Go to ${item.name.toLowerCase()} page`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                ))}
                
                {/* Admin link for mobile if user is admin */}
                {isAdmin && (
                  <Link
                    href="/admin"
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
                      isActive('/admin')
                        ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30'
                        : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                    aria-label="Go to admin page"
                  >
                    <BarChart3 className="w-5 h-5" />
                    <span>Admin</span>
                  </Link>
                )}
                
                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 px-3 py-2">
                  Calculators
                </div>
                {calculators.slice(0, 6).map((calc) => (
                  <Link
                    key={calc.name}
                    href={calc.href}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                    aria-label={`Go to ${calc.name} calculator`}
                  >
                    <calc.icon className="w-5 h-5" />
                    <span>{calc.name}</span>
                  </Link>
                ))}
                
                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 px-3 py-2">
                  Tools
                </div>
                {tools.map((tool) => (
                  <Link
                    key={tool.name}
                    href={tool.href}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                    aria-label={`Go to ${tool.name} tool`}
                  >
                    <tool.icon className="w-5 h-5" />
                    <span>{tool.name}</span>
                  </Link>
                ))}
                
                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                
                <Link
                  href="/calculators"
                  className="flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-base font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors duration-200"
                  aria-label="View all financial calculators"
                >
                  <span>View All Calculators</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
} 
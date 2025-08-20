'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Shield, 
  Zap,
  ArrowRight,
  Star,
  Users,
  Award,
  CheckCircle,
  Sparkles
} from 'lucide-react';

const features = [
  {
    icon: Calculator,
    title: '30+ Financial Calculators',
    description: 'Comprehensive suite covering all financial needs from loans to investments',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: BarChart3,
    title: 'AI-Powered Analysis',
    description: 'Smart insights and recommendations using advanced AI technology',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: TrendingUp,
    title: 'Investment Planning',
    description: 'Plan your investments with SIP, FD, and mutual fund calculators',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Shield,
    title: 'Tax Optimization',
    description: 'Maximize tax savings with our comprehensive tax calculators',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'Get accurate calculations and insights in real-time',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Users,
    title: 'Trusted by Millions',
    description: 'Used by individuals and professionals worldwide',
    color: 'from-indigo-500 to-purple-500'
  }
];

const popularCalculators = [
  { name: 'EMI Calculator', href: '/calculators/emi', icon: DollarSign, description: 'Calculate loan EMIs' },
  { name: 'SIP Calculator', href: '/calculators/sip', icon: TrendingUp, description: 'Plan your investments' },
  { name: 'FD Calculator', href: '/calculators/fd', icon: BarChart3, description: 'Fixed deposit returns' },
  { name: 'Tax Calculator', href: '/calculators/income-tax', icon: Shield, description: 'Income tax planning' },
];

const stats = [
  { number: '30+', label: 'Financial Calculators' },
  { number: '1M+', label: 'Calculations Made' },
  { number: '99.9%', label: 'Accuracy Rate' },
  { number: '24/7', label: 'Availability' },
];

export default function HomePageClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-success-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center space-x-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Financial Tools</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              Master Your
              <span className="block bg-gradient-to-r from-primary-600 to-success-600 bg-clip-text text-transparent">
                Financial Future
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Professional financial calculators, AI-powered budget analysis, and comprehensive investment planning tools. 
              Make smart financial decisions with confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/calculators"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-600 to-success-600 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-success-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Explore Calculators
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              
              <Link
                href="/budget-fixer"
                className="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                AI Budget Analysis
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-600 to-success-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose FixMoney.in?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Professional tools designed by financial experts to help you make informed decisions
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Calculators Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Popular Calculators
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Start with our most used financial tools
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCalculators.map((calc, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  href={calc.href}
                  className="block bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl group"
                >
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <calc.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                    {calc.name}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {calc.description}
                  </p>
                  
                  <div className="flex items-center text-primary-600 dark:text-primary-400 font-medium text-sm group-hover:translate-x-1 transition-transform duration-300">
                    Try Now
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/calculators"
              className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Calculator className="w-5 h-5 mr-2" />
              View All Calculators
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-success-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Take Control of Your Finances?
            </h2>
            
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already making smarter financial decisions with our professional tools.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/calculators"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Get Started Free
              </Link>
              
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white hover:bg-white hover:text-primary-600 transform hover:scale-105 transition-all duration-300"
                aria-label="Learn more about FixMoney.in"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 
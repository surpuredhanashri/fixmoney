import type { Metadata } from 'next';
import { 
  Target, 
  Users, 
  Award, 
  Shield, 
  TrendingUp, 
  Calculator,
  BarChart3,
  Zap
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us - FixMoney.in | Financial Repair Platform',
  description: 'Learn about FixMoney.in, our mission to fix money problems, and how we help users achieve financial freedom through AI-powered tools and smart strategies.',
  keywords: [
    'about fixmoney',
    'financial repair platform',
    'money fixing tools',
    'financial health',
    'budget optimization',
    'investment planning'
  ],
  openGraph: {
    title: 'About Us - FixMoney.in | Financial Repair Platform',
    description: 'Learn about FixMoney.in, our mission to fix money problems, and how we help users achieve financial freedom.',
    url: 'https://fixmoney.in/about',
  },
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About FixMoney.in
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to fix money problems and help everyone achieve financial freedom 
            through intelligent tools, AI-powered analysis, and proven strategies.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                At FixMoney.in, we believe that financial freedom should be accessible to everyone. 
                Too many people struggle with money problems that seem impossible to solve.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our mission is to provide the tools, knowledge, and support needed to fix these 
                problems and build lasting wealth. We combine cutting-edge technology with 
                time-tested financial principles to create solutions that actually work.
              </p>
              <div className="flex items-center space-x-4">
                <Target className="w-8 h-8 text-primary-600" />
                <span className="text-lg font-semibold text-gray-900">
                  Fixing money problems, one user at a time
                </span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-500 to-success-500 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Why We Exist</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  Financial literacy is declining globally
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  Traditional financial advice is expensive
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  People need actionable solutions, not just advice
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  Technology can democratize financial planning
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Trust & Security</h3>
              <p className="text-gray-600">
                Your financial data is sacred. We use bank-level security and never share your information.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-success-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Results-Driven</h3>
              <p className="text-gray-600">
                We focus on measurable outcomes and real financial improvements, not just theory.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-warning-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">User-First</h3>
              <p className="text-gray-600">
                Every feature and tool is designed with our users' needs and success in mind.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">
                We constantly explore new technologies and methods to improve financial outcomes.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Accuracy</h3>
              <p className="text-gray-600">
                Our calculations and analysis are precise and reliable for confident decision-making.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in every tool, feature, and user interaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Do</h2>
            <p className="text-lg text-gray-600">
              Comprehensive financial repair tools and services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Calculator className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Calculators</h3>
              <p className="text-gray-600">
                SIP, EMI, debt payoff, and investment calculators with personalized insights and recommendations.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-success-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Budget Analysis</h3>
              <p className="text-gray-600">
                AI-powered budget health checks, spending leak detection, and emergency fund analysis.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-warning-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI Money Coach</h3>
              <p className="text-gray-600">
                Personalized financial advice, goal tracking, and automated fix suggestions powered by AI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-lg text-gray-600">
              Numbers that tell our story
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">10,000+</div>
              <div className="text-gray-600">Users Helped</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-success-600 mb-2">₹2.5Cr+</div>
              <div className="text-gray-600">Money Saved</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-warning-600 mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">30 Days</div>
              <div className="text-gray-600">Average Results</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-success-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Fix Your Money Problems?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of users who have already transformed their financial health with FixMoney.in
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/sip-calculator" className="bg-white text-primary-600 hover:bg-gray-50 font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105">
              Start with SIP Calculator
            </a>
            <a href="/budget-fixer" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-lg transition-all duration-200">
              Check Budget Health
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 
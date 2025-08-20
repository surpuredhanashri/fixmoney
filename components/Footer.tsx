import Link from 'next/link';
import { 
  Calculator, 
  BarChart3, 
  TrendingUp, 
  Mail, 
  Twitter, 
  Linkedin, 
  Facebook,
  Heart
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const tools = [
    { name: 'SIP Calculator', href: '/sip-calculator', icon: Calculator },
    { name: 'EMI Calculator', href: '/emi-calculator', icon: TrendingUp },
    { name: 'Budget Fixer', href: '/budget-fixer', icon: BarChart3 },
    { name: 'FD Calculator', href: '/fd-calculator', icon: TrendingUp },
    { name: 'PPF Calculator', href: '/ppf-calculator', icon: BarChart3 },
    { name: 'GST Calculator', href: '/gst-calculator', icon: Calculator },
    { name: 'Tax Calculator', href: '/tax-calculator', icon: BarChart3 },
  ];

  const company = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ];

  const resources = [
    { name: 'Blogs', href: '/blogs' },
    { name: 'Help Center', href: '/help' },
    { name: 'Financial Guides', href: '/guides' },
    { name: 'FAQ', href: '/faq' },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-success-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-xl font-bold">FixMoney.in</span>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Fix your money problems with AI-powered tools and smart strategies. 
              Transform your financial health today.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Follow us on Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Connect with us on LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Like us on Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="mailto:contact@fixmoney.in" className="text-gray-400 hover:text-white transition-colors" aria-label="Send us an email">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Financial Tools</h3>
            <ul className="space-y-2">
              {tools.map((tool) => (
                <li key={tool.name}>
                  <Link 
                    href={tool.href}
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <tool.icon className="w-4 h-4 mr-2" />
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {resources.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} FixMoney.in. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Made with <Heart className="w-4 h-4 inline text-red-500" /> for financial freedom
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 
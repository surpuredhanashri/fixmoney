'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Send, 
  Bot, 
  User,
  HelpCircle,
  Calculator,
  FileText,
  Shield,
  TrendingUp
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const faqData: FAQItem[] = [
  {
    question: 'How do I use the SIP Calculator?',
    answer: 'The SIP Calculator helps you calculate returns on Systematic Investment Plans. Enter your monthly investment amount, expected return rate, and investment period. The calculator will show you the maturity amount, total investment, and wealth gained.',
    category: 'Calculators'
  },
  {
    question: 'What is the difference between new and old tax regimes?',
    answer: 'The new tax regime offers lower tax rates but removes most deductions and exemptions. The old tax regime allows various deductions under Section 80C, 80D, etc., but has higher tax rates. You can choose which regime to use during tax filing.',
    category: 'Tax Planning'
  },
  {
    question: 'How do I upload bank statements for budget analysis?',
    answer: 'You can upload CSV files or PDF statements from your bank. The system will automatically categorize your transactions and identify spending patterns. For PDF files, we\'re working on enhanced support - for now, you can convert them to CSV format.',
    category: 'Budget Tools'
  },
  {
    question: 'What is a good emergency fund amount?',
    answer: 'Financial experts recommend having 3-6 months of your monthly expenses saved in an emergency fund. This provides a safety net for unexpected situations like job loss, medical emergencies, or major repairs.',
    category: 'Personal Finance'
  },
  {
    question: 'How accurate are the calculator results?',
    answer: 'Our calculators use standard financial formulas and are designed to provide accurate estimates. However, actual returns may vary due to market conditions, fees, and other factors. Always consult with a financial advisor for personalized advice.',
    category: 'Calculators'
  },
  {
    question: 'Can I export my budget analysis results?',
    answer: 'Yes! You can download your budget analysis as a PDF report. This includes your spending breakdown, recommendations, and action items to improve your financial health.',
    category: 'Budget Tools'
  },
  {
    question: 'What investment options are best for beginners?',
    answer: 'For beginners, we recommend starting with mutual funds (especially index funds), PPF for guaranteed returns, and ELSS for tax benefits. Start small, diversify, and focus on long-term goals rather than short-term gains.',
    category: 'Investment'
  },
  {
    question: 'How often should I review my budget?',
    answer: 'Review your budget monthly to track progress and make adjustments. Conduct a comprehensive review quarterly to assess your financial goals and make necessary changes to your strategy.',
    category: 'Budget Tools'
  }
];

const categories = ['All', 'Calculators', 'Tax Planning', 'Budget Tools', 'Personal Finance', 'Investment'];

export default function HelpCentre() {
  const [activeTab, setActiveTab] = useState<'faq' | 'chat'>('faq');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI financial assistant. How can I help you today? You can ask me about our calculators, tax planning, budgeting, or any financial questions.',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Call Gemini API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          context: 'You are a helpful financial advisor for FixMoney.in. Provide clear, accurate, and helpful financial advice. Keep responses concise but informative.'
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: data.response,
          sender: 'ai',
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error('Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: 'I apologize, but I\'m having trouble connecting right now. Please try again in a moment or check our FAQ section for immediate help.',
        sender: 'ai',
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setActiveTab('faq')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center ${
              activeTab === 'faq'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <HelpCircle className="w-5 h-5 mr-2" />
            FAQ & Help
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center ${
              activeTab === 'chat'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Live Chat with AI
          </button>
        </div>
      </div>

      {/* FAQ Tab */}
      {activeTab === 'faq' && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search for help topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              <div className="lg:w-48">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <button
                  onClick={() => toggleExpanded(index)}
                  className="w-full px-6 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mr-4 mt-1">
                        <HelpCircle className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {faq.question}
                        </h3>
                        <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-sm rounded-full">
                          {faq.category}
                        </span>
                      </div>
                    </div>
                    {expandedItems.has(index) ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </button>
                
                {expandedItems.has(index) && (
                  <div className="px-6 pb-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed pt-4">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No help topics found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search terms or browse all categories.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Live Chat Tab */}
      {activeTab === 'chat' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="h-96 flex flex-col">
            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-primary-50 dark:bg-primary-900/20">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mr-3">
                  <Bot className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">AI Financial Assistant</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Ask me anything about finance!</p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}>
                    <div className="flex items-start">
                      {message.sender === 'ai' && (
                        <Bot className="w-4 h-4 mr-2 mt-0.5 text-primary-600 dark:text-primary-400" />
                      )}
                      <p className="text-sm">{message.text}</p>
                    </div>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-lg">
                    <div className="flex items-center">
                      <Bot className="w-4 h-4 mr-2 text-primary-600 dark:text-primary-400" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Press Enter to send, Shift+Enter for new line
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Help Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Help</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Calculator, title: 'Calculator Help', description: 'Learn how to use our financial calculators' },
            { icon: FileText, title: 'File Upload Guide', description: 'How to upload and analyze bank statements' },
            { icon: Shield, title: 'Security & Privacy', description: 'Your data security and privacy protection' },
            { icon: TrendingUp, title: 'Investment Tips', description: 'Get started with smart investing' }
          ].map((item, index) => (
            <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-300 dark:hover:border-primary-600 transition-colors">
              <item.icon className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-3" />
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">{item.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
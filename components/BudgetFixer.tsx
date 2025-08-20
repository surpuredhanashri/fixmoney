'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Upload, 
  FileText, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Calendar,
  BarChart3,
  Download,
  Share2,
  Eye,
  EyeOff,
  FileText as FileTextIcon,
  FileSpreadsheet,
  PieChart,
  TrendingUp,
  Bot
} from 'lucide-react';
import toast from 'react-hot-toast';
import { PieChart as RechartsPieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const budgetSchema = z.object({
  monthlyIncome: z.number().min(1000, 'Minimum income is ₹1,000').max(10000000, 'Maximum income is ₹1,00,00,000'),
  monthlyExpenses: z.number().min(100, 'Minimum expenses is ₹100').max(10000000, 'Maximum expenses is ₹1,00,00,000'),
  emergencyFund: z.number().min(0, 'Emergency fund cannot be negative').max(10000000, 'Maximum emergency fund is ₹1,00,00,000'),
  monthlySavings: z.number().min(0, 'Monthly savings cannot be negative').max(10000000, 'Maximum monthly savings is ₹1,00,00,000'),
});

type BudgetFormData = z.infer<typeof budgetSchema>;

interface Transaction {
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  category: string;
}

interface BudgetAnalysis {
  budgetHealthScore: number;
  spendingLeaks: Array<{
    category: string;
    amount: number;
    percentage: number;
    recommendation: string;
  }>;
  emergencyFundStatus: {
    isAdequate: boolean;
    shortfall: number;
    recommendation: string;
  };
  savingsRate: number;
  recommendations: string[];
}

export default function BudgetFixer() {
  const [csvData, setCsvData] = useState<Transaction[]>([]);
  const [analysis, setAnalysis] = useState<BudgetAnalysis | null>(null);
  const [enhancedAnalysis, setEnhancedAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showManualForm, setShowManualForm] = useState(false);
  const [showCharts, setShowCharts] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<BudgetFormData>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      monthlyIncome: 50000,
      monthlyExpenses: 35000,
      emergencyFund: 100000,
      monthlySavings: 15000,
    },
  });

  const watchedValues = watch();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileExtension = file.name.toLowerCase().split('.').pop();
    
    if (fileExtension === 'csv') {
      handleCSVUpload(file);
    } else if (fileExtension === 'pdf') {
      handlePDFUpload(file);
    } else {
      toast.error('Please upload a CSV or PDF file');
    }
  };

  const handleCSVUpload = async (file: File) => {
    try {
      const loadingToast = toast.loading('Processing CSV file with AI analysis... This may take a moment.');
      
      // Create FormData and send to enhanced analysis API
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileType', 'csv');
      
      const response = await fetch('/api/analyze-statement', { 
        method: 'POST', 
        body: formData 
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.transactions && data.transactions.length > 0) {
        setCsvData(data.transactions);
        toast.dismiss(loadingToast);
        toast.success(`AI Analysis Complete! Found ${data.transactions.length} transactions with smart categorization.`);
        
        // Store the enhanced analysis data for charts and insights
        if (data.insights && data.charts) {
          console.log('Enhanced analysis data:', data);
        }
      } else {
        throw new Error('No transactions found in CSV');
      }
      
    } catch (error) {
      toast.dismiss();
      toast.error('Error processing CSV file. Please try again.');
      console.error('CSV processing error:', error);
    }
  };

  const handlePDFUpload = async (file: File) => {
    try {
      const loadingToast = toast.loading('Processing PDF file with AI analysis... This may take a moment.');
      
      // Create FormData and send to enhanced analysis API
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileType', 'pdf');
      
      const response = await fetch('/api/analyze-statement', { 
        method: 'POST', 
        body: formData 
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.transactions && data.transactions.length > 0) {
        setCsvData(data.transactions);
        toast.dismiss(loadingToast);
        toast.success(`AI Analysis Complete! Found ${data.transactions.length} transactions with smart categorization.`);
        
        // Store the enhanced analysis data for charts and insights
        if (data.insights && data.charts) {
          setEnhancedAnalysis(data);
          setShowCharts(true);
        }
      } else {
        throw new Error('No transactions found in PDF');
      }
      
    } catch (error) {
      toast.dismiss();
      toast.error('Error processing PDF file. Please try again or convert to CSV.');
      console.error('PDF processing error:', error);
    }
  };

  const categorizeTransactions = (transactions: Transaction[]): Transaction[] => {
    const categories = {
      'Food & Dining': ['restaurant', 'food', 'meal', 'dining', 'cafe', 'pizza', 'burger'],
      'Transportation': ['uber', 'ola', 'fuel', 'petrol', 'diesel', 'metro', 'bus', 'train'],
      'Shopping': ['amazon', 'flipkart', 'myntra', 'shopping', 'clothes', 'electronics'],
      'Entertainment': ['netflix', 'prime', 'hotstar', 'movie', 'cinema', 'game'],
      'Utilities': ['electricity', 'water', 'gas', 'internet', 'phone', 'mobile'],
      'Healthcare': ['medical', 'pharmacy', 'doctor', 'hospital', 'medicine'],
      'Subscriptions': ['subscription', 'membership', 'renewal', 'auto-debit'],
      'Investments': ['sip', 'mutual fund', 'investment', 'stocks', 'shares'],
    };

    return transactions.map(transaction => {
      const description = transaction.description.toLowerCase();
      for (const [category, keywords] of Object.entries(categories)) {
        if (keywords.some(keyword => description.includes(keyword))) {
          return { ...transaction, category };
        }
      }
      return transaction;
    });
  };

  const analyzeBudget = (data: BudgetFormData): BudgetAnalysis => {
    const { monthlyIncome, monthlyExpenses, emergencyFund, monthlySavings } = data;
    
    // Calculate budget health score (0-100)
    const savingsRate = (monthlySavings / monthlyIncome) * 100;
    const expenseRatio = (monthlyExpenses / monthlyIncome) * 100;
    const emergencyFundMonths = emergencyFund / monthlyExpenses;
    
    let score = 100;
    
    // Deduct points for poor savings rate
    if (savingsRate < 10) score -= 30;
    else if (savingsRate < 20) score -= 15;
    else if (savingsRate < 30) score -= 5;
    
    // Deduct points for high expense ratio
    if (expenseRatio > 90) score -= 25;
    else if (expenseRatio > 80) score -= 15;
    else if (expenseRatio > 70) score -= 5;
    
    // Deduct points for inadequate emergency fund
    if (emergencyFundMonths < 3) score -= 20;
    else if (emergencyFundMonths < 6) score -= 10;
    
    score = Math.max(0, score);

    // Identify spending leaks
    const spendingLeaks = [];
    if (expenseRatio > 80) {
      spendingLeaks.push({
        category: 'Overall Expenses',
        amount: monthlyExpenses - (monthlyIncome * 0.7),
        percentage: expenseRatio - 70,
        recommendation: 'Reduce monthly expenses to 70% of income for better financial health',
      });
    }

    // Emergency fund analysis
    const emergencyFundStatus = {
      isAdequate: emergencyFundMonths >= 6,
      shortfall: Math.max(0, (monthlyExpenses * 6) - emergencyFund),
      recommendation: emergencyFundMonths >= 6 
        ? 'Your emergency fund is adequate. Great job!'
        : `Build your emergency fund by ₹${Math.round((monthlyExpenses * 6) - emergencyFund).toLocaleString('en-IN')} to cover 6 months of expenses`,
    };

    // Generate recommendations
    const recommendations = [];
    if (savingsRate < 20) {
      recommendations.push('Aim to save at least 20% of your income for better financial security');
    }
    if (expenseRatio > 80) {
      recommendations.push('Reduce your expenses to below 80% of income to improve savings');
    }
    if (emergencyFundMonths < 6) {
      recommendations.push('Prioritize building your emergency fund to 6 months of expenses');
    }
    if (recommendations.length === 0) {
      recommendations.push('Excellent! Your budget is well-balanced. Keep up the good work!');
    }

    return {
      budgetHealthScore: score,
      spendingLeaks,
      emergencyFundStatus,
      savingsRate,
      recommendations,
    };
  };

  const onSubmit = (data: BudgetFormData) => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      try {
        const analysis = analyzeBudget(data);
        setAnalysis(analysis);
        toast.success('Budget analysis completed!');
      } catch (error) {
        toast.error('Error analyzing budget. Please try again.');
      } finally {
        setIsAnalyzing(false);
      }
    }, 1000);
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-success-600 bg-success-100';
    if (score >= 60) return 'text-warning-600 bg-warning-100';
    return 'text-danger-600 bg-danger-100';
  };

  const getScoreLabel = (score: number): string => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          {/* PDF & CSV Upload - Hero Feature */}
          <div className="card bg-gradient-to-r from-primary-50 to-success-50 dark:from-primary-900/30 dark:to-success-900/30 border-2 border-primary-200 dark:border-primary-600">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-success-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Upload className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                🚀 PDF Bank Statement Analysis
              </h3>
              <p className="text-gray-700 dark:text-gray-200 mb-4 text-lg">
                <strong>NEW:</strong> Upload your bank statement in PDF format and get instant insights!
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Our AI-powered system automatically extracts transactions from PDF statements and analyzes your spending patterns
              </p>
            </div>
            
            <div className="border-2 border-dashed border-primary-300 dark:border-primary-500 rounded-lg p-6 text-center hover:border-primary-500 dark:hover:border-primary-400 transition-colors bg-white dark:bg-gray-800">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="flex items-center text-primary-600 dark:text-primary-400">
                  <FileSpreadsheet className="w-5 h-5 mr-2" />
                  <span className="font-medium">CSV Support</span>
                </div>
                <div className="flex items-center text-success-600 dark:text-success-400">
                  <FileTextIcon className="w-5 h-5 mr-2" />
                  <span className="font-medium">PDF Support</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Upload your bank statement file for detailed analysis
              </p>
              <input
                type="file"
                accept=".csv,.pdf"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="btn-primary cursor-pointer inline-flex items-center"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose File (CSV/PDF)
              </label>
              <div className="flex items-center justify-center gap-4 mt-3">
                <div className="flex items-center text-xs text-gray-500">
                  <FileSpreadsheet className="w-3 h-3 mr-1" />
                  CSV
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <FileTextIcon className="w-3 h-3 mr-1" />
                  PDF
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Supported formats: CSV and PDF from all major Indian banks
              </p>
            </div>
            
            {csvData.length > 0 && (
              <div className="mt-4 p-3 bg-success-50 border border-success-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-success-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">
                      {csvData.length} transactions uploaded successfully
                    </span>
                  </div>
                  {enhancedAnalysis && (
                    <button
                      onClick={() => setShowCharts(!showCharts)}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
                    >
                      {showCharts ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
                      {showCharts ? 'Hide' : 'Show'} AI Insights
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Manual Budget Input */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <BarChart3 className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Manual Budget Input</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowManualForm(!showManualForm)}
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium"
              >
                {showManualForm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showManualForm ? 'Hide' : 'Show'}
              </button>
            </div>
            
            {showManualForm && (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Monthly Income
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">₹</span>
                    <input
                      type="number"
                      {...register('monthlyIncome', { valueAsNumber: true })}
                      className="input-field pl-8 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-primary-500 dark:focus:ring-primary-400"
                      placeholder="50000"
                    />
                  </div>
                  {errors.monthlyIncome && (
                    <p className="text-danger-600 dark:text-danger-400 text-sm mt-1">{errors.monthlyIncome.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Monthly Expenses
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">₹</span>
                    <input
                      type="number"
                      {...register('monthlyExpenses', { valueAsNumber: true })}
                      className="input-field pl-8 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-primary-500 dark:focus:ring-primary-400"
                      placeholder="35000"
                    />
                  </div>
                  {errors.monthlyExpenses && (
                    <p className="text-danger-600 dark:text-danger-400 text-sm mt-1">{errors.monthlyExpenses.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Emergency Fund
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">₹</span>
                    <input
                      type="number"
                      {...register('emergencyFund', { valueAsNumber: true })}
                      className="input-field pl-8 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-primary-500 dark:focus:ring-primary-400"
                      placeholder="100000"
                    />
                  </div>
                  {errors.emergencyFund && (
                    <p className="text-danger-600 dark:text-danger-400 text-sm mt-1">{errors.emergencyFund.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Monthly Savings
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">₹</span>
                    <input
                      type="number"
                      {...register('monthlySavings', { valueAsNumber: true })}
                      className="input-field pl-8 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-primary-500 dark:focus:ring-primary-400"
                      placeholder="15000"
                    />
                  </div>
                  {errors.monthlySavings && (
                    <p className="text-danger-600 dark:text-danger-400 text-sm mt-1">{errors.monthlySavings.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isAnalyzing}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Analyze Budget
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Results Display */}
        <div className="space-y-6">
          {analysis ? (
            <>
              {/* Budget Health Score */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Budget Health Score</h3>
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full text-3xl font-bold mb-4 ${getScoreColor(analysis.budgetHealthScore)}`}>
                    {analysis.budgetHealthScore}
                  </div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {getScoreLabel(analysis.budgetHealthScore)}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Your budget health is {getScoreLabel(analysis.budgetHealthScore).toLowerCase()}
                  </p>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-700 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                    {analysis.savingsRate.toFixed(1)}%
                  </div>
                  <div className="text-sm text-primary-700 dark:text-primary-300">Savings Rate</div>
                </div>
                
                <div className={`border rounded-lg p-4 text-center ${
                  analysis.emergencyFundStatus.isAdequate 
                    ? 'bg-success-50 dark:bg-success-900/20 border-success-200 dark:border-success-700' 
                    : 'bg-warning-50 dark:bg-warning-900/20 border-warning-200 dark:border-warning-700'
                }`}>
                  <div className={`text-2xl font-bold mb-1 ${
                    analysis.emergencyFundStatus.isAdequate ? 'text-success-600 dark:text-success-400' : 'text-warning-600 dark:text-warning-400'
                  }`}>
                    {analysis.emergencyFundStatus.isAdequate ? '✓' : '⚠'}
                  </div>
                  <div className={`text-sm ${
                    analysis.emergencyFundStatus.isAdequate ? 'text-success-700 dark:text-success-300' : 'text-warning-700 dark:text-warning-300'
                  }`}>
                    Emergency Fund
                  </div>
                </div>
              </div>

              {/* Spending Leaks */}
              {analysis.spendingLeaks.length > 0 && (
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-warning-600 dark:text-warning-400" />
                    Spending Leaks Detected
                  </h3>
                  <div className="space-y-3">
                    {analysis.spendingLeaks.map((leak, index) => (
                      <div key={index} className="p-3 bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-700 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium text-warning-800 dark:text-warning-200">{leak.category}</span>
                          <span className="text-warning-700 dark:text-warning-300 font-semibold">
                            {formatCurrency(leak.amount)}
                          </span>
                        </div>
                        <p className="text-sm text-warning-700 dark:text-warning-300">{leak.recommendation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Emergency Fund Analysis */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" />
                  Emergency Fund Analysis
                </h3>
                <div className={`p-4 rounded-lg ${
                  analysis.emergencyFundStatus.isAdequate 
                    ? 'bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-700' 
                    : 'bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-700'
                }`}>
                  <p className={`font-medium ${
                    analysis.emergencyFundStatus.isAdequate ? 'text-success-800 dark:text-success-200' : 'text-warning-800 dark:text-warning-200'
                  }`}>
                    {analysis.emergencyFundStatus.recommendation}
                  </p>
                  {!analysis.emergencyFundStatus.isAdequate && (
                    <p className="text-sm text-warning-700 dark:text-warning-300 mt-2">
                      Shortfall: {formatCurrency(analysis.emergencyFundStatus.shortfall)}
                    </p>
                  )}
                </div>
              </div>

              {/* Recommendations */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recommendations</h3>
                <div className="space-y-3">
                  {analysis.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-success-600 dark:text-success-400 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700 dark:text-gray-300">{recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Placeholder when no analysis */
            <div className="card bg-gray-50 dark:bg-gray-800 border-dashed border-2 border-gray-300 dark:border-gray-600">
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
                  Analyze Your Budget
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Upload your bank statements or enter your budget details manually to get started
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced AI Analysis Charts */}
      {showCharts && enhancedAnalysis && (
        <div className="mt-8">
          <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                🤖 AI-Powered Financial Insights
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Advanced analysis of your spending patterns with actionable recommendations
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <TrendingUp className="w-8 h-8 text-green-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Income</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      ₹{enhancedAnalysis.insights?.totalIncome?.toLocaleString('en-IN') || '0'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <TrendingDown className="w-8 h-8 text-red-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Expenses</p>
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                      ₹{enhancedAnalysis.insights?.totalExpenses?.toLocaleString('en-IN') || '0'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <DollarSign className="w-8 h-8 text-blue-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Net Savings</p>
                    <p className={`text-2xl font-bold ${enhancedAnalysis.insights?.netSavings >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}`}>
                      ₹{enhancedAnalysis.insights?.netSavings?.toLocaleString('en-IN') || '0'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Category Breakdown Pie Chart */}
              {enhancedAnalysis.charts?.categoryBreakdown && enhancedAnalysis.charts.categoryBreakdown.length > 0 && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Spending by Category</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={enhancedAnalysis.charts.categoryBreakdown}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="amount"
                      >
                        {enhancedAnalysis.charts.categoryBreakdown.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={entry.color || `#${Math.floor(Math.random()*16777215).toString(16)}`} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `₹${value?.toLocaleString('en-IN')}`} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Monthly Comparison Bar Chart */}
              {enhancedAnalysis.charts?.monthlyComparison && enhancedAnalysis.charts.monthlyComparison.length > 0 && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Income vs Expenses</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={enhancedAnalysis.charts.monthlyComparison}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => `₹${value?.toLocaleString('en-IN')}`} />
                      <Legend />
                      <Bar dataKey="income" fill="#10b981" name="Income" />
                      <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            {/* AI Recommendations */}
            {enhancedAnalysis.insights?.recommendations && enhancedAnalysis.insights.recommendations.length > 0 && (
              <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Bot className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" />
                  AI Recommendations
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {enhancedAnalysis.insights.recommendations.map((rec: string, index: number) => (
                    <div key={index} className="flex items-start p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-gray-700 dark:text-gray-200 text-sm">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 
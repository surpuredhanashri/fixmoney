import { NextRequest, NextResponse } from 'next/server';

interface Transaction {
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  category: string;
}

interface AnalysisResult {
  transactions: Transaction[];
  insights: {
    totalIncome: number;
    totalExpenses: number;
    netSavings: number;
    topSpendingCategories: Array<{ category: string; amount: number; percentage: number }>;
    monthlyTrends: Array<{ month: string; income: number; expenses: number; savings: number }>;
    recommendations: string[];
    spendingLeaks: Array<{ category: string; amount: number; suggestion: string }>;
  };
  charts: {
    categoryBreakdown: Array<{ category: string; amount: number; color: string }>;
    monthlyComparison: Array<{ month: string; income: number; expenses: number }>;
    spendingPattern: Array<{ dayOfWeek: string; amount: number }>;
  };
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const fileType = formData.get('fileType') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'File is required' },
        { status: 400 }
      );
    }

    let textContent = '';

    if (fileType === 'pdf') {
      // For PDF files, we'll extract text content directly
      // Since pdf-parse might have issues, we'll use a simpler approach
      try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        // Simple text extraction from PDF buffer
        // This is a basic approach - in production you'd want a more robust PDF parser
        const text = buffer.toString('utf8');
        
        // Extract readable text content
        textContent = extractTextFromPDFBuffer(buffer);
        
        if (!textContent || textContent.trim().length === 0) {
          // Fallback: try to extract text from the buffer directly
          textContent = buffer.toString('utf8').replace(/[^\x20-\x7E\n\r\t]/g, '');
        }
      } catch (pdfError) {
        console.error('PDF parsing error:', pdfError);
        // Fallback to basic text extraction
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        textContent = buffer.toString('utf8').replace(/[^\x20-\x7E\n\r\t]/g, '');
      }
    } else if (fileType === 'csv') {
      // For CSV, we'll read it as text first
      textContent = await file.text();
    } else {
      return NextResponse.json(
        { error: 'Unsupported file type' },
        { status: 400 }
      );
    }

    // Use Gemini to analyze the statement
    const analysis = await analyzeWithGemini(textContent, fileType);

    return NextResponse.json({
      success: true,
      ...analysis
    });

  } catch (error) {
    console.error('Statement analysis error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to analyze statement',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

async function analyzeWithGemini(textContent: string, fileType: string): Promise<AnalysisResult> {
  const GEMINI_API_KEY = 'AIzaSyBHXP2fDAPaozAWnN44BUXrkPGQP2SqEKo';
  const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

  const prompt = `Analyze this ${fileType.toUpperCase()} bank statement and provide detailed financial insights.

Statement Content:
${textContent}

Please provide a JSON response with the following structure:
{
  "transactions": [
    {
      "date": "YYYY-MM-DD",
      "description": "transaction description",
      "amount": number,
      "type": "credit" or "debit",
      "category": "categorized spending category"
    }
  ],
  "insights": {
    "totalIncome": number,
    "totalExpenses": number,
    "netSavings": number,
    "topSpendingCategories": [
      {"category": "string", "amount": number, "percentage": number}
    ],
    "monthlyTrends": [
      {"month": "string", "income": number, "expenses": number, "savings": number}
    ],
    "recommendations": ["string array"],
    "spendingLeaks": [
      {"category": "string", "amount": number, "suggestion": "string"}
    ]
  },
  "charts": {
    "categoryBreakdown": [
      {"category": "string", "amount": number, "color": "hex color"}
    ],
    "monthlyComparison": [
      {"month": "string", "income": number, "expenses": number}
    ],
    "spendingPattern": [
      {"dayOfWeek": "string", "amount": number}
    ]
  }
}

Important:
1. Categorize transactions into meaningful categories like: Food & Dining, Transportation, Shopping, Entertainment, Utilities, Healthcare, Subscriptions, Investments, etc.
2. Calculate percentages accurately
3. Provide actionable financial recommendations
4. Use realistic colors for charts
5. Ensure all amounts are positive numbers
6. Return only valid JSON, no additional text`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.1,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 4000,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const aiResponse = data.candidates[0].content.parts[0].text;
      
      // Extract JSON from the response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsedAnalysis = JSON.parse(jsonMatch[0]);
        return parsedAnalysis as AnalysisResult;
      } else {
        throw new Error('No valid JSON found in AI response');
      }
    } else {
      throw new Error('Invalid response format from Gemini API');
    }

  } catch (error) {
    console.error('Gemini analysis error:', error);
    
    // Fallback to basic parsing if Gemini fails
    return fallbackAnalysis(textContent);
  }
}

function extractTextFromPDFBuffer(buffer: Buffer): string {
  try {
    // Convert buffer to string and clean up
    let text = buffer.toString('utf8');
    
    // Remove binary data and keep only readable text
    text = text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '');
    
    // Extract text between parentheses and brackets (common in PDFs)
    const textMatches = text.match(/\(([^)]+)\)/g) || [];
    const bracketMatches = text.match(/\[([^\]]+)\]/g) || [];
    
    // Combine all readable text
    let extractedText = text.replace(/[^\x20-\x7E\n\r\t]/g, ' ');
    
    // Add extracted text from parentheses and brackets
    textMatches.forEach(match => {
      const cleanText = match.replace(/[^\x20-\x7E]/g, ' ').trim();
      if (cleanText.length > 3) {
        extractedText += '\n' + cleanText;
      }
    });
    
    bracketMatches.forEach(match => {
      const cleanText = match.replace(/[^\x20-\x7E]/g, ' ').trim();
      if (cleanText.length > 3) {
        extractedText += '\n' + cleanText;
      }
    });
    
    // Clean up extra whitespace
    extractedText = extractedText.replace(/\s+/g, ' ').trim();
    
    return extractedText;
  } catch (error) {
    console.error('PDF text extraction error:', error);
    return '';
  }
}

function fallbackAnalysis(textContent: string): AnalysisResult {
  // Enhanced fallback analysis when Gemini fails
  const lines = textContent.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
  const transactions: Transaction[] = [];
  const categories = {
    'Food & Dining': ['restaurant', 'food', 'meal', 'dining', 'cafe', 'pizza', 'burger', 'swiggy', 'zomato', 'hotel', 'bar'],
    'Transportation': ['uber', 'ola', 'fuel', 'petrol', 'diesel', 'metro', 'bus', 'train', 'taxi', 'parking', 'toll'],
    'Shopping': ['amazon', 'flipkart', 'myntra', 'shopping', 'clothes', 'electronics', 'online', 'store', 'mall'],
    'Entertainment': ['netflix', 'prime', 'hotstar', 'movie', 'cinema', 'game', 'streaming', 'concert', 'show'],
    'Utilities': ['electricity', 'water', 'gas', 'internet', 'phone', 'mobile', 'bill', 'recharge', 'prepaid'],
    'Healthcare': ['medical', 'pharmacy', 'doctor', 'hospital', 'medicine', 'health', 'clinic', 'dental'],
    'Subscriptions': ['subscription', 'membership', 'renewal', 'auto-debit', 'recurring', 'gym', 'fitness'],
    'Investments': ['sip', 'mutual fund', 'investment', 'stocks', 'shares', 'nse', 'bse', 'portfolio'],
    'Salary': ['salary', 'income', 'credit', 'deposit', 'transfer', 'refund'],
    'ATM': ['atm', 'withdrawal', 'cash', 'bank'],
  };

  // Enhanced transaction extraction patterns
  const datePatterns = [
    /(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})/, // DD/MM/YYYY
    /(\d{4}[\/\-\.]\d{1,2}[\/\-\.]\d{1,2})/, // YYYY/MM/DD
  ];
  
  const amountPatterns = [
    /([0-9,]+\.\d{2})/, // 1,234.56
    /([0-9,]+\.\d{1})/, // 1,234.5
    /([0-9,]+)/, // 1,234
    /([0-9]+\.\d{2})/, // 1234.56
  ];

  lines.forEach(line => {
    let date = '';
    let amount = 0;
    let description = '';
    
    // Find date
    for (const pattern of datePatterns) {
      const match = line.match(pattern);
      if (match) {
        date = normalizeDate(match[1]);
        break;
      }
    }
    
    // Find amount
    for (const pattern of amountPatterns) {
      const match = line.match(pattern);
      if (match) {
        const amountStr = match[1].replace(/,/g, '');
        const parsedAmount = parseFloat(amountStr);
        if (!isNaN(parsedAmount) && parsedAmount > 0) {
          amount = parsedAmount;
          break;
        }
      }
    }
    
    if (date && amount > 0) {
      // Extract description by removing date and amount
      description = line
        .replace(date, '')
        .replace(amount.toString(), '')
        .replace(/[0-9,]+\.\d{0,2}/g, '')
        .replace(/^\s*[-|]\s*/, '')
        .trim();
      
      if (description.length < 3 && lines.length > 1) {
        // Try to get description from previous or next line
        const lineIndex = lines.indexOf(line);
        if (lineIndex > 0) {
          const prevLine = lines[lineIndex - 1];
          if (!hasDate(prevLine) && !hasAmount(prevLine)) {
            description = prevLine.trim() + ' ' + description;
          }
        }
      }
      
      if (description.length > 0) {
        let category = 'Other';
        const descLower = description.toLowerCase();
        
        for (const [cat, keywords] of Object.entries(categories)) {
          if (keywords.some(keyword => descLower.includes(keyword))) {
            category = cat;
            break;
          }
        }

        // Determine transaction type
        const type: 'credit' | 'debit' = determineTransactionType(description, amount);
        
        transactions.push({
          date,
          description: description || 'Transaction',
          amount,
          type,
          category
        });
      }
    }
  });

  // Calculate enhanced insights
  const totalIncome = transactions.filter(t => t.type === 'credit').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'debit').reduce((sum, t) => sum + t.amount, 0);
  const netSavings = totalIncome - totalExpenses;

  // Generate spending categories breakdown
  const categoryBreakdown = Object.entries(
    transactions
      .filter(t => t.type === 'debit')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>)
  ).map(([category, amount]) => ({
    category,
    amount,
    color: getRandomColor()
  }));

  // Generate recommendations
  const recommendations = [];
  if (totalExpenses > totalIncome * 0.8) {
    recommendations.push('Your expenses are high relative to income. Consider reducing non-essential spending.');
  }
  if (netSavings < 0) {
    recommendations.push('You\'re spending more than you earn. Focus on increasing income or reducing expenses.');
  }
  if (categoryBreakdown.length > 0) {
    const topCategory = categoryBreakdown.reduce((a, b) => a.amount > b.amount ? a : b);
    recommendations.push(`Your highest spending category is ${topCategory.category}. Review if this aligns with your financial goals.`);
  }
  if (recommendations.length === 0) {
    recommendations.push('Good job maintaining a balanced budget! Keep tracking your expenses regularly.');
  }

  return {
    transactions,
    insights: {
      totalIncome,
      totalExpenses,
      netSavings,
      topSpendingCategories: categoryBreakdown.slice(0, 5).map(cat => ({
        category: cat.category,
        amount: cat.amount,
        percentage: (cat.amount / totalExpenses) * 100
      })),
      monthlyTrends: [],
      recommendations,
      spendingLeaks: []
    },
    charts: {
      categoryBreakdown,
      monthlyComparison: [],
      spendingPattern: []
    }
  };
}

function hasDate(line: string): boolean {
  return /\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}/.test(line) || /\d{4}[\/\-\.]\d{1,2}[\/\-\.]\d{1,2}/.test(line);
}

function hasAmount(line: string): boolean {
  return /[0-9,]+\.?\d{0,2}/.test(line);
}

function determineTransactionType(description: string, amount: number): 'credit' | 'debit' {
  const lowerDesc = description.toLowerCase();
  
  const creditKeywords = ['credit', 'deposit', 'transfer', 'refund', 'cashback', 'interest', 'salary', 'payment', 'reversal'];
  const debitKeywords = ['debit', 'withdrawal', 'purchase', 'payment', 'fee', 'charge', 'atm', 'pos', 'online', 'bill'];
  
  if (creditKeywords.some(keyword => lowerDesc.includes(keyword))) {
    return 'credit';
  }
  
  if (debitKeywords.some(keyword => lowerDesc.includes(keyword))) {
    return 'debit';
  }
  
  // Default to debit for most transactions
  return 'debit';
}

function getRandomColor(): string {
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D6', '#84CC16', '#F97316'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function normalizeDate(dateStr: string): string {
  try {
    if (dateStr.includes('/')) {
      const parts = dateStr.split('/');
      if (parts.length === 3) {
        if (parts[2].length === 2) parts[2] = '20' + parts[2];
        return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
      }
    } else if (dateStr.includes('-')) {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        if (parts[2].length === 2) parts[2] = '20' + parts[2];
        return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
      }
    } else if (dateStr.includes('.')) {
      const parts = dateStr.split('.');
      if (parts.length === 3) {
        if (parts[2].length === 2) parts[2] = '20' + parts[2];
        return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
      }
    }
    return dateStr;
  } catch (error) {
    return dateStr;
  }
} 
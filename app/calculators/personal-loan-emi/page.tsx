import { Metadata } from 'next';
import PersonalLoanEMICalculator from '@/components/PersonalLoanEMICalculator';

export const metadata: Metadata = {
  title: 'Personal Loan EMI Calculator - Calculate Personal Loan EMI | FixMoney.in',
  description: 'Calculate personal loan EMI, interest, and total cost. Compare different loan amounts and tenures with our easy-to-use calculator.',
  keywords: 'personal loan EMI calculator, personal loan calculator, EMI calculator, loan EMI calculator',
};

export default function PersonalLoanEMICalculatorPage() {
  return <PersonalLoanEMICalculator />;
} 
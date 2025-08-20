import { Metadata } from 'next';
import EMICalculator from '@/components/EMICalculator';

export const metadata: Metadata = {
  title: 'EMI Calculator - Calculate Loan EMI Online | FixMoney.in',
  description: 'Calculate EMI for any loan amount, interest rate, and tenure. Get detailed breakdown of principal and interest with our accurate EMI calculator.',
  keywords: 'EMI calculator, loan EMI calculator, EMI calculation, loan calculator, monthly EMI calculator',
};

export default function EMICalculatorPage() {
  return <EMICalculator />;
} 
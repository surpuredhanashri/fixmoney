import { Metadata } from 'next';
import HomeLoanEMICalculator from '@/components/HomeLoanEMICalculator';

export const metadata: Metadata = {
  title: 'Home Loan EMI Calculator - Calculate Home Loan EMI Online | FixMoney.in',
  description: 'Calculate home loan EMI, total interest, and loan affordability. Plan your home purchase with our accurate home loan EMI calculator for Indian banks.',
  keywords: 'home loan EMI calculator, home loan calculator, EMI calculator, home loan interest calculator, housing loan EMI',
};

export default function HomeLoanEMICalculatorPage() {
  return <HomeLoanEMICalculator />;
} 
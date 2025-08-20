import { Metadata } from 'next';
import CAGRCalculator from '@/components/CAGRCalculator';

export const metadata: Metadata = {
  title: 'CAGR Calculator - Calculate Compound Annual Growth Rate | FixMoney.in',
  description: 'Calculate CAGR, investment growth rate, and annualized returns. Understand compound growth with our comprehensive CAGR calculator.',
  keywords: 'CAGR calculator, compound annual growth rate calculator, investment growth calculator, annualized returns',
};

export default function CAGRCalculatorPage() {
  return <CAGRCalculator />;
} 
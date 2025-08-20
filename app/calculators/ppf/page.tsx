import { Metadata } from 'next';
import PPFCalculator from '@/components/PPFCalculator';

export const metadata: Metadata = {
  title: 'PPF Calculator - Calculate PPF Returns Online | FixMoney.in',
  description: 'Calculate PPF returns, maturity amount, and tax benefits. Plan your Public Provident Fund with our accurate PPF calculator for Indian investors.',
  keywords: 'PPF calculator, Public Provident Fund calculator, PPF returns, PPF maturity amount, PPF tax benefits',
};

export default function PPFCalculatorPage() {
  return <PPFCalculator />;
} 
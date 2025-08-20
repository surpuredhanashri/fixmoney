import { Metadata } from 'next';
import FDCalculator from '@/components/FDCalculator';

export const metadata: Metadata = {
  title: 'FD Calculator - Calculate Fixed Deposit Returns | FixMoney.in',
  description: 'Calculate FD returns, maturity amount, and interest earned. Plan your fixed deposits with our accurate FD calculator for Indian banks.',
  keywords: 'FD calculator, fixed deposit calculator, FD returns, FD maturity amount, FD interest calculator',
};

export default function FDCalculatorPage() {
  return <FDCalculator />;
} 
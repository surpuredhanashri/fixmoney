import { Metadata } from 'next';
import RDCalculator from '@/components/RDCalculator';

export const metadata: Metadata = {
  title: 'RD Calculator - Calculate Recurring Deposit Returns | FixMoney.in',
  description: 'Calculate RD returns, maturity amount, and interest earned. Plan your recurring deposits with our accurate RD calculator for Indian banks.',
  keywords: 'RD calculator, recurring deposit calculator, RD returns, RD maturity amount, RD interest calculator',
};

export default function RDCalculatorPage() {
  return <RDCalculator />;
} 
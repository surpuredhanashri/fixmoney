import { Metadata } from 'next';
import CompoundInterestCalculator from '@/components/CompoundInterestCalculator';

export const metadata: Metadata = {
  title: 'Compound Interest Calculator - Calculate Growth Online | FixMoney.in',
  description: 'Calculate compound interest growth with interactive charts and detailed breakdown. See how your money grows over time.',
  keywords: 'compound interest calculator, interest growth calculator, compound growth calculator, investment calculator',
};

export default function CompoundInterestCalculatorPage() {
  return <CompoundInterestCalculator />;
} 
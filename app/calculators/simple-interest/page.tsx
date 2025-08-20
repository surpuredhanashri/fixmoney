import { Metadata } from 'next';
import SimpleInterestCalculator from '@/components/SimpleInterestCalculator';

export const metadata: Metadata = {
  title: 'Simple Interest Calculator - Calculate Interest Online | FixMoney.in',
  description: 'Calculate simple interest on loans and investments. Easy-to-use calculator with interactive sliders and detailed breakdown.',
  keywords: 'simple interest calculator, interest calculator, loan interest calculator, simple interest formula',
};

export default function SimpleInterestCalculatorPage() {
  return <SimpleInterestCalculator />;
} 
import { Metadata } from 'next';
import SIPCalculator from '@/components/SIPCalculator';

export const metadata: Metadata = {
  title: 'SIP Calculator - Calculate SIP Returns Online | FixMoney.in',
  description: 'Calculate SIP returns, wealth creation, and investment growth. Plan your Systematic Investment Plan with our accurate SIP calculator for mutual funds.',
  keywords: 'SIP calculator, mutual fund SIP calculator, SIP returns calculator, systematic investment plan calculator',
};

export default function SIPCalculatorPage() {
  return <SIPCalculator />;
} 
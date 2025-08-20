import { Metadata } from 'next';
import NPSCalculator from '@/components/NPSCalculator';

export const metadata: Metadata = {
  title: 'NPS Calculator - Calculate National Pension Scheme Returns | FixMoney.in',
  description: 'Calculate NPS returns, pension corpus, and monthly pension. Plan your retirement with our accurate NPS calculator for Indian investors.',
  keywords: 'NPS calculator, National Pension Scheme calculator, NPS returns, pension calculator, retirement planning',
};

export default function NPSCalculatorPage() {
  return <NPSCalculator />;
} 
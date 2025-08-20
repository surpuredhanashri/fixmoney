import { Metadata } from 'next';
import HRACalculator from '@/components/HRACalculator';

export const metadata: Metadata = {
  title: 'HRA Calculator - Calculate HRA Tax Benefits | FixMoney.in',
  description: 'Calculate HRA tax benefits, exemptions, and take home salary. Understand HRA calculation with city-wise rates and rent paid.',
  keywords: 'HRA calculator, house rent allowance calculator, HRA tax benefits, HRA exemption calculator',
};

export default function HRACalculatorPage() {
  return <HRACalculator />;
} 
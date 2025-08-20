import { Metadata } from 'next';
import GratuityCalculator from '@/components/GratuityCalculator';

export const metadata: Metadata = {
  title: 'Gratuity Calculator - Calculate Gratuity Amount Online | FixMoney.in',
  description: 'Calculate gratuity amount on retirement or resignation. Easy-to-use calculator with Indian gratuity rules and tax implications.',
  keywords: 'gratuity calculator, gratuity amount calculator, retirement gratuity, gratuity calculation India',
};

export default function GratuityCalculatorPage() {
  return <GratuityCalculator />;
} 
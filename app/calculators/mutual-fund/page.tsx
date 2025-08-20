import { Metadata } from 'next';
import MutualFundCalculator from '@/components/MutualFundCalculator';

export const metadata: Metadata = {
  title: 'Mutual Fund Calculator - Calculate MF Returns | FixMoney.in',
  description: 'Calculate mutual fund returns, SIP growth, and lumpsum investments. Compare different fund categories with our comprehensive MF calculator.',
  keywords: 'mutual fund calculator, MF calculator, SIP calculator, lumpsum calculator, fund returns',
};

export default function MutualFundCalculatorPage() {
  return <MutualFundCalculator />;
} 
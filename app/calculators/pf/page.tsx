import { Metadata } from 'next';
import PFCalculator from '@/components/PFCalculator';

export const metadata: Metadata = {
  title: 'PF Calculator - Calculate Provident Fund | FixMoney.in',
  description: 'Calculate PF contributions, employer matching, and maturity amount. Plan your retirement with our comprehensive PF calculator.',
  keywords: 'PF calculator, provident fund calculator, EPF calculator, employee PF calculator',
};

export default function PFCalculatorPage() {
  return <PFCalculator />;
} 
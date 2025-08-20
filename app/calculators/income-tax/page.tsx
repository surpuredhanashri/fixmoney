import { Metadata } from 'next';
import IncomeTaxCalculator from '@/components/IncomeTaxCalculator';

export const metadata: Metadata = {
  title: 'Income Tax Calculator FY 2024-25 - Calculate Tax Online | FixMoney.in',
  description: 'Calculate income tax for FY 2024-25 with our accurate Indian income tax calculator. Includes all deductions, exemptions, and new tax regime calculations.',
  keywords: 'income tax calculator, tax calculator FY 2024-25, Indian tax calculator, tax calculation, income tax India',
};

export default function IncomeTaxCalculatorPage() {
  return <IncomeTaxCalculator />;
} 
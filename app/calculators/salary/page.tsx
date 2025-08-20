import { Metadata } from 'next';
import SalaryCalculator from '@/components/SalaryCalculator';

export const metadata: Metadata = {
  title: 'Salary Calculator - Calculate Take Home Salary | FixMoney.in',
  description: 'Calculate take home salary, tax deductions, and salary components. Understand your CTC breakdown with our comprehensive salary calculator.',
  keywords: 'salary calculator, take home salary calculator, CTC calculator, salary breakdown calculator',
};

export default function SalaryCalculatorPage() {
  return <SalaryCalculator />;
} 
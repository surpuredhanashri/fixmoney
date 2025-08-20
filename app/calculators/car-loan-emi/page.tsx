import { Metadata } from 'next';
import CarLoanEMICalculator from '@/components/CarLoanEMICalculator';

export const metadata: Metadata = {
  title: 'Car Loan EMI Calculator - Calculate Car Loan EMI | FixMoney.in',
  description: 'Calculate car loan EMI, down payment, and total cost. Compare different car prices and loan options with our comprehensive calculator.',
  keywords: 'car loan EMI calculator, car loan calculator, auto loan calculator, vehicle loan EMI',
};

export default function CarLoanEMICalculatorPage() {
  return <CarLoanEMICalculator />;
} 
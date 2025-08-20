import { Metadata } from 'next';
import DiscountCalculator from '@/components/DiscountCalculator';

export const metadata: Metadata = {
  title: 'Discount Calculator - Calculate Discounts and Savings | FixMoney.in',
  description: 'Calculate discounts, final prices, and savings on purchases. Multiple discount types with percentage and amount calculations.',
  keywords: 'discount calculator, price calculator, savings calculator, discount percentage calculator',
};

export default function DiscountCalculatorPage() {
  return <DiscountCalculator />;
} 
import type { Metadata } from 'next';
import HomePageClient from '@/components/HomePageClient';

export const metadata: Metadata = {
  title: 'FixMoney.in - Professional Financial Calculators & Budget Tools',
  description: 'Comprehensive collection of financial calculators for EMI, SIP, FD, PPF, tax planning, and AI-powered budget analysis. Make smart financial decisions with our professional tools.',
  keywords: [
    'financial calculator',
    'EMI calculator',
    'SIP calculator',
    'FD calculator',
    'PPF calculator',
    'tax calculator',
    'budget planner',
    'investment calculator',
    'loan calculator',
    'retirement planning',
    'wealth management',
    'financial planning'
  ],
  openGraph: {
    title: 'FixMoney.in - Professional Financial Calculators & Budget Tools',
    description: 'Professional financial calculators for EMI, SIP, FD, PPF, tax planning, and AI-powered budget analysis.',
    images: ['/og-image.png'],
  },
};

export default function HomePage() {
  return <HomePageClient />;
} 
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - FixMoney.in | Get Financial Help & Support',
  description: 'Contact FixMoney.in for financial advice, technical support, or business inquiries. Our team is here to help you fix your money problems.',
  keywords: [
    'contact fixmoney',
    'financial support',
    'money advice',
    'customer service',
    'financial help'
  ],
  openGraph: {
    title: 'Contact Us - FixMoney.in | Get Financial Help & Support',
    description: 'Contact FixMoney.in for financial advice, technical support, or business inquiries.',
    url: 'https://fixmoney.in/contact',
  },
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 
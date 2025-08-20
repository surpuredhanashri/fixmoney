import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Providers from '@/components/Providers';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PerformanceMonitor from '@/components/PerformanceMonitor';
import FloatingChat from '@/components/FloatingChat';
import { Toaster } from 'react-hot-toast';
import './globals.css';

// Font optimization
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: 'FixMoney.in - Financial Calculators & Budget Tools',
    template: '%s | FixMoney.in'
  },
  description: 'Professional financial calculators for EMI, SIP, FD, PPF, tax planning, and budget analysis. AI-powered tools for smart financial decisions.',
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
  authors: [{ name: 'FixMoney Team' }],
  creator: 'FixMoney.in',
  publisher: 'FixMoney.in',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://fixmoney.in'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fixmoney.in',
    title: 'FixMoney.in - Financial Calculators & Budget Tools',
    description: 'Professional financial calculators for EMI, SIP, FD, PPF, tax planning, and budget analysis. AI-powered tools for smart financial decisions.',
    siteName: 'FixMoney.in',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FixMoney.in - Financial Calculators',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FixMoney.in - Financial Calculators & Budget Tools',
    description: 'Professional financial calculators for EMI, SIP, FD, PPF, tax planning, and budget analysis.',
    images: ['/og-image.png'],
    creator: '@fixmoney',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'Finance',
  classification: 'Financial Tools',
  other: {
    'msapplication-TileColor': '#3b82f6',
    'theme-color': '#3b82f6',
  },
};

// export const viewport: Viewport = {
//   width: 'device-width',
//   initialScale: 1,
//   maximumScale: 5,
//   userScalable: true,
//   themeColor: [
//     { media: '(prefers-color-scheme: light)', color: '#3b82f6' },
//     { media: '(prefers-color-scheme: dark)', color: '#60a5fa' },
//   ],
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        
        {/* Manifest and icons */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "FixMoney.in",
              "description": "Professional financial calculators for EMI, SIP, FD, PPF, tax planning, and budget analysis.",
              "url": "https://fixmoney.in",
              "applicationCategory": "FinanceApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "author": {
                "@type": "Organization",
                "name": "FixMoney.in"
              },
              "featureList": [
                "EMI Calculator",
                "SIP Calculator", 
                "FD Calculator",
                "PPF Calculator",
                "Tax Calculator",
                "Budget Analysis"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Providers session={null}>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            
            {/* Performance Monitor - Now inside ThemeProvider */}
            <PerformanceMonitor />
            
            {/* Floating Chat */}
            <FloatingChat />
            <Toaster />
          </div>
        </Providers>
        
        {/* Performance Monitoring */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Performance monitoring
              if ('performance' in window) {
                window.addEventListener('load', () => {
                  setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    if (perfData) {
                      console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                      console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart, 'ms');
                    }
                  }, 0);
                });
              }
              
              // Service Worker registration
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                    .then(registration => console.log('SW registered'))
                    .catch(error => console.log('SW registration failed'));
                });
              }
            `
          }}
        />
      </body>
    </html>
  );
} 
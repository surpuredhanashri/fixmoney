import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fixmoney.in';
  
  // Main pages
  const mainPages = [
    '',
    '/about',
    '/contact',
    '/blogs',
    '/calculators',
    '/budget-fixer',
  ];

  // Calculator pages
  const calculatorPages = [
    '/calculators/emi',
    '/calculators/sip',
    '/calculators/fd',
    '/calculators/ppf',
    '/calculators/rd',
    '/calculators/nps',
    '/calculators/income-tax',
    '/calculators/home-loan-emi',
    '/calculators/simple-interest',
    '/calculators/compound-interest',
    '/calculators/gratuity',
    '/calculators/personal-loan-emi',
    '/calculators/car-loan-emi',
    '/calculators/mutual-fund',
    '/calculators/pf',
    '/calculators/salary',
    '/calculators/hra',
    '/calculators/cagr',
    '/calculators/discount',
  ];

  // Generate sitemap entries
  const sitemap: MetadataRoute.Sitemap = [
    // Main pages
    ...mainPages.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1 : 0.8,
    })),
    
    // Calculator pages
    ...calculatorPages.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  return sitemap;
} 
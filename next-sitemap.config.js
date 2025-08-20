/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://fixmoney.in',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/admin/*', '/api/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    additionalSitemaps: [
      'https://fixmoney.in/sitemap.xml',
    ],
  },
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
}; 
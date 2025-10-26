import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://aetherinc.xyz'

  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/about',
        '/contact',
        '/pricing',
        '/products',
        '/ai-tools',
        '/documentation',
        '/examples',
        '/roi-calculator',
        '/legal',
        '/terms',
        '/privacy',
      ],
      disallow: [
        '/admin/',
        '/api/',
        '/_next/',
        '/coming-soon',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}


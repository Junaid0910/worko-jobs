import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/careers',
    '/privacy',
    '/terms',
    '/verification',
    '/workers',
    '/jobs',
    '/login',
    '/onboarding',
  ];

  return staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1.0 : 0.8,
  }));
}

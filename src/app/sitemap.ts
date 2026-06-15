import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || 'https://worko.co';

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

  const sitemapItems: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1.0 : 0.8,
  }));

  try {
    // 1. Fetch all available workers
    const workers = await prisma.worker.findMany({
      where: { isAvailable: true },
      select: { id: true }
    });

    const workerUrls = workers.map((w) => ({
      url: `${baseUrl}/workers/${w.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    // 2. Fetch all active jobs
    const jobs = await prisma.job.findMany({
      where: { isActive: true },
      select: { id: true }
    });

    const jobUrls = jobs.map((j) => ({
      url: `${baseUrl}/jobs/${j.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    return [...sitemapItems, ...workerUrls, ...jobUrls];
  } catch (error) {
    console.error("Sitemap generation database error:", error);
    return sitemapItems;
  }
}

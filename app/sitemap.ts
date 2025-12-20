import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://worldsafaritours.com'

  // Fetch packages to include in sitemap
  let packageRoutes: any[] = []
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3000/api'}/packages`)
    if (res.ok) {
      const packages = await res.json()
      packageRoutes = packages.map((pkg: any) => ({
        url: `${baseUrl}/packages/${pkg.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
      }))
    }
  } catch (error) {
    console.error('Sitemap: Failed to fetch packages', error)
  }

  const routes = [
    '',
    '/about',
    '/contact',
    '/packages',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return [...routes, ...packageRoutes]
}

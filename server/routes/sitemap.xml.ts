// /sitemap.xml: Google'a sitedeki tüm sayfaların listesini verir.
// server/routes/ altındaki dosyalar Nuxt'ın sunucu tarafında çalışan adreslerdir.
// Blog yazıları ve kavramlar Nuxt Content'ten okunur; yeni yazı ekleyince harita kendiliğinden güncellenir.
import { queryCollection } from '@nuxt/content/server'

// Sabit sayfalar ve önemleri (0-1 arası; Google için ipucu)
const STATIC_PAGES = [
  { path: '/', priority: 1.0 },
  { path: '/projects', priority: 0.9 },
  { path: '/ogrendiklerim', priority: 0.8 },
  { path: '/about', priority: 0.8 },
  { path: '/blog', priority: 0.8 },
  { path: '/kavramlar', priority: 0.7 },
  { path: '/raf', priority: 0.6 },
  { path: '/contact', priority: 0.5 },
]

export default defineEventHandler(async (event) => {
  const siteUrl = useRuntimeConfig(event).public.siteUrl.replace(/\/$/, '')

  const posts = await queryCollection(event, 'blog').select('path', 'date').all()
  const concepts = await queryCollection(event, 'kavramlar').select('path').all()
  const books = await queryCollection(event, 'kitaplar').select('path').all()

  const urls = [
    ...STATIC_PAGES.map((p) => ({ loc: p.path, priority: p.priority, lastmod: undefined as string | undefined })),
    ...posts.map((p) => ({ loc: p.path, priority: 0.7, lastmod: p.date })),
    ...concepts.map((c) => ({ loc: c.path, priority: 0.5, lastmod: undefined })),
    ...books.map((b) => ({ loc: b.path, priority: 0.5, lastmod: undefined })),
  ]

  const body = urls
    .map(
      (u) =>
        `  <url>\n    <loc>${siteUrl}${u.loc}</loc>\n` +
        (u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>\n` : '') +
        `    <priority>${u.priority.toFixed(1)}</priority>\n  </url>`,
    )
    .join('\n')

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
})

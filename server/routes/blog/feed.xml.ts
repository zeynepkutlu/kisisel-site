// /blog/feed.xml: blogun RSS beslemesi. RSS okuyucular (Feedly vb.) yeni yazıları buradan takip eder.
// Yazılar Nuxt Content'ten okunduğu için yeni yazı ekleyince besleme kendiliğinden güncellenir.
import { queryCollection } from '@nuxt/content/server'

// XML'de özel anlamı olan karakterleri güvenli hale getirir (ör. "&" → "&amp;")
const escapeXml = (text: string) =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

export default defineEventHandler(async (event) => {
  const siteUrl = useRuntimeConfig(event).public.siteUrl.replace(/\/$/, '')
  const posts = await queryCollection(event, 'blog').order('date', 'DESC').all()

  const items = posts
    .map((post) => {
      const url = `${siteUrl}${post.path}`
      return [
        '    <item>',
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>`,
        post.description ? `      <description>${escapeXml(post.description)}</description>` : '',
        post.category ? `      <category>${escapeXml(post.category)}</category>` : '',
        '    </item>',
      ]
        .filter(Boolean)
        .join('\n')
    })
    .join('\n')

  setHeader(event, 'content-type', 'application/rss+xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Zeynep Kutlu · Blog</title>
    <link>${siteUrl}/blog</link>
    <atom:link href="${siteUrl}/blog/feed.xml" rel="self" type="application/rss+xml" />
    <description>Öğrenme günlüğü, izlediklerimden çıkardıklarım ve kendi yorumlarım.</description>
    <language>tr</language>
${items}
  </channel>
</rss>
`
})

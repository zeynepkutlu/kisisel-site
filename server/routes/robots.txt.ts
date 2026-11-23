// /robots.txt: arama motoru botlarına "her yeri tarayabilirsin, site haritam burada" der.
// Dosya yerine sunucu adresi yaptık ki site haritası adresi siteUrl ayarından otomatik gelsin.
export default defineEventHandler((event) => {
  const siteUrl = useRuntimeConfig(event).public.siteUrl.replace(/\/$/, '')
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
})

// Her sayfanın SEO etiketlerini tek satırla ayarlamak için yardımcı.
// Kullanım: usePageSeo({ title: 'Projeler', description: '...' })
//
// Ne ayarlıyor?
// - <title> ve meta description: Google sonuçlarında görünen başlık ve açıklama
// - canonical: sayfanın "asıl" adresi (aynı içerik farklı adreslerden açılırsa Google karışmasın)
// - Open Graph (og:*): WhatsApp, LinkedIn, Facebook'ta link paylaşınca çıkan önizleme kartı
// - Twitter kartı: X (Twitter) için aynı önizleme
// - robots: arama motorlarına "bu sayfayı listele / listeleme" bilgisi

export const SITE_NAME = 'Zeynep Kutlu'
// Ana sayfanın tam başlığı (diğer sayfalar "Sayfa · Zeynep Kutlu" olur)
export const HOME_TITLE = 'Zeynep Kutlu · Bilgisayar Programcılığı Öğrencisi'

interface PageSeoOptions {
  title?: string // boşsa ana sayfa başlığı kullanılır
  description: string // 150-160 karakter civarı ideal
  image?: string // paylaşım görseli (varsayılan: /og-image.png)
  imageAlt?: string
  type?: 'website' | 'article' | 'profile'
  publishedTime?: string // yazılar için yayın tarihi (YYYY-AA-GG)
  noindex?: boolean // true ise arama motorları bu sayfayı listelemez
}

export function usePageSeo(options: PageSeoOptions) {
  const route = useRoute()
  const siteUrl = useRuntimeConfig().public.siteUrl.replace(/\/$/, '')

  // Tam adresler: sosyal medya göreli adres ("/og-image.png") kabul etmez
  const url = `${siteUrl}${route.path === '/' ? '/' : route.path.replace(/\/$/, '')}`
  const image = `${siteUrl}${options.image ?? '/og-image.png'}`
  const fullTitle = options.title ? `${options.title} · ${SITE_NAME}` : HOME_TITLE

  useHead({
    title: options.title,
    link: [{ rel: 'canonical', href: url }],
  })

  // useSeoMeta: Nuxt'ın SEO etiketleri için tipli yardımcısı (yazım hatasını derlemede yakalar)
  useSeoMeta({
    description: options.description,
    robots: options.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large',

    ogType: options.type ?? 'website',
    ogTitle: fullTitle,
    ogDescription: options.description,
    ogUrl: url,
    ogImage: image,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: options.imageAlt ?? `${SITE_NAME} kişisel sitesi`,
    articlePublishedTime: options.publishedTime,
    articleAuthor: options.type === 'article' ? [SITE_NAME] : undefined,

    twitterCard: 'summary_large_image',
    twitterTitle: fullTitle,
    twitterDescription: options.description,
    twitterImage: image,
  })
}

// Yapılandırılmış veri (JSON-LD): Google'a sayfadaki şeyin "ne" olduğunu makine diliyle anlatır
// (bir kişi mi, bir blog yazısı mı...). Arama sonuçlarında zengin görünüm sağlayabilir.
export function useJsonLd(data: Record<string, unknown>) {
  useHead({
    script: [{ type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', ...data }) }],
  })
}

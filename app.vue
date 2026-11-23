<script setup lang="ts">
// Kök bileşen: her sayfada geçerli olan SEO kuralları burada.
// Nuxt bunları otomatik import edebiliyor; nereden geldikleri belli olsun diye açıkça yazıyoruz.
import { useProfile } from '~/composables/useProfile'
import { HOME_TITLE, SITE_NAME, useJsonLd } from '~/composables/usePageSeo'

// Sayfa başlığı kuralı: sayfa başlık verdiyse "Projeler · Zeynep Kutlu",
// vermediyse (ana sayfa) "Zeynep Kutlu · Bilgisayar Programcılığı Öğrencisi"
useHead({
  titleTemplate: (title) => (title ? `${title} · ${SITE_NAME}` : HOME_TITLE),
})

// Google Search Console doğrulaması: sitenin sana ait olduğunu kanıtlayan etiket (kod boşsa yazılmaz)
useSeoMeta({ googleSiteVerification: useRuntimeConfig().public.googleVerification || undefined })

// Varsayılan paylaşım kartı: bir sayfa usePageSeo çağırmayı unutursa bunlar kullanılır.
// Sayfalar kendi başlık, açıklama ve görselini usePageSeo ile verir (blog yazılarında yazıdan gelir).
const { siteUrl: rawSiteUrl } = useRuntimeConfig().public
const siteUrl = rawSiteUrl.replace(/\/$/, '')
useSeoMeta({
  ogTitle: HOME_TITLE,
  ogImage: `${siteUrl}/og-image.png`,
  twitterCard: 'summary_large_image',
})

// Google için site ve kişi bilgisi (JSON-LD yapılandırılmış veri).
// sameAs: aynı kişiye ait diğer profiller; Google bunları birbirine bağlar.
const profile = useProfile()
const person = {
  '@type': 'Person',
  '@id': `${siteUrl}/#person`,
  name: profile.name,
  url: siteUrl,
  jobTitle: `${profile.education.department} Öğrencisi`,
  affiliation: { '@type': 'CollegeOrUniversity', name: profile.education.school },
  birthPlace: { '@type': 'Place', name: profile.hometown },
  knowsAbout: profile.skills,
  sameAs: profile.socials.map((s) => s.href).filter(Boolean),
}
useJsonLd({
  '@graph': [
    { '@type': 'WebSite', '@id': `${siteUrl}/#website`, url: siteUrl, name: SITE_NAME, inLanguage: 'tr-TR', author: { '@id': `${siteUrl}/#person` } },
    person,
  ],
})
</script>

<!--
  <NuxtLayout> sayfayı seçili layout ile (varsayılan: layouts/default.vue) sarar,
  <NuxtPage> ise o anki adrese ait sayfayı gösterir.
-->
<template>
  <LoadingBar />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

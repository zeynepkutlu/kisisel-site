<script setup lang="ts">
// Dinamik sayfa: dosya adındaki [slug] adresteki değişken kısımdır.
// /blog/nuxt-ogreniyorum adresinde route.params.slug = 'nuxt-ogreniyorum' olur.
const route = useRoute()

// Adrese karşılık gelen Markdown dosyasını bul
const { data: post } = await useAsyncData(`blog-${route.params.slug}`, () =>
  queryCollection('blog').path(`/blog/${route.params.slug}`).first(),
)

// Yazı bulunamazsa Nuxt'ın 404 hata sayfasını göster
if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Yazı bulunamadı', fatal: true })
}

// "Ekrandan öğrendiklerim" yazısıysa: bahsedilen dizi/film (Raf'taki kaydı, afişiyle)
const watchedItem = computed(() =>
  post.value?.watched ? useShelf().find((s) => s.title === post.value?.watched) : undefined,
)

// Paylaşım görseli: YouTube notunda videonun küçük resmi, yoksa sitenin genel görseli
const ytThumb = post.value.youtube ? `https://i.ytimg.com/vi/${post.value.youtube}/hqdefault.jpg` : undefined

// SEO: yazının kendi başlığı ve açıklaması; tür "makale" (article)
usePageSeo({
  title: post.value.title,
  description: post.value.description || `${post.value.title}: Zeynep Kutlu'nun blog yazısı.`,
  type: 'article',
  publishedTime: post.value.date,
})
if (ytThumb) {
  // Görsel başka sitede olduğu için tam adresi doğrudan veriyoruz
  useSeoMeta({ ogImage: ytThumb, twitterImage: ytThumb, ogImageWidth: 480, ogImageHeight: 360 })
}
// Google için "bu bir blog yazısıdır" bilgisi
const siteUrl = useRuntimeConfig().public.siteUrl.replace(/\/$/, '')
useJsonLd({
  '@type': 'BlogPosting',
  headline: post.value.title,
  description: post.value.description,
  datePublished: post.value.date,
  inLanguage: 'tr-TR',
  url: `${siteUrl}${post.value.path}`,
  image: `${siteUrl}/og-image.png`,
  author: { '@id': `${siteUrl}/#person` },
  ...(post.value.category ? { articleSection: post.value.category } : {}),
})
</script>

<template>
  <!-- Okuma genişliği dar tutuluyor: uzun satırlar zor okunur -->
  <v-container v-if="post" style="max-width: 760px">
    <header class="pt-10 pb-8 pt-md-16">
      <NuxtLink to="/blog" class="ui-link">← Tüm yazılar</NuxtLink>
      <p class="kicker mt-8 mb-3">
        <span v-if="post.category" class="kicker--accent">{{ post.category }} · </span>
        {{ formatDate(post.date) }}
      </p>
      <h1 class="text-h3 text-md-h2 display mb-4">{{ post.title }}</h1>
      <p v-if="post.description" class="lead mb-0">{{ post.description }}</p>
    </header>

    <hr class="rule mb-8" />

    <!-- YouTube notuysa: yorumlanan video en başta -->
    <YoutubeVideo v-if="post.youtube" :id="post.youtube" :title="post.title" class="mb-8" />

    <!-- Ekrandan öğrendiklerim: hangi dizi/film hakkında -->
    <NuxtLink v-if="watchedItem" to="/raf" class="watched mb-8">
      <ShelfCover :title="watchedItem.title" :cover="watchedItem.cover" class="watched-cover" />
      <span>
        <span class="kicker kicker--accent d-block mb-1">Bu yazı şu {{ watchedItem.type.toLowerCase() }} hakkında</span>
        <span class="watched-title">{{ watchedItem.title }}</span>
        <span v-if="watchedItem.year" class="kicker d-block mt-1">{{ watchedItem.year }}</span>
      </span>
    </NuxtLink>

    <!-- ContentRenderer: Markdown içeriğini HTML'e çevirip gösterir.
         .prose sınıfının stilleri assets/styles/main.scss'te -->
    <ContentRenderer :value="post" class="prose" />

    <hr class="rule my-10" />
    <div class="d-flex justify-space-between flex-wrap ga-4">
      <NuxtLink to="/blog" class="ui-link">← Tüm yazılar</NuxtLink>
      <button type="button" class="ui-link" @click="goToRandomPost(post.path)">
        Rastgele bir yazı →
      </button>
    </div>
  </v-container>
</template>

<style scoped>
/* "Bu yazı şu film hakkında" kartı: solda küçük afiş, sağda adı */
.watched {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  border: 1px solid var(--rule);
  border-radius: 12px;
  background: rgb(var(--v-theme-surface));
  color: inherit;
  text-decoration: none;
}
.watched:hover {
  border-color: var(--rule-strong);
}
.watched-cover {
  width: 64px;
  flex: none;
}
.watched-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: rgb(var(--v-theme-secondary));
}
</style>

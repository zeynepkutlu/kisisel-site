<script setup lang="ts">
// Tek bir kitabın sayfası: /kitaplar/korluk gibi.
// Bilgiler content/kitaplar/korluk.md dosyasından gelir:
// üstteki alanlar (yazar, kapak, alıntı, ses kaydı...) + gövdedeki yazı.
const route = useRoute()

const { data: book } = await useAsyncData(`kitap-${route.params.slug}`, () =>
  queryCollection('kitaplar').path(`/kitaplar/${route.params.slug}`).first(),
)

if (!book.value) {
  throw createError({ statusCode: 404, statusMessage: 'Kitap bulunamadı', fatal: true })
}

// Gövdede yazı var mı? (boş dosyada "henüz yazı yok" mesajı göstermek için)
const hasBody = computed(() => (book.value?.body?.value?.length ?? 0) > 0)

// ---- SEO ----
const b = book.value
usePageSeo({
  title: b.title,
  description:
    b.note ||
    `${b.title}${b.author ? `, ${b.author}` : ''}: Zeynep Kutlu'nun bu kitaptan sevdiği alıntılar, sesli notu ve düşünceleri.`,
  image: b.cover,
  imageAlt: `${b.title} kapağı`,
  type: 'article',
})
const siteUrl = useRuntimeConfig().public.siteUrl.replace(/\/$/, '')
useJsonLd({
  '@type': 'Book',
  name: b.title,
  ...(b.author ? { author: { '@type': 'Person', name: b.author } } : {}),
  ...(b.cover ? { image: `${siteUrl}${b.cover}` } : {}),
  inLanguage: 'tr',
  url: `${siteUrl}${b.path}`,
  // Puan verildiyse: Zeynep'in değerlendirmesi
  ...(b.rating
    ? { review: { '@type': 'Review', author: { '@id': `${siteUrl}/#person` }, reviewRating: { '@type': 'Rating', ratingValue: b.rating, bestRating: 5 } } }
    : {}),
})
</script>

<template>
  <v-container v-if="book" style="max-width: 980px">
    <div class="pt-10 pt-md-16">
      <NuxtLink to="/raf" class="ui-link">← Raf</NuxtLink>
    </div>

    <v-row class="mt-6" align="start">
      <!-- Sol: kapak -->
      <v-col cols="7" sm="4" md="4">
        <ShelfCover :title="book.title" :cover="book.cover" type="Kitap" />
      </v-col>

      <!-- Sağ: kitap bilgisi -->
      <v-col cols="12" sm="8" md="8" class="pl-sm-8">
        <p class="kicker kicker--accent mb-3">Kitap</p>
        <h1 class="text-h3 text-md-h2 display mb-2">{{ book.title }}</h1>
        <p v-if="book.author" class="author mb-4">{{ book.author }}</p>
        <p v-if="book.rating" class="rating mb-4" :aria-label="`5 üzerinden ${book.rating}`">
          {{ '★'.repeat(book.rating) }}<span class="dim">{{ '★'.repeat(5 - book.rating) }}</span>
        </p>
        <p v-if="book.note" class="lead mb-6">{{ book.note }}</p>

        <!-- Sevdiğim alıntı -->
        <blockquote v-if="book.quote" class="quote mb-6">
          <p class="mb-2">“{{ book.quote }}”</p>
          <footer v-if="book.quotePage" class="kicker">s. {{ book.quotePage }}</footer>
        </blockquote>

        <!-- Sesli not: o kısmı okuyup üzerine konuştuğum kayıt -->
        <AudioNote v-if="book.audio" :src="book.audio" :label="book.audioNote" class="mb-6" />
      </v-col>
    </v-row>

    <!-- Kitap hakkındaki yazım (md dosyasının gövdesi) -->
    <template v-if="hasBody">
      <hr class="rule my-10" />
      <ContentRenderer :value="book" class="prose" style="max-width: 720px" />
    </template>
    <p v-else-if="!book.quote && !book.audio" class="text-medium-emphasis mt-10">
      Bu kitap hakkındaki notlarım yakında burada olacak.
    </p>
  </v-container>
</template>

<style scoped>
.author {
  font-family: var(--ui-font);
  font-size: 1.15rem;
  color: rgba(var(--v-theme-on-background), 0.7);
}
.rating {
  color: rgb(var(--v-theme-primary));
  letter-spacing: 0.12em;
  font-size: 1.1rem;
}
.rating .dim {
  opacity: 0.25;
}
/* Alıntı: büyük italik serif, solda bordo çizgi */
.quote {
  margin: 0;
  padding: 4px 0 4px 20px;
  border-left: 3px solid rgb(var(--v-theme-primary));
  font-size: 1.35rem;
  font-style: italic;
  line-height: 1.55;
}
</style>

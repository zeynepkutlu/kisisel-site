<script setup lang="ts">
// Tek bir kavramın sayfası: /kavramlar/sql gibi.
const route = useRoute()

const { data: concept } = await useAsyncData(`kavram-${route.params.slug}`, () =>
  queryCollection('kavramlar').path(`/kavramlar/${route.params.slug}`).first(),
)

if (!concept.value) {
  throw createError({ statusCode: 404, statusMessage: 'Kavram bulunamadı', fatal: true })
}

usePageSeo({
  title: concept.value.title,
  description: concept.value.description || `${concept.value.title} nedir? Kısa ve örnekli açıklama.`,
  type: 'article',
})
// Google için "bu bir terim tanımıdır" bilgisi (sözlük maddesi)
const siteUrl = useRuntimeConfig().public.siteUrl.replace(/\/$/, '')
useJsonLd({
  '@type': 'DefinedTerm',
  name: concept.value.title,
  description: concept.value.description,
  url: `${siteUrl}${concept.value.path}`,
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Kavram sözlüğü', url: `${siteUrl}/kavramlar` },
})

// İlgili kavramlar: frontmatter'daki "related" listesindeki dosyaların başlıklarını getir
const relatedPaths = (concept.value.related ?? []).map((slug) => `/kavramlar/${slug}`)
const { data: related } = await useAsyncData(`kavram-related-${route.params.slug}`, () =>
  relatedPaths.length
    ? queryCollection('kavramlar').where('path', 'IN', relatedPaths).select('title', 'path').all()
    : Promise.resolve([]),
)
</script>

<template>
  <v-container v-if="concept" style="max-width: 760px">
    <header class="pt-10 pb-8 pt-md-16">
      <NuxtLink to="/kavramlar" class="ui-link">← Tüm kavramlar</NuxtLink>
      <p class="kicker kicker--accent mt-8 mb-3">{{ concept.category }}</p>
      <h1 class="text-h3 text-md-h2 display mb-4">{{ concept.title }}</h1>
      <p v-if="concept.description" class="lead mb-0">{{ concept.description }}</p>
    </header>

    <hr class="rule mb-8" />

    <ContentRenderer :value="concept" class="prose" />

    <!-- İlgili kavramlar -->
    <template v-if="related?.length">
      <hr class="rule my-10" />
      <p class="kicker mb-3">İlgili kavramlar</p>
      <div class="d-flex flex-wrap ga-2">
        <v-chip v-for="r in related" :key="r.path" :to="r.path" variant="outlined">{{ r.title }}</v-chip>
      </div>
    </template>
  </v-container>
</template>

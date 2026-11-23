<script setup lang="ts">
// /kavramlar sayfası: kavram sözlüğü. Kavramlar kategoriye göre gruplanıp
// virgülle ayrılmış büyük bir kelime bulutu olarak gösteriliyor.
usePageSeo({
  title: 'Kavramlar',
  description:
    'SQL, JOIN, Primary Key, CRUD, REST API gibi yazılım ve veritabanı kavramlarının kısa, örnekli Türkçe açıklamaları: öğrendikçe büyüyen bir sözlük.',
})

const { data: concepts } = await useAsyncData('kavram-list', () =>
  queryCollection('kavramlar').select('title', 'path', 'category').order('title', 'ASC').all(),
)

// Kategoriye göre grupla: { Veritabanı: [...], Backend: [...], ... }
const groups = computed(() => {
  const map: Record<string, { title: string; path: string }[]> = {}
  for (const c of concepts.value ?? []) {
    ;(map[c.category] ??= []).push({ title: c.title, path: c.path })
  }
  // Kategorileri içerdikleri kavram sayısına göre çoktan aza sırala
  return Object.entries(map).sort((a, b) => b[1].length - a[1].length)
})
</script>

<template>
  <v-container>
    <PageHeader
      kicker="Yazılar"
      title="Kavram sözlüğü."
      :lead="`Öğrenirken karşılaştığım kavramların kısa ve örnekli açıklamaları; her biri bir sonrakine kapı açıyor. Şimdilik ${concepts?.length ?? 0} kavram, öğrendikçe büyüyor.`"
    />
    <WritingTabs />

    <section v-for="[category, items] in groups" :key="category" class="mb-12">
      <SectionHeader :title="category" :count="items.length" count-label="kavram" />
      <p class="cloud">
        <template v-for="(item, i) in items" :key="item.path">
          <NuxtLink :to="item.path">{{ item.title }}</NuxtLink><span v-if="i < items.length - 1" class="sep">, </span>
        </template>
      </p>
    </section>

    <p v-if="!concepts?.length" class="text-medium-emphasis">Henüz kavram yok.</p>
  </v-container>
</template>

<style scoped>
.cloud {
  font-size: clamp(1.5rem, 3.5vw, 2.25rem);
  font-weight: 700;
  line-height: 1.5;
}
.cloud a {
  color: rgb(var(--v-theme-on-background));
  text-decoration: none;
  transition: color 0.2s;
}
.cloud a:hover {
  color: rgb(var(--v-theme-primary));
}
.cloud .sep {
  color: rgba(var(--v-theme-on-background), 0.3);
}
</style>

<script setup lang="ts">
// /kavramlar sayfası: kavram sözlüğü. Kavramlar kategoriye göre gruplanır;
// her kavramın altında 3-4 cümlelik açıklaması (md dosyasındaki "summary" alanı) görünür.
usePageSeo({
  title: 'Kavramlar',
  description:
    'SQL, JOIN, Primary Key, CRUD, REST API gibi yazılım ve veritabanı kavramlarının kısa, örnekli Türkçe açıklamaları: öğrendikçe büyüyen bir sözlük.',
})

const { data: concepts } = await useAsyncData('kavram-list', () =>
  queryCollection('kavramlar')
    .select('title', 'path', 'category', 'description', 'summary')
    .order('title', 'ASC')
    .all(),
)

// Kategori girişleri. Yeni bir kategori açınca buraya bir satır ekle (eklemezsen giriş görünmez).
const CATEGORY_INTROS: Record<string, string> = {
  Veritabanı: 'Verilerin nasıl saklandığı, birbirine nasıl bağlandığı ve nasıl sorgulandığı.',
  Backend: 'Ekranda görünmeyen taraf: isteklerin karşılandığı, kuralların işlediği ve verinin hazırlandığı yer.',
  Web: 'Bir sayfanın tarayıcıda nasıl oluştuğu ve ziyaretçiye nasıl ulaştığı.',
}

// Kategoriye göre grupla ve kavram sayısına göre çoktan aza sırala.
// summary boşsa yerine tek cümlelik description gösterilir.
const groups = computed(() => {
  const map: Record<string, { title: string; path: string; text: string }[]> = {}
  for (const c of concepts.value ?? []) {
    ;(map[c.category] ??= []).push({ title: c.title, path: c.path, text: c.summary || c.description })
  }
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

    <section v-for="[category, items] in groups" :key="category" class="mb-14">
      <SectionHeader :title="category" :count="items.length" count-label="kavram" />
      <p v-if="CATEGORY_INTROS[category]" class="lead mb-4">{{ CATEGORY_INTROS[category] }}</p>

      <!-- Her kavram bir satır: solda adı, sağda açıklaması (mobilde alt alta) -->
      <article v-for="item in items" :key="item.path" class="concept">
        <h3 class="concept-title">
          <NuxtLink :to="item.path">{{ item.title }}</NuxtLink>
        </h3>
        <div>
          <p class="concept-text mb-2">{{ item.text }}</p>
          <NuxtLink :to="item.path" class="ui-link" :aria-label="`${item.title}: örnekler ve devamı`">
            Örnekler ve devamı →
          </NuxtLink>
        </div>
      </article>
    </section>

    <p v-if="!concepts?.length" class="text-medium-emphasis">Henüz kavram yok.</p>
  </v-container>
</template>

<style scoped>
.concept {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 24px;
  padding: 24px 0;
  border-bottom: 1px solid var(--rule);
}
@media (max-width: 599px) {
  .concept {
    grid-template-columns: 1fr;
    gap: 8px;
  }
}
.concept-title {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.25;
}
.concept-title a {
  color: rgb(var(--v-theme-secondary));
  text-decoration: none;
  transition: color 0.2s;
}
.concept-title a:hover {
  color: rgb(var(--v-theme-primary));
}
.concept-text {
  max-width: 720px;
  line-height: 1.7;
}
</style>

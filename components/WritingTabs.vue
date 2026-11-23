<script setup lang="ts">
// "Yazılar" bölümünün sekmeleri: Blog ve Kavramlar aynı menü başlığı altında.
// /blog ve /kavramlar sayfalarının üstünde görünür; aktif sekme adrese göre belirlenir.
const route = useRoute()

const tabs = [
  { title: 'Blog', to: '/blog' },
  { title: 'Kavramlar', to: '/kavramlar' },
]
</script>

<template>
  <nav class="writing-tabs mb-8">
    <NuxtLink
      v-for="t in tabs"
      :key="t.to"
      :to="t.to"
      class="tab"
      :class="{ active: route.path.startsWith(t.to) }"
    >
      {{ t.title }}
    </NuxtLink>
  </nav>
</template>

<style scoped>
.writing-tabs {
  display: flex;
  gap: 28px;
  border-bottom: 1px solid var(--rule);
}
.tab {
  padding: 0 0 12px;
  margin-bottom: -1px; /* alt çizgi, kapsayıcının çizgisinin üstüne otursun */
  font-family: var(--ui-font);
  font-size: 13px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(var(--v-theme-on-background), 0.6);
  text-decoration: none;
  border-bottom: 2px solid transparent;
}
.tab:hover {
  color: rgb(var(--v-theme-on-background));
}
.tab.active {
  color: rgb(var(--v-theme-primary));
  border-bottom-color: rgb(var(--v-theme-primary));
}
</style>

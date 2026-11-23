<script setup lang="ts">
// Bölüm başlığı: solda başlık (ve isteğe bağlı sayı), sağda "Tümü →" linki, altında ince çizgi.
// Ana sayfadaki her bölüm bunu kullanır; tasarım tek yerden değişir.
defineProps<{
  title: string
  count?: number // ör. "12 yazı" gibi bir sayı göstermek için
  countLabel?: string
  to?: string // "Tümü" linkinin gideceği adres
}>()
</script>

<template>
  <div class="section-header mb-6">
    <div class="d-flex align-baseline ga-3">
      <h2 class="text-h4 display">{{ title }}</h2>
      <span v-if="count !== undefined" class="kicker">{{ count }} {{ countLabel }}</span>
    </div>
    <!-- slot: sağ tarafa link yerine başka bir şey (ör. Karıştır butonu) koymak için -->
    <slot name="action">
      <NuxtLink v-if="to" :to="to" class="ui-link">Tümü →</NuxtLink>
    </slot>
  </div>
</template>

<style scoped>
.section-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--rule);
}
</style>

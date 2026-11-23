<script setup lang="ts">
// Tek bir projeyi kart olarak gösteren bileşen.
// defineProps ile dışarıdan hangi verileri alacağını (ve tiplerini) belirtiyoruz.
defineProps<{
  title: string
  description: string
  kind: string
  tags: string[]
  icon: string
  link?: string // canlı site
  repo?: string // kaynak kod (GitHub)
  live?: boolean
  index?: number // listedeki sırası: kartta "01, 02..." diye gösterilir
}>()
</script>

<template>
  <v-card class="h-100 d-flex flex-column pa-6">
    <div class="d-flex align-center justify-space-between mb-6">
      <!-- padStart: 1 → "01" -->
      <span class="kicker">
        <span v-if="index !== undefined" class="kicker--accent">{{ String(index + 1).padStart(2, '0') }} · </span>
        {{ kind }}
      </span>
      <v-icon :icon="icon" color="primary" />
    </div>

    <h3 class="project-title mb-2">
      {{ title }}
      <!-- Yayındaysa yanıp sönen küçük bir nokta ve "Yayında" etiketi -->
      <span v-if="live" class="live kicker ml-2"><span class="dot" />Yayında</span>
    </h3>
    <!-- flex-grow-1: kartlar farklı uzunlukta olsa da etiketler altta hizalı kalır -->
    <p class="text-medium-emphasis flex-grow-1 mb-6">{{ description }}</p>

    <!-- Teknolojiler. lang="en": büyük harfe çevirirken "i" → "I" olsun ("JAVASCRİPT" değil) -->
    <p v-if="tags.length" class="kicker mb-0" lang="en">{{ tags.join(' · ') }}</p>

    <!-- Linkler: canlı site ve kaynak kod ayrı ayrı (kartın tamamı link değil) -->
    <div v-if="link || repo" class="d-flex flex-wrap ga-5 mt-4 pt-4 links">
      <a v-if="link" :href="link" target="_blank" rel="noopener" class="ui-link">Siteyi aç ↗</a>
      <a v-if="repo" :href="repo" target="_blank" rel="noopener" class="ui-link">
        <v-icon icon="mdi-github" size="16" class="mr-1" />Kodu gör ↗
      </a>
    </div>
  </v-card>
</template>

<style scoped>
.project-title {
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1.2;
}
.links {
  border-top: 1px solid var(--rule);
}
.live {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  vertical-align: middle;
  color: rgb(var(--v-theme-primary));
}
.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgb(var(--v-theme-primary));
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  50% {
    opacity: 0.3;
  }
}
</style>

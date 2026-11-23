<script setup lang="ts">
// Sayfa başlığı: küçük etiket (kicker) + büyük serif başlık + giriş metni.
// Hakkımda, Projeler, Blog ve İletişim sayfalarının üstünde aynı görünüm için.
defineProps<{
  kicker: string
  title: string
  lead?: string
}>()
</script>

<template>
  <header class="pt-10 pb-8 pt-md-16 pb-md-12">
    <p class="kicker kicker--accent mb-3">{{ kicker }}</p>
    <h1 class="text-h3 text-md-h2 display mb-4">{{ title }}</h1>
    <p v-if="lead" class="lead mb-0" style="max-width: 680px">{{ lead }}</p>
  </header>
</template>

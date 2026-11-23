<script setup lang="ts">
// Tek bir sertifika kartı: platform, tarih, süre, kurs adı, eğitmen ve doğrulama linki.
defineProps<{
  title: string
  provider: string
  date: string
  hours?: number
  instructor?: string
  link?: string
  certNo?: string
}>()
</script>

<template>
  <v-card :href="link" :target="link ? '_blank' : undefined" class="h-100 pa-5 d-flex flex-column">
    <p class="kicker kicker--accent mb-2">
      {{ provider }} · {{ formatDate(date) }}
      <template v-if="hours"> · {{ hours.toLocaleString('tr-TR') }} saat</template>
    </p>
    <h3 class="cert-title mb-2 flex-grow-1">{{ title }}</h3>
    <p v-if="instructor" class="text-body-2 text-medium-emphasis mb-0">{{ instructor }}</p>
    <p v-if="link" class="kicker kicker--accent mt-3 mb-0">Doğrula ↗</p>
    <p v-else-if="certNo" class="kicker mt-3 mb-0">Sertifika no: {{ certNo }}</p>
  </v-card>
</template>

<style scoped>
.cert-title {
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.3;
}
</style>

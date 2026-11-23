<script setup lang="ts">
// Sesli not oynatıcı. Tarayıcının kendi <audio> oynatıcısını kullanır (her cihazda çalışır),
// etrafına sitenin tasarımına uyan bir çerçeve koyar.
defineProps<{
  src: string // ör. /sesler/korluk.m4a
  label?: string // kaydın kısa açıklaması
}>()
</script>

<template>
  <figure class="audio-note">
    <figcaption class="d-flex align-center ga-2 mb-3">
      <v-icon icon="mdi-microphone-outline" color="primary" size="20" />
      <span class="kicker kicker--accent">Sesli not</span>
      <span v-if="label" class="label">· {{ label }}</span>
    </figcaption>
    <!-- preload="metadata": sadece süre bilgisini yükler, sesi oynatınca indirir -->
    <audio :src="src" controls preload="metadata" class="w-100">
      Tarayıcın ses oynatmayı desteklemiyor.
    </audio>
  </figure>
</template>

<style scoped>
.audio-note {
  margin: 0;
  padding: 18px 20px;
  border: 1px solid var(--rule);
  border-radius: 12px;
  background: rgb(var(--v-theme-surface));
}
.label {
  font-family: var(--ui-font);
  font-size: 15px;
  color: rgba(var(--v-theme-on-surface), 0.7);
}
audio {
  display: block;
  height: 40px;
}
</style>

<script setup lang="ts">
// Sayfa geçişlerinde ekranın en üstünde görünen ince yükleme çubuğu.
// useLoadingIndicator: Nuxt'ın sayfa geçişini izleyen composable'ı.
//   isLoading → geçiş sürüyor mu, progress → 0-100 arası ilerleme
// throttle: 200 ms'den kısa geçişlerde çubuk hiç çıkmaz (yanıp sönmesin diye)
const { isLoading, progress } = useLoadingIndicator({ duration: 2000, throttle: 200 })
</script>

<template>
  <!-- color="primary": açık temada bordo (#7B1E2C), koyu temada daha açık bordo -->
  <v-progress-linear
    :active="isLoading"
    :model-value="progress"
    color="primary"
    bg-opacity="0"
    height="3"
    class="loading-bar"
    aria-label="Sayfa yükleniyor"
  />
</template>

<style scoped>
/* Header'ın (app-bar) da üstünde, ekrana sabit */
.loading-bar {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  z-index: 3000;
}
</style>

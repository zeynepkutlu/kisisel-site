<script setup lang="ts">
// Kitap/dizi/film kapağı. Görsel varsa onu gösterir; yoksa (ya da dosya bulunamazsa)
// tipografik bir kapak çizer (baş harf + eser adı), böylece görseli olmayanlar da rafta düzgün durur.
const props = defineProps<{
  title: string
  cover?: string
  type?: string
}>()

const initial = computed(() => props.title.replace(/^(The|A)\s+/i, '').charAt(0))

// Görsel yüklenemezse (dosya henüz yoksa) yedek kapağa geç
const broken = ref(false)
const imgEl = ref<HTMLImageElement>()
onMounted(() => {
  // Sayfa sunucuda hazırlandığı için hata, Vue devreye girmeden önce olmuş olabilir; onu da yakala
  const img = imgEl.value
  if (img && img.complete && img.naturalWidth === 0) broken.value = true
})
</script>

<template>
  <div class="shelf-cover">
    <!-- loading="lazy": görsel ekrana yaklaşınca yüklenir (sayfa hızlı açılır) -->
    <img
      v-if="cover && !broken"
      ref="imgEl"
      :src="cover"
      :alt="`${title} kapağı`"
      loading="lazy"
      decoding="async"
      @error="broken = true"
    />
    <div v-else class="fallback">
      <span class="fallback-initial">{{ initial }}</span>
      <span class="fallback-title">{{ title }}</span>
    </div>
  </div>
</template>

<style scoped>
/* 2:3 oran: kitap kapağı ve film afişi standardı */
.shelf-cover {
  position: relative;
  aspect-ratio: 2 / 3;
  overflow: hidden;
  border-radius: 8px;
  background: rgb(var(--v-theme-surface-variant));
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08), 0 6px 16px -8px rgba(0, 0, 0, 0.35);
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Görsel yoksa: bordo-yeşil geçişli zemin, büyük italik baş harf, altta eser adı */
.fallback {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px;
  background:
    radial-gradient(rgba(var(--v-theme-on-surface), 0.08) 0.8px, transparent 1.25px) 0 0 / 12px 12px,
    linear-gradient(160deg, rgba(var(--v-theme-primary), 0.85), rgba(var(--v-theme-secondary), 0.9));
  color: rgb(var(--v-theme-on-primary));
}
.fallback-initial {
  font-size: 4.5rem;
  font-weight: 700;
  font-style: italic;
  line-height: 1;
  opacity: 0.9;
}
.fallback-title {
  font-weight: 700;
  font-size: 1.05rem;
  line-height: 1.2;
}
</style>

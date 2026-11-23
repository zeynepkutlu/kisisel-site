<script setup lang="ts">
// Blog yazısı kartı. Görsel verildiyse (YouTube küçük resmi, dizi/film afişi) kapakta onu gösterir;
// yoksa tipografik kapak: kategori adı ve yazının baş harfi büyük serif olarak.
const props = defineProps<{
  title: string
  description?: string
  path: string
  date: string
  category?: string
  image?: string // kapak görseli (opsiyonel)
  youtube?: string // YouTube notuysa kapakta oynat ikonu gösterilir
  large?: boolean // ana sayfadaki öne çıkan yazı için büyük versiyon
}>()

// Kapaktaki büyük harf: başlığın ilk harfi
const initial = computed(() => props.title.charAt(0))
</script>

<template>
  <v-card :to="path" class="post-card h-100" :class="{ 'post-card--large': large }">
    <div class="cover">
      <img v-if="image" :src="image" alt="" class="cover-img" loading="lazy" />
      <span v-else class="cover-initial">{{ initial }}</span>
      <span v-if="youtube" class="play"><v-icon icon="mdi-play" size="28" /></span>
      <span v-if="category" class="kicker cover-label">{{ category }}</span>
    </div>
    <div class="pa-5">
      <p class="kicker mb-2">{{ formatDate(date) }}</p>
      <h3 class="post-title mb-2">{{ title }}</h3>
      <p v-if="description" class="text-medium-emphasis mb-0">{{ description }}</p>
    </div>
  </v-card>
</template>

<style scoped>
/* Kapak: tema renginden üretilmiş sıcak bir geçiş + nokta dokusu */
.cover {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background:
    radial-gradient(rgba(var(--v-theme-on-surface), 0.08) 0.8px, transparent 1.25px) 0 0 / 14px 14px,
    linear-gradient(140deg, rgba(var(--v-theme-primary), 0.28), rgba(var(--v-theme-primary), 0.04) 70%),
    rgb(var(--v-theme-surface-variant));
  border-bottom: 1px solid var(--rule);
}
.cover-initial {
  position: absolute;
  right: 6%;
  bottom: -22%;
  font-size: 9rem;
  font-weight: 700;
  font-style: italic;
  line-height: 1;
  color: rgba(var(--v-theme-primary), 0.55);
  transition: transform 0.4s var(--ease);
}
.post-card:hover .cover-initial {
  transform: translateY(-6px) rotate(-3deg);
}
/* Görsel kapak: alanı doldurur; afişler dikey olduğu için üst kısmı (yüzler, başlık) gösterilir */
.cover-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 25%;
  transition: transform 0.4s var(--ease);
}
.post-card:hover .cover-img {
  transform: scale(1.04);
}
/* YouTube notlarında ortada yuvarlak oynat ikonu */
.play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(var(--v-theme-primary), 0.92);
  color: rgb(var(--v-theme-on-primary));
}
.cover-label {
  z-index: 1;
  position: absolute;
  left: 16px;
  top: 14px;
  padding: 3px 8px;
  border-radius: 6px;
  background: rgba(var(--v-theme-background), 0.7);
  color: rgb(var(--v-theme-on-background));
}

.post-title {
  font-size: 1.35rem;
  font-weight: 700;
  line-height: 1.25;
}

/* Büyük versiyon: masaüstünde kapak solda, yazı sağda */
@media (min-width: 960px) {
  .post-card--large {
    display: grid;
    grid-template-columns: 1.3fr 1fr;
    align-items: center;
  }
  .post-card--large .cover {
    aspect-ratio: 4 / 3;
    border-bottom: 0;
    border-right: 1px solid var(--rule);
  }
  .post-card--large .cover-initial {
    font-size: 16rem;
  }
  .post-card--large .post-title {
    font-size: 2.25rem;
    line-height: 1.1;
  }
  .post-card--large .pa-5 {
    padding: 40px !important;
  }
}
</style>

<script setup lang="ts">
// YouTube videosu: önce sadece küçük resim gösterilir, tıklayınca video yüklenir.
// Böylece sayfa hızlı açılır ve ziyaretçi oynatmadıkça YouTube çerez bırakmaz (youtube-nocookie).
//
// components/content/ klasöründe olduğu için Markdown içinde de kullanılabilir:
//   ::youtube-video{id="dQw4w9WgXcQ"}
//   ::
const props = defineProps<{
  id: string // youtube.com/watch?v=BURASI
  title?: string
}>()

const playing = ref(false)
const thumb = computed(() => `https://i.ytimg.com/vi/${props.id}/hqdefault.jpg`)
const embed = computed(() => `https://www.youtube-nocookie.com/embed/${props.id}?autoplay=1&rel=0`)
</script>

<template>
  <div class="yt">
    <iframe
      v-if="playing"
      :src="embed"
      :title="title ?? 'YouTube videosu'"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
    <button v-else type="button" class="yt-poster" :aria-label="`Videoyu oynat: ${title ?? ''}`" @click="playing = true">
      <img :src="thumb" alt="" loading="lazy" />
      <span class="yt-play"><v-icon icon="mdi-play" size="34" /></span>
    </button>
  </div>
</template>

<style scoped>
/* 16:9 oranlı kutu */
.yt {
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  overflow: hidden;
  background: #000;
  margin: 0 0 1.5rem;
}
.yt iframe,
.yt-poster {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
.yt-poster {
  padding: 0;
  cursor: pointer;
  background: none;
}
.yt-poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.9;
  transition: opacity 0.2s;
}
.yt-poster:hover img {
  opacity: 1;
}
.yt-play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(var(--v-theme-primary), 0.95);
  color: rgb(var(--v-theme-on-primary));
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
}
</style>

<script setup lang="ts">
// Üst menü (header): isim, sayfa linkleri, tema butonu ve mobil hamburger menü.
// Sayfanın en üstündeyken şeffaf, aşağı kaydırınca bulanık arka planlı hale gelir.
import { useTheme } from 'vuetify'

const profile = useProfile()

// Menü linkleri tek bir dizide: hem masaüstü menü hem mobil çekmece bunu kullanır.
// "match": bu adreslerle başlayan sayfalarda link aktif görünür
// (ör. Yazılar hem /blog hem /kavramlar sayfalarında aktif). Ana sayfaya isim/logo götürüyor.
const links = [
  { title: 'Projeler', to: '/projects', match: ['/projects'] },
  { title: 'Öğrendiklerim', to: '/ogrendiklerim', match: ['/ogrendiklerim'] },
  { title: 'Yazılar', to: '/blog', match: ['/blog', '/kavramlar'] },
  { title: 'Raf', to: '/raf', match: ['/raf'] },
  { title: 'Hakkımda', to: '/about', match: ['/about'] },
  { title: 'İletişim', to: '/contact', match: ['/contact'] },
]

const route = useRoute()
const isActive = (link: (typeof links)[number]) => link.match.some((m) => route.path.startsWith(m))

// Mobil çekmecenin (drawer) açık/kapalı durumu
const drawer = ref(false)

// Tema değiştirme: Vuetify'ın tema adını değiştirip seçimi cookie'ye yazıyoruz
const theme = useTheme()
const themeCookie = useThemeCookie()
const isDark = computed(() => theme.global.current.value.dark)
// Sayfalar önceden açık temayla hazırlandığı için butonun ikonu ilk anda hep ay; tarayıcıda (mounted) doğrusuna geçer.
// Böylece hazır HTML ile Vue'nun çizdiği aynı olur (hydration uyumu).
const mounted = ref(false)
onMounted(() => (mounted.value = true))
const showSun = computed(() => mounted.value && isDark.value)
function toggleTheme() {
  const next = isDark.value ? 'light' : 'dark'
  theme.global.name.value = next
  themeCookie.value = next
}

// Kaydırma durumu: 10px'ten fazla kaydırıldıysa header'a arka plan ver.
// onMounted: sadece tarayıcıda çalışır (sunucuda "window" yoktur).
const scrolled = ref(false)
function onScroll() {
  scrolled.value = window.scrollY > 10
}
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
// Bileşen kaldırılınca dinleyiciyi temizle (bellek sızıntısı olmasın)
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <v-app-bar flat color="transparent" height="72" class="site-nav" :class="{ solid: scrolled }">
    <v-container class="d-flex align-center py-0">
      <!-- İsim / logo -->
      <NuxtLink to="/" class="brand">{{ profile.name }}</NuxtLink>

      <v-spacer />

      <!-- Masaüstü menü: d-none d-md-flex → orta ve geniş ekranda (960px+) görünür -->
      <nav class="d-none d-md-flex align-center menu" aria-label="Ana menü">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          :class="{ active: isActive(link) }"
          :aria-current="isActive(link) ? 'page' : undefined"
        >
          {{ link.title }}
        </NuxtLink>
      </nav>

      <v-btn
        :icon="showSun ? '$white-balance-sunny' : '$moon-waning-crescent'"
        variant="text"
        size="small"
        class="ml-4"
        :aria-label="showSun ? 'Açık temaya geç' : 'Koyu temaya geç'"
        @click="toggleTheme"
      />

      <!-- Hamburger: geniş olmayan ekranlarda -->
      <v-app-bar-nav-icon
        class="d-md-none"
        :aria-label="drawer ? 'Menüyü kapat' : 'Menüyü aç'"
        :aria-expanded="drawer"
        @click="drawer = !drawer"
      />
    </v-container>
  </v-app-bar>

  <!-- Mobil çekmece menü: sağdan açılır, linke tıklayınca kapanır -->
  <v-navigation-drawer v-model="drawer" location="right" temporary width="300" aria-label="Mobil menü">
    <div class="pa-6">
      <p class="kicker mb-6">Menü</p>
      <NuxtLink to="/" class="drawer-link" :class="{ active: route.path === '/' }" @click="drawer = false">
        Ana Sayfa
      </NuxtLink>
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="drawer-link"
        :class="{ active: isActive(link) }"
        @click="drawer = false"
      >
        {{ link.title }}
      </NuxtLink>
    </div>
  </v-navigation-drawer>
</template>

<style scoped>
/* Header arka planı: kaydırınca yarı saydam + bulanık + alt çizgi */
.site-nav {
  transition: background-color 0.3s var(--ease), border-color 0.3s var(--ease);
  border-bottom: 1px solid transparent !important;
}
.site-nav.solid {
  background-color: rgba(var(--v-theme-background), 0.82) !important;
  backdrop-filter: blur(10px);
  border-bottom-color: var(--rule) !important;
}

/* İsim: büyük harf serif */
.brand {
  font-weight: 700;
  font-size: 22px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgb(var(--v-theme-secondary)); /* başlıklarla aynı: koyu yeşil */
  text-decoration: none;
}

/* Menü linkleri: küçük, büyük harf, geniş aralıklı */
.menu a {
  font-family: var(--ui-font);
  font-size: 13px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(var(--v-theme-on-background), 0.65);
  text-decoration: none;
  margin-left: 28px;
  transition: color 0.2s;
}
.menu a:hover {
  color: rgb(var(--v-theme-on-background));
}
/* active: isActive() ile verdiğimiz sınıf (o an açık olan bölüm) */
.menu a.active {
  color: rgb(var(--v-theme-primary));
}

.drawer-link {
  display: block;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.6;
  color: rgb(var(--v-theme-on-surface));
  text-decoration: none;
}
.drawer-link.active {
  color: rgb(var(--v-theme-primary));
}
</style>

<script setup lang="ts">
import type { BlogCollectionItem } from '@nuxt/content'
import { SHELF_TYPES } from '~/composables/useShelf'

// Ana sayfa (/): kısa ve tekrarsız.
// Sırasıyla: tanıtım, şu an, projeler, son yazılar, raftan seçki.
// Yazı sayısı FEATURE_FROM'a ulaşınca "Öne çıkan" ve "Arşivden rastgele" bölümleri de açılır.
// Başlık verilmiyor: ana sayfa "Zeynep Kutlu · Bilgisayar Programcılığı Öğrencisi" olur
usePageSeo({
  description:
    "Zeynep Kutlu'nun kişisel sitesi. Girne Üniversitesi Bilgisayar Programcılığı öğrencisi: projeler, öğrenme defteri, yazılar ve sevdiği kitaplar, diziler, filmler.",
  type: 'profile',
})

const profile = useProfile()
const projects = useProjects()
// Raf: kitaplar (Nuxt Content) + diziler + filmler
const shelfAll = await useFullShelf()
const shelf = computed(() => shelfAll.value)
// Ana sayfa için seçki: 6 kapak. Önce her türden görseli olan ilk 2 eser;
// bir türde yeterli görsel yoksa kalan yer diğer görselli eserlerle doldurulur.
const PICK_COUNT = 6
const shelfPicks = computed(() => {
  const withCover = shelf.value.filter((s) => s.cover)
  const picks = SHELF_TYPES.flatMap((t) => withCover.filter((s) => s.type === t).slice(0, 2))
  for (const s of withCover) {
    if (picks.length >= PICK_COUNT) break
    if (!picks.includes(s)) picks.push(s)
  }
  // Sıralama: kitaplar, diziler, filmler
  return picks.sort((a, b) => SHELF_TYPES.indexOf(a.type) - SHELF_TYPES.indexOf(b.type))
})

const FEATURE_FROM = 7 // bu kadar yazı olunca dergi düzeni (öne çıkan + rastgele) devreye girer

const { data: posts } = await useAsyncData('home-posts', () =>
  queryCollection('blog').order('date', 'DESC').all(),
)
const hasMany = computed(() => (posts.value?.length ?? 0) >= FEATURE_FROM)
const featured = computed(() => (hasMany.value ? posts.value?.[0] : undefined))
// Öne çıkan varsa son yazılar ondan sonrakiler, yoksa en yeni 3 yazı
const latest = computed(() => posts.value?.slice(hasMany.value ? 1 : 0, hasMany.value ? 4 : 3) ?? [])

// ---- Şu an ----
// En son bitirilen kurs: sertifikalar en yeni üstte sıralı geliyor
const lastCourse = profile.certificates[0]
const nowRows = [
  { label: 'Öğreniyorum', value: profile.now.learning, to: undefined },
  { label: 'Son bitirdiğim kurs', value: lastCourse?.title, to: '/ogrendiklerim' },
  { label: 'Okuyorum', value: profile.now.reading, to: '/raf' },
  { label: 'İzliyorum', value: profile.now.watching, to: '/raf' },
].filter((r) => r.value) // boş satırları gösterme

// ---- Arşivden rastgele (sadece çok yazı varken) ----
// shallowRef: sadece listenin kendisi değişince tepki verir; listeyi komple değiştirdiğimiz için yeterli.
const shuffled = shallowRef<BlogCollectionItem[]>([])
function shuffle() {
  const list = [...(posts.value ?? [])]
  // Fisher-Yates karıştırma algoritması
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[list[i], list[j]] = [list[j]!, list[i]!]
  }
  shuffled.value = list.slice(0, 3)
}
// İlk görünüm sabit (sunucu ve tarayıcı aynı şeyi çizsin), karıştırma butona basınca
const randomPosts = computed<BlogCollectionItem[]>(() =>
  shuffled.value.length ? shuffled.value : posts.value?.slice(-3) ?? [],
)
</script>

<template>
  <v-container>
    <!-- TANITIM -->
    <section class="hero">
      <p class="kicker kicker--accent mb-4">Kişisel site · {{ new Date().getFullYear() }}</p>
      <h1 class="hero-title display mb-6">
        Merhaba, ben <em>{{ profile.firstName }}</em>.
      </h1>
      <p class="lead mb-8" style="max-width: 640px">{{ profile.tagline }}</p>
      <div class="d-flex flex-wrap ga-3">
        <v-btn to="/projects" color="primary" size="large">Projelerime bak</v-btn>
        <v-btn to="/ogrendiklerim" variant="outlined" size="large">Öğrendiklerim</v-btn>
      </div>
    </section>

    <!-- ŞU AN: ne öğreniyorum, ne okuyorum, ne izliyorum -->
    <section v-if="nowRows.length" class="now mb-16">
      <p class="kicker kicker--accent mb-2">Şu an</p>
      <div v-for="r in nowRows" :key="r.label" class="now-row">
        <span class="kicker">{{ r.label }}</span>
        <NuxtLink v-if="r.to" :to="r.to" class="now-value">{{ r.value }}</NuxtLink>
        <span v-else class="now-value">{{ r.value }}</span>
      </div>
    </section>

    <!-- PROJELER -->
    <section class="mb-16">
      <SectionHeader title="Projeler" :count="projects.length" count-label="proje" to="/projects" />
      <v-row>
        <v-col v-for="(p, i) in projects.slice(0, 3)" :key="p.title" cols="12" sm="6" md="4">
          <ProjectCard v-bind="p" :index="i" />
        </v-col>
      </v-row>
    </section>

    <!-- ÖNE ÇIKAN YAZI (sadece çok yazı varken) -->
    <section v-if="featured" class="mb-16">
      <p class="kicker mb-3">Öne çıkan</p>
      <PostCard v-bind="featured" :image="postImage(featured)" large />
    </section>

    <!-- SON YAZILAR -->
    <section v-if="latest.length" class="mb-16">
      <SectionHeader title="Son yazılar" :count="posts?.length" count-label="yazı" to="/blog" />
      <v-row>
        <v-col v-for="post in latest" :key="post.path" cols="12" sm="6" md="4">
          <PostCard v-bind="post" :image="postImage(post)" />
        </v-col>
      </v-row>
    </section>

    <!-- KODUN DIŞINDAKİ BEN: raftan kapaklı seçki (her türden 2 eser) -->
    <section v-if="shelf.length" class="mb-16">
      <SectionHeader title="Kodun dışındaki ben" :count="shelf.length" count-label="eser" to="/raf" />
      <div class="picks">
        <NuxtLink v-for="s in shelfPicks" :key="s.title" :to="s.to ?? '/raf'" class="pick">
          <ShelfCover :title="s.title" :cover="s.cover" :type="s.type" />
          <span class="kicker mt-2 d-block">{{ s.type }}</span>
          <span class="pick-title">{{ s.title }}</span>
        </NuxtLink>
      </div>
    </section>

    <!-- ARŞİVDEN RASTGELE (sadece çok yazı varken) -->
    <section v-if="hasMany" class="mb-8">
      <SectionHeader title="Arşivden rastgele">
        <template #action>
          <v-btn variant="outlined" size="small" prepend-icon="$shuffle-variant" @click="shuffle">
            Karıştır
          </v-btn>
        </template>
      </SectionHeader>
      <v-row>
        <v-col v-for="post in randomPosts" :key="post.path" cols="12" sm="6" md="4">
          <PostCard v-bind="post" :image="postImage(post)" />
        </v-col>
      </v-row>
    </section>
  </v-container>
</template>

<style scoped>
.hero {
  padding: 64px 0 56px;
}
@media (min-width: 960px) {
  .hero {
    padding: 112px 0 80px;
  }
}

/* clamp(min, tercih, max): ekran genişliğine göre büyüyüp küçülen yazı boyutu */
.hero-title {
  font-size: clamp(2.75rem, 7vw, 5.5rem);
  max-width: 900px;
}
.hero-title em {
  color: rgb(var(--v-theme-primary));
}

/* Şu an kutusu: etiket solda, değer sağda, ince çizgilerle ayrılmış satırlar */
.now {
  max-width: 760px;
}
.now-row {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 16px;
  align-items: baseline;
  padding: 12px 0;
  border-bottom: 1px solid var(--rule);
}
@media (max-width: 599px) {
  .now-row {
    grid-template-columns: 1fr;
    gap: 2px;
  }
}
.now-value {
  font-size: 1.2rem;
  font-weight: 700;
  color: rgb(var(--v-theme-on-background));
  text-decoration: none;
}
a.now-value:hover {
  color: rgb(var(--v-theme-primary));
}

/* Raf seçkisi: mobilde 3, masaüstünde 6 kapak yan yana */
.picks {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
@media (min-width: 960px) {
  .picks {
    grid-template-columns: repeat(6, 1fr);
  }
}
.pick {
  color: inherit;
  text-decoration: none;
}
.pick :deep(.shelf-cover) {
  transition: transform 0.25s var(--ease);
}
.pick:hover :deep(.shelf-cover) {
  transform: translateY(-4px) rotate(-1deg);
}
.pick-title {
  display: block;
  font-weight: 700;
  line-height: 1.25;
  color: rgb(var(--v-theme-secondary));
}
.cloud {
  font-size: clamp(1.4rem, 3vw, 2rem);
  line-height: 1.5;
  font-weight: 700;
}
.cloud-link {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s;
}
.cloud-link:hover {
  color: rgb(var(--v-theme-primary));
}
.cloud .sep {
  color: rgba(var(--v-theme-on-background), 0.3);
}
</style>

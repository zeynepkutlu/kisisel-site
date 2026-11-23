<script setup lang="ts">
// /blog sayfası: üstte yazı alanları (kategoriler), altta yazılar. Alana tıklayınca o alanın yazıları kalır.
import { BLOG_CATEGORIES } from '~/composables/useBlogCategories'

usePageSeo({
  title: 'Blog',
  description:
    "Zeynep Kutlu'nun blogu: öğrenme günlüğü, izlediği dizi ve filmlerden öğrendikleri, YouTube videolarına yorumları ve tasarım notları.",
})

// useAsyncData: veriyi sunucuda bir kez çeker, tarayıcıda tekrar çekmez.
const { data: posts } = await useAsyncData('blog-list', () =>
  queryCollection('blog').order('date', 'DESC').all(),
)

const countOf = (name: string) => (posts.value ?? []).filter((p) => p.category === name).length

// Seçili alan: null = tümü
const active = ref<string | null>(null)
const visible = computed(() =>
  active.value ? (posts.value ?? []).filter((p) => p.category === active.value) : posts.value ?? [],
)
function toggle(name: string) {
  active.value = active.value === name ? null : name
}
</script>

<template>
  <v-container>
    <PageHeader
      kicker="Yazılar"
      title="Blog."
      lead="Kod yazarken öğrendiklerim, izlediklerimden çıkardıklarım ve kendi yorumlarım."
    />
    <WritingTabs />

    <!-- YAZI ALANLARI: her kategori bir kart; tıklayınca filtreler, tekrar tıklayınca kaldırır -->
    <div class="areas mb-10">
      <button
        v-for="c in BLOG_CATEGORIES"
        :key="c.name"
        type="button"
        class="area"
        :class="{ active: active === c.name, empty: !countOf(c.name) }"
        :aria-pressed="active === c.name"
        @click="toggle(c.name)"
      >
        <span class="d-flex align-center justify-space-between mb-3">
          <v-icon :icon="c.icon" size="22" />
          <span class="kicker">{{ countOf(c.name) ? `${countOf(c.name)} yazı` : 'yakında' }}</span>
        </span>
        <span class="area-title">{{ c.name }}</span>
        <span class="area-desc">{{ c.description }}</span>
      </button>
    </div>

    <SectionHeader :title="active ?? 'Tüm yazılar'" :count="visible.length" count-label="yazı">
      <template v-if="active" #action>
        <button type="button" class="ui-link" @click="active = null">Tümünü göster</button>
      </template>
    </SectionHeader>

    <v-row>
      <v-col v-for="post in visible" :key="post.path" cols="12" sm="6" md="4">
        <!-- postImage: YouTube küçük resmi ya da dizi/film afişi (composables/usePostImage.ts) -->
        <PostCard v-bind="post" :image="postImage(post)" />
      </v-col>
    </v-row>

    <p v-if="!visible.length" class="text-medium-emphasis">
      Bu alanda henüz yazı yok. İlk yazı yakında burada.
    </p>
  </v-container>
</template>

<style scoped>
/* Alan kartları: mobilde 1, tablette 2, masaüstünde 4 sütun */
.areas {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}
@media (min-width: 600px) {
  .areas {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1280px) {
  .areas {
    grid-template-columns: repeat(4, 1fr);
  }
}
.area {
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 18px 20px;
  border: 1px solid var(--rule);
  border-radius: 12px;
  background: rgb(var(--v-theme-surface));
  color: rgb(var(--v-theme-on-surface));
  cursor: pointer;
  transition: border-color 0.2s, transform 0.2s var(--ease);
}
.area:hover {
  transform: translateY(-2px);
  border-color: var(--rule-strong);
}
.area .v-icon {
  color: rgb(var(--v-theme-secondary));
}
/* Seçili alan: bordo çerçeve */
.area.active {
  border-color: rgb(var(--v-theme-primary));
  box-shadow: inset 0 0 0 1px rgb(var(--v-theme-primary));
}
.area.empty .area-title {
  opacity: 0.75;
}
.area-title {
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.25;
  color: rgb(var(--v-theme-secondary));
  margin-bottom: 4px;
}
.area-desc {
  font-size: 0.95rem;
  line-height: 1.45;
  color: rgba(var(--v-theme-on-surface), 0.7);
}
</style>

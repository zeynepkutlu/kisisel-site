<script setup lang="ts">
// /raf sayfası: "Kodun dışındaki ben" — sevdiğim kitaplar, diziler ve filmler.
// Kapaklarla raf düzeninde gösterilir; türe göre filtrelenebilir. Kitapların kendi sayfası var.
import { SHELF_CATEGORIES, SHELF_TYPES, type ShelfItem, type ShelfType } from '~/composables/useShelf'

usePageSeo({
  title: 'Kodun dışındaki ben',
  description:
    "Zeynep Kutlu'nun rafı: sevdiği kitaplar, diziler ve filmler. Körlük'ten Kürk Mantolu Madonna'ya, The Prestige'ten Enola Holmes'a kişisel bir seçki.",
})

const items = await useFullShelf()
// Kartın link mi düz kutu mu olacağını seçmek için (kitaplar link, diğerleri kutu)
const NuxtLinkComponent = resolveComponent('NuxtLink')

// Sadece içinde en az 3 şey olan türler sekme olarak görünür (yarım bölüm göstermemek için)
const MIN_ITEMS = 3
const countOf = (t: ShelfType) => items.value.filter((i) => i.type === t).length
const types = computed(() => SHELF_TYPES.filter((t) => countOf(t) >= MIN_ITEMS))
const total = computed(() => types.value.reduce((sum, t) => sum + countOf(t), 0))

// Seçili sekme: null = tümü. "Tümü"de türler sırayla gelir (önce kitaplar, sonra diziler, filmler)
const active = ref<ShelfType | null>(null)
// Yerleşim üç seviyeli: Tür (Filmler) → Kategori (Hollywood / Bollywood) → Alt grup (seriler, Kore dizileri).
const TYPE_TITLES: Record<ShelfType, string> = { Kitap: 'Kitaplar', Dizi: 'Diziler', Film: 'Filmler' }

// Bir listeyi alt gruplara böler: alt başlığı olmayanlar (name: null) önce, sonra adlandırılmış gruplar
function splitGroups(list: ShelfItem[]) {
  const names = [...new Set(list.map((i) => i.group).filter((g): g is string => !!g))]
  return [
    { name: null as string | null, items: list.filter((i) => !i.group) },
    ...names.map((n) => ({ name: n as string | null, items: list.filter((i) => i.group === n) })),
  ].filter((s) => s.items.length)
}

const groups = computed(() =>
  types.value
    .filter((t) => !active.value || t === active.value)
    .map((t) => {
      const ofType = items.value.filter((i) => i.type === t)
      const cats = SHELF_CATEGORIES[t]
      // Kategorisi olan türlerde (Filmler) her kategori ayrı; kategorisi boş eser ilk kategoriye düşer
      const categories = cats
        ? cats
            .map((c, idx) => {
              const list = ofType.filter((i) => (i.category ?? cats[0]) === c || (idx === 0 && !cats.includes(i.category ?? cats[0])))
              return { name: c as string | null, count: list.length, subgroups: splitGroups(list) }
            })
            .filter((c) => c.count)
        : [{ name: null as string | null, count: ofType.length, subgroups: splitGroups(ofType) }]
      return { type: t, title: TYPE_TITLES[t], count: ofType.length, categories }
    }),
)

// Kart altındaki bilgi satırı: "Yazar · 2024 · Netflix" (boş olanlar atlanır)
const metaOf = (i: { creator?: string; year?: number; platform?: string }) =>
  [i.creator, i.year, i.platform].filter(Boolean).join(' · ')
</script>

<template>
  <v-container>
    <PageHeader
      kicker="Raf"
      title="Kodun dışındaki ben."
      lead="Okuduğum, izlediğim ve önerdiğim şeyler. Kitapların üstüne tıklayınca sevdiğim alıntıları ve notlarımı bulabilirsin."
    />

    <!-- Filtre sekmeleri -->
    <div class="d-flex flex-wrap ga-2 mb-10">
      <v-chip
        :variant="active === null ? 'flat' : 'outlined'"
        :color="active === null ? 'primary' : undefined"
        :aria-pressed="active === null"
        @click="active = null"
      >
        Tümü · {{ total }}
      </v-chip>
      <v-chip
        v-for="t in types"
        :key="t"
        :variant="active === t ? 'flat' : 'outlined'"
        :color="active === t ? 'primary' : undefined"
        :aria-pressed="active === t"
        @click="active = t"
      >
        {{ t }} · {{ countOf(t) }}
      </v-chip>
    </div>

    <!-- Her tür kendi bölümünde, kapaklar ızgara düzeninde -->
    <section v-for="g in groups" :key="g.type" class="mb-14">
      <SectionHeader :title="g.title" :count="g.count" count-label="eser" />

      <!-- Kategoriler (ör. Hollywood / Bollywood); kategorisi olmayan türlerde tek ve başlıksız -->
      <div v-for="cat in g.categories" :key="cat.name ?? 'tum'" class="category">
      <h3 v-if="cat.name" class="category-title mb-6">
        {{ cat.name }} <span class="kicker ml-2">{{ cat.count }} film</span>
      </h3>

      <!-- Alt gruplar: başlıksız olanlar önce, sonra "Kore dizileri" gibi alt başlıklılar -->
      <div v-for="sg in cat.subgroups" :key="sg.name ?? 'genel'" class="mb-10">
        <p v-if="sg.name" class="kicker kicker--accent subgroup mb-5">{{ sg.name }} · {{ sg.items.length }}</p>
        <div class="shelf-grid">
        <!-- Kitapların kendi sayfası var (NuxtLink); dizi/filmler şimdilik düz kart -->
        <component
          :is="item.to ? NuxtLinkComponent : 'div'"
          v-for="item in sg.items"
          :key="item.title"
          :to="item.to"
          class="shelf-item"
          :class="{ linked: item.to }"
        >
          <ShelfCover :title="item.title" :cover="item.cover" :type="item.type" />
          <h3 class="shelf-title mt-3">{{ item.title }}</h3>
          <!-- Yazar adı büyük harfe çevrilmiyor: Türkçe kurallarla yabancı isimlerdeki "i" → "İ" olurdu -->
          <p v-if="metaOf(item)" class="creator mb-1">{{ metaOf(item) }}</p>
          <p v-if="item.rating" class="rating mb-1" :aria-label="`5 üzerinden ${item.rating}`">
            {{ '★'.repeat(item.rating) }}<span class="dim">{{ '★'.repeat(5 - item.rating) }}</span>
          </p>
          <p v-if="item.note" class="note mb-0">{{ item.note }}</p>
        </component>
        </div>
      </div>
      </div>
    </section>

    <p v-if="!groups.length" class="text-medium-emphasis">Raf yakında dolacak.</p>
  </v-container>
</template>

<style scoped>
/* Kapak ızgarası: ekran genişliğine göre otomatik sütun sayısı (min 140px) */
.shelf-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 28px 20px;
}
@media (min-width: 960px) {
  .shelf-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
}
/* Kategori başlığı (ör. Hollywood / Bollywood): bölüm başlığından küçük, seri etiketinden büyük */
.category + .category {
  margin-top: 24px;
}
.category-title {
  display: flex;
  align-items: baseline;
  font-size: 1.6rem;
  font-weight: 700;
  font-style: italic;
  color: rgb(var(--v-theme-primary));
}
/* Alt grup başlığı (ör. KORE DİZİLERİ): ince çizgiyle ayrılmış küçük etiket */
.subgroup {
  padding-top: 8px;
  border-top: 1px dashed var(--rule-strong);
}
.shelf-item {
  display: block;
  color: inherit;
  text-decoration: none;
}
/* Tıklanabilir (kitap) kartlar: üstüne gelince kapak hafif kalkar */
.shelf-item.linked :deep(.shelf-cover) {
  transition: transform 0.25s var(--ease), box-shadow 0.25s var(--ease);
}
.shelf-item.linked:hover :deep(.shelf-cover) {
  transform: translateY(-4px) rotate(-1deg);
}
.shelf-item.linked:hover .shelf-title {
  color: rgb(var(--v-theme-primary));
}
.shelf-title {
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.25;
}
.creator {
  font-family: var(--ui-font);
  font-size: 14px;
  color: rgba(var(--v-theme-on-background), 0.6);
}
.note {
  font-size: 0.95rem;
  line-height: 1.4;
  color: rgba(var(--v-theme-on-background), 0.75);
}
.rating {
  color: rgb(var(--v-theme-primary));
  letter-spacing: 0.1em;
  font-size: 0.9rem;
}
.rating .dim {
  opacity: 0.25;
}
</style>

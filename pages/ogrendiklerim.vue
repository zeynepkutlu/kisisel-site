<script setup lang="ts">
// /ogrendiklerim sayfası: özet sayılar, aylara göre öğrenme yolculuğu, yetenekler ve sertifikalar.
const profile = useProfile()
const certs = profile.certificates // en yeni en üstte sıralı geliyor

// ---- Özet sayılar ----
const totalHours = certs.reduce((sum, c) => sum + (c.hours ?? 0), 0)

// SEO açıklaması sayılardan kendiliğinden oluşuyor (yeni sertifika ekleyince güncellenir)
usePageSeo({
  title: 'Öğrendiklerim',
  description: `${certs.length} sertifika, ${totalHours.toLocaleString('tr-TR')} saat eğitim: Zeynep Kutlu'nun BTK Akademi ve Udemy'de tamamladığı Node.js, Vue, SQL ve veri kursları ile öğrenme yolculuğu.`,
})
const platforms = new Set(certs.map((c) => c.provider)) // Set: tekrarsız liste
const stats = [
  { value: certs.length, label: 'sertifika' },
  { value: totalHours.toLocaleString('tr-TR'), label: 'saat eğitim' },
  { value: platforms.size, label: 'platform' },
  { value: profile.skills.length, label: 'teknoloji' },
]

// ---- Öğrenme yolculuğu: sertifikaları aya göre grupla, en eski ay en üstte ----
// '2026-10-19' → '2026-10' anahtarı; ay adı için Intl tarih biçimlendirmesi kullanılıyor
const journey = computed(() => {
  const months = new Map<string, typeof certs>()
  for (const c of [...certs].reverse()) {
    const key = c.date.slice(0, 7)
    months.set(key, [...(months.get(key) ?? []), c])
  }
  return [...months.entries()].map(([key, items]) => ({
    key,
    label: new Date(`${key}-01`).toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' }),
    items,
  }))
})

// ---- Sertifika grupları: Teknik ve Diğer (boş grup gösterilmez) ----
const certGroups = (['Teknik', 'Diğer'] as const)
  .map((name) => ({ name, items: certs.filter((c) => c.group === name) }))
  .filter((g) => g.items.length)
</script>

<template>
  <v-container>
    <PageHeader
      kicker="Öğrendiklerim"
      title="Öğrenme defterim."
      lead="Okulun yanında kendi başıma tamamladığım kurslar, sertifikalar ve kullandığım teknolojiler."
    />

    <!-- ÖZET SAYILAR -->
    <div class="stats mb-16">
      <div v-for="s in stats" :key="s.label" class="stat">
        <span class="stat-value">{{ s.value }}</span>
        <span class="kicker">{{ s.label }}</span>
      </div>
    </div>

    <!-- ÖĞRENME YOLCULUĞU -->
    <section class="mb-16">
      <SectionHeader title="Öğrenme yolculuğu" />
      <div v-for="m in journey" :key="m.key" class="journey-row">
        <span class="kicker kicker--accent">{{ m.label }}</span>
        <!-- Her kurs kendi satırında: solda gün, sağda kurs adı ve platform -->
        <ol class="journey-items">
          <li v-for="c in m.items" :key="c.title">
            <span class="day">{{ Number(c.date.slice(8, 10)) }}</span>
            <span>
              {{ c.title }}
              <span class="kicker ml-1">{{ c.provider }}</span>
            </span>
          </li>
        </ol>
      </div>
    </section>

    <!-- YETENEKLER -->
    <section class="mb-16">
      <SectionHeader title="Teknolojiler" :count="profile.skills.length" count-label="teknoloji" />
      <p class="skills">{{ profile.skills.join(' · ') }}</p>
    </section>

    <!-- SERTİFİKALAR -->
    <section>
      <SectionHeader title="Sertifikalar" :count="certs.length" count-label="sertifika" />
      <template v-for="g in certGroups" :key="g.name">
        <p class="kicker mt-6 mb-3">{{ g.name }} · {{ g.items.length }}</p>
        <v-row>
          <v-col v-for="c in g.items" :key="c.title" cols="12" sm="6" md="4">
            <CertificateCard v-bind="c" />
          </v-col>
        </v-row>
      </template>
    </section>
  </v-container>
</template>

<style scoped>
/* Özet sayılar: mobilde 2x2, masaüstünde 4 yan yana */
.stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-top: 1px solid var(--rule);
}
@media (min-width: 960px) {
  .stats {
    grid-template-columns: repeat(4, 1fr);
  }
}
.stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 20px 0;
  border-bottom: 1px solid var(--rule);
}
.stat-value {
  font-size: clamp(2.25rem, 5vw, 3.25rem);
  font-weight: 700;
  line-height: 1;
  color: rgb(var(--v-theme-primary));
}

.journey-row {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 16px;
  align-items: baseline;
  padding: 18px 0;
  border-bottom: 1px solid var(--rule);
}
@media (max-width: 599px) {
  .journey-row {
    grid-template-columns: 1fr;
    gap: 4px;
  }
}
.journey-items {
  list-style: none;
  padding: 0;
  margin: 0;
}
.journey-items li {
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: 8px;
  align-items: baseline;
  padding: 3px 0;
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.45;
}
/* Ayın günü: kehribar renkli küçük sayı */
.journey-items .day {
  font-family: var(--ui-font);
  font-size: 0.9rem;
  color: rgb(var(--v-theme-primary));
  text-align: right;
}

.skills {
  font-size: clamp(1.35rem, 3vw, 1.75rem);
  font-weight: 700;
  line-height: 1.6;
}
</style>

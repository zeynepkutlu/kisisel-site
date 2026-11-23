<script setup lang="ts">
// /about sayfası: tanıtım, künye (kısa bilgiler), ilgi alanları ve yolculuk.
// Sertifikalar ve teknolojiler /ogrendiklerim sayfasında.
usePageSeo({
  title: 'Hakkımda',
  description:
    "2000 Şanlıurfa doğumlu, Girne Üniversitesi Bilgisayar Programcılığı 2. sınıf öğrencisi Zeynep Kutlu: SQL ve veritabanı sevgisi, staj projeleri ve yolculuğu.",
  type: 'profile',
})
const profile = useProfile()

// Öğrendiklerim sayfasına yönlendiren kutu için özet
const totalHours = profile.certificates.reduce((sum, c) => sum + (c.hours ?? 0), 0)

// Künye: solda etiket, sağda değer olarak listelenen kısa bilgiler
const facts = [
  { label: 'Doğum', value: `${profile.birthYear}, ${profile.hometown}` },
  { label: 'Okul', value: profile.education.school },
  { label: 'Bölüm', value: profile.education.department },
  { label: 'Sınıf', value: profile.education.year },
]

const timeline = [
  { year: String(profile.birthYear), title: 'Doğum', text: `${profile.hometown}'da doğdum.` },
  {
    year: 'Yaz 2026',
    title: 'Staj',
    text: '20 iş günlük stajımda Node.js, Express.js ve MySQL ile kütüphane otomasyonu, blog sitesi ve görev takip uygulaması geliştirdim.',
  },
  {
    year: 'Güz 2026',
    title: 'Kurslar ve kişisel site',
    text: 'BTK Akademi ve Udemy kurslarıyla kendimi geliştirdim; Nuxt 3 + Vuetify ile bu siteyi kurdum.',
  },
  {
    year: 'Bugün',
    title: profile.education.school,
    text: `${profile.education.department} bölümünde ${profile.education.year} öğrencisiyim.`,
  },
]
</script>

<template>
  <v-container>
    <PageHeader kicker="Hakkımda" :title="`Ben ${profile.firstName}.`" :lead="profile.tagline" />

    <v-row class="mb-8">
      <!-- Sol: uzun tanıtım metni -->
      <v-col cols="12" md="7" class="prose pr-md-12">
        <p>
          {{ profile.birthYear }} yılında {{ profile.hometown }}'da doğdum. Şu anda
          {{ profile.education.school }}'nde {{ profile.education.department }} bölümünde
          {{ profile.education.year }} öğrencisiyim.
        </p>
        <p>
          SQL'i çok seviyorum; bu yüzden veritabanı ağırlıklı projeler en çok hoşuma gidenler.
          Stajımda Node.js, Express.js ve MySQL ile kütüphane otomasyonu, blog sitesi ve görev takip
          uygulaması geliştirdim. Kendi başıma yaptığım ve yayına aldığım CRM uygulamasında ise
          Vue.js, Node.js ve Supabase kullandım.
        </p>
        <p>
          Kodun dışında kitap okumayı, gizem ve gerilim türündeki dizi ve filmleri seviyorum.
          Okumayı sevmemi sağlayan ilk kitap <NuxtLink to="/kitaplar/nicin-kitap-okumaliyiz"><em>Niçin Okumalıyız</em></NuxtLink> oldu;
          <NuxtLink to="/raf">rafımda</NuxtLink> en sevdiklerim var.
        </p>
      </v-col>

      <!-- Sağ: künye, ilgi alanları ve Öğrendiklerim'e yönlendirme -->
      <v-col cols="12" md="5">
        <p class="kicker mb-3">Künye</p>
        <dl class="facts mb-8">
          <template v-for="f in facts" :key="f.label">
            <dt class="kicker">{{ f.label }}</dt>
            <dd>{{ f.value }}</dd>
          </template>
        </dl>

        <p class="kicker mb-3">İlgi alanları</p>
        <p class="interests mb-8">{{ profile.interests.join(' · ') }}</p>

        <v-card to="/ogrendiklerim" class="pa-5">
          <p class="kicker kicker--accent mb-2">Öğrendiklerim</p>
          <p class="teaser mb-1">
            {{ profile.certificates.length }} sertifika · {{ totalHours.toLocaleString('tr-TR') }} saat
          </p>
          <p class="text-medium-emphasis mb-0">Kurslarım, sertifikalarım ve kullandığım teknolojiler →</p>
        </v-card>
      </v-col>
    </v-row>

    <SectionHeader title="Yolculuğum" />
    <!-- Zaman çizelgesi: her satırda solda yıl, sağda açıklama, aralarında ince çizgi -->
    <div v-for="t in timeline" :key="t.year" class="timeline-row">
      <span class="kicker kicker--accent">{{ t.year }}</span>
      <div>
        <h3 class="text-h6 font-weight-bold mb-1">{{ t.title }}</h3>
        <p class="text-medium-emphasis mb-0">{{ t.text }}</p>
      </div>
    </div>
  </v-container>
</template>

<style scoped>
/* dl/dt/dd: HTML'in "tanım listesi" etiketleri; etiket-değer çiftleri için anlamlı yapı */
.facts {
  display: grid;
  grid-template-columns: 90px 1fr;
  border-top: 1px solid var(--rule);
}
.facts dt,
.facts dd {
  padding: 10px 0;
  border-bottom: 1px solid var(--rule);
}
.facts dt {
  padding-top: 14px;
}
.facts dd {
  font-size: 1.1rem;
  font-weight: 700;
}
.interests {
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.6;
}
.teaser {
  font-size: 1.5rem;
  font-weight: 700;
}
.timeline-row {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 16px;
  padding: 20px 0;
  border-bottom: 1px solid var(--rule);
}
.timeline-row .kicker {
  padding-top: 6px;
}
</style>

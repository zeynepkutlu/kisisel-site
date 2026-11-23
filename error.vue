<script setup lang="ts">
// Özel hata sayfası (404, 500...). Nuxt bir hata olunca app.vue yerine bu dosyayı gösterir.
// Bu yüzden layout burada yok: v-app'i kendimiz koyuyoruz. Layout'u bilerek kullanmadık;
// hata layout'tan ya da içerik sorgusundan geliyorsa hata sayfası da çökmesin.
import type { NuxtError } from '#app'
import { SITE_NAME } from '~/composables/usePageSeo'

const props = defineProps<{ error: NuxtError }>()

const is404 = computed(() => props.error.statusCode === 404)
const title = computed(() => (is404.value ? 'Bu sayfa rafta yok.' : 'Bir şeyler ters gitti.'))
const lead = computed(() =>
  is404.value
    ? 'Aradığın sayfa taşınmış, silinmiş ya da adres yanlış yazılmış olabilir.'
    : 'Sorun sende değil, sitede. Biraz sonra tekrar deneyebilirsin.',
)
// Hatanın kendi mesajı (ör. createError ile verdiğimiz "Yazı bulunamadı")
const message = computed(() => props.error.message || props.error.statusMessage)

// app.vue çalışmadığı için başlık kuralı da geçerli değil; tam başlığı burada yazıyoruz.
// noindex: arama motorları hata sayfasını listelemesin.
useHead({ title: () => `${props.error.statusCode} · ${SITE_NAME}`, titleTemplate: null })
useSeoMeta({ robots: 'noindex, nofollow' })

// clearError: hata durumunu temizler ve verilen adrese götürür
const goHome = () => clearError({ redirect: '/' })
</script>

<template>
  <v-app>
    <v-main class="d-flex align-center">
      <v-container class="text-center py-16" style="max-width: 720px">
        <p class="kicker kicker--accent mb-4">Hata</p>
        <p class="code display mb-4" aria-hidden="true">{{ error.statusCode }}</p>
        <h1 class="text-h4 text-md-h3 display mb-4">{{ title }}</h1>
        <p class="lead mb-4">{{ lead }}</p>
        <p v-if="message" class="message mb-8">{{ message }}</p>
        <v-btn color="primary" size="large" prepend-icon="$home-outline" @click="goHome">
          Ana Sayfaya Dön
        </v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.code {
  font-size: clamp(6rem, 20vw, 11rem);
  font-style: italic;
  line-height: 1;
  color: rgb(var(--v-theme-primary));
}
.message {
  font-family: var(--ui-font);
  font-size: 15px;
  overflow-wrap: anywhere; /* uzun adresler telefonda taşmasın */
  color: rgba(var(--v-theme-on-background), 0.7);
}
</style>

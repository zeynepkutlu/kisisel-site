<script setup lang="ts">
// Alt bilgi (footer): kısa tanıtım, menü, sosyal linkler, site istatistikleri ve "rastgele yazı".
const route = useRoute()

// İsim, açıklama ve sosyal linkler composables/useProfile.ts'ten geliyor
const profile = useProfile()

// Yazı adresleri: hem yazı sayısı hem "Rastgele bir yazı" butonu için (içerik eklendikçe kendiliğinden artar)
const { data: postPaths } = await useAsyncData('footer-post-paths', async () => {
  const posts = await queryCollection('blog').select('path').all()
  return posts.map((p) => p.path)
})
const { goToRandomPost } = useRandomPost()
const projectCount = useProjects().length

// Yılı otomatik al
const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer mt-16">
    <v-container class="py-12">
      <v-row>
        <v-col cols="12" md="5">
          <p class="footer-brand mb-2">{{ profile.name }}</p>
          <p class="text-medium-emphasis mb-0" style="max-width: 360px">{{ profile.footerNote }}</p>
        </v-col>

        <v-col cols="6" md="3">
          <p class="kicker mb-3">Bağlantılar</p>
          <template v-for="s in profile.socials" :key="s.title">
            <!-- Adres varsa tıklanabilir link -->
            <a v-if="s.href" :href="s.href" target="_blank" rel="noopener" class="footer-link">
              <v-icon :icon="s.icon" size="16" class="mr-1" />{{ s.title }}
            </a>
            <!-- Adres yoksa görünür ama tıklanmaz -->
            <span v-else class="footer-link disabled">
              <v-icon :icon="s.icon" size="16" class="mr-1" />{{ s.title }}
              <span class="soon">yakında</span>
            </span>
          </template>
        </v-col>

        <v-col cols="6" md="4">
          <p class="kicker mb-3">Keşfet</p>
          <!-- button kullanıyoruz çünkü bir sayfaya değil, rastgele seçilecek bir yere gidiyor -->
          <button type="button" class="footer-link" @click="goToRandomPost(route.path)">
            Rastgele bir yazı →
          </button>
          <NuxtLink to="/projects" class="footer-link">Tüm projeler →</NuxtLink>
        </v-col>
      </v-row>

      <hr class="rule my-8" />

      <div class="d-flex flex-column flex-sm-row justify-space-between ga-2 kicker">
        <span>© {{ year }} {{ profile.name }}</span>
        <span>{{ projectCount }} proje · {{ postPaths?.length ?? 0 }} yazı · {{ profile.certificates.length }} sertifika</span>
      </div>
    </v-container>
  </footer>
</template>

<style scoped>
/*
  Footer renkleri iki değişkene bağlı:
  --f-bg: zemin, --f-fg: yazı rengi (r,g,b şeklinde, saydamlık verebilmek için).
  Açık temada koyu yeşil zemin + bej yazı; koyu temada (zemin zaten yeşil) hafif açık zemin.
*/
.site-footer {
  --f-bg: rgb(var(--v-theme-secondary));
  --f-fg: var(--v-theme-on-secondary);
  background: var(--f-bg);
  color: rgb(var(--f-fg));
}
/* Dikkat: seçicinin TAMAMI :global(...) içinde olmalı. ":global(.v-theme--dark) .site-footer" yazılırsa
   Vue ".site-footer" kısmını atar ve kural koyu temadaki her bileşene uygulanır. */
:global(.v-theme--dark .site-footer) {
  --f-bg: rgba(var(--v-theme-surface), 0.6);
  --f-fg: var(--v-theme-on-background);
  border-top: 1px solid var(--rule);
}
/* Footer içindeki etiket, soluk metin ve çizgiler de footer'ın yazı rengini kullansın */
.site-footer .kicker,
.site-footer .text-medium-emphasis {
  color: rgba(var(--f-fg), 0.65) !important;
}
.site-footer .rule {
  border-top-color: rgba(var(--f-fg), 0.18);
}
.footer-brand {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.footer-link {
  display: block;
  padding: 2px 0;
  font-family: var(--ui-font);
  font-size: 15px;
  color: rgba(var(--f-fg), 0.85);
  text-decoration: none;
  background: none;
  border: 0;
  cursor: pointer;
  text-align: left;
}
/* Yeşil zeminde bordo okunmaz; üstüne gelince tam bej + alt çizgi */
.footer-link:hover {
  color: rgb(var(--f-fg));
  text-decoration: underline;
  text-underline-offset: 4px;
}
/* Henüz adresi olmayan hesap: soluk ve tıklanmaz */
.footer-link.disabled {
  cursor: default;
  text-decoration: none;
  color: rgba(var(--f-fg), 0.45);
}
.soon {
  margin-left: 6px;
  padding: 1px 6px;
  border: 1px solid rgba(var(--f-fg), 0.25);
  border-radius: 4px;
  font-size: 11px;
  letter-spacing: 0.08em;
}
</style>

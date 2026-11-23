import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  app: {
    head: {
      // Sayfa başlığı kuralı app.vue'de (ana sayfa için özel başlık gerektiği için orada fonksiyon olarak).
      htmlAttrs: { lang: 'tr' },
      // Her sayfada aynı olan etiketler: ikonlar, tema rengi, site adı, dil
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
      meta: [
        { name: 'theme-color', content: '#7B1E2C' }, // telefonda tarayıcı çubuğunun rengi (bordo)
        { name: 'author', content: 'Zeynep Kutlu' },
        { property: 'og:site_name', content: 'Zeynep Kutlu' },
        { property: 'og:locale', content: 'tr_TR' },
      ],
    },
  },

  // Adres kuralları: eski adresleri yenilerine kalıcı (301) olarak yönlendir
  routeRules: {
    '/izlediklerim': { redirect: { to: '/raf', statusCode: 301 } },
  },

  // Çalışma zamanı ayarları. public altındakiler tarayıcıda da okunabilir.
  // Değeri .env dosyasındaki NUXT_PUBLIC_FORMSPREE_ID ile doldurulur.
  runtimeConfig: {
    public: {
      formspreeId: '',
      // Sitenin yayındaki adresi (sonunda / olmadan). SEO linkleri (canonical, paylaşım görseli,
      // site haritası) bununla kurulur. Yayına alınca .env'deki NUXT_PUBLIC_SITE_URL ile değiştir.
      siteUrl: 'https://kisisel-site-rust.vercel.app',
    },
  },

  // Global CSS: yazı tipleri + Material Design ikonları + kendi stillerimiz
  // @fontsource: yazı tiplerini Google'a bağlanmadan kendi sitemizden sunar
  css: [
    '@fontsource/alegreya/400.css',
    '@fontsource/alegreya/400-italic.css',
    '@fontsource/alegreya/700.css',
    '@fontsource/alegreya-sans/400.css',
    '@fontsource/alegreya-sans/500.css',
    '@fontsource/alegreya-sans/700.css',
    '@mdi/font/css/materialdesignicons.css',
    '~/assets/styles/main.scss',
  ],

  // Vuetify'ın SSR sırasında doğru derlenmesi için
  build: {
    transpile: ['vuetify'],
  },

  modules: [
    // Nuxt Content: content/ klasöründeki Markdown dosyalarını sayfalarda kullanılabilir hale getirir
    '@nuxt/content',

    // Vuetify bileşenlerinin otomatik import edilmesi (tree-shaking)
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error plugins dizisi her zaman tanımlı
        config.plugins.push(
          vuetify({
            autoImport: true,
            // Vuetify'ın Sass değişkenlerini (yazı tipi, köşe yuvarlaklığı...) bu dosyadan al
            styles: { configFile: 'assets/styles/settings.scss' },
          }),
        )
      })
    },
  ],

  content: {
    build: {
      markdown: {
        // Kod bloklarının renklendirmesi: açık ve koyu tema için ayrı renkler.
        // Hangisinin görüneceğini main.scss'teki .v-theme--dark kuralı seçiyor.
        highlight: {
          theme: { default: 'github-light', dark: 'github-dark' },
        },
      },
    },
    experimental: {
      // Node.js'in kendi içindeki SQLite'ı kullan (ek native paket kurmaya gerek kalmaz, Node 22.5+)
      sqliteConnector: 'native',
    },
  },

  vite: {
    vue: {
      template: { transformAssetUrls },
    },
  },
})

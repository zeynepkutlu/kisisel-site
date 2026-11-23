import { transformAssetUrls } from 'vite-plugin-vuetify'

// Güvenlik: tarayıcının hangi kaynaklardan ne yükleyebileceğini söyleyen kurallar (CSP)
const csp = [
  "default-src 'self'",
  // 'unsafe-inline': Nuxt sayfa verisini, Vuetify temayı satır içi yazıyor. 'wasm-unsafe-eval': Nuxt Content'in SQLite'ı (WASM)
  "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://i.ytimg.com", // YouTube küçük resimleri
  "font-src 'self' data:",
  "media-src 'self'", // sesli notlar
  "connect-src 'self' https://formspree.io", // iletişim formu
  'frame-src https://www.youtube-nocookie.com', // gömülü videolar
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://formspree.io",
  "frame-ancestors 'none'", // site başka bir sitenin içine gömülemesin
].join('; ')

// Koyu tema yanıp sönmesin: sayfalar build sırasında açık temayla hazırlanıyor (prerender), sunucu cookie'yi
// göremiyor. Bu betik sayfa çizilmeden önce çalışır; cookie koyu diyorsa sınıfları koyuya çevirir.
// MutationObserver: HTML tarayıcıya geldikçe eklenen her öğeyi yakalar. Sayfa tamamlanınca durur.
const themeScript = `(function(){if(!/(?:^|; )theme=dark(?:;|$)/.test(document.cookie))return;
function fix(n){if(n.nodeType!==1)return;var a=[].slice.call(n.querySelectorAll('.v-theme--light'));if(n.matches('.v-theme--light'))a.push(n);
a.forEach(function(e){e.classList.replace('v-theme--light','v-theme--dark')})}
var o=new MutationObserver(function(l){l.forEach(function(m){m.addedNodes.forEach(fix)})});
o.observe(document.documentElement,{childList:true,subtree:true});
document.addEventListener('DOMContentLoaded',function(){fix(document.documentElement);o.disconnect()})})()`

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-11-24',
  devtools: { enabled: true },

  app: {
    head: {
      // Sayfa başlığı kuralı app.vue'de (ana sayfa için özel başlık gerektiği için orada fonksiyon olarak).
      htmlAttrs: { lang: 'tr' },
      script: [{ innerHTML: themeScript, tagPriority: 'critical' }],
      // Her sayfada aynı olan etiketler: ikonlar, tema rengi, site adı, dil
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        // RSS okuyucular blogu buradan bulur
        { rel: 'alternate', type: 'application/rss+xml', title: 'Zeynep Kutlu · Blog', href: '/blog/feed.xml' },
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

  // $production: sadece yayın build'inde geçerli ayarlar (npm run dev etkilenmez)
  $production: {
    // Prerender: sayfalar build sırasında bir kez HTML olarak hazırlanır, ziyaretçiye hazır dosya gider.
    // crawlLinks: "/" sayfasından başlayıp linkleri izler; yeni yazı ve kitaplar kendiliğinden dahil olur.
    // Sayfalar arası geçişte de küçük bir veri dosyası (_payload.json) indirilir, 865 KB'lık SQLite değil.
    nitro: {
      // ignore: yönlendirme adresi sayfaya dönüşmesin, 301 olarak kalsın
      prerender: { crawlLinks: true, routes: ['/'], ignore: ['/izlediklerim'] },
    },
    // Güvenlik başlıkları (geliştirmede Nuxt DevTools ve canlı yenileme bozulmasın diye sadece yayında)
    routeRules: {
      '/**': {
        headers: {
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
          'Content-Security-Policy': csp,
        },
      },
    },
  },

  // Çalışma zamanı ayarları. public altındakiler tarayıcıda da okunabilir.
  // .env dosyasındaki NUXT_PUBLIC_... değerleri buradakilerin yerine geçer (ör. NUXT_PUBLIC_FORMSPREE_ID).
  runtimeConfig: {
    public: {
      // İletişim formunun Formspree ID'si. Gizli değil: form gönderilirken tarayıcıda zaten görünür.
      formspreeId: 'mrpqoobw',
      // Sitenin yayındaki adresi (sonunda / olmadan). SEO linkleri (canonical, paylaşım görseli,
      // site haritası) bununla kurulur. Yayına alınca .env'deki NUXT_PUBLIC_SITE_URL ile değiştir.
      siteUrl: 'https://kisisel-site-rust.vercel.app',
      // Google Search Console doğrulama kodu ("HTML etiketi" yöntemindeki content değeri). Gizli değil.
      googleVerification: '',
    },
  },

  // Global CSS: yazı tipleri + kendi stillerimiz (ikonlar utils/icons.ts'te)
  // @fontsource: yazı tiplerini Google'a bağlanmadan kendi sitemizden sunar (font-display: swap hazır gelir).
  // Sadece kullanılan ağırlıklar: 400-italic alıntılarda, Sans 500 etiket ve butonlarda kullanılıyor.
  css: [
    '@fontsource/alegreya/400.css',
    '@fontsource/alegreya/400-italic.css',
    '@fontsource/alegreya/700.css',
    '@fontsource/alegreya-sans/400.css',
    '@fontsource/alegreya-sans/500.css',
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
    './modules/vuetify',

    // ESLint: kod kalitesi kuralları (npm run lint)
    '@nuxt/eslint',
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
      // Node.js'in kendi içindeki SQLite'ı kullan (ek native paket kurmaya gerek kalmaz, Node 22.5+).
      // Vercel'de Node sürümü 22'nin altına inerse build bozulur: ya sürümü yükselt
      // ya da bu satırı kaldırıp "npm install better-sqlite3" çalıştır.
      sqliteConnector: 'native',
    },
  },

  vite: {
    vue: {
      template: { transformAssetUrls },
    },
  },
})

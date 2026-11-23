// Vuetify eklentisi: Nuxt uygulaması başlarken Vuetify'ı Vue'ya kaydeder.
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((nuxtApp) => {
  // Kullanıcının tema tercihi cookie'de saklanıyor.
  // Cookie hem sunucuda hem tarayıcıda okunabildiği için sayfa ilk açılışta doğru temayla gelir.
  const themeCookie = useThemeCookie()

  const vuetify = createVuetify({
    ssr: true, // Nuxt sunucu tarafında render ettiği için
    theme: {
      defaultTheme: themeCookie.value,
      themes: {
        // Renk üçlüsü: BEJ (zemin) · BORDO (tıklanan her şey) · KOYU YEŞİL (etiketler ve footer)

        // Açık tema (varsayılan): bej zemin, bordo vurgu, koyu yeşil ikincil renk
        light: {
          dark: false,
          colors: {
            background: '#F3ECDF', // bej
            surface: '#FBF7F0', // kartların zemini (zeminden açık krem)
            'surface-variant': '#E9DDC8', // yazı kartı kapakları (koyu bej)
            primary: '#7B1E2C', // bordo: butonlar, linkler, vurgular
            'on-primary': '#FBF7F0',
            secondary: '#2E4A3B', // koyu yeşil: etiketler ve footer zemini
            'on-secondary': '#F3ECDF',
            'on-background': '#2A2320', // metin: kahveye çalan koyu mürekkep
            'on-surface': '#2A2320',
          },
        },
        // Koyu tema: koyu yeşil zemin, bej metin, şarap tonunda bordo vurgu
        // (koyu zeminde koyu bordo okunmayacağı için biraz açıldı ama pembeye kaçmayacak kadar)
        dark: {
          dark: true,
          colors: {
            background: '#13201A', // koyu yeşil
            surface: '#1A2B23',
            'surface-variant': '#24392E',
            primary: '#C9606C', // şarap / kiremit tonlu bordo
            'on-primary': '#FBF7F0',
            secondary: '#9BC0A6', // açık yeşil (koyu zeminde etiketler için)
            'on-secondary': '#13201A',
            'on-background': '#EFE6D6', // bej metin
            'on-surface': '#EFE6D6',
          },
        },
      },
    },
    // Bileşenlerin varsayılan görünümü: her yerde tek tek yazmak yerine burada bir kez
    defaults: {
      VCard: { flat: true }, // gölgesiz; ince çerçeveyi main.scss veriyor
      VBtn: { rounded: 'lg' },
      VTextField: { variant: 'outlined' },
      VTextarea: { variant: 'outlined' },
    },
  })
  nuxtApp.vueApp.use(vuetify)
})

// Vuetify modülü: Vite'a vite-plugin-vuetify'ı ekler.
// nuxt.config.ts sade kalsın diye ayrı dosyada; orada './modules/vuetify' olarak çağrılıyor.
import { defineNuxtModule } from 'nuxt/kit'
import vuetify from 'vite-plugin-vuetify'

export default defineNuxtModule({
  meta: { name: 'vuetify' },
  setup(_options, nuxt) {
    nuxt.hook('vite:extendConfig', (config) => {
      // @ts-expect-error plugins dizisi bu aşamada her zaman tanımlı
      config.plugins.push(
        vuetify({
          autoImport: true, // sadece kullanılan bileşenler siteye girer (tree-shaking)
          // Vuetify'ın Sass değişkenlerini (yazı tipi, köşe yuvarlaklığı...) bu dosyadan al
          styles: { configFile: 'assets/styles/settings.scss' },
        }),
      )
    })
  },
})

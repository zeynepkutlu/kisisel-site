// ESLint ayarları: Nuxt'ın hazır kuralları + Prettier ile çakışan biçim kurallarını kapat
import prettier from 'eslint-config-prettier'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(prettier, {
  rules: {
    // Sayfa adları (index.vue, about.vue...) tek kelime olabilir
    'vue/multi-word-component-names': 'off',
    // TypeScript'te "?" ile opsiyonel prop yeterli, ayrıca varsayılan değer istemiyoruz
    'vue/require-default-prop': 'off',
  },
})

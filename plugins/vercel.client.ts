// Vercel Analytics (ziyaret sayıları) ve Speed Insights (sayfa hızı).
// ".client" → sadece tarayıcıda çalışır. import.meta.dev → geliştirmede hiç yüklenmez, sadece yayında.
// Çerez kullanmazlar. Verilerin toplanması için Vercel panelinde ikisinin de "Enable" edilmesi gerekir.
import { inject } from '@vercel/analytics'
import { injectSpeedInsights } from '@vercel/speed-insights'

export default defineNuxtPlugin(() => {
  if (import.meta.dev) return
  inject({ mode: 'production' })
  injectSpeedInsights({ framework: 'nuxt' })
})

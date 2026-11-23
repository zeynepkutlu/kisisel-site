// Tarihi Türkçe okunur hale getirir: 2026-11-23 → 23 Kasım 2026
// Nuxt, utils/ klasöründeki fonksiyonları da otomatik import eder.
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
}

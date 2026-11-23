// Tema tercihini tutan cookie. Plugin ve header aynı cookie'yi kullansın diye tek yerde tanımlı.
// useCookie, Nuxt'ın hem sunucuda hem tarayıcıda çalışan cookie fonksiyonu.

export type ThemeName = 'light' | 'dark'

export function useThemeCookie() {
  return useCookie<ThemeName>('theme', {
    default: () => 'light', // site lavanta tonlu açık temayla açılır
    maxAge: 60 * 60 * 24 * 365, // 1 yıl (saniye cinsinden)
    sameSite: 'lax',
  })
}

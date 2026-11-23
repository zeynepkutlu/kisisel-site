// Rastgele bir blog yazısına gitme. Footer'da ve yazı sayfasında kullanılıyor.
// Yazı adresleri footer'da zaten yükleniyor ('footer-post-paths'). useNuxtData o veriyi yeniden
// çekmeden okur; böylece butona basınca tarayıcının veritabanı indirmesi gerekmez.
export function useRandomPost() {
  const { data: paths } = useNuxtData<string[]>('footer-post-paths')

  // except: şu an açık olan yazıyı tekrar seçmemek için
  function goToRandomPost(except?: string) {
    const pool = (paths.value ?? []).filter((path) => path !== except)
    const pick = pool[Math.floor(Math.random() * pool.length)]
    if (pick) return navigateTo(pick)
  }

  return { goToRandomPost }
}

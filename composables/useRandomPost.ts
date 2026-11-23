// Rastgele bir blog yazısına gitme. Footer'da ve ana sayfada kullanılıyor.
// İsteğe bağlı "except": şu an açık olan yazıyı tekrar seçmemek için.

export async function goToRandomPost(except?: string) {
  // select('path'): sadece adresleri çek, içeriğe gerek yok
  const posts = await queryCollection('blog').select('path').all()
  const pool = posts.filter((p) => p.path !== except)
  if (!pool.length) return
  const pick = pool[Math.floor(Math.random() * pool.length)]!
  await navigateTo(pick.path)
}

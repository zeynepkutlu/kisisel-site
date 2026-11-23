// Blog yazısı kartı için kapak görseli bulur:
// - YouTube notuysa videonun küçük resmi
// - "Ekrandan öğrendiklerim" yazısıysa Raf'taki dizi/filmin afişi
// - ikisi de değilse undefined (kart tipografik kapak kullanır)
export function postImage(post: { youtube?: string; watched?: string }): string | undefined {
  if (post.youtube) return `https://i.ytimg.com/vi/${post.youtube}/hqdefault.jpg`
  if (post.watched) return useShelf().find((s) => s.title === post.watched)?.cover
  return undefined
}

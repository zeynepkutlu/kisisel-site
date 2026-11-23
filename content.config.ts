// Nuxt Content koleksiyonları: hangi Markdown dosyalarının hangi gruba ait olduğunu
// ve ön bilgilerinde (frontmatter) hangi alanların bulunacağını tanımlar.
import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    // Blog yazıları: content/blog/yazi-adi.md → /blog/yazi-adi
    blog: defineCollection({
      // type: 'page' → her dosya bir sayfa gibi davranır ve bir adres (path) alır
      type: 'page',
      source: 'blog/*.md',
      // title ve description hazır gelir; ekstra alanları burada tanımlıyoruz
      schema: z.object({
        date: z.string(), // YYYY-AA-GG
        // Kategori: "Öğrenme günlüğü", "Ekrandan öğrendiklerim", "YouTube notlarım"... (composables/useBlogCategories.ts)
        category: z.string().optional(),
        // YouTube notları için: videonun kimliği (youtube.com/watch?v=BURASI). Yazının başında video gösterilir.
        youtube: z.string().optional(),
        // Ekrandan öğrendiklerim için: hangi dizi/film? Raf'taki adıyla aynı yaz (ör. "The Prestige")
        watched: z.string().optional(),
      }),
    }),

    // Kavram sözlüğü: content/kavramlar/sql.md → /kavramlar/sql
    kavramlar: defineCollection({
      type: 'page',
      source: 'kavramlar/*.md',
      schema: z.object({
        category: z.string(), // ör. Veritabanı, Web, Backend
        related: z.array(z.string()).optional(), // ilgili kavramların dosya adları (ör. ['sql', 'join'])
      }),
    }),

    // Kitaplar: content/kitaplar/korluk.md → /kitaplar/korluk
    // Dosyanın gövdesine (--- çizgilerinin altına) kitap hakkındaki yazını yazarsın.
    kitaplar: defineCollection({
      type: 'page',
      source: 'kitaplar/*.md',
      schema: z.object({
        author: z.string().optional(),
        cover: z.string().optional(), // kapak görseli, ör. /raf/korluk.jpg
        order: z.number().default(100), // raftaki sırası (küçük sayı önce gelir)
        rating: z.number().min(1).max(5).optional(), // 5 üzerinden puanın
        note: z.string().optional(), // kartta görünen tek cümlelik not
        quote: z.string().optional(), // sevdiğin alıntı
        quotePage: z.number().optional(), // alıntının sayfa numarası
        audio: z.string().optional(), // sesli not dosyası, ör. /sesler/korluk.m4a
        audioNote: z.string().optional(), // ses kaydının kısa açıklaması
      }),
    }),
  },
})

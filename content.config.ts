// Nuxt Content koleksiyonları: hangi Markdown dosyalarının hangi gruba ait olduğunu
// ve ön bilgilerinde (frontmatter) hangi alanların bulunacağını tanımlar.
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const DATE_FORMAT = /^\d{4}-\d{2}-\d{2}$/ // YYYY-AA-GG

// ---- Build sırasında içerik denetimi ----
// Nuxt Content aşağıdaki şemaları veritabanı sütunlarını üretmek için kullanır ama dosyaları onlara göre
// DENETLEMEZ. Bu yüzden tarihleri ve "related" listesini burada kendimiz kontrol ediyoruz.
// Hata build'i durdurmaz, terminale uyarı yazar.
function checkContent() {
  // Klasördeki md dosyalarının frontmatter'ını (--- çizgileri arası) okur
  const read = (folder: string) => {
    const dir = fileURLToPath(new URL(`./content/${folder}/`, import.meta.url))
    if (!existsSync(dir)) return []
    return readdirSync(dir)
      .filter((file) => file.endsWith('.md'))
      .map((file) => {
        const text = readFileSync(dir + file, 'utf8').replace(/\r\n/g, '\n') // Windows satır sonlarını sadeleştir
        const meta = text.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? ''
        return { slug: file.slice(0, -3), file: `content/${folder}/${file}`, meta }
      })
  }
  const clean = (value: string) => value.trim().replace(/^['"]|['"]$/g, '')

  for (const post of read('blog')) {
    const date = clean(post.meta.match(/^date:(.*)$/m)?.[1] ?? '')
    if (!DATE_FORMAT.test(date)) {
      console.warn(`[içerik] ${post.file}: date "${date}" geçersiz, YYYY-AA-GG olmalı (ör. 2026-11-24).`)
    }
  }

  const concepts = read('kavramlar')
  const slugs = new Set(concepts.map((c) => c.slug))
  for (const concept of concepts) {
    // İki yazım da desteklenir: "related: [sql, join]" ve alt alta "- sql"
    const inline = concept.meta.match(/^related: *\[(.*?)\]/m)?.[1]?.split(',')
    const block = concept.meta
      .match(/^related: *\n((?: *- .*\n?)+)/m)?.[1]
      ?.split('\n')
      .map((line) => line.replace(/^ *- /, ''))
    for (const slug of (inline ?? block ?? []).map(clean).filter(Boolean)) {
      if (!slugs.has(slug)) {
        console.warn(`[içerik] ${concept.file}: related içindeki "${slug}" bulunamadı (content/kavramlar/${slug}.md yok).`)
      }
    }
  }
}
checkContent()

export default defineContentConfig({
  collections: {
    // Blog yazıları: content/blog/yazi-adi.md → /blog/yazi-adi
    blog: defineCollection({
      // type: 'page' → her dosya bir sayfa gibi davranır ve bir adres (path) alır
      type: 'page',
      source: 'blog/*.md',
      // title ve description hazır gelir; ekstra alanları burada tanımlıyoruz
      schema: z.object({
        date: z.string().regex(DATE_FORMAT), // YYYY-AA-GG (asıl denetim: checkContent)
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
        summary: z.string().optional(), // liste sayfasında kavramın altında görünen 3-4 cümlelik açıklama
        related: z.array(z.string()).optional(), // ilgili kavramların dosya adları (ör. ['sql', 'join']); varlıkları checkContent'te denetlenir
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

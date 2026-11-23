# Şablonlar

Bu klasör sitede yayınlanmaz; yeni içerik eklerken kopyalayıp doldurman için hazır dosyalar.

| Ne eklemek istiyorsun? | Şablon | Nereye kopyala? |
|---|---|---|
| Kod yazarken öğrendiğin bir şey | `ogrenme-gunlugu.md` | `content/blog/` |
| İzlediğin dizi/filmden öğrendiklerin | `ekrandan-ogrendiklerim.md` | `content/blog/` |
| Bir YouTube videosuna yorumun | `youtube-notum.md` | `content/blog/` |
| Yeni bir kitap | `kitap.md` | `content/kitaplar/` |

**Adımlar**
1. Şablonu kopyala ve **dosya adını** değiştir. Dosya adı adres olur: `content/blog/prestige-ve-sabir.md` → `/blog/prestige-ve-sabir`.
   Dosya adında Türkçe karakter ve boşluk kullanma (`ğ→g, ş→s, ı→i, ö→o, ü→u, ç→c`, boşluk yerine `-`).
2. `---` çizgileri arasındaki alanları doldur, altına yazını yaz.
3. `npm run dev` açıksa sayfa kendiliğinden güncellenir.

**Sesli not eklemek (kitaplar için)**
1. Telefonda kaydı al (`.m4a` veya `.mp3`).
2. Dosyayı `public/sesler/` klasörüne koy, adını kitabın dosya adıyla aynı yap (ör. `korluk.m4a`).
3. Kitabın md dosyasında `# audio:` satırının başındaki `#` işaretini sil.

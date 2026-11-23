// Raf: sevdiğim diziler ve filmler. Kitaplar ayrı: content/kitaplar/ klasöründe (her kitabın kendi sayfası var).
// Yeni bir dizi/film eklemek için listeye bir satır eklemen yeterli, örneğin:
//   { title: 'Dizinin adı', type: 'Dizi', year: 2020, cover: '/kapaklar/dizi-adi.jpg', rating: 5, note: 'Kısa yorumun' },
// Kapak görselini public/kapaklar/ klasörüne koy (yoksa yerine şık bir yazı kapağı çıkar).

export type ShelfType = 'Kitap' | 'Dizi' | 'Film'

export interface ShelfItem {
  title: string
  type: ShelfType
  year?: number // çıkış yılı
  creator?: string // kitabın yazarı (dizi/film için yönetmen yazılabilir)
  cover?: string // kapak/afiş görseli (public/ altında), ör. /kapaklar/the-prestige.jpg
  rating?: number // senin puanın (5 üzerinden)
  note?: string // bir-iki cümlelik yorum
  to?: string // kendi sayfası varsa adresi (kitaplarda otomatik)
  platform?: string // nerede yayınlandı/izledim (ör. Netflix, CBS)
  category?: string // büyük kategori (ör. filmlerde 'Hollywood' / 'Bollywood'); group'un bir üst seviyesi
  group?: string // alt başlık (ör. 'Kore dizileri', 'Alacakaranlık serisi'); boşsa kategorinin genel listesinde durur
}

// Türlerin kategorileri ve sırası. Kategorisi boş bırakılan eser listedeki ilk kategoriye düşer.
// Kategori tanımlı olmayan türlerde (Kitap, Dizi) başlık gösterilmez.
export const SHELF_CATEGORIES: Partial<Record<ShelfType, string[]>> = {
  Film: ['Hollywood', 'Bollywood'],
}

// Raftaki türler ve sayfada görünme sırası
export const SHELF_TYPES: ShelfType[] = ['Kitap', 'Dizi', 'Film']

export function useShelf(): ShelfItem[] {
  return [
    // --- Diziler ---
    // cover yazılı ama dosyası henüz yoksa sorun değil: dosyayı public/kapaklar/ içine koyunca görünür,
    // o zamana kadar tipografik kapak çıkar.
    { title: 'Matlock', type: 'Dizi', year: 2024, platform: 'CBS', cover: '/kapaklar/matlock.jpg', note: 'Şu an izliyorum.' },
    { title: 'Cassandra', type: 'Dizi', platform: 'Netflix', cover: '/kapaklar/cassandra.jpg' },
    { title: 'Sherlock', type: 'Dizi', year: 2010, platform: 'BBC', cover: '/kapaklar/sherlock-holmes.jpg' },
    { title: "The Queen's Gambit", type: 'Dizi', year: 2020, platform: 'Netflix', cover: '/kapaklar/the-queens-gambit.jpg' },
    { title: 'Chernobyl', type: 'Dizi', year: 2019, platform: 'HBO', cover: '/kapaklar/chernobyl.jpg' },
    { title: 'Stranger Things', type: 'Dizi', year: 2016, platform: 'Netflix', cover: '/kapaklar/stranger-things.jpg' },
    { title: 'Élite', type: 'Dizi', year: 2018, platform: 'Netflix', cover: '/kapaklar/elite.jpg' },
    { title: 'Arrow', type: 'Dizi', year: 2012, platform: 'The CW', cover: '/kapaklar/arrow.jpg' },
    { title: 'How I Met Your Mother', type: 'Dizi', year: 2005, platform: 'CBS', cover: '/kapaklar/how-i-met-your-mother.jpg' },
    { title: 'Young Sheldon', type: 'Dizi', year: 2017, platform: 'CBS', cover: '/kapaklar/young-sheldon.jpg' },
    { title: 'Black Mirror', type: 'Dizi', year: 2011, platform: 'Netflix', cover: '/kapaklar/black-mirror.jpg' },
    { title: 'The OA', type: 'Dizi', year: 2016, platform: 'Netflix', cover: '/kapaklar/the-oa.jpg' },

    // Kore dizileri (Raf'ta kendi alt başlığı altında)
    { title: 'Mousetrap', type: 'Dizi', year: 2026, platform: 'Netflix', group: 'Kore dizileri', cover: '/kapaklar/mousetrap.jpg' },
    { title: 'The Art of Sarah', type: 'Dizi', year: 2026, platform: 'Netflix', group: 'Kore dizileri', cover: '/kapaklar/the-art-of-sarah.jpg' },
    { title: 'Crash Landing on You', type: 'Dizi', year: 2019, platform: 'Netflix', group: 'Kore dizileri', cover: '/kapaklar/crash-landing-on-you.jpg' },
    { title: 'Business Proposal', type: 'Dizi', year: 2022, platform: 'Netflix', group: 'Kore dizileri', cover: '/kapaklar/business-proposal.jpg' },
    { title: 'Hometown Cha-Cha-Cha', type: 'Dizi', year: 2021, platform: 'Netflix', group: 'Kore dizileri', cover: '/kapaklar/hometown-cha-cha-cha.jpg' },
    { title: "It's Okay to Not Be Okay", type: 'Dizi', year: 2020, platform: 'Netflix', group: 'Kore dizileri', cover: '/kapaklar/its-okay-to-not-be-okay.jpg' },
    { title: 'King the Land', type: 'Dizi', year: 2023, platform: 'Netflix', group: 'Kore dizileri', cover: '/kapaklar/king-the-land.jpg' },
    { title: 'Oh My Venus', type: 'Dizi', year: 2015, group: 'Kore dizileri', cover: '/kapaklar/oh-my-venus.jpg' },
    { title: 'Teach You a Lesson', type: 'Dizi', platform: 'Netflix', group: 'Kore dizileri', cover: '/kapaklar/teach-you-a-lesson.jpg' },
    { title: 'Vincenzo', type: 'Dizi', year: 2021, platform: 'Netflix', group: 'Kore dizileri', cover: '/kapaklar/vincenzo.jpg' },
    { title: 'Kill Me, Heal Me', type: 'Dizi', year: 2015, group: 'Kore dizileri', cover: '/kapaklar/kill-me-heal-me.jpg' },
    { title: 'Empress Ki', type: 'Dizi', year: 2013, group: 'Kore dizileri', cover: '/kapaklar/empress-ki.jpg' },
    { title: 'Sarayın İncisi', type: 'Dizi', year: 2010, group: 'Kore dizileri', cover: '/kapaklar/dong-yi.jpg', note: 'Özgün adı: Dong Yi' },
    { title: 'Strong Girl Bong-soon', type: 'Dizi', year: 2017, platform: 'JTBC', group: 'Kore dizileri', cover: '/kapaklar/strong-girl-bong-soon.jpg' },
    { title: 'Hotel del Luna', type: 'Dizi', year: 2019, platform: 'tvN', group: 'Kore dizileri', cover: '/kapaklar/hotel-del-luna.jpg' },
    { title: 'I Am Not a Robot', type: 'Dizi', year: 2017, platform: 'MBC', group: 'Kore dizileri', cover: '/kapaklar/im-not-a-robot.jpg' },
    { title: 'Spooky in Love', type: 'Dizi', year: 2026, platform: 'tvN', group: 'Kore dizileri', cover: '/kapaklar/spooky-in-love.jpg' },
    { title: 'Our Sticky Love', type: 'Dizi', year: 2026, platform: 'Netflix', group: 'Kore dizileri', cover: '/kapaklar/our-sticky-love.jpg' },
    { title: 'Agent Kim Reactivated', type: 'Dizi', year: 2026, group: 'Kore dizileri', cover: '/kapaklar/agent-kim-reactivated.jpg' },
    { title: 'Suça İtilen Çocuklar', type: 'Dizi', year: 2022, platform: 'Netflix', group: 'Kore dizileri', cover: '/kapaklar/juvenile-justice.jpg', note: 'Özgün adı: Juvenile Justice' },
    { title: 'Sarayın Rüzgarı', type: 'Dizi', year: 2007, platform: 'MBC', group: 'Kore dizileri', cover: '/kapaklar/yi-san.jpg', note: 'Özgün adı: Yi San' },
    { title: 'Saraydaki Mücevher', type: 'Dizi', year: 2003, group: 'Kore dizileri', cover: '/kapaklar/jewel-in-the-palace.jpg', note: 'Özgün adı: Jewel in the Palace (Dae Jang Geum)' },

    // --- Filmler ---
    // category: 'Hollywood' | 'Bollywood' (boş bırakılırsa Hollywood sayılır)
    // group: seri adı (aynı serinin filmleri Raf'ta kendi alt başlığında toplanır)

    // Hollywood: tek filmler
    { title: 'The Prestige', type: 'Film', year: 2006, cover: '/kapaklar/the-prestige.jpg' },
    { title: 'Enigma', type: 'Film', cover: '/kapaklar/enigma.jpg' },
    { title: 'Murder Mystery', type: 'Film', year: 2019, cover: '/kapaklar/murder-mystery.jpg' },
    { title: 'Bird Box', type: 'Film', year: 2018, cover: '/kapaklar/bird-box.jpg' },
    { title: "Nil'de Ölüm", type: 'Film', cover: '/kapaklar/nilde-olum.jpg' },
    { title: "Ocean's 8", type: 'Film', year: 2018, cover: '/kapaklar/oceans-8.jpg' },
    { title: 'Joker', type: 'Film', year: 2019, cover: '/kapaklar/joker.jpg' },
    { title: 'Yarının Sınırında', type: 'Film', year: 2014, cover: '/kapaklar/edge-of-tomorrow.jpg', note: 'Özgün adı: Edge of Tomorrow' },
    { title: 'Akıl Oyunları', type: 'Film', year: 2001, cover: '/kapaklar/a-beautiful-mind.jpg', note: 'Özgün adı: A Beautiful Mind' },
    { title: 'Uzay Yolcuları', type: 'Film', year: 2016, cover: '/kapaklar/passengers.jpg', note: 'Özgün adı: Passengers' },
    { title: 'İyilik ve Kötülük Okulu', type: 'Film', year: 2022, platform: 'Netflix', cover: '/kapaklar/school-for-good-and-evil.jpg', note: 'Özgün adı: The School for Good and Evil' },

    // Hollywood: seriler (Raf'ta her biri kendi alt başlığında)
    { title: 'Enola Holmes', type: 'Film', year: 2020, group: 'Enola Holmes serisi', cover: '/kapaklar/enola-holmes.jpg' },
    { title: 'Enola Holmes 2', type: 'Film', year: 2022, group: 'Enola Holmes serisi', cover: '/kapaklar/enola-holmes-2.jpg' },
    { title: 'Enola Holmes 3', type: 'Film', group: 'Enola Holmes serisi', cover: '/kapaklar/enola-holmes-3.jpg' },
    { title: 'Siyah Giyen Adamlar', type: 'Film', year: 1997, group: 'Siyah Giyen Adamlar serisi', cover: '/kapaklar/men-in-black.jpg' },
    { title: 'Siyah Giyen Adamlar 2', type: 'Film', year: 2002, group: 'Siyah Giyen Adamlar serisi', cover: '/kapaklar/men-in-black-2.jpg' },
    { title: 'Siyah Giyen Adamlar 3', type: 'Film', year: 2012, group: 'Siyah Giyen Adamlar serisi', cover: '/kapaklar/men-in-black-3.jpg' },
    { title: 'Yüzük Kardeşliği', type: 'Film', year: 2001, group: 'Yüzüklerin Efendisi serisi', cover: '/kapaklar/lotr-1.jpg' },
    { title: 'İki Kule', type: 'Film', year: 2002, group: 'Yüzüklerin Efendisi serisi', cover: '/kapaklar/lotr-2.jpg' },
    { title: 'Kralın Dönüşü', type: 'Film', year: 2003, group: 'Yüzüklerin Efendisi serisi', cover: '/kapaklar/lotr-3.jpg' },
    { title: 'Suicide Squad', type: 'Film', year: 2016, group: 'Suicide Squad serisi', cover: '/kapaklar/suicide-squad.jpg', note: 'Türkçe adı: Gerçek Kötüler' },
    { title: 'The Suicide Squad', type: 'Film', year: 2021, group: 'Suicide Squad serisi', cover: '/kapaklar/the-suicide-squad.jpg', note: 'Türkçe adı: İntihar Timi' },
    { title: 'Alacakaranlık', type: 'Film', year: 2008, group: 'Alacakaranlık serisi', cover: '/kapaklar/twilight-1.jpg' },
    { title: 'Yeni Ay', type: 'Film', year: 2009, group: 'Alacakaranlık serisi', cover: '/kapaklar/twilight-2.jpg' },
    { title: 'Tutulma', type: 'Film', year: 2010, group: 'Alacakaranlık serisi', cover: '/kapaklar/twilight-3.jpg' },
    { title: 'Şafak Vakti: Bölüm 1', type: 'Film', year: 2011, group: 'Alacakaranlık serisi', cover: '/kapaklar/twilight-4.jpg' },
    { title: 'Şafak Vakti: Bölüm 2', type: 'Film', year: 2012, group: 'Alacakaranlık serisi', cover: '/kapaklar/twilight-5.jpg' },
    // Hollywood: tek filmler (devam)
    { title: 'Kuzuların Sessizliği', type: 'Film', year: 1991, cover: '/kapaklar/silence-of-the-lambs.jpg', note: 'Özgün adı: The Silence of the Lambs' },
    { title: 'Benjamin Button', type: 'Film', year: 2008, cover: '/kapaklar/benjamin-button.jpg', note: 'Özgün adı: The Curious Case of Benjamin Button' },
    { title: 'Senden Önce Ben', type: 'Film', year: 2016, cover: '/kapaklar/me-before-you.jpg', note: 'Özgün adı: Me Before You' },

    // Bollywood
    { title: '3 Idiots', type: 'Film', year: 2009, category: 'Bollywood', cover: '/kapaklar/3-idiots.jpg' },
    { title: 'PK', type: 'Film', year: 2014, category: 'Bollywood', cover: '/kapaklar/pk.jpg' },
    { title: 'Dangal', type: 'Film', year: 2016, category: 'Bollywood', cover: '/kapaklar/dangal.jpg' },
    { title: 'Taare Zameen Par', type: 'Film', year: 2007, category: 'Bollywood', cover: '/kapaklar/taare-zameen-par.jpg' },
    { title: 'Secret Superstar', type: 'Film', year: 2017, category: 'Bollywood', cover: '/kapaklar/secret-superstar.jpg' },
    { title: 'Ghajini', type: 'Film', year: 2008, category: 'Bollywood', cover: '/kapaklar/ghajini.jpg' },
    { title: 'Dhoom 3', type: 'Film', year: 2013, category: 'Bollywood', cover: '/kapaklar/dhoom-3.jpg' },
    { title: 'Crew', type: 'Film', year: 2024, category: 'Bollywood', cover: '/kapaklar/crew.jpg', note: 'Türkçe adı: Ekip' },
  ]
}

// Kitaplar + diziler + filmler tek listede (Raf sayfası ve ana sayfa için).
// Kitaplar Nuxt Content'ten okunduğu için async; useAsyncData ile sunucuda bir kez çekilir.
export async function useFullShelf() {
  const { data: books } = await useAsyncData('raf-kitaplar', () =>
    queryCollection('kitaplar').select('title', 'author', 'cover', 'rating', 'note', 'path', 'order').order('order', 'ASC').all(),
  )
  return computed<ShelfItem[]>(() => [
    ...(books.value ?? []).map((b) => ({
      title: b.title,
      type: 'Kitap' as const,
      creator: b.author,
      cover: b.cover,
      rating: b.rating,
      note: b.note,
      to: b.path,
    })),
    ...useShelf(),
  ])
}

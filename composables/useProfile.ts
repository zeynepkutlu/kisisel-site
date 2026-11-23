// Kişisel bilgiler tek yerde: isim, kısa tanıtım, ilgi alanları, sertifikalar, sosyal linkler.
// Header, footer, ana sayfa ve Hakkımda sayfası buradan okur.
// İçeriği değiştirmek için çoğu zaman sadece bu dosyayı düzenlemen yeterli.

export interface Certificate {
  title: string
  provider: 'BTK Akademi' | 'Udemy' | string // kursu veren platform
  group: 'Teknik' | 'Diğer' // Hakkımda sayfasında hangi grupta görüneceği
  date: string // bitirme tarihi, YYYY-AA-GG (sıralama buna göre)
  hours?: number // kursun toplam süresi (saat)
  instructor?: string
  link?: string // sertifikanın doğrulama adresi (varsa)
  certNo?: string // sertifika numarası (BTK'da link bundan üretilir)
}

// Sertifikalar. Yeni bir tane eklemek için listeye bir blok ekle; sıralama otomatik (en yeni üstte).
// Udemy linki: sertifikadaki "UC-..." numarası → https://ude.my/UC-...
// BTK Akademi: sadece certNo yazman yeterli, link otomatik üretilir (aşağıda useProfile içinde).
const certificates: Certificate[] = [
  // --- Teknik ---
  {
    title: 'The Complete Node.js Developer Course (3rd Edition)',
    provider: 'Udemy',
    group: 'Teknik',
    date: '2026-10-13',
    hours: 35,
    instructor: 'Andrew Mead, Rob Percival',
    link: 'https://ude.my/UC-69c0ca8d-86dc-4600-9e0d-61f9678ca30a',
  },
  {
    title: 'Build Web Apps with Vue JS 3 & Firebase',
    provider: 'Udemy',
    group: 'Teknik',
    date: '2026-10-18',
    hours: 31.5,
    instructor: 'The Net Ninja (Shaun Pelling)',
    link: 'https://ude.my/UC-fd506a7d-7240-4ecd-a62b-1cdc981fb433',
  },
  {
    title: 'Power BI and Tableau for Data Visualization',
    provider: 'Udemy',
    group: 'Teknik',
    date: '2026-10-19',
    hours: 17.5,
    instructor: 'Start-Tech Academy',
    link: 'https://ude.my/UC-142e194b-ae20-44f7-82c1-23a437993add',
  },
  {
    title: 'Taming Big Data with Apache Spark 4 and Python',
    provider: 'Udemy',
    group: 'Teknik',
    date: '2026-10-15',
    hours: 9,
    instructor: 'Frank Kane, Sundog Education',
    link: 'https://ude.my/UC-a7f559f4-d5f4-493a-b959-28a98d9b6e32',
  },
  {
    title: 'Nuxt.js 4: Building Modern Full-Stack Web Applications',
    provider: 'Udemy',
    group: 'Teknik',
    date: '2026-10-19',
    hours: 5,
    instructor: 'Can Boz',
    link: 'https://ude.my/UC-16ab503d-179b-4420-86fe-72aeca585c98',
  },
  {
    title: 'English for IT Professionals',
    provider: 'Udemy',
    group: 'Teknik',
    date: '2026-10-19',
    hours: 3.5,
    instructor: 'Olga Tomilova, Lilly Balaban',
    link: 'https://ude.my/UC-424fa3b3-9e3b-4309-b559-7a98b67e3a6e',
  },
  {
    title: 'Node.js ile Web Programlama',
    provider: 'BTK Akademi',
    group: 'Teknik',
    date: '2026-09-24',
    certNo: 'L8dcND7rB2',
  },
  {
    title: 'Javascript Temelleri',
    provider: 'BTK Akademi',
    group: 'Teknik',
    date: '2026-09-15',
    certNo: 'ax1hrL4X6Z',
  },
  {
    title: 'HTML5 ile Web Geliştirme',
    provider: 'BTK Akademi',
    group: 'Teknik',
    date: '2026-09-07',
    certNo: '0Koh8ebKjq',
  },

  // --- Diğer ---
  {
    title: 'Hotel Management for Beginners',
    provider: 'Udemy',
    group: 'Diğer',
    date: '2026-10-19',
    hours: 3.5,
    instructor: 'Jeroen Offergelt',
    link: 'https://ude.my/UC-27fc08fe-0553-403e-891f-dcd4c3ea54e1',
  },
  {
    title: 'Effective Leadership: A Practical Guide',
    provider: 'Udemy',
    group: 'Diğer',
    date: '2026-10-13',
    hours: 3,
    instructor: 'Soufiane El Alaoui',
    link: 'https://ude.my/UC-d0dcb81a-798b-4b33-81e7-8aaffced97a2',
  },
  {
    title: 'Diploma in Hotel Management: Complete Hospitality & Service',
    provider: 'Udemy',
    group: 'Diğer',
    date: '2026-10-11',
    hours: 1.5,
    instructor: 'Training Excellence',
    link: 'https://ude.my/UC-c533bdfc-9fa7-4c3f-b441-ef9f49648436',
  },
]

export function useProfile() {
  return {
    name: 'Zeynep Kutlu',
    firstName: 'Zeynep', // kısa kullanım için (ör. "Merhaba, ben Zeynep")
    birthYear: 2000,
    hometown: 'Şanlıurfa',
    education: {
      school: 'Girne Üniversitesi',
      department: 'Bilgisayar Programcılığı',
      year: '2. sınıf',
    },
    // Ana sayfadaki büyük başlığın altındaki cümle
    tagline:
      "Bilgisayar Programcılığı öğrencisiyim. En çok SQL'i seviyorum; web uygulamaları geliştiriyor, öğrendiklerimi burada paylaşıyorum.",
    // Ana sayfadaki "Şu an" kutusu. Boş bırakılan satır görünmez.
    // "Son bitirdiğim kurs" satırı sertifikalardan otomatik gelir, buraya yazmaya gerek yok.
    now: {
      learning: 'Nuxt.js, bu siteyi yaparak',
      reading: '', // ör. 'Kitabın adı, Yazarı'
      watching: 'Matlock', // ör. 'Dizinin adı'
    },
    // Footer'daki kısa açıklama
    footerNote: 'Öğrendiklerimi, yaptıklarımı ve merak ettiklerimi paylaştığım kişisel alanım.',
    // Ana sayfadaki "İlgi alanları" bulutu
    interests: [
      'SQL', 'Veritabanları', 'Web geliştirme', 'Backend', 'Vue', 'Node.js',
      'Veri görselleştirme', 'Büyük veri', 'Online kurslar', 'Kitaplar', 'Diziler', 'Filmler',
    ],
    // Sertifikalar: en yeni en üstte; aynı gün bitenler arasında uzun kurs önce.
    // map: BTK sertifikalarında link yoksa, sertifika numarasından doğrulama linkini üret.
    // localeCompare: '2026-10-19' gibi tarih metinlerini karşılaştırır (bu biçimde alfabetik = kronolojik).
    certificates: certificates
      .map((c) =>
        !c.link && c.certNo && c.provider === 'BTK Akademi'
          ? { ...c, link: `https://www.btkakademi.gov.tr/portal/c/${c.certNo}` }
          : c,
      )
      .sort((a, b) => b.date.localeCompare(a.date) || (b.hours ?? 0) - (a.hours ?? 0)),
    // Hakkımda sayfasındaki yetenekler (ilk sıradakiler en çok öne çıkanlar)
    skills: [
      'SQL', 'MySQL', 'Supabase', 'Firebase', 'Node.js', 'Express.js',
      'JavaScript', 'Vue.js', 'Nuxt', 'TypeScript', 'HTML', 'CSS', 'Power BI', 'Tableau',
    ],
    // Sosyal linkler. href boş bırakılırsa link footer'da görünmez; adresi yazınca kendiliğinden gelir.
    socials: [
      { title: 'GitHub', icon: '$github', href: 'https://github.com/zeynepkutlu' },
      { title: 'LinkedIn', icon: '$linkedin', href: 'https://www.linkedin.com/in/zeynep-k-3b5b352ab' },
      { title: 'Instagram', icon: '$instagram', href: '' },
    ],
  }
}

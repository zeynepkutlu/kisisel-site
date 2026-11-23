// Proje verileri. Nuxt, composables/ klasöründeki fonksiyonları otomatik import eder,
// yani sayfalarda import yazmadan useProjects() diyebilirsin.

export interface Project {
  title: string
  description: string
  kind: string // projenin türü: "Staj projesi", "Kişisel proje" gibi
  tags: string[] // kullanılan teknolojiler
  icon: string // Material Design ikon adı: https://pictogrammers.com/library/mdi/
  link?: string // ? = opsiyonel alan (yayındaysa adresi)
  repo?: string // kaynak kodun adresi (GitHub)
  live?: boolean // yayında mı? Kartta "Yayında" işareti çıkar
}

// Staj projelerinin hepsinde aynı teknolojiler kullanıldı; tekrar yazmamak için tek yerde tutuyoruz
const STAJ_STACK = ['Node.js', 'Express.js', 'MySQL', 'JavaScript', 'HTML', 'CSS']

export function useProjects(): Project[] {
  return [
    {
      title: 'CRM Uygulaması',
      description:
        'Kendi başıma geliştirip yayına aldığım müşteri ilişkileri yönetimi (CRM) uygulaması. Müşterileri filtreleyip onlarla ilgili bilgileri tek yerde tutmayı sağlıyor.',
      kind: 'Kişisel proje',
      tags: ['Vue.js', 'Node.js', 'Supabase'],
      icon: '$account-group-outline',
      live: true,
      link: 'https://vip-crm-fawn.vercel.app/',
      // Depo şimdilik gizli (private). Herkese açık yapılınca alttaki satırın başındaki // işaretini kaldır:
      // repo: 'https://github.com/zeynepkutlu/vip-crm',
    },
    {
      title: 'Kişisel Web Sitesi',
      description:
        'Şu an gezdiğin site. Nuxt öğrenirken, yapay zekâ desteğiyle geliştirdim; tasarım kararları ve içerik bana ait.',
      kind: 'Kişisel proje',
      tags: ['Nuxt 3', 'Vuetify', 'TypeScript', 'Nuxt Content'],
      icon: '$web',
      live: true,
      link: '/', // sitenin kendisi; adres (domain) değişse de bozulmaz
      repo: 'https://github.com/zeynepkutlu/kisisel-site',
    },
    {
      title: 'Kütüphane Otomasyonu',
      description: 'Staj döneminde danışmanımla birlikte geliştirdiğim kütüphane otomasyon sistemi.',
      kind: 'Staj projesi',
      tags: STAJ_STACK,
      icon: '$bookshelf',
    },
    {
      title: 'Blog Sitesi',
      description: 'Staj döneminde geliştirdiğim blog sitesi.',
      kind: 'Staj projesi',
      tags: STAJ_STACK,
      icon: '$post-outline',
    },
    {
      title: 'Görev Takip Uygulaması',
      description: 'Staj döneminde geliştirdiğim görev takip uygulaması.',
      kind: 'Staj projesi',
      tags: STAJ_STACK,
      icon: '$format-list-checks',
    },
  ]
}

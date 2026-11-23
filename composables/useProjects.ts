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
      icon: 'mdi-account-group-outline',
      live: true,
      link: 'https://vip-crm-fawn.vercel.app/',
      // Depo şimdilik gizli (private). Herkese açık yapılınca alttaki satırın başındaki // işaretini kaldır:
      // repo: 'https://github.com/zeynepkutlu/vip-crm',
    },
    {
      title: 'Kişisel Web Sitesi',
      description: 'Şu an gezdiğin site. Tasarımından içeriğine kadar kendim hazırladım.',
      kind: 'Kişisel proje',
      tags: ['Nuxt 3', 'Vuetify', 'TypeScript', 'Nuxt Content'],
      icon: 'mdi-web',
      live: true,
      link: '/', // sitenin kendisi; adres (domain) değişse de bozulmaz
      repo: 'https://github.com/zeynepkutlu/kisisel-site',
    },
    {
      title: 'Kütüphane Otomasyonu',
      description: 'Staj döneminde danışmanımla birlikte geliştirdiğim kütüphane otomasyon sistemi.',
      kind: 'Staj projesi',
      tags: STAJ_STACK,
      icon: 'mdi-bookshelf',
    },
    {
      title: 'Blog Sitesi',
      description: 'Staj döneminde geliştirdiğim blog sitesi.',
      kind: 'Staj projesi',
      tags: STAJ_STACK,
      icon: 'mdi-post-outline',
    },
    {
      title: 'Görev Takip Uygulaması',
      description: 'Staj döneminde geliştirdiğim görev takip uygulaması.',
      kind: 'Staj projesi',
      tags: STAJ_STACK,
      icon: 'mdi-format-list-checks',
    },
  ]
}

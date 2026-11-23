// Blog kategorileri: her birinin adı, ikonu ve kısa açıklaması.
// Blog sayfasında "alan" kartları olarak görünürler; yazı yoksa "yakında" yazar.
// Bir yazının kategorisini, md dosyasının başındaki "category:" satırına buradaki adı aynen yazarak seçersin.

export interface BlogCategory {
  name: string
  icon: string
  description: string
  template: string // bu tür yazı için hazır şablon dosyası (sablonlar/ klasöründe)
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    name: 'Öğrenme günlüğü',
    icon: 'mdi-notebook-edit-outline',
    description: 'Kod yazarken öğrendiğim şeyler, takıldığım yerler ve nasıl çözdüğüm.',
    template: 'sablonlar/ogrenme-gunlugu.md',
  },
  {
    name: 'Ekrandan öğrendiklerim',
    icon: 'mdi-movie-open-outline',
    description: 'İzlediğim dizi ve filmlerin bana düşündürdükleri, aklımda kalan sahneler ve dersler.',
    template: 'sablonlar/ekrandan-ogrendiklerim.md',
  },
  {
    name: 'YouTube notlarım',
    icon: 'mdi-youtube',
    description: 'İzlediğim videoları kendi bakış açımla yorumladığım notlar; video yazının içinde.',
    template: 'sablonlar/youtube-notum.md',
  },
  {
    name: 'Tasarım',
    icon: 'mdi-palette-outline',
    description: 'Arayüz, renk ve tipografi üzerine denemelerim.',
    template: 'sablonlar/ogrenme-gunlugu.md',
  },
]

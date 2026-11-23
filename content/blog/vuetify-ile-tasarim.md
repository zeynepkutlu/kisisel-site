---
title: Vuetify ile hızlı tasarım
description: Vuetify'ı neden sevdim? Kolay öğrenilen ve CSS işini hızlandıran bir bileşen kütüphanesi.
date: 2026-11-20
category: Tasarım
---

Vuetify'ı çok sevdim. Öğrenmesi benim için kolay oldu; normalde uzun uzun CSS yazacağım kısımları onunla hızlıca hazırlayabiliyorum.

## Vuetify nedir?

Vuetify, Vue için hazırlanmış bir bileşen kütüphanesi. Buton, kart, form ve menü gibi parçalar Material Design kurallarına göre hazır geliyor. Her birini baştan tasarlamak yerine ihtiyacım olanı seçip özelliklerini yazıyorum:

```html
<v-btn color="primary" size="large">Projelerime bak</v-btn>
```

Bu tek satır; rengi, boyutu, üzerine gelince değişen görünümü ve tıklama efektiyle birlikte geliyor.

## CSS yazmadan düzen kurmak

En çok işe yarayan kısımlardan biri hazır sınıflar. Boşluk, hizalama ve görünürlük için ayrı bir CSS dosyası açmam gerekmiyor:

- `pa-6` iç boşluk, `mb-4` alt boşluk verir.
- `d-flex` ve `align-center` öğeleri yan yana ve ortalı dizer.
- `d-none d-md-flex` bir öğeyi telefonda gizler, geniş ekranda gösterir.

Bu sitenin menüsü de böyle çalışıyor: geniş ekranda linkler, telefonda hamburger menü görünüyor.

## Grid ile her ekrana uyum

`v-row` ve `v-col` sayfayı 12 sütuna bölüyor. Projeler sayfasındaki kartlar şöyle yerleşiyor:

```html
<v-col cols="12" sm="6" md="4">...</v-col>
```

Telefonda bir, tablette iki, bilgisayarda üç kart yan yana geliyor. Bunun için ayrıca `@media` kuralı yazmaya gerek kalmıyor.

## Renkleri tek yerden değiştirmek

Bu siteyi yaparken renklerden birkaç kez vazgeçtim: önce kehribar, sonra mor, en sonunda bordo, koyu yeşil ve bej. Renkler tema ayarında durduğu için her seferinde yalnızca o dosyadaki değerleri değiştirmek sitenin büyük kısmını güncelledi:

```ts
colors: {
  background: '#F3ECDF', // bej
  primary: '#7B1E2C', // bordo
  secondary: '#2E4A3B', // koyu yeşil
}
```

Açık ve koyu tema da aynı yerde tanımlanıyor.

## Kısacası

Vuetify, CSS ile uğraşacağım zamanı sitenin kendisine ayırmamı sağlıyor. Yine de CSS bilmek işe yarıyor: kendine özgü bir görünüm isteyince üstüne kendi dokunuşunu eklemek gerekiyor.

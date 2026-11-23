---
title: Nuxt öğrenmeye başladım
description: Nuxt öğrenirken en çok zorlandığım iki konu; routing ve API'den veri çekme.
date: 2026-11-23
category: Öğrenme günlüğü
---

Nuxt öğrenirken en çok **routing** ve **API'den veri çekme** konularında zorlanıyorum. Sayfa yapısını ve verinin ne zaman, nerede yüklendiğini anlamak başlangıçta kafa karıştırabiliyor.

## Routing: dosya adı adres oluyor

Nuxt'ta adresleri ayrı bir ayar dosyasına yazmak yerine `pages/` klasörüne dosya ekliyoruz. Bu sitedeki karşılıkları şöyle:

- `pages/index.vue` → `/`
- `pages/about.vue` → `/about`
- `pages/blog/index.vue` → `/blog`
- `pages/blog/[slug].vue` → `/blog/nuxt-ogreniyorum`

Köşeli parantez, adresin o kısmının değişken olduğunu söylüyor. Değeri sayfanın içinde `useRoute()` ile okunuyor:

```ts
const route = useRoute()
console.log(route.params.slug) // "nuxt-ogreniyorum"
```

## Veri çekme: ne zaman ve nerede?

Nuxt sayfayı önce sunucuda hazırlayıp tarayıcıya gönderiyor, sonra aynı kod tarayıcıda da çalışıyor. Veriyi doğrudan `$fetch` ile çekersek aynı istek iki kez yapılabiliyor: bir kez sunucuda, bir kez tarayıcıda.

`useFetch` bunu çözüyor. Veriyi sunucuda çekip sayfayla birlikte gönderiyor, tarayıcı da hazır olanı kullanıyor:

```ts
const { data, error } = await useFetch('/api/gorevler')
```

- **Sayfa açılırken gereken veri:** `useFetch` ya da `useAsyncData`
- **Kullanıcının bir işlemiyle giden istek** (ör. form gönderme): `$fetch`

Bu sitede iki yol da var: yazılar `useAsyncData` ile geliyor, iletişim formu mesajı `$fetch` ile gönderiyor.

## Güzel tarafı

Bu iki konuyu çözdükten sonra Nuxt'un büyük kısmı çok daha kolay geliyor. 🚀

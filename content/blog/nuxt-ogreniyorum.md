---
title: Nuxt öğrenmeye başladım
description: Nuxt 3 ile ilk projemi kurarken öğrendiklerim.
date: 2026-11-23
category: Öğrenme günlüğü
---

Nuxt, Vue üzerine kurulu bir framework. Bu yazıda ilk projemi kurarken öğrendiklerimi topladım.

## Dosya tabanlı yönlendirme

`pages/` klasörüne eklediğim her dosya otomatik olarak bir sayfa oluyor:

- `pages/index.vue` → `/`
- `pages/about.vue` → `/about`
- `pages/blog/[slug].vue` → `/blog/herhangi-bir-sey`

## Otomatik import

`components/` ve `composables/` klasöründeki dosyaları `import` yazmadan kullanabiliyorum.

> Bu yazıyı kendi deneyimlerinle değiştirebilirsin.

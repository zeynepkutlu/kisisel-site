---
title: REST API
description: Uygulamaların HTTP üzerinden veri alışverişi yapması için yaygın bir tasarım biçimi.
summary: "API, iki yazılımın birbiriyle konuşmasını sağlayan kurallardır; REST ise web API'lerini tasarlamanın yaygın bir yoludur. Her kaynağın bir adresi olur ve ne yapılacağını HTTP metodu söyler: GET okur, POST ekler, PUT ya da PATCH günceller, DELETE siler. Ön yüz bu adreslere istek gönderir, arka yüz cevabı genellikle JSON olarak döner. Böylece aynı API'yi hem web sitesi hem mobil uygulama kullanabilir."
category: Backend
related: [crud, express-js]
---

API (Application Programming Interface), iki yazılımın birbiriyle konuşmasını sağlayan kurallar bütünüdür. **REST** ise web API'leri tasarlamanın yaygın bir yoludur: her kaynağın bir adresi vardır ve HTTP metotlarıyla üzerinde işlem yapılır.

```
GET    /api/gorevler      → tüm görevleri getir
GET    /api/gorevler/5    → 5 numaralı görevi getir
POST   /api/gorevler      → yeni görev ekle
DELETE /api/gorevler/5    → 5 numaralı görevi sil
```

Ön yüz (ör. Vue.js) bu adreslere istek atar, arka yüz (ör. Express.js) veritabanıyla konuşup cevabı genellikle JSON olarak döner.

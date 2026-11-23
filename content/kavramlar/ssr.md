---
title: SSR
description: Sayfanın HTML'inin tarayıcıda değil sunucuda hazırlanması.
summary: "SSR (Server-Side Rendering), sayfanın HTML'inin tarayıcıda değil sunucuda hazırlanmasıdır. Ziyaretçi, JavaScript'in yüklenmesini beklemeden içeriği görür. Arama motorları da sayfanın içeriğini doğrudan okuyabildiği için SEO açısından avantajlıdır. Sayfa açıldıktan sonra Vue devreye girip butonları ve formları çalışır hale getirir; buna hydration denir."
category: Web
related: [rest-api]
---

SSR (Server-Side Rendering), sayfanın HTML'inin sunucuda üretilip tarayıcıya hazır gönderilmesidir. Bu siteyi yaptığım Nuxt varsayılan olarak SSR kullanır.

## Neden önemli?

- **Hız:** kullanıcı içeriği JavaScript yüklenmeden görür.
- **SEO:** arama motorları sayfanın içeriğini doğrudan okuyabilir.

Bu sitede tema tercihinin `localStorage` yerine cookie'de tutulmasının sebebi de SSR: sunucu cookie'yi okuyabildiği için sayfa ilk açılışta doğru temayla gelir.

---
title: Veritabanı
description: Verilerin düzenli, kalıcı ve sorgulanabilir şekilde saklandığı yer.
category: Veritabanı
related: [sql, primary-key, crud]
---

Veritabanı, verileri düzenli bir yapıda saklayan ve onlara hızlıca ulaşmamızı sağlayan sistemdir. Bir uygulama kapansa bile veriler veritabanında kalır.

## İlişkisel veritabanları

En yaygın tür **ilişkisel** veritabanlarıdır: veriler satır ve sütunlardan oluşan **tablolarda** tutulur, tablolar birbirine anahtarlarla bağlanır. MySQL, PostgreSQL ve SQLite bu türdendir. Supabase de arka planda PostgreSQL kullanır.

## Örnek

Bir CRM uygulamasında `musteriler` tablosu şöyle olabilir:

| id | ad | sehir |
|----|----|-------|
| 1 | Ayşe | Girne |
| 2 | Mehmet | Lefkoşa |

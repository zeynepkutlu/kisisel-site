---
title: SQL
description: İlişkisel veritabanlarıyla konuşmak için kullanılan sorgu dili.
category: Veritabanı
related: [veritabani, join, crud]
---

SQL (Structured Query Language), ilişkisel veritabanlarındaki verileri okumak, eklemek, güncellemek ve silmek için kullanılan dildir. MySQL, PostgreSQL ve SQLite gibi sistemlerin hepsi SQL konuşur.

## Örnek

Girne'deki müşterileri ada göre sıralı getirmek:

```sql
SELECT ad, sehir
FROM musteriler
WHERE sehir = 'Girne'
ORDER BY ad;
```

SQL'in güzel yanı **ne istediğini** söylemen yeterli olması; verinin **nasıl** bulunacağını veritabanı kendisi çözer.

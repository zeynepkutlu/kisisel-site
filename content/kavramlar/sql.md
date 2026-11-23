---
title: SQL
description: İlişkisel veritabanlarıyla konuşmak için kullanılan sorgu dili.
summary: "SQL, ilişkisel veritabanlarıyla konuşmak için kullanılan sorgu dilidir. Veri okumak için SELECT, eklemek için INSERT, güncellemek için UPDATE, silmek için DELETE kullanılır. En güzel yanı, verinin nasıl bulunacağını değil sadece ne istediğimizi yazmamızdır; en uygun yolu veritabanı kendisi seçer. MySQL, PostgreSQL ve SQLite küçük farklarla aynı dili konuşur."
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

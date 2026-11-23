---
title: JOIN
description: İki ya da daha fazla tabloyu ortak bir sütun üzerinden birleştiren SQL işlemi.
category: Veritabanı
related: [sql, primary-key]
---

JOIN, farklı tablolardaki ilişkili satırları tek bir sonuçta birleştirir. Örneğin her görevin hangi kullanıcıya ait olduğunu görmek için `gorevler` ve `kullanicilar` tablolarını birleştirebiliriz:

```sql
SELECT g.baslik, k.ad
FROM gorevler g
INNER JOIN kullanicilar k ON g.kullanici_id = k.id;
```

## Türleri

- **INNER JOIN:** sadece iki tabloda da eşleşen satırlar.
- **LEFT JOIN:** soldaki tablonun tüm satırları; sağda eşleşme yoksa boş (NULL) gelir.
- **RIGHT JOIN:** LEFT JOIN'in tersi.

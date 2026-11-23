---
title: Primary Key
description: Bir tablodaki her satırı benzersiz şekilde tanımlayan sütun.
summary: "Primary key (birincil anahtar), tablodaki her satırı benzersiz şekilde tanımlayan sütundur. Aynı değer iki satırda bulunamaz ve boş bırakılamaz; çoğunlukla otomatik artan bir id kullanılır. Aynı adda iki müşteri olsa bile id sayesinde karışmazlar. Başka bir tablo bu değeri foreign key olarak tutunca iki tablo birbirine bağlanır."
category: Veritabanı
related: [veritabani, join]
---

Primary key (birincil anahtar), tablodaki her satırı **benzersiz** şekilde tanımlar. İki satırın primary key değeri aynı olamaz ve boş bırakılamaz.

Genellikle otomatik artan bir `id` sütunu kullanılır:

```sql
CREATE TABLE musteriler (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ad VARCHAR(100) NOT NULL,
  sehir VARCHAR(50)
);
```

Başka bir tablo bu `id`'yi **foreign key** (yabancı anahtar) olarak tutarak iki tabloyu birbirine bağlar.

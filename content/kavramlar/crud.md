---
title: CRUD
description: Verilerle yapılan dört temel işlem; oluşturma, okuma, güncelleme, silme.
summary: "CRUD, verilerle yapılan dört temel işlemin baş harfleridir: Create (oluşturma), Read (okuma), Update (güncelleme) ve Delete (silme). Neredeyse her uygulamanın temelinde bu dört işlem bulunur. Bir görev takip uygulamasında görev eklemek, listelemek, düzenlemek ve silmek tam olarak budur. Hem SQL komutlarında hem HTTP metotlarında karşılıkları vardır."
category: Backend
related: [sql, rest-api]
---

CRUD, neredeyse her uygulamanın temelindeki dört işlemin baş harfleridir:

| İşlem | Anlamı | SQL | HTTP |
|---|---|---|---|
| **C**reate | Oluştur | `INSERT` | `POST` |
| **R**ead | Oku | `SELECT` | `GET` |
| **U**pdate | Güncelle | `UPDATE` | `PUT` / `PATCH` |
| **D**elete | Sil | `DELETE` | `DELETE` |

Kütüphane otomasyonunda kitap eklemek, listelemek, bilgilerini düzenlemek ve silmek; görev takip uygulamasında görevlerle yapılan işlemler hep CRUD'dur.

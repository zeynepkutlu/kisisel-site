---
title: Express.js
description: Node.js ile web sunucusu ve API yazmayı kolaylaştıran minimal çatı.
category: Backend
related: [rest-api, crud]
---

Express.js, Node.js üzerinde çalışan, hafif ve esnek bir web çatısıdır (framework). Adresleri (route) tanımlamayı, gelen istekleri okumayı ve cevap dönmeyi çok kısa kodlarla yapmamızı sağlar.

```js
const express = require('express')
const app = express()

app.get('/api/merhaba', (req, res) => {
  res.json({ mesaj: 'Merhaba!' })
})

app.listen(3000)
```

Veritabanı olarak MySQL kullanıldığında, route içinde SQL sorgusu çalıştırılıp sonucu JSON olarak döndürmek tipik bir kullanımdır.

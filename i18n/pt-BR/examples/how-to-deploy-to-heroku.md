---
title: Como fazer deploy de uma aplicação Nullstack no Heroku
description: Você pode hospedar um aplicativo Nullstack em qualquer lugar. Faça deploy no Vercel, Heroku, AWS, Azure, GitHub Pages ou em qualquer outro lugar.
---

Use o Buildpack `heroku/nodejs`.

Crie um `Procfile` na raiz da sua aplicação com:

```
web: node .production/server.js
```
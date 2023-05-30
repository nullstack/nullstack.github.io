---
title: Como fazer deploy de uma aplicação Nullstack no Vercel
description: Você pode hospedar um aplicativo Nullstack em qualquer lugar. Faça deploy no Vercel, Heroku, AWS, Azure, GitHub Pages ou em qualquer outro lugar.
---

Crie `api/nullstack.js` para exportar o servidor de aplicativos em produção.

```js
import application from '../.production/server'

export default application.server;
```
Adicione `vercel.json` na raiz do projeto para redirecionar todas as requests para o Nullstack:

```json
{
  "version": 2,
  "functions": {
    "api/nullstack.js": {
      "includeFiles": ".production/**"
    }
  },
  "routes": [
    {
      "handle": "filesystem"
    },
    {
      "src": "(.*)",
      "dest": "api/nullstack.js"
    }
  ]
}
```
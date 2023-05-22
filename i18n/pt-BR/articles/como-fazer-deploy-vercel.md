---
title: Como fazer deploy de uma aplicação Nullstack no Vercel
description: Você pode colocar uma aplicação Nullstack em qualquer lugar. Faça deploy da sua applicação no Vercel, Heroku, AWS, Azure, GitHub pages, ou em qualquer outro lugar.
---

Crie o arquivo `api/nullstack.js` para exportar o servidor de produção.

```js
import application from '../.production/server'

export default application.server;
```

Adicione a seguinte configuração no `vercel.json` na raiz da sua aplicação para redirecionar todos requests do nullstack:

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
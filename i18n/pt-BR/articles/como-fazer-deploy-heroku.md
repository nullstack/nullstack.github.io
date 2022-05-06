---
title: Como fazer deploy de uma aplicação Nullstack no Heroku
description: Você pode colocar uma aplicação Nullstack em qualquer lugar. Faça deploy da sua applicação no Vercel, Heroku, AWS, Azure, GitHub pages, ou em qualquer outro lugar.
---

Use o Buildpack `heroku/nodejs`.

Crie um arquivo `Procfile` na raíz da aplicação com o seguinte:

```
web: node .production/server.js
```

## Próximo Passo

> 🎉 **Parabéns**. Você concluiu a documentação!

⚔ Se você deseja ver mais exemplos aqui, [abra uma issue no github](https://github.com/nullstack/nullstack/issues).
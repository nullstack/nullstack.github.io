---
title: Como fazer Deploy
description: Com o Nullstack é fácil ter sua aplicação instalada e funcionando no modo de produção
---

Com o Nullstack é fácil ter sua aplicação instalada e funcionando no modo de produção

> 🐱‍💻 **stonks**

Nullstack compila seu código e todas as suas dependências usando [Webpack](https://webpack.js.org).

A saída da compilação é movida para a pasta **.production** e é a única pasta além de **public** que precisa ser movida para a máquina host.

Se você tiver `project.cdn` definido, deverá mover a pasta **public** para o cdn real.

> 💡 É importante que a pasta **.production** esteja presente para a detecção do ambiente

A máquina host deve ter pelo menos a versão 8.10.0 do node instalada.

Você não precisa executar "npm install" na máquina host.

> ✨ Você pode configurar o ambiente usando [`settings`](/pt-br/contexto-settings) e [`secrets`](/pt-br/contexto-secrets)

Para iniciar o servidor, basta executar:

```sh
node .production/server.js
```

> ✨ Recomenda-se o uso de um gerenciador de processos como [PM2](https://pm2.keymetrics.io)

## Como fazer o Deploy de um site estático gerado com NullStack

Depois de [gerar um site estático](/pt-br/geracao-de-sites-estaticos), tudo o que você precisa fazer é mover a pasta de saída para qualquer máquina host capaz de servir HTML.

## Próxima Etapa

⚔ Aprenda [Como fazer o deploy de uma aplicação Nullstack no Vercel](/pt-br/como-fazer-deploy-vercel).
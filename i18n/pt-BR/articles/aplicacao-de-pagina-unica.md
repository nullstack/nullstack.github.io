---
title: Aplicação de Página Única
description: Use o Nullstack para gerar single page applications que podem se conectar a qualquer API ou funções de servidor
---

Use o Nullstack para gerar single page applications que podem se conectar a qualquer API ou funções de servidor

Single page applications são úteis para ambientes que não devem usar [renderização do lado do servidor](/pt-br/renderizando-no-servidor), como os aplicativos nativos.

Você pode mover facilmente seu aplicativo de SSR para SPA alterando o comando build.

```sh
npx nullstack build --mode=spa --output=spa
```

> 🔥 Você deve estar em uma pasta do projeto Nullstack para executar este comando.
Por padrão, ele criará seu aplicativo de página única na pasta **spa** que você pode sobrescrever com a flag `--output`.

O construtor executará seu aplicativo no modo de produção e gerará um index.html vazio que está preparado para se tornar um aplicativo Nullstack apenas do cliente.

O [manifest.json](/pt-br/contexto-project) e o conteúdo da pasta pública serão copiados para a pasta de destino.

Na primeira visita ao seu aplicativo estático, o pacote JavaScript será carregado e iniciará um SPA.

Nas solicitações subsequentes, o Nullstack irá empurrar o histórico e atualizar o estado do aplicativo sem nunca recarregar a página.

## Boas práticas

Você pode adicionar um script ao seu **package.json** para gerar seu site estático em uma pasta personalizada:

```jsx
{
  "name": "nullstack.github.io",
  "scripts": {
    "start": "npx nullstack start",
    "build": "npx nullstack build --mode=spa --output=web",
  }
  
  ...
}
```

## Ressalvas

No modo SPA, tanto [`prepare`](/pt-br/ciclo-de-vida-full-stack) e [`initiate`](/pt-br/ciclo-de-vida-full-stack) sempre serão executados no cliente.
No entanto, é uma boa prática seguir os padrões de SSR para poder alterar facilmente o modo de construção.

Você pode misturar modos e solicitar outras funções de servidor apontando `worker.api` e hospedando o pacote do servidor em um ambiente node.js.
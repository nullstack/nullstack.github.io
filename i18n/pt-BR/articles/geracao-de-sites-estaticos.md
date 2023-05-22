---
title: Geração de Site Estático
description: Use Nullstack para gerar websites estáticos para aplicações estáticas ultrarrápidas usando todo o potencial de Nullstack sem a necessidade de ter um back-end de node.js
---

Use Nullstack para gerar websites estáticos para aplicações estáticas ultrarrápidas usando todo o potencial do cliente Nullstack sem a necessidade de haver um back-end de node.js.

Websites estáticos são úteis para aplicações read-only como blogs e documentação

> 💡 Esta documentação é na verdade um site estático gerado com Nullstack

Todos os benefícios de [renderização no lado do servidor](/pt-br/renderizando-no-servidor) se aplicam para websites gerados estáticamente.

Você pode gerar um website estático a partir da sua aplicação Nullstack com o seguinte comando `npx`:

```sh
npx nullstack build --mode=ssg --output=ssg
```

> 🔥 Você deve estar em uma pasta de projeto Nullstack para executar esse comando.

Por padrão, ele criará sua aplicação estática na pasta **ssg** que você pode sobrescrever com o sinalizador `--output`.

O construtor executará seu aplicativo no modo de produção e rastreará todos os atributos `href` encontrados em seu DOM.

O [manifest.json](/pt-br/contexto-project) e o conteúdo da pasta pública serão copiados para a pasta de destino.

Além de gerar raw HTML também irá gerar um arquivo JSON para cada rota com uma cópia do estado.

Na primeira visita para a sua aplicação estática, HTML será veiculado e hidratado.

Nos pedidos subsequentes, Nullstack irá buscar o JSON gerado e atualizar o estado da aplicação sem que haja a necessidade de recarregar a página.

Isso, na verdade, fornece não apenas um site gerado estático, mas uma API gerada estática com o estado calculado que alimenta a Single Page Application com custo zero.

## Boas Práticas

Você pode adicionar um script para a sua **package.json** a fim de gerar o seu website estático em uma pasta personalizada:

```jsx
{
  "name": "nullstack.github.io",
  "scripts": {
    "start": "npx nullstack start",
    "build": "npx nullstack build --mode=ssg --output=docs",
  }

  ...
}

```

## Ressalvas

Antes de gerar o HTML, o Nullstack irá esperar que [`prepare`](/ciclo-de-vida-full-stack) e [`initiate`](/ciclo-de-vida-full-stack) de todos os componentes dessa rota sejam resolvidos.

Você pode misturar modos e solicitar outras funções de servidor apontando `worker.api` e hospedando o pacote do servidor em um ambiente node.js.
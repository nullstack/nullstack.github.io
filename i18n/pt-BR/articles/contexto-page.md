---
title: Contexto Page
description: O objeto page é um proxy no Contexto Nullstack disponível em ambos client e server e te dá informações sobre as metatags da head do documento
---

- Tipo: `object`
- Origem: [Contexto Nullstack](/pt-br/contexto#----contexto-nullstack)
- Disponibilidade: server/client
- **readwrite** em ambos **server** e **client**

Ele fornece informações sobre as metatags da `head` do documento.

Chaves de `page` serão usadas para gerar as metatags durante a [renderização no lado do servidor](/pt-br/renderizando-no-servidor) e devem ser atribuídas antes do ciclo [`initiate`](/pt-br/ciclo-de-vida-full-stack) ser resolvido.

As seguintes chaves estão disponíveis no objeto:

- **title**: `string`
- **image**: `string` (URL absoluto ou relativo)
- **description**: `string`
- **canonical**: `string` (URL absoluto ou relativo)
- **locale**: `string`
- **robots**: `string`
- **schema**: `object`
- **changes**: `string`
- **priority**: `number`
- **status**: `number`

Quando a chave `title` é atribuída no lado do client, o título do documento será atualizado.

Nullstack utiliza as chaves `changes` e `priority` para gerar o **sitemap.xml**.

O mapa do site é gerado automaticamente apenas ao utilizar a [geração de site estático](/pt-br/geracao-de-sites-estaticos) e deve ser gerado manualmente em aplicativos com a [renderização no lado do servidor](/pt-br/renderizando-no-servidor).

A chave `changes` representa a chave `changefreq` no **sitemap.xml** e se for atribuída deverá ser um dos seguintes valores:

- **always**
- **hourly**
- **daily**
- **weekly**
- **monthly**
- **yearly**
- **never**

A chave `priority` é um número entre `0.0` e `1.0` que representa a chave `priority` no **sitemap.xml**.

Nullstack não define uma prioridade padrão, no entanto, sitemaps assumem uma prioridade `0.5` quando não são definidas explicitamente.

Além de `title` e `locale`, todas as outras chaves tem padrões sensíveis e gerados com base no escopo do aplicativo.

```jsx
import Nullstack from 'nullstack';

class Page extends Nullstack {

  prepare({project, page}) {
    page.title = `${project.name} - Título da página`;
    page.image = '/imagem.jpg';
    page.description = 'Meta descrição da página';
    page.canonical = 'http://absoluto.url/canonical-link';
    page.locale = 'pt-BR';
    page.robots = 'index, follow';
    page.schema = {};
    page.changes = 'weekly';
    page.priority = 1;
  }

  render({page}) {
    return (
      <div>
        <h1>{page.title}</h1>
        <p>{page.description}</p>
      </div>
    )
  }

}

export default Page;
```

## Eventos Personalizados

Atualizando `page.title` gerará um evento personalizado.

```jsx
import Nullstack from 'nullstack';

class Analytics extends Nullstack {

  hydrate({page}) {
    window.addEventListener(page.event, () => {
      console.log(page.title);
    });
  }

}

export default Analytics;
```

## Páginas de erro

Se durante o processo de [renderização no lado do servidor](/pt-br/renderizando-no-servidor) o `page.status` estiver com qualquer valor além de `200`, seu aplicativo receberá outra passagem na renderização e lhe possibilitará ajustar a interface de acordo com o status retornado.

A chave `status` será gerada na resposta HTTP.

O status da página será modificado para `500` e receberá outra passagem na renderização se a página gerar uma exceção enquanto renderiza.

O status das respostas de [funções do servidor](/pt-br/funcoes-de-servidor) será definido no `page.status`.

```jsx
import Nullstack from 'nullstack';
import ErrorPage from './ErrorPage';
import HomePage from './HomePage';

class Application extends Nullstack {

  // ...

  render({page}) {
    return (
      <main>
        {page.status !== 200 && <ErrorPage route="*" />}
        <HomePage route="/" />
      </main>
    )
  }

}

export default Application;
```

> 🔥 A atribuição à chave `status` durante o modo [aplicativo de página única](/pt-br/ciclo-de-vida-full-stack) não terá efeito.
---
title: Contexto Project
description: O objeto project é um proxy no Contexto Nullstack disponível em ambos client e server e te dá informações sobre o manifest do app e algumas metatags
---

- Tipo: `object`
- Origem: [Contexto Nullstack](/pt-br/contexto#----contexto-nullstack)
- Disponibilidade: server/client
- **readwrite** no contexto do **server**
- **readonly** no contexto do **client**

Ele te dá informações sobre o manifest do app e algumas metatags.

As chaves de `project` serão usadas para gerar metatags durante a renderização do lado do servidor e devem ser definidas antes que [`initiate`](/pt-br/ciclo-de-vida-full-stack) seja resolvido.

As chaves de `project` serão usadas para gerar o **manifest** do app e devem ser definidas durante a [inicialização da aplicação](/pt-br/inicializacao-da-aplicacao).

A chave `disallow` será usada para gerar o **robots.txt** e deverá ser definida durante a [inicialização da aplicação](/pt-br/inicializacao-da-aplicacao).

As chaves de `project` serão congeladas após a [inicialização da aplicação](/pt-br/inicializacao-da-aplicacao).

As chaves a seguir estão disponíveis no objeto:

- **domain**: `string`
- **name**: `string`
- **shortName**: `string`
- **color**: `string`
- **backgroundColor**: `string`
- **type**: `string`
- **display**: `string`
- **orientation**: `string`
- **scope**: `string`
- **root**: `string`
- **icons**: `object`
- **favicon**: `string` (url relativo ou absoluto)
- **disallow**: `array` de `string` (caminhos relativos)
- **sitemap**: `boolean` ou `string` (url relativo ou absoluto)
- **cdn**: `string` (url absoluto)
- **protocol**: `string` (http or https)

Além de `domain`, `name` and `color` todas as outras chaves tem padrões sensíveis gerados com base no escopo do aplicativo.

Se você não declarar a chave `icons`, Nullstack irá escanear quaisquer ícones com o nome seguindo o padrão "icon-[LARGURA]x[ALTURA].png" na sua pasta **public**.

Se a chave `sitemap` estiver definida como `true` o seu arquivo **robots.txt** irá apontar o sitemap para `https://${project.domain}/sitemap.xml`.

A chave `cdn` irá prefixar seu pacote de assets e ficará disponível no contexto para que você possa manualmente prefixar outros ativos.

A chave `protocol` é "http" no modo de desenvolvimento e "https" e no modo produção por predefinição.

```jsx
import Nullstack from 'nullstack';

class Application extends Nullstack {

  static async start({project}) {
    project.name = 'Nullstack';
    project.shortName = 'Nullstack';
    project.domain = 'nullstack.app';
    project.color = '#d22365';
    project.backgroundColor = '#d22365';
    project.type = 'website';
    project.display = 'standalone';
    project.orientation = 'portrait';
    project.scope = '/';
    project.root = '/';
    project.icons = {
      '72': '/icon-72x72.png',
      '128': '/icon-128x128.png',
      '512': '/icon-512x512.png'
    };
    project.favicon = '/favicon.png';
    project.disallow = ['/admin'];
    project.sitemap = true;
    project.cdn = 'cdn.nullstack.app';
    project.protocol = 'https';
  }

  prepare({project, page}) {
    page.title = project.name;
  }

}

export default Application;
```

> 💡 Você pode substituir o **manifest.json** gerado automaticamente e **robots.txt** inserindo o seu próprio arquivo na pasta **public**

## Próximo Passo

⚔ Aprenda sobre a [chave `settings` do contexto](/pt-br/contexto-settings).
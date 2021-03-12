---
title: Contexto do Projeto
description: O objeto do projeto é um proxy na parte da loja de framework do seu contexto e te dá informações sobre o manifesto do app e alguns metatags
--- 

Essa chave é *readwrite* no contexto do *server*.

Essa chave é *readonly* no contexto do *client*.

As chaves do projeto serão usadas para gerar metatags durante a renderização do lado do servidor e deve ser designado antes que [inicialize](/ciclo de vida full-stack) seja resolvido.

As chaves do projeto serão usadas para gerar o manifesto do app e devem ser definidos durante a [inicialização do aplicativo](/inicialização do aplicativo).

A chave disallow será usada para gerar o robots.txt e deverá ser definida durante a [inicialização do aplicativo](/inicialização do aplicativo).

As chaves do projeto serão congeladas após a [inicialização do aplicativo](/inicialização do aplicativo). 

As chaves a seguir estão disponíveis no objeto:

- *domain*: string
- *name*: string
- *shortName*: string
- *color*: string
- *backgroundColor*: string
- *type*: string
- *display*: string
- *orientation*: string
- *scope*: string
- *root*: string
- *icons*: object
- *favicon*: string (url relativo ou absoluto)
- *disallow*: string array (caminhos relativos)
- *sitemap*: boolean or string (url relativo ou absoluto)
- *cdn*: string (url absoluto)
- *protocol* string (http or https)

Além de *domain*, *name* and *color* todas as outras chaves tem padrões sensíveis gerados com base no escopo do aplicativo.

Se você não declarar a chave *icons*, Nullstack irá escanear quaisquer ícones com o nome seguindo o padrão "icon-[WIDTH]x[HEIGHT].png" na sua pasta pública.

Se a chave *sitemap* estiver definada como verdadeira o seu arquivo robots.txt wirá apontar o sitemap para *https://${project.domain}/sitemap.xml*.

A chave *cdn* irá prefixar seu pacote de ativos e ficará disponível no contexto para que você possa manualmente prefixar outros ativos.

A chave *protocol* é "http" no modo de desenvolvimento e "https" e no modo produção por predefinição

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

> 💡 Você pode substituir o manifest.json gerado automaticamente e robots.txt inserindo o seu próprio arquivo da pasta pública 

## Próximo passo

⚔ Aprenda sobre as [configurações de contexto](/configurações de contexto).

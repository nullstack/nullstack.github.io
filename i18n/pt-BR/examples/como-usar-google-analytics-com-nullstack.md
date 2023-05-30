---
title: Google Analytics
description: Aproveite as chaves de contexto e eventos personalizados para criar um componente que envie eventos de forma dinâmica para o GTAG.
---

De acordo com [analytics.google.com](https://analytics.google.com):

"O Google Analytics permite que você meça o retorno do investimento em publicidade, além de rastrear seus anúncios em Flash, vídeo e sites e aplicativos de redes sociais."

Aproveite as [chaves de contexto](/contexto) e [eventos personalizados](/contexto-page) para criar um componente que envie eventos de forma dinâmica para o GTAG.

O GTAG só pode ser chamado depois do [`hydrate`](/ciclo-de-vida-full-stack) para garantir de que está rodando no client.

```jsx
import Nullstack from 'nullstack';

class GoogleAnalytics extends Nullstack {

  hydrate({router, page, id}) {
    window.dataLayer = window.dataLayer || [];
    function gtag(){
      dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', id, {
      page_title: page.title,
      page_path: router.url
    });
    window.addEventListener(page.event, () => {
      gtag('event', 'page_view', {
        page_title: page.title,
        page_path: router.url
      })
    })
  }
  
  render({id}) {
    return (
      <script 
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
      />
    )
  }

}

export default GoogleAnalytics;
```

```jsx
import Nullstack from 'nullstack';
import GoogleAnalytics from './GoogleAnalytics';

class Application extends Nullstack {

  // ...

  render() {
    return (
      <main>
        <GoogleAnalytics id="TROQUE_PARA_SEU_ID_DO_ANALYTICS" />
      </main>
    )
  }


}

export default Application;
```

## Usando Wrapper

Como outra alternativa, você pode instalar [nullstack-google-analytics](https://github.com/Mortaro/nullstack-google-analytics) como uma dependência:

```sh
npm install nullstack-google-analytics
```

```jsx
import Nullstack from 'nullstack';
import GoogleAnalytics from 'nullstack-google-analytics';

class Application extends Nullstack {

  // ...

  render() {
    return (
      <main>
        <GoogleAnalytics id="TROQUE_PARA_SEU_ID_DO_ANALYTICS" />
      </main>
    )
  }


}

export default Application;
```
---
title: Google Analytics
description: Aproveite as vantagens do contexto e dos eventos personalizados para criar um componente que envia eventos GTAG dinamicamente.
---

De acordo com [analytics.google.com](https://analytics.google.com):

"O Google Analytics permite que você avalie o ROI de publicidade, bem como rastreie o Flash, vídeo e mídias sociais em sites e aplicativos."

Você pode aproveitar as vantagens do [contexto](/pt-br/contexto) e dos [eventos personalizados](/pt-br/contexto-page) para criar um componente que envia eventos GTAG dinamicamente.

O GTAG só pode ser chamado depois de [`hydrate`](/pt-br/ciclo-de-vida-full-stack) para garantir que está sendo executado no cliente.

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
        <GoogleAnalytics id="SUBSTITUA_COM_SEU_ID_DO_GOOGLE_ANALYTICS" />
      </main>
    )
  }


}

export default Application;
```

## Usando um Wrapper

Alternativamente, você pode instalar o [nullstack-google-analytics](https://github.com/Mortaro/nullstack-google-analytics) como uma dependência:

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
        <GoogleAnalytics id="SUBSTITUA_COM_SEU_ID_DO_GOOGLE_ANALYTICS" />
      </main>
    )
  }


}

export default Application;
```
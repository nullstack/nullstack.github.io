---
title: Facebook Pixel
description: Aproveite as vantagens do [contexto](/pt-br/contexto) e [eventos personalizados](/pt-br/contexto-page) para criar um componente que envia eventos Pixel dinamicamente.
---

De acordo com [developers.facebook.com](https://developers.facebook.com/docs/facebook-pixel/):

"O Facebook Pixel é um trecho de código JavaScript que permite rastrear a atividade do visitante em seu site."

Você pode aproveitar as vantagens do [contexto](/pt-br/contexto) e dos [eventos personalizados](/pt-br/contexto-page) para criar um componente que envia eventos Pixel dinamicamente.

O Facebook Pixel só pode ser chamado depois de [`hydrate`](/pt-br/ciclo-de-vida-full-stack) para garantir que está sendo executado no cliente.

```jsx
import Nullstack from 'nullstack';

class FacebookPixel extends Nullstack {

  async hydrate({page, id}) {
    ! function(f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function() {
          n.callMethod ?
              n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s)
    }(window, document, 'script',
      'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', id);
    fbq('track', 'PageView');
    window.addEventListener(page.event, () => {
      fbq('init', id);
      fbq('track', 'PageView');
    })
  }
}

export default FacebookPixel;
```

```jsx
import Nullstack from 'nullstack';
import FacebookPixel from './FacebookPixel';

class Application extends Nullstack {

  // ...

  render() {
    return (
      <main>
        <FacebookPixel id="SUBSTITUA_COM_SEU_ID_DO_FACEBOOK_PIXEL" />
      </main>
    )
  }


}

export default Application;
```

## Usando um Wrapper

Alternativamente, você pode instalar [nullstack-facebook-pixel](https://github.com/Mortaro/nullstack-facebook-pixel) como uma dependência:

```sh
npm install nullstack-facebook-pixel
```

```jsx
import Nullstack from 'nullstack';
import FacebookPixel from 'nullstack-facebook-pixel';

class Application extends Nullstack {

  // ...

  render() {
    return (
      <main>
        <FacebookPixel id="SUBSTITUA_COM_SEU_ID_DO_FACEBOOK_PIXEL" />
      </main>
    )
  }


}

export default Application;
```
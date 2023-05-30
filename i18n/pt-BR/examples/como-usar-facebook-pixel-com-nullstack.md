---
title: Facebook Pixel
description: Aproveite as chaves de contexto e eventos personalizados para criar um componente que envie eventos de forma dinâmica para o Pixel.
---

De acordo com [developers.facebook.com](https://developers.facebook.com/docs/facebook-pixel/):

"O Pixel da Metal é um trecho de código JavaScript que permite a você rastrear a atividade dos visitantes do seu site."

Aproveite as [chaves de contexto](/contexto) e [eventos personalizados](/contexto-page) para criar um componente que envie eventos de forma dinâmica para o Pixel.

O Facebook Pixel só pode ser chamado depois do [`hydrate`](/ciclo-de-vida-full-stack) para garantir de que está rodando no client.

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
        <FacebookPixel id="TROQUE_PARA_SEU_ID_DO_FACEBOOK_PIXEL" />
      </main>
    )
  }


}

export default Application;
```

## Usando Wrapper

Como outra alternativa, você pode instalar [nullstack-facebook-pixel](https://github.com/Mortaro/nullstack-facebook-pixel) como uma dependência:

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
        <FacebookPixel id="TROQUE_PARA_SEU_ID_DO_FACEBOOK_PIXEL" />
      </main>
    )
  }


}

export default Application;
```
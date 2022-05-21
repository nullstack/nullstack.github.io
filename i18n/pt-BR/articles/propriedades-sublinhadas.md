---
title: Propriedades Sublinhadas
description: Prefixe qualquer propriedade com um sublinhado para evitar os proxies
---

Você pode criar um método começando com `_`, isso quer dizer que o código é vanilla JS e vai ignorar proxies.

Com isto você pode adicionar ou remover eventos no DOM.

```jsx
import Nullstack from "nullstack";

class Application extends Nullstack {
  _listener() {
    // do something
  }

  async hydrate() {
    window.addEventListener("resize", this._listener, false);
  }

  async terminate() {
    window.removeEventListener("resize", this._listener, false);
  }

  render() {
    return <main>Content</main>;
  }
}

export default Application;
```

Você pode usar esta técnica para ignorar o contexto

```jsx
import Nullstack from "nullstack";

class Application extends Nullstack {
  _method(prop) {
    // do something
  }

  async hydrate() {
    // notice its not passing an object as context normally requires
    this._method(true)
  }

}

export default Application;
```

Esta técnica pode ser util para integrações com bibliotecas que não lidam bem com proxies ou para guardar referencias de elementos do DOM.

```jsx
import Nullstack from "nullstack";

class Application extends Nullstack {

  async hydrate({ self }) {
    this._toaster = new MeuPluginDeToasterManeiro()
    this._videoRef = self.element.querySelector('video')
  }

}

export default Application;
```

## Próximos passos

> 🎉 **Parabéns!** Você concluiu os conceitos básicos!

⚔ Aprenda sobre a [inicialização da aplicação](/pt-br/inicializacao-da-aplicacao).
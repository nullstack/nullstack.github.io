---
title: Gerenciando Eventos
description: Adicionando eventos ao DOM
---

Você pode criar um método começando com `_`, isso quer dizer que o código é vanilla JS. Com isto você pode adicionar ou remover eventos no DOM.

```jsx
import Nullstack from "nullstack";
import Counter from "./Counter";

class Application extends Nullstack {
  _fn() {
    // do something
  }

  async hydrate() {
    window.addEventListener("resize", _fn, false);
  }

  async terminate() {
    window.removeEventListener("resize", _fn, false);
  }

  render() {
    return <main>Texto</main>;
  }
}

export default Application;
```

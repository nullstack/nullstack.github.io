---
title: Gerenciando Eventos
description: Adicionando eventos ao DOM
---

You can

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
    window.addEventListener("resize", _fn, false);
  }

  render() {
    return <main>Texto</main>;
  }
}

export default Application;
```

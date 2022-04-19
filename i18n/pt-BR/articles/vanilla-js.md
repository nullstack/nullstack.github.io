---
title: Handling Events
description: Add DOM events to components
---

Você pode criar um método com `_`, isso quer dizer que você está criando código vanilla que ignora os proxies.

```jsx
import Nullstack from "nullstack";

class Application extends Nullstack {
  _fn() {
    // do something that skips proxies
  }

  render() {
    return <main>Content</main>;
  }
}

export default Application;
```

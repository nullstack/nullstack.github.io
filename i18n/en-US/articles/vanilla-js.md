---
title: Handling Events
description: Add DOM events to components
---

You can create a method starting with `_`, that means you're creating vanilla JS code that ignore proxies.

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

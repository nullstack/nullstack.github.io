---
title: Handling Events
description: Add DOM events to components
---

You can create a method starting with `_`, that means you're creating vanilla JS code. With that you'll be able to add or remove the event listener.

```jsx
import Nullstack from "nullstack";

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
    return <main>Content</main>;
  }
}

export default Application;
```

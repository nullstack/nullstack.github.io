---
title: Underscored Properties
description: Prefix any property with an underscore to skip proxies
---

You can create a method starting with `_`, that means you're creating vanilla JS code that ignores proxies. 

With that you'll be able to add or remove the event listener.

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
    window.addEventListener("resize", this._listener, false);
  }

  render() {
    return <main>Content</main>;
  }
}

export default Application;
```

You can also use it to ignore the context

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

It is also useful for library integrations that do not deal well with proxies, or storing DOM elements.

```jsx
import Nullstack from "nullstack";

class Application extends Nullstack {

  async hydrate({ self }) {
    this._toaster = new MyCoolToasterPlugin()
    this._videoRef = self.element.querySelector('video')
  }

}

export default Application;
```

## Next step

> 🎉 **Congratulations!** You are done with the core concepts!

⚔ Learn about the [application startup](/application-startup).
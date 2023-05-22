---
title: Nullstack Logo
description: Nullstack comes with it's set of logos built-in
---

Nullstack comes with it's set of logos built-in to be used as components:

```jsx
import Nullstack from 'nullstack';
import Logo from 'nullstack/logo';

class Application extends Nullstack {

  render() {
    return (
      <main>
        <Logo height={30} light />
        <Logo height={30} monotone />
        <Logo height={30} light monotone />
        <Logo height={30} duotone />
        <Logo height={30} light duotone />
      </main>
    )
  }

}

export default Application;
```

The above components and it's attributes generates the following logos:

![Nullstack Logos](/nullstack-logos.png)

The Logo uses full width and has color `duotone` by default.
---
title: Context Settings
description: The settings object is a proxy in the Nullstack Context available in both client and server which you can use to configure your application with public information
---

- Type: `object`
- Origin: [Nullstack Context](/context#----nullstack-context)
- Availability: server/client
- **readwrite** in **server** context
- **readonly** in **client** context

You can use it to configure your application with public information.

You can assign any keys with any type to the object.

You can assign keys to `settings` dynamically based on current environment using [`context.environment`](/context-environment).

```jsx
// server.js
import Nullstack from 'nullstack';
import Application from './src/Application';

const context = Nullstack.start(Application);

context.start = function() {
  const { settings, environment } = context;
  settings.endpoint = 'https://domain.com/api';
  settings.publicKey = environment.development ? 'DEV_API_KEY' : 'PROD_API_KEY';
}

export default context;
```

```jsx
// src/Application.njs
import Nullstack from 'nullstack';

class Application extends Nullstack {

  async hydrate({settings}) {
    const response = await fetch(settings.endpoint, {
      headers: {
        Authorization: `Bearer ${settings.publicKey}`
      }
    });
    this.data = await response.json();
  }

}

export default Application;
```

Any environment variable starting with NULLSTACK_SETTINGS_ will be mapped to the `settings` in that environment.

> 🐱‍💻 NULLSTACK_SETTINGS_PUBLIC_KEY will be mapped to `settings.publicKey`
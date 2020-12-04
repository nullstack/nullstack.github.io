---
title: Context Settings
description: The settings object is a proxy in the framework store part of your context which you can use to configure your application with public information
---

The settings object is a proxy in the framework store part of your context which you can use to configure your application with public information.

This key is *readwrite* in the *server* context.

This key is *readonly* in the *client* context.

Settings keys are frozen after the [application startup](/application-startup).

The following keys are available in the object:

- *development*: object
- *production*: object
- *[anySetting]*: any

You can assign keys to *development* or *production* keys in order to have different settings per environment.

If you assign a key directly to the settings object it will be available in both environments.

When reading from a key you must read directly from the settings object and Nullstack will return the best-suited value for that environment.

```jsx
import Nullstack from 'nullstack';

class Application extends Nullstack {

  static async start({settings}) {
    settings.development.publicKey = 'SANDBOX_API_KEY';
    settings.production.publicKey = 'PRODUCTION_API_KEY';
    settings.endpoint = 'https://domain.com/api';
  }

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

Any environment key starting with NULLSTACK_SETTINGS_ will be mapped to the settings in that environment.

> 🐱‍💻 NULLSTACK_SETTINGS_PUBLIC_KEY will be mapped to settings.publicKey

## Next step

⚔ Learn about the [context secrets](/context-secrets).
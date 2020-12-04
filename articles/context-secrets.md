---
title: Context Secrets
description: The secrets object is a proxy in the framework store part of your context which you can use to configure your application with private information
---

The secrets object is a proxy in the framework store part of your context which you can use to configure your application with private information.

This key is *readwrite* and available only in the *server* context.

Secrets keys are frozen after the [application startup](/application-startup).

The following keys are available in the object:

- *development*: object
- *production*: object
- *[anySetting]*: any

You can assign keys to *development* or *production* keys in order to have different secrets per environment.

If you assign a key directly to the secrets object it will be available in both environments.

When reading from a key you must read directly from the secrets object and Nullstack will return the best-suited value for that environment.

```jsx
import Nullstack from 'nullstack';

class Application extends Nullstack {

  static async start({secrets}) {
    secrets.development.privateKey = 'SANDBOX_API_KEY';
    secrets.production.privateKey = 'PRODUCTION_API_KEY';
    secrets.endpoint = 'https://domain.com/api';
  }

  static async fetchFromApi({secrets}) {
    const response = await fetch(secrets.endpoint, {
      headers: {
        Authorization: `Bearer ${secrets.privateKey}`
      }
    });
    return await response.json();
  }

}

export default Application;
```

Any environment key starting with NULLSTACK_SECRETS_ will be mapped to the secrets in that environment.

> 🐱‍💻 NULLSTACK_SECRETS_PRIVATE_KEY will be mapped to secrets.privateKey

## Next step

⚔ Learn about the [context server request and response](/context-server-request-response).
---
title: Context Secrets
description: The secrets object is a proxy in the Nullstack Context available in server which you can use to configure your application with private information
---

- Type: `object`
- Origin: [Nullstack Context](/context#----nullstack-context)
- Availability: **server**
- **readwrite** in **server** context

You can use it to configure your application with private information.

You can assign any keys with any type to the object.

You can assign keys to `secrets` dynamically based on current environment using [`context.environment`](/context-environment).

```jsx
// server.js
import Nullstack from 'nullstack';
import Application from './src/Application';

const context = Nullstack.start(Application);

context.start = function() {
  const { secrets, environment } = context;
  secrets.endpoint = 'https://domain.com/api';
  secrets.privateKey = environment.development ? 'DEV_API_KEY' : 'PROD_API_KEY';
}

export default context;
```

```jsx
// src/Application.njs
import Nullstack from 'nullstack';

class Application extends Nullstack {

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

Any environment variable starting with NULLSTACK_SECRETS_ will be mapped to the `secrets` in that environment.

> 🐱‍💻 NULLSTACK_SECRETS_PRIVATE_KEY will be mapped to `secrets.privateKey`
---
title: Application Startup
description: The start function will run only once when your application is booted and is a good place for setting up your server context
---

The index.js file at your application root is responsible for starting your application.

When you run the application with *npm start* or *node .production/server.js* the index will call the start function in your *src/Application.js*.

The start function will run only once when your application is booted and is a good place for setting up your [server context](/context).

```jsx
import Nullstack from 'nullstack';

class Application extends Nullstack {

  static async start(context) {
    const {database} = await import('./database');
    context.database = database;
  }

}

export default Application;
```

## Dependency startup pattern

A nice pattern to work with dependencies that require startup time configurations is to define a start function in the dependency and call it in the Application start function passing the [server context](/context).

```jsx
import Nullstack from 'nullstack';
import Dependency from './Dependency';

class Application extends Nullstack {

  static async start(context) {
    Dependency.start(context);
  }

}

export default Application;
```

## Next step

⚔ Learn about the [context data](/context-data).
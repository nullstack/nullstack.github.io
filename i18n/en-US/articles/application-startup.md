---
title: Application Startup
description: The start function will run only once when your application is booted and is a good place for setting up your server context
---

The **index.js** file at your application root is responsible for starting your application.

When you run the application with `npm start` or `node .production/server.js` the **index** will call the `start` function in your **src/Application.js**.

The `start` function will run only once when your application is booted and is a good place for setting up your [server context](/context).

```jsx
import Nullstack from 'nullstack';
import database from './database';

class Application extends Nullstack {

  static async start(context) {
    context.database = database;
  }

}

export default Application;
```

## Dependency startup pattern

A nice pattern to work with dependencies that require startup time configurations is to define a `start` function in the dependency and call it in the Application `start` function passing the [server context](/context).

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

> 🔒 Server functions with the name starting with "start" (and optionally followed by an uppercase letter) do not generate an API endpoint to avoid malicious context flooding.

## Chained startup pattern

Another pattern to use when working with startup time dependencies is chained startup on your **index.js** file:

```jsx
import Nullstack from 'nullstack';
import Application from './src/Application';
import NameSetter from './src/NameSetter';
import DomainSetter from './src/DomainSetter';

Nullstack.start(Application, NameSetter, DomainSetter);
```

With each of those components being started sequentially, together with having the `context` passed to their `start` method.

## Application export

The whole application can be exported making it possible to be used as a serverless function out-of-box:

```jsx
import Nullstack from 'nullstack';
import Application from './src/Application';

export default Nullstack.start(Application);
```

> 💡 This presents the app in the perfect state to be deployed to Node serverless hosts

Adding to this possibility of decoupling, after a compilation the exported application `context` can be accessed and updated even using a "*script runner*" pattern:

```js
// scripts/getProjectName.js
const { default: app } = require('../.development/server.js');

async function getProjectName() {
  const context = await app.start();
  // the project name after all starting logic
  console.log(context.project.name);
}
getProjectName();
```

Which could work running as a Node command at root: `node scripts/getProjectName.js`.

> 💡 This has many use cases, as for updating the database stored on `context` right when starting the application at specific environment

## Next step

⚔ Learn about [functional components](/functional-components).
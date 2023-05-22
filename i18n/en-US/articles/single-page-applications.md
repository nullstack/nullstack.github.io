---
title: Single Page Applications
description: Use Nullstack to generate single page applications that can connect to any API or server functions
---

Use Nullstack to generate single page applications that can connect to any API or server functions.

Single page applications are useful for environments that should not use [server-side rendering](/server-side-rendering), like native applications.

You can easily move your application from SSR to SPA by changing the build command.

```sh
npx nullstack build --mode=spa --output=spa
```

> 🔥 You must be in a Nullstack project folder to run this command.

By default, it will create your single page application in the **spa** folder you can override this with the `--output` flag.

The builder will run your application in production mode and generate an empty index.html that is prepared to become a Nullstack client-only application.

The [manifest.json](/context-project) and the contents of the public folder will be copied into the target folder.

On the first visit to your static application the JavaScript bundle will be loaded and start a SPA.

On the subsequent requests, Nullstack will push history and update the application state without ever reloading the page.

## Good Pratices

You can add a script to your **package.json** to generate your static website in a custom folder:

```jsx
{
  "name": "nullstack.github.io",
  "scripts": {
    "start": "npx nullstack start",
    "build": "npx nullstack build --mode=spa --output=web",
  }
  
  ...
}

```

## Caveats

In SPA mode both [`prepare`](/full-stack-lifecycle) and [`initiate`](/full-stack-lifecycle) will always run in the client. 
However it is a good pratice to follow SSR patterns in order to be able to easily change the build mode.

You can mix modes and request further server functions by pointing `worker.api` and hosting the server bundle in a node.js environment.
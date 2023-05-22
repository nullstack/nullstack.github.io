---
title: Static Site Generation
description: Use Nullstack to generate static websites for lightning-fast static applications using the full power of Nullstack without the need for a node.js back-end
---

Use Nullstack to generate static websites for lightning-fast static applications using the full power of the Nullstack client without the need for a node.js back-end.

Static sites are useful for read-only applications like blogs and documentation.

> 💡 This documentation is actually a static site generated with Nullstack.

All the benefits of [server-side rendering](/server-side-rendering) apply to static generated sites.

You can generate a static website from your Nullstack application with the following `npx` command:

```sh
npx nullstack build --mode=ssg --output=ssg
```

> 🔥 You must be in a Nullstack project folder to run this command.

By default, it will create your static application in the **ssg** folder you can override this with the `--output` flag.

The builder will run your application in production mode and crawl every `href` attribute it finds in your DOM.

The [manifest.json](/context-project) and the contents of the public folder will be copied into the target folder.

Besides generating raw HTML it will also generate a JSON file for each route with a copy of the state.

On the first visit to your static application, HTML will be served and hydrated.

On the subsequent requests, Nullstack will fetch the generated JSON and update the application state without ever reloading the page.

This, in fact, gives you not only a static generated site, but a static generated API with the calculated state that feeds a Single Page Application with zero costs.

## Good Pratices

You can add a script to your **package.json** to generate your static website in a custom folder:

```jsx
{
  "name": "nullstack.github.io",
  "scripts": {
    "start": "npx nullstack start",
    "build": "npx nullstack build --mode=ssg --output=docs",
  }
  
  ...
}

```

## Caveats

Before generating the HTML, Nullstack will wait for [`prepare`](/full-stack-lifecycle) and [`initiate`](/full-stack-lifecycle) of all components of that route to be resolved.

You can mix modes and request further server functions by pointing `worker.api` and hosting the server bundle in a node.js environment.

Nullstatic will crawl a "/404" URL and generate both a "/404.html" and a "/404/index.html".
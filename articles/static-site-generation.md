---
title: Static Site Generation
description: Use Nullstack to generate static websites for lightning-fast static applications using the full power of Nullstack without the need for a node.js back-end
---

Use Nullstack to generate static websites for lightning-fast static applications using the full power of the Nullstack client without the need for a node.js back-end.

Static sites are useful for read-only applications like blogs and documentation.

> 💡 This documentation is actually a static site generated with Nullstack.

All the benefits of [server-side rendering](/server-side-rendering) apply to static generated sites.

You can generate a static website with the following NPX command:

```sh
npx create-nullstatic-app
```

By default, it will create your Nullstatic application in the *static* folder.

You can change the folder by passing it as an argument to the command:

```sh
npx create-nullstatic-app docs
```

The Nullstatic generator will run your application in production mode and crawl every link to an internal route it finds in your DOM.

> 💡 Make sure to have the server production port free when you run this command.

The [manifest.json](/context-project) and the contents of the public folder will be copied into the target folder.

Besides generating raw HTML it will also generate a JSON file for each route with a copy of the state.

On the first visit to your static application, HTML will be served and hydrated.

On the subsequent requests, Nullstack will fetch the generated JSON and update the application state without ever reloading the page.

This, in fact, gives you not only a static generated site, but a static generated API that feeds a Single Page Application with zero costs.

## Caveats

Nullstatic only crawls your application up to the initiate resolution, further API requests triggered by events will be ignored.


## Next step

> 🎉 *Congratulations*. You are done with the advanced concepts!

⚔ Learn [how to deploy a nullstack application](/how-to-deploy-a-nullstack-application).
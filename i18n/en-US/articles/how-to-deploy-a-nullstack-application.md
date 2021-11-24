---
title: How to Deploy
description: With Nullstack it's easy to have your application up and running in production mode
---

With Nullstack it's easy to have your application up and running in production mode.

> 🐱‍💻 **stonks**

Nullstack compiles your code and all your dependencies using [Webpack](https://webpack.js.org).

The output of the compilation is moved to the **.production** folder and is the only folder besides **public** that needs to be moved into the host machine.

If you have `project.cdn` set you must move the **public** folder to the actual cdn.

> 💡 It is important that the **.production** folder is present for environment detection

The host machine must have at least node v8.10.0 installed. 

You don't have to "npm install" in the host machine.

> ✨ You can configure the environment using [`settings`](/context-settings) and [`secrets`](/context-secrets)

To start the server just run:

```sh
node .production/server.js
```

> ✨ It is recommend the usage of a process manager like [PM2](https://pm2.keymetrics.io)

## How to Deploy a static generated site with Nullstack

After you [generate a static site](/static-site-generation), all you have to do is move the output folder to any host machine capable of serving HTML.

## Deploying to recommended hosts

As Nullstack evolves we maintain guides following steps of how to deploy in most used hosts, you can find those [here](https://github.com/GuiDevloper/nulla#tutorials-with-nulla).

## Next step

> 🎉 **Congratulations**. You are done with the advanced concepts!

⚔ Learn about [server-side rendering](/server-side-rendering).
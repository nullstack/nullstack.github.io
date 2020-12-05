---
title: How to Deploy
description: With Nullstack it's easy to have your application up and running in production mode
---

With Nullstack it's easy to have your application up and running in production mode.

> 🐱‍💻 *stonks*

Nullstack compiles your code and all your dependencies using Webpack.

The output of the compilation is moved to the *.production* folder and is the only folder that needs to be moved into the host machine.

> 💡 It is important that the *.production* folder is present for environment detection

The host machine must have at least node v8.10.0 installed. 

You don't have to "npm install" in the host machine.

> ✨ You can configure the environment using [settings](/context-settings) and [secrets](/context-secrets)

To start the server just run:

```sh
node .production/server.js
```

> ✨ It is recommend the usage of a process manager like [PM2](https://pm2.keymetrics.io)
---
title: "Copying static files to the public folder on build"
description: "Copy static files to the public folder, like schema files, css, js and other files that comes with certain packages"
---

To copy static files to the public folder you need to create a custom webpack override.

In order to modify the webpack config that comes in the Nullstack bundle, you can create a `webpack.config.js` as mentioned in the documentation ["How to customize Webpack"](/how-to-customize-webpack).

```js
// webpack.config.js
const [server, client] = require("nullstack/webpack.config");

const fse = require("fs-extra");

class CopyFiles {
  apply() {
    fse.copySync("node_modules/swagger-ui-dist", "public/api-docs", {
      overwrite: true,
    });
  }
}

function customServer(...args) {
  const config = server(...args);
  config.plugins.push(new CopyFiles());
  return config;
}

module.exports = [customServer, client];
```

In case you need to serve these files, you can use `context.server` to create a route and `express.static` to point to the files you want to serve.

```js
// server.js
context.server.use(
  "/api-docs/",
  express.static(path.join(__dirname, "..", "public/api-docs"))
);
// ...
```

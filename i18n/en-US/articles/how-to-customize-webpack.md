---
title: How to customize Webpack
description: You can create your own custom webpack config to extend Nullstacks default configs
---

You can create your own custom `webpack.config.js` at the projects root folder to extend Nullstacks default configs

Nullstack exposes the file `nullstack/webpack.config.js` which exports a server and client function, each being the config for the respective environment

You can import nullstack webpack config with the following code

```jsx
const [server, client] = require('nullstack/webpack.config');

module.exports = [server, client]
```

You can customize a single environment by wrapping the targeted function

```jsx
const [server, client] = require('nullstack/webpack.config');

const glob = require('glob');
const PurgecssPlugin = require('purgecss-webpack-plugin');

function customClient(...args) {
  const config = client(...args);
  if (config.mode === 'production') {
    config.plugins.push(new PurgecssPlugin({
      paths: glob.sync(`src/**/*`, { nodir: true }),
      content: ['./**/*.njs'],
      safelist: ['script', 'body', 'html', 'style'],
      defaultExtractor: content => content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
    }));
  }

  return config;
}

module.exports = [server, customClient]
```

You can also extend both environments at once by creating a wrapper around both environments

```jsx
const [server, client] = require('nullstack/webpack.config');
const CadencePlugin = require('cadence-webpack-plugin');

function applyCadencePlugin(environments) {
  return environments.map((environment) => (...args) => {
    const config = environment(...args);
    config.plugins.push(new CadencePlugin())
    return config;
  })
}

module.exports = applyCadencePlugin([server, client])
```
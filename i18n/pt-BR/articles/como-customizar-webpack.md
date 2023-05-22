---
title: Como customizar o Webpack
description: Você pode criar sua própria configuração de webpack personalizada para estender as configurações padrões do Nullstack
---

Você pode criar seu próprio `webpack.config.js` personalizado na pasta raiz do projeto para estender as configurações padrão do Nullstack

Nullstack expõe o arquivo `nullstack/webpack.config.js` que exporta uma função de servidor e cliente, cada uma sendo a configuração para o respectivo ambiente

Você pode importar a configuração do webpack do nullstack com o seguinte código

```jsx
const [server, client] = require('nullstack/webpack.config');

module.exports = [server, client]
```

Você pode personalizar um único ambiente envolvendo a função de destino

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

Você também pode estender os dois ambientes ao mesmo tempo criando um wrapper em torno de ambos os ambientes

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
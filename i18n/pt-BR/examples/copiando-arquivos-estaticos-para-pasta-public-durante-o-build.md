---
title: "Copiando arquivos estáticos para a pasta public durante o build"
description: "Copiando arquivos estáticos para a pasta public, como arquivos de schema, css, js e outros arquivos que vem com certos pacotes"
---

Para copiar arquivos estáticos para a pasta pública você precisa criar um webpack personalizado e sobrepor eles.

Para modificar a configuração do webpack que vem no pacote do Nullstack, você pode criar um arquivo `webpack.config.js`, conforme mencionado na documentação ["Como customizar o webpack"](/como-customizar-webpack).

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
Se você precisar destes arquivos, você pode usar `context.server` para criar uma rota e `express.static` para criar onde você quer servir os arquivos.

```js
// server.js
context.server.use(
  "/api-docs/",
  express.static(path.join(__dirname, "..", "public/api-docs"))
);
// ...
```

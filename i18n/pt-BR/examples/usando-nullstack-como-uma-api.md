---
title: "Usando o Nullstack como uma API web"
description: "O Nullstack pode ser usado como uma API web, você escreve os seus próprios endpoints ou pode expôr suas server functions."
---
O Nullstack pode ser usado como uma API web. O Nullstack roda um servidor expresso por trás da aplicação, permitindo que você defina suas próprias rotas e construa uma API web totalmente personalizada.

Você pode configurar as rotas do express usando o objeto `server`, disponível no contexto do Nullstack, em `server.js`

```js
// server.js
import Nullstack from 'nullstack';
import Application from './src/Application';

const context = Nullstack.start(Application);

context.server.get('/api/waifus', (request, response) => {
  response.json({waifus: []});
});

export default context;
```
Também é possível expor funções do servidor a partir dos seus componentes para que estejam disponíveis na API web. Em vez de usar uma função que recebe uma `request` e uma `response`, passe a função estática do seu componente para a rota express.

```js
// server.js
import Nullstack from 'nullstack';
import Application from './src/Application';
import WaifuComponent from './src/WaifuComponent';

const context = Nullstack.start(Application);

context.server.get('/waifus', WaifuComponent.getWaifus)

export default context;
```

---
title: Requisição e resposta do servidor
description: A key do servidor é um proxy em volta da instância do express, que roda o Nullstack por baixo dos panos

---

## A key do servidor

A key do servidor é um proxy em volta de uma instância do [Express](https://expressjs.com) que roda por baixo dos panos.

O objeto do servidor está presente apenas no contexto do *servidor*.

As seguintes funções são redirecionadas para o servidor Express:

- `get`
- `post`
- `put`
- `patch`
- `delete`
- `options`
- `head`
- `use`

> ✨ Se você quer aprender como fazer uma API com Nullstack, este é o caminho.

```jsx
// server.js
import Nullstack from 'nullstack';
import Application from './src/Application';

const context = Nullstack.start(Application);

context.server.get('/api/books', (request, response) => {
  response.json({books: []});
});

export default context;
```

Outras keys disponíveis são:

- **port**: `integer`
- **maximumPayloadSize**: `string`
- **cors**: `object`

```jsx
// server.js
import Nullstack from 'nullstack';
import Application from './src/Application';

const context = Nullstack.start(Application);

const { server } = context;
server.port = 3000;
server.maximumPayloadSize = '5mb';
server.cors = {
  origin: 'http://localhost:6969',
  optionsSuccessStatus: 200
}

export default context;
```

O objeto `cors` será passado como argumento para o plugin do [cors no express](https://expressjs.com/en/resources/middleware/cors.html).

## Requisição e resposta

Todo contexto de função do servidor é mesclado com os objetos `request` e `response` originais do Express.

Se você der uma resposta manualmente ela irá sobrescrever a `response` [server-side rendering](/server-side-rendering) do framework.

```jsx
import Nullstack from 'nullstack';

class Application extends Nullstack {

  static async getBooks({request, response}) {
    if(!request.session.user) {
      response.status(401).json({unauthorized: true});
    }
  }

  // ...

}

export default Application;
```
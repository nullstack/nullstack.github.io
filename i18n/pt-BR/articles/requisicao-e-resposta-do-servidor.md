---
title: Requisição e resposta do servidor
description: A key do servidor é um proxy em volta da instância do express, que roda o Nullstack por baixo dos panos

---

## A key do servidor

A key do servidor é um proxy em volta de uma instância do [Express](https://expressjs.com) que roda por baixo dos panos.

O objeto do servidor está presenta apenas no contexto do *servidor*.

As seguintes funções são redirecionadas para o servidor express:

- get
- post
- put
- patch
- delete
- options
- head
- use


> ✨ Se você quer aprender como fazer uma API com Nullstack, este é o jeito.

```jsx
import Nullstack from 'nullstack';

class Application extends Nullstack {

  static async start({server}) {
    server.get('/api/books', (request, response) => {
      response.json({books: []});
    });
  }

  // ...

}

export default Application;
```

Outras keys disponíves são:

- *port*: integer
- *maximumPayloadSize*: string
- *cors*: object

```jsx
import Nullstack from 'nullstack';

class Application extends Nullstack {

  static async start({server}) {
    server.port = 3000;
    server.maximumPayloadSize = '5mb';
    server.cors = {
      origin: 'http://localhost:6969',
      optionsSuccessStatus: 200
    }
  }

  // ...

}

export default Application;
```

O objeto do cors irá ser passado como argumento para o plugin do [cors no express](https://expressjs.com/en/resources/middleware/cors.html)

## Requisição e resposta

Toda função que está no contexto do servidor é mesclada com os objetos de requisição e resposta do express.

Se você der uma resposta manualmente ela irá sobrescrever a resposta [server-side rendering](/server-side-rendering) do framework.

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

## Próximo passo

⚔ Aprenda sobre [estilos](/styles).
---
title: Como usar MongoDB
description: Você pode usar qualquer banco de dados com Nullstack, mas a integração javascript e flexibilidade do MongoDB parece especialmente boa com aplicativos Nullstack
---

De acordo com [mongodb.com](https://www.mongodb.com):

"O MongoDB é um banco de dados distribuído de propósito geral, baseado em documentos, criado para desenvolvedores de aplicativos modernos e para a era da nuvem."

Você pode usar qualquer banco de dados com Nullstack, mas a integração javascript e flexibilidade do MongoDB parece especialmente boa com aplicativos Nullstack.

Instale o driver MongoDB do npm:

```sh
npm install mongodb
```

Configure as credenciais do banco de dados usando [`secrets`](/pt-br/contexto-secrets).

O último passo é simplesmente atribuir a conexão do banco de dados ao contexto do servidor.

```jsx
import Nullstack from 'nullstack';
import {MongoClient} from 'mongodb';

class Application extends Nullstack {

  static async start(context) {
    const {secrets} = context;
    secrets.development.databaseHost = 'mongodb://localhost:27017/dbname';
    secrets.databaseName = 'dbname';
    await this.startDatabase(context);
  }

  static async startDatabase(context) {
    const {secrets} = context;
    const databaseClient = new MongoClient(secrets.databaseHost);
    await databaseClient.connect();
    context.database = await databaseClient.db(secrets.databaseName);
  }

}

export default Application;
```

O exemplo acima tornará a chave `database` disponível para todas as funções do servidor.

```jsx
import Nullstack from 'nullstack';

class BooksList extends Nullstack {

  books = [];

  static async getBooks({database}) {
    return await database.collection('books').find().toArray();
  }

  async initiate() {
    this.books = await this.getBooks();
  }

  // ...

}

export default BooksList;
```

## Próximo Passo

⚔ Aprenda [como usar Google Analytics no Nullstack](/pt-br/como-usar-google-analytics-no-nullstack).
---
title: Como usar MongoDB
description: Você pode usar qualquer banco de dados com Nullstack, mas a integração JavaScript e flexibilidade do MongoDB parece especialmente boa com aplicativos Nullstack
---

De acordo com [mongodb.com](https://www.mongodb.com):

"O MongoDB é um banco de dados distribuído de propósito geral, baseado em documentos, criado para desenvolvedores de aplicativos modernos e para a era da nuvem."

Você pode usar qualquer banco de dados com Nullstack, mas a integração JavaScript e flexibilidade do MongoDB parece especialmente boa com aplicativos Nullstack.

Instale o driver MongoDB do npm:

```sh
npm install mongodb
```

Configure as credenciais do banco de dados usando [`secrets`](/pt-br/contexto-secrets) em seu arquivo `.env`.

```
NULLSTACK_SECRETS_MONGODB_URI="mongodb://localhost:27017/dbname"
NULLSTACK_SECRETS_DATABASE_NAME="dbname"
```

O último passo é simplesmente atribuir a conexão do banco de dados ao contexto do servidor.

```jsx
// server.js
import Nullstack from 'nullstack';
import Application from './src/Application';
import { MongoClient } from 'mongodb';

const context = Nullstack.start(Application);

context.start = async function() {
  const { secrets } = context;
  const databaseClient = new MongoClient(secrets.mongodbUri);
  await databaseClient.connect();
  context.database = await databaseClient.db(secrets.databaseName);
}

export default context;
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
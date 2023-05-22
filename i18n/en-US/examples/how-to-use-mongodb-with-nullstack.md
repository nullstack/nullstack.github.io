---
title: How to use MongoDB
description: You can use any database with Nullstack, but the JavaScript integration and flexibility of MongoDB looks especially good with Nullstack applications
---

According to [mongodb.com](https://www.mongodb.com):

"MongoDB is a general purpose, document-based, distributed database built for modern application developers and for the cloud era."

You can use any database with Nullstack, but the JavaScript integration and flexibility of MongoDB looks especially good with Nullstack applications.

Install the MongoDB driver from npm: 

```sh
npm install mongodb
```

Configure the database credentials using [`secrets`](/context-secrets) in your `.env` file.

```
NULLSTACK_SECRETS_MONGODB_URI="mongodb://localhost:27017/dbname"
NULLSTACK_SECRETS_DATABASE_NAME="dbname"
```

The last step is to simply assign the database connection to the server context.

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

The example above will make the `database` key available to all your server functions.

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
---
title: How to use MongoDB
description: You can use any database with Nullstack, but the javascript integration and flexibility of MongoDB looks especially good with Nullstack applications
---

According to [mongodb.com](https://www.mongodb.com):

"MongoDB is a general purpose, document-based, distributed database built for modern application developers and for the cloud era."

You can use any database with Nullstack, but the javascript integration and flexibility of MongoDB looks especially good with Nullstack applications.

Install the MongoDB driver from npm: 

```sh
npm install mongodb
```

Configure the database credentials using [secrets](/context-secrets).

The last step is to simply assign the database connection to the server context.

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

The example above will make the database key available to all your server functions.

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

## Next step

⚔ Learn [how to use Google Analytics with Nullstack](/how-to-use-google-analytics-with-nullstack).
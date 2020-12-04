---
title: Server request and response
description: The server key is a proxy around the express instance that runs Nullstack under the hood
---

## The server key

The server key is a proxy around the express instance that runs Nullstack under the hood.

The server object is present only in the *server* context.

The following functions are tunneled back to the express server:

- get
- post
- put
- patch
- options
- head
- use

> ✨ If you wanna know how to make an API with Nullstack, this is the way.

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

Other available keys are:

- *port*: integer
- *maximumPayloadSize*: string

```jsx
import Nullstack from 'nullstack';

class Application extends Nullstack {

  static async start({server}) {
    server.port = 3000;
    server.maximumPayloadSize = '5mb';
  }

  // ...

}

export default Application;
```

## Request and Response

Every server function context is merged with the original request and response objects from express.

If you raise a response manually it will override the framework's server-side rendering response.

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

## Next step

⚔ Learn about [styles](/styles).
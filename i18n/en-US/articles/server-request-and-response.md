---
title: Server request and response
description: The server key is a proxy around the express instance that runs Nullstack under the hood
---

## The server key

The server key is a proxy around the [Express](https://expressjs.com) instance that runs Nullstack under the hood.

The server object is present only in the *server* context.

The following functions are tunneled back to the Express server:

- `get`
- `post`
- `put`
- `patch`
- `delete`
- `options`
- `head`
- `use`

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

- **port**: `integer`
- **maximumPayloadSize**: `string`
- **cors**: `object`

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

The `cors` object will be passed as the argument to [express cors plugin](https://expressjs.com/en/resources/middleware/cors.html).

## Request and Response

Every server function context is merged with the original `request` and `response` objects from Express.

If you raise a response manually it will override the framework's [server-side rendering](/server-side-rendering) `response`.

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
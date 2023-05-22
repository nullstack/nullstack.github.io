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
// server.js
import Nullstack from 'nullstack';
import Application from './src/Application';

const context = Nullstack.start(Application);

context.server.get('/api/books', (request, response) => {
  response.json({books: []});
});

export default context;
```

Other available keys are:

- **port**: `integer`
- **maximumPayloadSize**: `string`

```jsx
// server.js
import Nullstack from 'nullstack';
import Application from './src/Application';

const context = Nullstack.start(Application);

const { server } = context;
server.port = 3000;
server.maximumPayloadSize = '5mb';

export default context;
```

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

It's also possible to expose server functions from your components to be in the web API. Instead of using a function that a `request` and a `response` pass the static function from your component to the express route.

```js
// server.js
import Nullstack from 'nullstack';
import Application from './src/Application';
import WaifuComponent from './src/WaifuComponent';

const context = Nullstack.start(Application);

context.server.get('/waifus', WaifuComponent.getWaifus)

export default context;
```
---
title: "Using Nullstack as a Web API"
description: "Nullstack can be used as a web API, you can write your own endpoints or expose server functions."
---
Nullstack can be used as a Web API. Nullstack runs an Express server behind the scenes allowing you to configure your own routes and build a fully customized Web API.

You can configure the Express routes by using the `server` object available in the Nullstack Context on `server.js`.

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

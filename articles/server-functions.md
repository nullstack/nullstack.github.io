---
title: Server Functions
description: Server functions are specialized microservices that at transpile time are converted into API entry points
---

Server functions are specialized microservices that at transpile time are converted into API entry points.

To flag a function as a server function, you must declare it as *static async*.

Being a static function means it has no access to the instance scope.

However, instead of calling the static version from the *class*, you must invoke it as an *instance* function.

Server functions can be called anytime in your code and are not limited to [prerender](full-stack-lifecycle) steps.

```jsx
import Nullstack from 'nullstack';

class Component extends Nullstack {

  static async increment(context) {
    context.count++;
  }

  async handleClick() {
    await this.increment();
  }

  // ...

}

export default Component;
```

> Learn more about the [server context](/context).

## Client behavior

When you call a server function from the client, the arguments will be serialized as JSON.

The arguments will be posted against the automatically generated API and merged with the server context when it reaches the server.

The return value of the server function will be serialized back to the client and can be seamlessly used as if it were a local function.

```jsx
import Nullstack from 'nullstack';

class Component extends Nullstack {

  static async increment(context) {
    context.count++;
    return context.count;
  }

  async handleClick() {
    this.count = await this.increment();
  }

  // ...

}

export default Component;
```

## Server behavior

Server functions will be used as local functions, simply aliasing the *instance* call to the *class* and merging the arguments with the server context

## Date Convenience

Dates are serialized as UTC in JSON and deserialized back to date objects.

```jsx
import Nullstack from 'nullstack';

class Component extends Nullstack {

  async initiate() {
    const date = new Date();
    const verified = this.verifyDay({date});
  }

  static async verifyDay({date}) {
    return date.getDay() === new Date().getDay();
  }

  // ...

}

export default Component;
```

## Fetch Convenience

Fetch is available in both server and client functions for the sake of isomorphy.

```jsx
import Nullstack from 'nullstack';

class Component extends Nullstack {

  // ...

  async initiate() {
    const url = 'https://api.github.com/repos/nullstack/nullstack/issues';
    const response = await fetch(url);
    this.issues = await response.json();
  }

  // ...

}

export default Component;
```

## Server only imports

You can use the async version of import inside a server function to import a dependency only on the server bundle.

```jsx
import Nullstack from 'nullstack';

class Application extends Nullstack {

  static async getTasks() {
    const {readFileSync} = await import('fs');
    // ...
  }

  // ...

}

export default Application;
```

## Security

Keep in mind that every server function is similar to an express route in API and must be coded without depending on view logic for security.

```jsx
import Nullstack from 'nullstack';

class Component extends Nullstack {

  static async getCount({request, count}) {
    if(!request.session.user) return 0;
    return count;
  }

  // ...

}

export default Component;
```

> 💡 Server functions are not exposed to the client.

> ✨ Learn more about the [NJS file extension](/njs-file-extension).

## Reserved words

Server function names cannot collide with instance method names from the current class or its parent classes.

The following words cannot be used in server functions:

- prepare
- initiate
- hydrate
- update
- terminate

Server functions named *start* will not generate an API endpoint and can only be called by other server functions.

## Caveats

Automatically generated API endpoints are not meant to be used by 3rd-party apps.

The URL and implementation may change between versions of Nullstack.

> ✨ If you want to build an API, learn more about [how to create an API with Nullstack](/how-to-create-an-api-with-nullstack).

## Next step

⚔ Learn about the [context](/context).
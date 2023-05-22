---
title: Server Functions
description: Server functions are specialized microservices that at transpile time are converted into API entry points
---

Server functions are specialized microservices that at transpile time are converted into API entry points.

To flag a function as a server function, you must declare it as `static async`.

Being a static function means it has no access to the instance scope.

However, instead of calling the static version from the *class*, you must invoke it as an *instance* function.

Server functions can be called anytime in your code and are not limited to [prerender](/server-side-rendering) steps.

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

You can also call static methods directly which is useful for some code patterns that invoke external server functions.

```jsx
import Nullstack from 'nullstack';
import UserStore from './UserStore';

class Component extends Nullstack {

  async initiate() {
    this.users = await UserStore.getAllUsers()
  }

  // ...

}

export default Component;
```

> ✨ Learn more about the [server context](/context).

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

Server functions will be used as local functions, simply aliasing the *instance* call to the *class* and merging the arguments with the server context.

## Date Convenience

Dates are serialized as UTC in JSON and deserialized back to `Date` objects.

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

`fetch` is available in both server and client functions for the sake of isomorphy.

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

Imported dependencies that are only used inside server functions will be excluded from the client bundle.

This is useful for both accessing node.js exclusive modules and reducing the client bundle size by preprocessing data like markdown without having to expose the dependency to the end-user.

```jsx
import Nullstack from 'nullstack';
import {readFileSync} from 'fs';
import {Remarkable} from 'remarkable';

class Application extends Nullstack {

  static async getTasks() {
    const readme = readFileSync('README.md', 'utf-8');
    return new Remarkable().render(readme);
  }

  // ...

}

export default Application;
```

## Security

Keep in mind that every server function is similar to an Express route in API and must be coded without depending on view logic for security.

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

Server functions with the name starting with "_" do not generate an API endpoint and do not have access to the context by default to avoid malicious API calls.

```jsx
import Nullstack from 'nullstack';

class Component extends Nullstack {

  static async _getCount({ request }) {
    return request.count;
  }

  static async getDoubleCount({ request }) {
    if(!request.session.user) return 0;
    return this._getCount({ request }) * this._getCount({ request });
  }

  // ...

}

export default Component;
```

> 💡 Server functions are not exposed to the client.

> ✨ Learn more about the [jsx elements](/jsx-elements).

## Reserved words

Server function names cannot collide with instance method names from the current class or its parent classes.

The following words cannot be used in server functions:

- `prepare`
- `initiate`
- `launch`
- `hydrate`
- `update`
- `terminate`

Server functions named `start` will not generate an API endpoint and can only be called by other server functions.

## Reserved HTTP method prefixes

Server functions declared with their names starting with HTTP verbs will be executed accordingly to the respective HTTP method.
Supported verbs are:

- `get`
- `post`
- `put`
- `patch`
- `delete`

```jsx
import Nullstack from "nullstack";

class HTTPVerbs extends Nullstack {
  // this is a GET request
  static async getUserById({ id }) {
    // ...
  }

  // this is a POST request
  static async postUser({ data }) {
    // ...
  }

  // this is a PUT request
  static async putUserById({ id, data }) {
    // ...
  }

  // this is a PATCH request
  static async patchUserById({ id, data }) {
    // ...
  }

  // this is a DELETE request
  static async deleteUserById({ id }) {
    // ...
  }

  // ...
}

export default HTTPVerbs;
```

> 💡 Server functions without those special prefixes will be defaulted to a POST request.

> 🔥 Be mindful to the specification of each HTTP method. For example, GET requests have a limit of 2kb of data that can be passed as a parameter, so attempting to send an entire object to a server function may result in failure.

## Performance Considerations

Server functions are just API endpoints in the end of the day. Be mindful of this when making function calls, and try to keep the payload as small as possible.

```jsx
import Nullstack from 'nullstack';

class Component extends Nullstack {

  // ✅ do this 
  static async getUserProfileById({ id }) {
    // ...
  }

  async hydrate() {
    this.profile = await this.getUserProfileById({id: this.user.id})
  }

  // 🚫 do not do this 
  static async getUserProfile({ user }) {
    const id = user.id
    // ...
  }

  async hydrate() {
    this.profile = await this.getUserProfile({user: this.user})
  }

  // ...

}

export default Component;
```


## Caveats

Automatically generated API endpoints are not meant to be used by 3rd-party apps.

The URL and implementation may change between versions of Nullstack.

Server functions endpoints are based on file path and function name, changing those might cause backwards compatibility problems in some scenarios.

> ✨ If you want to build an API, learn more about [how to create an API with Nullstack](/server-request-and-response).
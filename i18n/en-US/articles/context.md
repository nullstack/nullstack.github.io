---
title: Context
description: Every function in Nullstack receives a context as the argument.
---

Every function in Nullstack receives a context as the argument.

There are two contexts, one for the client and another one for the server.

The client context lives as long as the browser tab is open.

The server context lives as long as the server is running.

Both contexts are proxies that merge the keys of 3 objects:

## 1 - Nullstack Context

These are the information that the framework makes available to you by default.

### The available global keys in both server and client are:

- [`page`](/context-page)
- [`project`](/context-project)
- [`environment`](/context-environment)
- [`params`](/routes-and-params#params)
- [`router`](/routes-and-params#router)
- [`settings`](/context-settings)
- [`worker`](/service-worker)

### The keys available only in server functions are:

- [`server`](/server-request-and-response)
- [`request`](/server-request-and-response#request-and-response)
- [`response`](/server-request-and-response#request-and-response)
- [`secrets`](/context-secrets)

### The key available only in client:

- [`instances`](/context-instances)

## 2 - Application Context

When you set a key to the context it will be available for destructuring at any depth of the application, even the parents of your component or 3rd party applications that mount your component.

Updating a key in the context causes the application to re-render automatically.

You can think of this as a single concept to replace **stores**, **contexts**, **services**, and **reducers** at the same time using the dependency injection pattern with vanilla JavaScript objects instead.

```jsx
import Nullstack from 'nullstack';

class Counter extends Nullstack {

  prepare(context) {
    context.count = 1;
  }

  static async updateTotalCount(context) {
    context.totalCount += context.count;
  }

  async double(context) {
    context.count += context.count;
    await this.updateTotalCount();
  }

  render({count}) {
    return (
      <button onclick={this.double}> {count} </button>
    )
  }

}

export default Counter;
```

```jsx
import Nullstack from 'nullstack';
import Counter from './Counter';

class Application extends Nullstack {

  prepare(context) {
    context.totalCount = 0;
  }

  render({count}) {
    return (
      <main>
        {(!count || count < 10) && <Counter />}
      </main>
    )
  }

}

export default Application;
```

## 3 - Component Context

This one contains the attributes you declare in your tag, and including:

- [`data`](/context-data)
- [`self`](/instance-self)
- [`children`](/jsx-elements#components-with-children)

If the attribute is declared in a component tag every function of that component will have access to that attribute in its context.

If the attribute is declared in a tag that has an event it will be merged into the event function context.

```jsx
import Nullstack from 'nullstack';

class Counter extends Nullstack {

  add(context) {
    context.count += context.delta + context.amount;
  }

  render({count, delta}) {
    return (
      <button onclick={this.add} amount={1}>
        add {delta} to {count}
      </button>
    )
  }

}

export default Counter;
```

```jsx
import Nullstack from 'nullstack';
import Counter from './Counter';

class Application extends Nullstack {

  prepare(context) {
    context.count = 0;
  }

  render() {
    return (
      <main>
        <Counter delta={2} />
      </main>
    )
  }

}

export default Application;
```

## Functions Context

Every function of subclasses of Nullstack is injected with a copy of the instance context merged with its arguments.

Arguments are optional, but if declared, must be a single object with keys of your choice.

```jsx
import Nullstack from 'nullstack';

class Counter extends Nullstack {

  add(context) {
    context.count += context.amount || 1;
  }

  prepare(context) {
    context.count = 0;
    this.add();            // sums 1
    this.add({amount: 2}); // sums 2
  }

  async initiate(context) {
    console.log(context.count); // 3
  }

}

export default Counter;
```
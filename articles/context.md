---
title: Context
description: Create full-stack javascript applications within seconds 
---

Every function in Nullstack receives a context as the argument.

There are two contexts, one for the client and another one for the server.

The client context lives as long as the browser tab is open.

The server context lives as long as the server is running.

Both contexts are proxies that merge the keys of 3 objects:

## 1 - Framework store

These are the information that the framework makes available to you by default.

### The available global server keys are:

- [page](/context-page)
- [project](/context-project)
- [server](/context-server-request-response)
- [request](/context-server-request-response)
- [response](/context-server-request-response)

### The available global client keys are:

- [page](/context-page)
- [params](/routes-and-params)
- [router](/routes-and-params)
- [network](/context-network)

### The available instance client keys are:

- [self](/context-self)
- [children](/renderable-components)
- [key](/context-key)

## 2 - Application store

When you set a key to the context it will be available for destructuring at any depth of the application, even the parents of your component or 3rd party applications that mount your component.

Updating a key in the context causes the application to re-render automatically.

You can think of this as a single concept to replace stores, contexts, services, and reducers at the same time using the dependency injection pattern with vanilla javascript objects instead.

```jsx
import Nullstack from 'nullstack';

class Counter extends Nullstack {

  prepare(context) {
    context.count = 1;
  }

  static async updateTotalCount(context) {
    context.totalCount += count;
  }

  async double(context) {
    context.count += context.count;
    await this.updateTotalCount({count: context.count});
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

  static async start(context) {
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

## 3 - Attributes

These are the attributes you declare in your tag.

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
        <Counter delta={2} />}
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

  prepare() {
    this.add();
    this.add({amount: 2});
  }

  add(context) {
    context.count += context.amount || 1;
  }

}

export default Counter;
```

## Next step

⚔ Learn about [routes and params](/routes-and-params).
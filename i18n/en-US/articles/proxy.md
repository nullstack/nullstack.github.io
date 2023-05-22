---
title: Proxy
description: Proxies are the basic mechanism that allow Nullstack to implement rendering and context
---

Proxies are the basic mechanism that allow Nullstack to implement rendering and context

## Understanding the proxy

Nullstack has some conventions over when to proxy an object

Any mutations to a proxy will trigger a rerender cycle

Instances of Nullstack class are always proxied


```jsx
import Nullstack from 'nullstack';

class Component extends Nullstack {

  // standard javascript objects are proxied
  standardObjects = { key: 'value' }

  // nested standard javascript objects are proxied
  nestedObjects = {nested: { key: 'value' }}

  // standard arrays are proxied
  standardArray = [1, 2, 3]

  // nested standard arrays are proxied
  nestedArray = [[1, 2, 3]]

  // custom classes are not proxied
  customClassInstance = new CustomClass()

  // uderscored properties are never proxied
  _underscoredArray = []
  _underscoredObject = {}

  // dom references are not proxied
  element = null

  render() {
    <div ref={this.element}> element </div>
  }

}

export default Component;
```

## Understanding the functions scope

Nullstack has some conventions over when to expose the context to a function

```jsx
import Nullstack from 'nullstack';

class Component extends Nullstack {

  static async staticAsyncFunction(serverContext) {
    // static and async functions have access to the server context
    // an instance method reflection of this function is created
    // this will be bound to the Component class
  }

  static async _underscoredStaticAsyncFunction() {
    // static and async and underscored functions have no access to context
    // this will be bound to the Component class
  }

  static staticFunction() {
    // static only functions have no access to context
    // this will be bound to the Component class
  }

  static _underscoredStaticFunction() {
    // static only and underscored functions have no access to context
    // this will be bound to the Component class
  }

  method(clientContext) {
    // methods have access to the client context
    // this will be bound to the instance
  }

  _underscoredMethod() {
    // underscored methods have no access to the client context
    // this will be bound to the instance
  }

  async asyncMethod(clientContext) {
    // async methods have access to the client context
    // this will be bound to the instance
  }
   
  async _underscoredAsyncMethod() {
    // underscored async methods have no access to the client context
    // this will be bound to the instance
  }

}

export default Component;
```

## Underscored tricks

You can create a method starting with `_`, that means you're creating vanilla JS code that ignores proxies. 

With that you'll be able to add or remove the event listener.

```jsx
import Nullstack from "Nullstack";

class Application extends Nullstack {
  _listener() {
    // do something
  }

  async hydrate() {
    window.addEventListener("resize", this._listener, false);
  }

  async terminate() {
    window.removeEventListener("resize", this._listener, false);
  }

  render() {
    return <main>Content</main>;
  }
}

export default Application;
```

You can also use it to ignore the context

```jsx
import Nullstack from "Nullstack";

class Application extends Nullstack {
  _method(prop) {
    // do something
  }

  async hydrate() {
    // notice its not passing an object as context normally requires
    this._method(true)
  }

}

export default Application;
```
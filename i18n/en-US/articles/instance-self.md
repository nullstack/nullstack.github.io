---
title: Instance Self
description: The self object is a proxy in the Nullstack Context available in client and gives you information about the instance lifecycle
---

- Type: `object`
- Origin: [Nullstack Context](/context#----nullstack-context)
- Availability: **client**
- **readonly** in **client** context

It gives you information about the instance lifecycle and it's unique [`key`](#instance-key).

Each instance receives its own `self` object.

The following keys are available in the object:

- [`key`](#instance-key): `string`

When a lifecycle method is resolved, even if not declared, an equivalent key is set to `true` in `self`.

If the component was server-side rendered the `prerendered` key will remain `true` until it is terminated.

The `element` key points to the DOM selector and is only guaranteed to exist when `hydrate` is being called since `prepare` and `initiate` could run in the server.

> 💡 Do not use `element` to guess the environment, instead use the [`environment`](/context-environment) for that.

Observing `self` is a nice way to avoid giving placeholder information to the end-user.

```jsx
import Nullstack from 'nullstack';

class Page extends Nullstack {

  // ...

  async initiate() {
    this.price = await this.getPrice();
  }

  async hydrate({self}) {
    self.element.querySelector('input').focus();
  }
 
  render({self}) {
    if(!self.prerendered && !self.initiated) return false;
    return (
      <form> 
        <input type="number" bind={this.price} />
        <button disabled={!self.hydrated}> 
          Save
        </button>
      </form>
    )
  }

}

export default Page;
```

> 💡 Components that get optimized into [functional components](/renderable-components) have no access to `self`.

## Instance Key

- Type: `string`
- Origin: [Component Context](/context#----component-context)
- Availability: **client**
- **readonly** in **client** context or after defined it's value as attribute

It allows you to persist the instance when it moves in the dom.

You can declare one `key` per instance.

> 💡 If you do not declare a `key` nullstack will generate one based on dom depth.

> 🔥 Keys cannot start with "_." to avoid conflicts with Nullstack generated keys

Keys must be globally unique since the component could move anywhere around the dom and not only between its siblings.

### Preserving state

Keys are useful to preserve state in [stateful components](/stateful-components) when you move them in the dom.

This is especially useful for dynamically sized lists that invoke components.

```jsx
import Nullstack from 'nullstack';
import Item from './Item';

class List extends Nullstack {

  // ...

  async initiate() {
    this.items = await this.getItems();
  }
 
  render({self}) {
    const componentKey = self.key;
    return (
      <ul> 
        {this.items.map((item) => (
          <Item key={`${componentKey}-${item.id}`} {...item} />
        ))}
      </ul>
    )
  }

}

export default Page;
```

### Shared Instances

You can also use keys to share the instance between two elements.

Only the first encounter of the `key` will run its [lifecycle](/full-stack-lifecycle).

```jsx
import Nullstack from 'nullstack';

class Counter extends Nullstack {

  count = 0;

  render({amount}) {
    return (
      <div>
        <button onclick={{count: this.count+1}}>
          {this.count} x {amount} = {this.count * amount}
        </button>  
      </div>
    )
  }

}

export default Counter;
```

```jsx
import Nullstack from 'nullstack';
import Counter from './Counter';

class Application extends Nullstack {

  render() {
    return (
      <main>
        <Counter key="a" amount={1} />
        <Counter key="b" amount={2} />
        <Counter key="b" amount={3} />
      </main>
    )
  }

}

export default Application;
```

## Instance Key

- Type: `string`
- Origin: [Component Context](/context#----component-context)
- Availability: **client**
- **readonly** in **client** context or after defined it's value as attribute

It allows you to persist the instance when it moves in the dom.

You can declare one key per instance.

> 💡 If you do not declare a key nullstack will generate one based on dom depth.

> 🔥 Keys cannot start with "_." to avoid conflicts with Nullstack generated keys

Keys must be globally unique since the component could move anywhere around the dom and not only between its siblings.

### Preserving state

Keys are useful to preserve state in [stateful components](/stateful-components) when you move them in the dom.

This is especially useful for dynamically sized lists that invoke components.

```jsx
import Nullstack from 'nullstack';
import Item from './Item';

class List extends Nullstack {

  // ...

  async initiate() {
    this.items = await this.getItems();
  }
 
  render({self}) {
    const componentKey = self.key;
    return (
      <ul> 
        {this.items.map((item) => (
          <Item key={`${componentKey}-${item.id}`} {...item} />
        ))}
      </ul>
    )
  }

}

export default Page;
```

### Shared Instances

You can also use keys to share the instance between two elements.

Only the first encounter of the key will run its [lifecycle](/full-stack-lifecycle)

```jsx
import Nullstack from 'nullstack';

class Counter extends Nullstack {

  count = 0;

  render({amount}) {
    return (
      <div>
        <button onclick={{count: this.count+1}}>
          {this.count} x {amount} = {this.count * amount}
        </button>  
      </div>
    )
  }

}

export default Counter;
```

```jsx
import Nullstack from 'nullstack';
import Counter from './Counter';

class Application extends Nullstack {

  render() {
    return (
      <main>
        <Counter key="a" amount={1} />
        <Counter key="b" amount={2} />
        <Counter key="b" amount={3} />
      </main>
    )
  }

}

export default Application;
```

## Next step

⚔ Learn about the [server request and response](/server-request-and-response).
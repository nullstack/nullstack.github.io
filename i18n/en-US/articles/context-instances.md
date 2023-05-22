---
title: Context Instances
description: The instances object is a proxy in the Nullstack Context available in the client and gives you all active instances in the application
---

- Type: `object`
- Origin: [Nullstack Context](/context#----nullstack-context)
- Availability: **client**
- **readwrite** in **client** context

It gives you all active instances of the application.

> 💡 Active instances are the ones created and not yet [terminated](/full-stack-lifecycle#terminate)

As explained in [instance `key`](/instance-self#instance-key), keys play a big role in defining a unique identifier for components.

> 🔥 Nullstack trusts its developers to know what they are doing and exposes as much internal behavior for the programmer to do as it wishes, use with caution.

The default key for class components is a join between the class name and the dom depth like `Counter/1.1` and are hard for humans to interact with.

The first component of your application will have the key `application` by default.

> 💡 keys define which instance will be used to render the component, you can use it to force a node to reinstantiate.

Adding an unique `key` to **Counter** makes it easier to access on `instances` list:

```jsx
import Nullstack from 'nullstack';
import Counter from './Counter';
import AnyOtherComponent from './AnyOtherComponent';

class Application extends Nullstack {

  render() {
    return (
      <main>
        <Counter key="counter" />
        <AnyOtherComponent/>
      </main>
    )
  }

}

export default Application;
```

```jsx
import Nullstack from 'nullstack';

class Counter extends Nullstack {

  value = 0;

  increment() {
    this.value++;
  }

  render() {
    return <p> Count: {this.value} </p>
  }

}

export default Counter;
```

You can access any methods and instance variables from **counter** instance on **AnyOtherComponent**:

```jsx
import Nullstack from 'nullstack';

class AnyOtherComponent extends Nullstack {

  render({ instances }) {
    return (
      <button onclick={instances.counter.increment}>
        Add 1 to {instances.counter.value}
      </button>
    )
  }

}

export default AnyOtherComponent;
```

The use of `instances` unlocks unlimited custom behaviors like:

- A notification icon at the navbar that can be updated from other components at certain actions
- A *toast* component that can be invoked from anywhere in your application
- A *store* system with custom dispatch methods similar to Redux
- Something we haven't even imagined, dream on and post your ideas on GitHub!
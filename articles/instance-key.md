---
title: Instance Key
description: The instance key is a string in the framework store part of your context and allows you to persist the instance when it moves in the dom
---

The instance key is a string in the framework store part of your context and allows you to persist the instance when it moves in the dom.

This key is *readonly* after you assign the attribute and available only in the *client* context.

You can declare one key per instance.

> 💡 If you do not declare a key nullstack will generate one based on dom depth.

> 🔥 Keys cannot start with "_." to avoid conflicts with Nullstack generated keys

Keys must be globally unique since the component could move anywhere around the dom and not only between its siblings.

## Preserving state

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
    return (
      <ul> 
        {this.items.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </ul>
    )
  }

}

export default Page;
```

## Shared Instances

You can also use keys to share the instance between two elements.

Only the first encounter of the key will run its lifecycle

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

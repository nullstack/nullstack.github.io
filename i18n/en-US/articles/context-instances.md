---
title: Context Instances
description: The instances object is a proxy in the Nullstack Context available in client and gives you all active instances in application
---

- Type: `object`
- Origin: [Nullstack Context](/context#----nullstack-context)
- Availability: **client**
- **readwrite** in **client** context

It gives you all active instances of the application.

> 🔥 Active instances are the ones created and not yet [terminated](/full-stack-lifecycle#terminate)

As explained in [instance `key`](/instance-self#instance-key), keys play a big role on defining an unique identifier for components.

Based on it, was right around the corner the implementation of an listing of instances.

```jsx
import Nullstack from 'nullstack';
import Counter from './Counter';
import Count from './Count';

class Application extends Nullstack {

  render() {
    return (
      <main>
        <Count key="count" />
        <Counter/>
      </main>
    )
  }

}

export default Application;
```

Adding an unique `key` to **Count** makes it available on `instances` list.

```jsx
import Nullstack from 'nullstack';

class Count extends Nullstack {

  count = 0;
  add() {
    this.count++;
  }

  render() {
    return <p> Count: {this.count} </p>
  }

}

export default Count;
```

Without the need to call an update of the value on **Count**, you can do it directly on **Counter**:

```jsx
import Nullstack from 'nullstack';

class Counter extends Nullstack {

  render({ instances }) {
    const { count } = instances;
    return (
      <button onclick={count.add}>
        Add count
      </button>
    )
  }

}

export default Counter;
```

[Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) `instances` from [`context`](/context) at `render`, and there is **Count** and all it's properties to be called or updated.

Well, this was a focused demo of the concept, but take your time to imagine:

- An notification icon at navbar, updating on every read on messages component, and having a method to mark all of them as read too
- An count in the header showing how many posts/emails did you read, unread or liked, without the need of an global state management or API requests
- Something not even we imagined, so, dream on!

## Next step

⚔ Learn about the [context `environment`](/context-environment).
---
title: Persistent Components
description: Persistent Components are components that persists on memory
---

Persistent Components are components that persists on memory.

It preserves the state even when moved out from DOM and is good for saving whole app parts in cache.

It runs [`prepare`](/full-stack-lifecycle#prepare) and [`initiate`](/full-stack-lifecycle#initiate) lifecycle hooks only once.

It always runs [`hydrate`](/full-stack-lifecycle#hydrate) when entering DOM and [`terminate`](/full-stack-lifecycle#terminate) when exiting.

```jsx
import Nullstack from 'nullstack';
import Counter from './Counter';

class Application extends Nullstack {

  showCounter = true;
  toggleCounter() {
    this.showCounter = !this.showCounter;
  }

  render() {
    return (
      <div>
        {this.showCounter && <Counter persistent key="Counter"/>}
        <button onclick={this.toggleCounter}>Show/Hide Counter</button>
      </div>
    )
  }

}

export default Application;
```

Whenever `showCounter` becomes `false`, `Counter` exits the tree but it's state keeps the same when re-entering.

It also mantains the component in [`instances`](/context-instances) listing, making possible to manage it's state even when outside DOM:

```jsx
import Nullstack from 'nullstack';
import Counter from './Counter';

class Application extends Nullstack {
  // ...
  updateCounter({ instances }) {
    instances.Counter.count += 1;
  }

  render() {
    return (
      <div>
        ...
        <button onclick={this.updateCounter}>
          Update Counter even outside the DOM
        </button>
      </div>
    )
  }
}

export default Application;
```

When re-entering the tree, the state is shown according to the changes made.

You can even dynamically enable/disable persistency, bringing back the default behavior:

```jsx
import Nullstack from 'nullstack';
import Counter from './Counter';

class Application extends Nullstack {
  // ...
  persistentCounter = true
  tooglePersistency() {
    this.persistentCounter = !this.persistentCounter;
  }

  render() {
    return (
      <div>
        <Counter persistent={this.persistentCounter}/>
        <button onclick={this.tooglePersistency}>
          Toogle persistency in Counter
        </button>
      </div>
    )
  }
}

export default Application;
```
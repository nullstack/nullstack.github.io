---
title: Full Stack Lifecycle
description: Lifecycle methods are special named functions that you can declare in the class.
---

Lifecycle methods are special named functions that you can declare in the class.

Each lifecycle method runs in a specific order in a queue so it's guaranteed that all components initiated in that cycle will be prepared before the first one is initiated.

## Prepare

This method is blocking and runs before the first time the component is rendered.

You can use this function to set the state that the user will see before things are loaded.

If the user is entering from this route `prepare` will run in the server before Nullstack [server-side renders](/server-side-rendering) your application.

If the user is navigating from another route this method will run in the client.

```jsx
import Nullstack from 'nullstack';

class Component extends Nullstack {

  // ...

  prepare() {
    this.date = new Date();
  }

  // ...

}

export default Component;
```

## Initiate

This method can be async and runs right after the component is prepared and rendered for the first time.

You can use this function to invoke another server function and load the data to present the page.

If the user is entering from this route `initiate` will run in the server.

Nullstack will wait till the promise is resolved and then finally generate the HTML that will be served.

If the user is navigating from another route this method will run in the client.

After this method promise is fulfilled `this.initiated` will be set to true

```jsx
import Nullstack from 'nullstack';

class Component extends Nullstack {

  // ...

  async initiate() {
    this.task = await getTaskByDay({
      day: this.date
    });
  }

  render() {
    if(!this.initiated) return false
    return (
      <p> {this.task.description} </p>
    )
  }

}

export default Component;
```

> ✨ Learn more about [server functions](/server-functions).

## Launch

Runs before pre-rendering and at each awakening.

You can update the component with things that doesn't require data fetching operations.

> ✨ Use this lifecycle to setup Meta tags.

```jsx
import Nullstack from 'nullstack';

class Component extends Nullstack {

  // ...

  launch({ page }) {
    page.title = 'Very good title that considers SEO'
  }

  // ...

}

export default Component;
```

## Hydrate

This method is async and will only run in the client.

This method will always run no matter which environment started the component.

This is a good place to trigger dependencies that manipulate the dom or can only run on the client-side.

After this method promise is fulfilled `this.hydrated` will be set to true

```jsx
import Nullstack from 'nullstack';

class Component extends Nullstack {

  // ...

  async hydrate() {
    this.timer = setInterval(() => {
      console.log(this.date);
    }, 1000);
  }

  render() {
    if(!this.hydrated) return false
    return (
      <p> timer id: {this.timer} </p>
    )
  }

}

export default Component;
```

## Update

This method is async and will only run in the client.

This method runs on every component anytime the application state changes.

> 🔥 Be careful not to cause infinite loopings when mutating state inside `update`.

This will run right before rendering but will not block the rendering queue.

The `update` function will not start running until the application is rendered after the `initiate`.

```jsx
import Nullstack from 'nullstack';

class Component extends Nullstack {

  // ...

  async update() {
    const today = new Date();
    if(today.getDay() != this.date.getDay()) {
      this.date = today;
      await this.initiate();
    }
  }

  // ...

}

export default Component;
```

> ✨ Lifecycle methods have no special side effects, you can call them manually without causing problems.

## Terminate

This method is async and will only run in the client.

This method will run after your component leaves the DOM.

This is the place to clean up whatever you set up in the `hydrate` method.

The instance will be garbage collected after the `Promise` is resolved.

After this method promise is fulfilled `this.terminated` will be set to true which is useful in the case of [persistent components](/persistent-components)

```jsx
import Nullstack from 'nullstack';

class Component extends Nullstack {

  // ...

  async terminate() {
    clearInterval(this.timer);
  }

  executeBackgroundTask() {
    if(!this.terminated) {
      // ...
    }
  }

  // ...

}

export default Component;
```
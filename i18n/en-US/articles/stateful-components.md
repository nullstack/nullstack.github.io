---
title: Stateful Components
description: A productive full-stack web framework should not force you to think about framework details
---

A productive full-stack web framework should not force you to think about framework details.

Nullstack takes control of its subclasses and generates a proxy for each instance.

When you call anything on your class you are actually telling Nullstack what to do with the environment behind the scenes.

This allows you to use vanilla javascript operations like assigning to a variable and see the reflection in the dom.

## Mutability

You can mutate instance variables to update your application state.

Functions are automatically bound to the instance proxy and can be passed as a reference to events.

Events are declared like normal HTML attributes.

```jsx
import Nullstack from 'nullstack';

class Counter extends Nullstack {

  count = 0;

  increment() {
    this.count++;
  }
  
  render() {
    return (
      <button onclick={this.increment}> 
        {this.count}
      </button>
    )
  }

}

export default Counter;
```

> 💡 Updates are made in batches, usually while awaiting async calls, so making multiple assignments have no performance costs!

## Object Events

You can shortcut events that are simple assignments by passing an object to the event.

Each key of the object will be assigned to the instance.

```jsx
import Nullstack from 'nullstack';

class Counter extends Nullstack {

  count = 0;
  
  render() {
    return (
      <button onclick={{count: this.count + 1}}> 
        {this.count}
      </button>
    )
  }

}

export default Counter;
```

## Event Source

By default, events refer to this when you pass an object.

You can use the source attribute to define which object will receive the assignments.

```jsx
import Nullstack from 'nullstack';

class Paginator extends Nullstack {
  
  render({params}) {
    return (
      <button source={params} onclick={{page: 1}}> 
        First Page
      </button>
    )
  }

}

export default Paginator;
```

> ✨ Learn more about [context params](/routes-and-params).

> 💡 If you do not declare a source to the event, Nullstack will inject a source={this} at transpile time in order to completely skip the runtime lookup process!

## Event Context

Attributes of the event target will be merged to the instance context and can be destructured in the function signature.


```jsx
import Nullstack from 'nullstack';

class Counter extends Nullstack {

  count = 0;

  increment({delta}) {
    this.count += delta;
  }
  
  render() {
    return (
      <button onclick={this.increment} delta={2}> 
        {this.count}
      </button>
    )
  }

}

export default Counter;
```

> 💡 Any attribute with primitive value will be added to the DOM. 

> ✨ Consider using [data attributes](/context-data) to make your html valid.

## Original Event

The browser default behavior is prevented by default.

You can opt-out of this by declaring a default attribute to the event element.

A reference to the original event is always merged with the function context.

```jsx
import Nullstack from 'nullstack';

class Form extends Nullstack {

  submit({event}) {
    event.preventDefault();
  }
  
  render() {
    return (
      <form onsubmit={this.submit} default>
        <button> Submit </button>
      </form>
    )
  }

}

export default Form;
```

## Next steps

⚔ Learn about the [full-stack lifecycle](/full-stack-lifecycle).
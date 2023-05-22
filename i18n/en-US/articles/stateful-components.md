---
title: Stateful Components
description: A productive full stack web framework should not force you to think about framework details
---

Stateful components are classes that extend nullstack and are able to hold state that reflects in the ui.

A productive full stack web framework should not force you to think about framework details.

Nullstack takes control of its subclasses and generates a proxy for each instance.

When you call anything on your class you are actually telling Nullstack what to do with the environment behind the scenes.

This allows you to use vanilla JavaScript operations like assigning to a variable and see the reflection in the dom.

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

## Events array 

You can pass an array of events as prop and they will run in parallel

You can also pass falsy values to skip events conditionaly.

```jsx
import Nullstack from 'nullstack';

class Counter extends Nullstack {

  count = 0;

  increment() {
    this.count++;
  }

  log() {
    console.log(this.count);
  }

  logUnlessZero() {
    console.log(this.count > 0);
  }
  
  render() {
    return (
      <button onclick={[this.increment, this.log, this.count > 0 && this.logUnlessZero]}> 
        {this.count}
      </button>
    )
  }

}

export default Counter;
```

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

By default, events refer to `this` when you pass an object.

You can use the `source` attribute to define which object will receive the assignments.

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

> ✨ Learn more about [context `params`](/routes-and-params).

> 💡 If you do not declare a source to the event, Nullstack will inject a `source={this}` at transpile time in order to completely skip the runtime lookup process!

## Event Context

The context of the event is a spread of the Nullstack client context, the component context, and the props of the element that generated the event

```tsx
import Nullstack, { NullstackClientContext } from 'nullstack';

interface CounterProps {
  multiplier: number 
}

interface CounterIncrementProps {
  delta: number
}

class Counter extends Nullstack<CounterProps> {

  count = 0;

  increment({ delta, multiplier }: NullstackClientContext<CounterProps & CounterIncrementProps>) {
    this.count += delta * multiplier;
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

> ✨ Consider using [`data` attributes](/context-data) to make your html valid.

## Original Event

The browser default behavior is prevented by default.

You can opt-out of this by declaring a `default` attribute to the event element.

A reference to the original event is always merged with the function context.

```jsx
import Nullstack from 'nullstack';

class Form extends Nullstack {

  submit({ event }) {
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

## Debounced Events

You can use the attribute `debounce` passing a number of miliseconds to delay the events of that element

```jsx
import Nullstack from 'nullstack';

class Counter extends Nullstack {
  
  count = 0

  increment() {
    this.count++
  }
  
  render() {
    return (
      <button onclick={this.increment} debounce={2000}> 
        increment 
      </button>
    )
  }

}

export default Counter;
```

## TypeScript 

Stateful Components accept a generic that reflect in the props that its tag will accept

```tsx
// src/Counter.tsx
import Nullstack, { NullstackClientContext } from 'nullstack';

interface CounterProps {
  multiplier: number 
}

class Counter extends Nullstack<CounterProps> {

  // ...
  
  render({ multiplier }: NullstackClientContext<CounterProps>) {
    return <div> {multiplier} </div>
  }

}

export default Counter;
```

```tsx
// src/Application.tsx
import Counter from './Counter'

export default function Application() {
  return <Counter multiplier={4} />
}
```

## Inner components

Instead of creating a new component just to organize code-splitting, you can create an inner component.

Inner components are any method that the name starts with `render` followed by an uppercase character.

Inner components share the same instance and scope as the main component, therefore, are very convenient to avoid problems like props drilling.

To invoke the inner component use a JSX tag with the method name without the `render` prefix.

```tsx
import Nullstack, { NullstackClientContext, NullstackNode } from 'nullstack';

interface CounterProps {
  multiplier: number 
}

interface CounterButtonProps {
  delta: number
}

declare function Button(context: CounterProps): NullstackNode

class Counter extends Nullstack<CounterProps> {

  count = 0;

  increment({ delta, multiplier }: NullstackClientContext<CounterProps & CounterButtonProps>) {
    this.count += delta * multiplier;
  }

  renderButton({ delta = 1 }: NullstackClientContext<CounterProps & CounterButtonProps>) {
    return (
      <button onclick={this.increment} delta={delta}> 
        {this.count}
      </button>
    )
  }
  
  render() {
    return (
      <div>
        <Button />
        <Button delta={2} />
      </div>
    )
  }

}

export default Counter;
```

> 💡 Nullstack will inject a constant reference to the function at transpile time in order to completely skip the runtime lookup process!
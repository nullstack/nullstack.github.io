---
title: Functional Components
description: Functional components are simple pure functions that can update context and have no state of it's own
---

Since v0.9.21 Nullstack has the simplicity of pure functional components out-of-box.

This one follows [renderable components](/renderable-components) spec but with more emphasis on the **renderable**.

Using pure functions you can write focused-on-render components as follows:

```jsx
const AnonComponent = function(context) {
  return (
    <div html={context.html} id={context.id}></div>
  )
}

function NamedComponent(context) {
  return (
    <div html={context.html} id={context.id}></div>
  )
}

const ArrowComponent = (context) => {
  return (
    <div html={context.html} id={context.id}></div>
  )
}

export default {
  AnonComponent,
  NamedComponent,
  ArrowComponent
};
```

And exported like that it's use would be:

```jsx
import Nullstack from 'nullstack';
import Functionals from './Functionals';

class Application extends Nullstack {

  render() {
    const html = "<p>text</p>";
    return (
      <main>
        <Functionals.AnonComponent html={html} id="1"/>
        <Functionals.NamedComponent html={html} id="2"/>
        <Functionals.ArrowComponent html={html} id="3"/>
      </main>
    )
  }

}

export default Application;
```

Then the rendering result would directly look like:

```html
<div id="1"> <p>text</p> </div>
<div id="2"> <p>text</p> </div>
<div id="3"> <p>text</p> </div>
```

## Binding Context Values

Even not having state of it's own, Nullstack functional components can bind and update [`context`](/context) values.

```jsx
import Nullstack from 'nullstack';
import BindPureComponent from './Functionals';

class Application extends Nullstack {

  prepare(context) {
    context.count = 0;
  }

  render() {
    return (
      <main>
        <BindPureComponent/>
      </main>
    )
  }

}

export default Application;
```

Registering `counter` in the `context` like in the above component, we can read and update this data in the **BindPureComponent** as follows:

```jsx
export default function BindPureComponent(context) {
  return (
    <div>
      <input type="number" bind={context.count}/>
      <p>{context.count}</p>
    </div>
  )
}
```

Or, even use local functions ran by events to do this update:

```jsx
export default function EventPureComponent(context) {
  const multiple = 2;
  function multiply() {
    context.count *= multiple;
  }

  return (
    <div>
      <button onclick={multiply}>Multiply</button>
      <p>{context.count}</p>
    </div>
  )
}
```

> 💡 With it's versatility and simplicity functional components are perfect for stateless components libraries

## Next step

⚔ Learn about the [context `data`](/context-data).
---
title: Rendering a Component
description: Import Nullstack and extend your class from it define an instance method called render which returns any JSX and export the component 
---

The simplest component you can make is a rendering component.

Create a file in your src folder with the name of your component and the [njs extension](/njs-file-extension).

In this example it is going to be called HelloWorld.njs.

All you have to do is to import Nullstack and extend your class from it, define an instance method called render that returns any JSX, and export the component.

```jsx
import Nullstack from 'nullstack';

class HelloWorld extends Nullstack {
 
  render() {
    return (
      <div> Hello World </div>
    )
  }

}

export default HelloWorld;
```

The code above is just declaring the component, you still have to use it.

Importing the component in your application gives you the ability to use a new tag in your render.

This tag will be replaced with whatever you returned in your component render.

```jsx
import Nullstack from 'nullstack';

import './Application.scss';

import HelloWorld from './HelloWorld';

class Application extends Nullstack {

  // ...

  render({page}) {
    return (
      <main>
        <h1> {page.title} </h1>
        <a href="https://nullstack.app/documentation" target="_blank"> Read the documentation </a>
        <HelloWorld />
      </main>
    )
  }

}

export default Application;
```

## Using HTML attributes

Nullstack JSX deviates a little from the spec.

You can use the normal HTML attributes like *class* and *for* directly.

```jsx
<label for="input" class="dont-label-me"> I am a label </label>
```

## Headless components

If you want to skip rendering the component at all you can simply return false from the render.

```jsx
import Nullstack from 'nullstack';

class Headless extends Nullstack {
 
  render() {
    return false;
  }

}

export default Headless;
```

This will allocate DOM space for when you decide to render markup there.

This is also useful for conditional rendering.

If all you want to do is to generate an invisible component you can skip defining the render method at all.

## Inner components

Instead of creating a new component just to organize code-splitting, you can create an inner component.

Inner components are any method that the name starts with render followed by an uppercase character.

Inner components share the same instance and scope as the main component, therefore, are very convenient to avoid problems like props drilling.

To invoke the inner component use a JSX tag with the method name without the render prefix.

```jsx
import Nullstack from 'nullstack';

class Post extends Nullstack {

  renderArticle() {
    return (
      <article> Content </article>
    )
  }

  renderAside() {
    return (
      <aside> Related content </aside>
    )
  }
 
  render() {
    return (
      <div>
        <Article />
        <Aside />
      </div>
    )
  }

}

export default HelloWorld;
```

## Boolean attributes

Attributes can be assigned as a boolean.

When the value is false the attribute will not be rendered at all.

When the value is true it will be rendered as a boolean attribute without a string value.

```jsx
<button disabled={false}> Button </button>
```

You can shortcut attributes when you know the value will always be true.

```jsx
<button disabled> Button </button>
```

> ✨ Learn more about [attributes](/context-and-attributes)

## Element tag

If you need to decide the tag name at runtime, you can use the element tag and set the tag attribute conditionally.

```jsx
<element tag={!!link ? 'a' : 'span'} href={link || false}>
  some arbitrary text
</element>
```

## SVG Elements

SVG can be used as if it were any regular HTML tag.

You can manipulate the SVG using attributes and events normally.

```jsx
<svg height={this.size} viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="40" onclick={this.grow} />
</svg> 
```

> ✨ Learn more about [events](/events)

## Components with Children

Your component can be invoked passing a block of content.

```jsx
<Heading> 
  <h1> Hello World </h1>
</Heading>
```

This doesn't automatically render the block since it wouldn't know where to place it.

You can destructure the children on the render method and place it in your markup.

```jsx
import Nullstack from 'nullstack';

class Heading extends Nullstack {
 
  render({children}) {
    return (
      <div>{children}</div>
    )
  }

}

export default Heading;
```

> ✨ This is possible because the children key is part of the [instance context](/context-and-attributes)

## Lists

You can map over lists without declaring a key.

Lists that may change length must be wrapped in a parent element just for them.

```jsx
<ul>
  {list.map((item) => <li>item.name</li>)}
</ul>
```

You can emulate a fixed-size list by returning false instead of an element to reserve dom space.

```jsx
{list.map((item) => (
  item.visible ? <div>{item.name}</div> : false
)}
```

It's a nice practice to use inner components combined with lists to clean up your code.

```jsx
import Nullstack from 'nullstack';

class List extends Nullstack {

  items = [
    {visible: true, number: 1},
    {visible: false, number: 2},
    {visible: true, number: 3}
  ]

  renderItem({visible, number}) {
    if(!visible) return false;
    return (
      <li> {number} </li>
    )
  }
 
  render() {
    return (
      <ul>
        {this.items.map((item) => <Item {...item} />)}
      </ul>
    )
  }

}

export default List;
```

> ✨ Sometimes you will notice keys in the map. Learn more about [instance keys](/instance-keys)

## Caveats

Currently, Nullstack doesn't support JSX Fragments. If you want to see this feature implemented please [open an issue on github](https://github.com/nullstack/nullstack/issues).

## Next steps

⚔ Add state to your component using [controlled components](/controlled-components).
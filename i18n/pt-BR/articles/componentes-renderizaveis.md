---
title: Renderable Components
description: Renderable components are very similar to web components they give you the ability to create new HTML tags that shortcut a group of other HTML tags
---

The simplest component you can make is a renderable component.

Renderable components are very similar to web components, they give you the ability to create new HTML tags that shortcut a group of other HTML tags.

Create a file in your src folder with the name of your component and the [njs extension](/njs-file-extension).

In this example it is going to be called HelloWorld.njs.

All you have to do is to import Nullstack or any of its subclasses and extend your class from it, define an instance method called render that returns any JSX, and export the component.

> ✨ Install the official [Nullstack VSCode Extension](https://marketplace.visualstudio.com/items?itemName=ChristianMortaro.vscode-nullstack) to generate classes with a snippet.

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

> 💡 Nullstack will inject a constant reference to the function at transpile time in order to completely skip the runtime lookup process!

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

> ✨ Learn more about [attributes](/context).

## Element tag

If you need to decide the tag name at runtime, you can use the element tag and set the tag attribute conditionally.

```jsx
<element tag={!!link ? 'a' : 'span'} href={link || false}>
  some arbitrary text
</element>
```

When the tag attribute is omitted, Nullstack will default to a *div*.

## SVG Elements

SVG can be used as if it were any regular HTML tag.

You can manipulate the SVG using attributes and events normally.

```jsx
<svg height={this.size} viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="40" onclick={this.grow} />
</svg> 
```

> ✨ Learn more about [events](/stateful-components).

## Components with children

Your component can be invoked passing a block of content.

```jsx
<Header> 
  <h1> Hello World </h1>
</Header>
```

This doesn't automatically render the block since it wouldn't know where to place it.

You can destructure the children on the render method and place it in your markup.

```jsx
import Nullstack from 'nullstack';

class Header extends Nullstack {
 
  render({children}) {
    return (
      <div>{children}</div>
    )
  }

}

export default Header;
```

> ✨ This is possible because the children key is part of the [instance context](/context).

## Lists

You can map over lists without declaring a key.

Lists that may change length must be wrapped in a parent element just for them.

```jsx
<ul>
  {list.map((item) => <li>{item.name}</li>)}
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

> ✨ Sometimes you will notice keys in the map. Learn more about the [instance key](/instance-key).

## Inner HTML

You can set the inner HTML of an element with the *html* attribute.

Links inside the HTML string will be replaced with [routable anchors](/routes-and-params).

```jsx
import Nullstack from 'nullstack';

class Post extends Nullstack {

  content = `
    <h1> This is a Post </h1>
    <a href="/other-post">
      Check this other post
    </a>
  `;
 
  render() {
    return (
      <article html={this.content} />
    )
  }

}

export default Post;
```

> 🔥 Be careful! When using user-generated HTML you are in risk of script injection

## The head tag

Renderable components can render inside the head tag an unlimited number of times at any depth of the application.

The head tag will only be updated during the [server-side rendering](/server-side-rendering) process and changes will be ignored after the [hydration](/full-stack-lifecycle) process.

```jsx
import Nullstack from 'nullstack';

class Application extends Nullstack {

  // ...

  render() {
    return (
      <main>
        <div>
          <head>
            <link rel="preconnect" href="https://www.googletagmanager.com" />
          </head>
        </div>
        <head>
          <link rel="preload" href="/roboto-v20-latin-300.woff2" as="font" type="font/woff2" crossorigin />
          <link rel="preload" href="/crete-round-v9-latin-regular.woff2" as="font" type="font/woff2" crossorigin />
        </head>
      </main>
    )
  }

}

export default Application;
```

> 🔥 you should not use the head tag to update [metatags](/context-page) that Nullstack already controls

## Caveats

Currently, Nullstack doesn't support JSX Fragments. If you want to see this feature implemented please [open an issue on github](https://github.com/nullstack/nullstack/issues).

## Next step

⚔ Add state to your component using [stateful components](/stateful-components).
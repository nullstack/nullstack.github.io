---
title: JSX elements
description: Nullstack JSX deviates a little from the spec.
---

## Using HTML attributes

Nullstack JSX deviates a little from the spec.

You can use the normal HTML attributes like `class` and `for` directly.

```jsx
<label for="input" class="dont-label-me"> I am a label </label>
```

## Headless components

If you want to skip rendering the component at all you can simply return `false` from the render.

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

## Boolean attributes

Attributes can be assigned as a boolean.

When the value is `false` the attribute will not be rendered at all.

When the value is `true` it will be rendered as a boolean attribute without a string value.

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

When the tag attribute is omitted, Nullstack will default to a `div`.

## Fragments

Fragments are elements that renders it's contents in the parent component.

```jsx
export default function Fragmented() {
  return (
    <>
      <>
        <button> I'm a button! </button>
      </>
      <p> Paragraph! </p>
    </>
  )
}
```

Wherever it is used, the above functional component will be rendered as follows:

```html
<button> I'm a button! </button>
<p> Paragraph! </p>
```

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

> ✨ This is possible because the `children` key is part of the [instance context](/context#the-available-instance-client-keys-are-).

## Lists

You can map over lists without declaring a `key`.

> ✨ A key in Nullstack is an ID for a specific component instance. Learn more about the [instance key](/instance-self#instance-key).

Lists that may change length must be wrapped in a parent element just for them.

```jsx
<ul>
  {list.map((item) => <li>{item.name}</li>)}
</ul>
```

You can emulate a fixed-size list by returning `false` instead of an element to reserve dom space.

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

## Inner HTML

You can set the inner HTML of an element with the `html` attribute.

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

## Body tag

Renderable components can render a `body` tag an unlimited number of times at any depth of the application.

The `body` attributes of the body tag that are rendered will be merged into the real body tag in the DOM

```jsx
import Nullstack from 'nullstack';

class Application extends Nullstack {

  // ...

  render() {
    return (
      <body class="bg-black">
        {this.modalOpen &&
          <body class="overflow-hidden">
            <div class="modal"> modal here <div>
          </body>
        }
      </body>
    )
  }

}

export default Application;
```

## Head tag

Renderable components can render inside the `head` tag an unlimited number of times at any depth of the application.

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

> 🔥 You should not use the `head` tag to update [metatags](/context-page) that Nullstack already controls
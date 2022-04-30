---
title: NJS File Extension
description: Nullstack JavaScript files let Webpack know which loaders to use at transpile time
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

## The head tag

Renderable components can render inside the `head` tag an unlimited number of times at any depth of the application.

The `head` tag will only be updated during the [server-side rendering](/server-side-rendering) process and changes will be ignored after the [hydration](/full-stack-lifecycle) process.

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

# Transpilation

Nullstack JavaScript files let [Webpack](https://webpack.js.org) know which loaders to use at transpile time.

NJS files must import Nullstack or one of its subclasses.

If only a subclass is imported, a Nullstack import will be injected at transpile time.

At transpile time JSX tags will be replaced with `Nullstack.element`.

# Security

This extension also allows Nullstack to make free transpile time optimizations like source injection.

> 🔥 Each file must have only one class declaration.

* On the **server** bundle static async functions are mapped into a registry for security.
* On the **client** bundle static async functions are removed and replaced with a invoke method.
* On the **client** bundle static async functions with the name starting with **"start"** (and optionally followed by an uppercase letter) are completely removed.
* On both **server** and **client** bundles, a hash with the md5 of the original source code is added to the class.

> 🐱‍💻 Bellow an example of a original .njs file.

```jsx
import List from './List';
import {readFileSync} from 'fs';

class Tasks extends List {

  static async getTasks({limit}) {
    const json = readFileSync('tasks.json', 'utf-8');
    return JSON.parse(json).tasks.slice(0, limit);
  }

  prepare(context) {
    context.tasks = [];
  }

  async initiate(context) {
    context.tasks = await this.getTasks({limit: 10});
  }

  renderTask({task}) {
    return (
      <li> 
        <input bind={task.description} />
      </li>
    )
  }

  render() {
    return (
      <main>
        <ul>
          {tasks.map((task) => <Task task={task} />)}
        </ul>
      </main>
    )
  }

}

export default Tasks;
```

> 🐱‍💻 Bellow an example of the same transpiled .njs file.

```jsx
import Nullstack from 'nullstack';
import List from './List';

class Tasks extends List {

  static hash = 'd493ac09d0d57574a30f136d31da455f';

  static getTasks = Nullstack.invoke('getTasks', 'd493ac09d0d57574a30f136d31da455f');

  prepare(context) {
    context.tasks = [];
  }

  async initiate(context) {
    context.tasks = await this.getTasks({limit: 10});
  }

  renderTask({task}) {
    return (
      <li> 
        <input source={task} bind="description" />
      </li>
    )
  }

  render() {
    const Task = this.renderTask;
    return (
      <main>
        <ul>
          {tasks.map((task) => <Task task={task} />)}
        </ul>
      </main>
    )
  }

}

export default Tasks;
```

# Alternative extensions

For the sake of convenience, you can also use `.jsx`, `.nts` and `.tsx` file extensions

## Next step

⚔ Learn about the [Nullstack with TypeScript](/typescript).
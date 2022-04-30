---
title: Renderable Components
description: Renderable components are very similar to web components they give you the ability to create new HTML tags that shortcut a group of other HTML tags
---

The simplest component you can make is a renderable component, with exception of [functional components](/functional-components).

Renderable components are very similar to web components, they give you the ability to create new HTML tags that shortcut a group of other HTML tags.

Create a file in your src folder with the name of your component and the [njs extension](/njs-file-extension).

In this example it is going to be called HelloWorld.njs.

All you have to do is to import Nullstack or any of its subclasses and extend your class from it, define an instance method called render that returns any JSX, and export the component.

> ✨ Install the official [Nullstack VSCode Extension](https://marketplace.visualstudio.com/items?itemName=ChristianMortaro.vscode-nullstack) to generate classes with a snippet.

> ✨ Nullstack constructor cannot be extended. Check lifecycle methods to handle initialization operations.

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

## Inner components

Instead of creating a new component just to organize code-splitting, you can create an inner component.

Inner components are any method that the name starts with `render` followed by an uppercase character.

Inner components share the same instance and scope as the main component, therefore, are very convenient to avoid problems like props drilling.

To invoke the inner component use a JSX tag with the method name without the `render` prefix.

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

## TypeScript

To add types on your renderable components you need to declare the component at the top of the file.

In this example it also shows how to add props to your components.

```tsx
interface HeadProps {
  /**
   * Some name to include in the <head> element
   */
  name: string
}
declare function Head(props: HeadProps): typeof Application.prototype.renderHead

class Application extends Nullstack {

  renderHead({ name }: HeadProps) {}

  render() {
    return (
      <main>
        <Head name={'hello'} />
      </main>
    )
  }

}
```

## Next step

⚔ Add state to your component using [stateful components](/stateful-components).
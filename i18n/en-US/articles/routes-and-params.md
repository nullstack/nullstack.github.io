---
title: Routes and Params
description: Nullstack has built-in routes, it would make no sense otherwise since web applications are expected to have hyperlinks.
---

Nullstack has built-in routes, it would make no sense otherwise since web applications are expected to have hyperlinks.

Any tag can receive a `route` attribute, be it a component, inner component, or simple HTML tag.

```jsx
import Nullstack from 'nullstack';
import Page from './Page';

class Application extends Nullstack {

  renderHome() {
    return (
      <section> Home </section>
    )
  }
 
  render({count}) {
    return (
      <main>
        <Home route="/" />
        <Page route="/page" />
        <abbr route="/abbreviations"> Abbreviations </abbr>
      </main>
    )
  }

}

export default Application;
```

## Links

Links on Nullstack are simple `a` tags with the `href` value starting with `/`.

```jsx
<a href="/page/about"> About Page </a>
<a path="/page/about"> About Page </a> {/* changes page keeping query params */}
```

> 💡 On the client side the click event will push history without reloading the page.

> ✨ You can still assign your own click event to the tag without losing the framework behavior.

> ✨ If a link doesn't start with `/` it's considered an external link and will not use the router.

## Params

The `params` key is an object proxy injected into every client instance.

Each query string param is mapped to this object.

By default any key you request from this object will return a string.

If the value is `undefined` it will return an empty string.

If the value is `true` or `false` it will return a boolean instead.

> 🐱‍💻 Bellow an exemple that visits "/books?expanded=true&page=2":

```jsx
import Nullstack from 'nullstack';

class Books extends Nullstack {

  async initiate({params}) {
    if(params.expanded) {
      const page = parseInt(params.page) || 1;
      this.books = await this.getBooks({page});
    }
  }

}

export default Books;
```

Assigning to a params key will cause a redirect to the route with updated params.

When you assign to a param, the value will be converted to JSON before being set.

> 💡 Redirects work in batches, so there is no performance loss in multiple assignments.

```jsx
import Nullstack from 'nullstack';

class Paginator extends Nullstack {

  handleClick({params}) {
    params.filter = '';
    params.page = 1;
  }

}

export default Paginator;
```

Assigning an empty string to a param will remove it from the url.

## Dynamic Segments

Part of the route can be an expression started with ":" followed by a param name.

This value will be matched against any string in the same directory position.

The value of the string in the URL will be assigned to the [context](/context) params and functions below this point in the hierarchy will have access to the new key.

> 🐱‍💻 Bellow an example that visits "/category/suspense?page=2":

```jsx
import Nullstack from 'nullstack';

class Books extends Nullstack {

  async initiate({params}) {
    const page = parseInt(params.page) || 1;
    const category = params.slug;
    this.books = await this.getBooks({category, page});
  }

}

export default Books;
```

```jsx
import Nullstack from 'nullstack';
import Books from './Books';

class Application extends Nullstack {

  render() {
    <main>
      <Books route="/category/:slug">
    </main>
  }

}

export default Application;
```

When a dynamic segment is changed, as for example moving from "/category/suspense" to "/category/comedy", the component will be terminated and a new instance will be created.

Changing a query param will not re-instantiate the component.

Children of the component will not be re-instantiated automatically, you can set the same route to the children or do it manually if you desire this behavior.

> 💡 The behavior mentioned above solves many of the problems you have to normally deal with manually.

## Wildcards

Wildcards are routes declared with "*" as the attribute value.

These routes will match anything if nothing above it matches the requested URL.

```jsx
import Nullstack from 'nullstack';
import Home from './Home';

class Application extends Nullstack {

  render({count}) {
    return (
      <main>
        <Home route="/" />
        <div route="*"> Wildcard </div>
      </main>
    )
  }

}
```

Wildcards can be prefixed with a segment.

> ✨ this is especially useful for engines that can be mounted in your application.

```jsx
import Nullstack from 'nullstack';
import Home from './Home';
import BlogEngine from './BlogEngine';

class Application extends Nullstack {

  render({count}) {
    return (
      <main>
        <Home route="/" />
        <BlogEngine route="/blog/*" />
      </main>
    )
  }

}
```

## Router

The `router` key is an object proxy injected into every client instance.

The `router` has three keys:

- **`url`**
- **`path`**
- **`base`**
- **`previous`**

The `url` key returns everything after the domain including the path and the query params as a string.

The `path` key returns only the path without query params.

The `base` key returns only the base url (e.g: `https://nullstack.app` or `http://localhost:5000`).

The `previous` key is the same as `url`, but for the previous route. Defaults do `null` (e.g. when first accessing app).

> 💡 Those keys above automatically remove the trailing slash for convenience.

Assigning to `url` or `path` will cause a redirect.

Assigning a absolute url to `url` will cause a full reload.

```jsx
import Nullstack from 'nullstack';

class Application extends Nullstack {

  prepare({router}) {
    if(router.path == '/') {
      router.path = '/dashboard'; // simple route change
    } else {
      router.url = 'https://my-domain.app' // full reload
    }
  }

}
```

> 💡 Under the hood `a` tags with `params` use the `router`.

## Custom Events

Updating `router.url` or `router.path` will raise a custom event.

```jsx
import Nullstack from 'nullstack';

class Analytics extends Nullstack {

  hydrate({router}) {
    window.addEventListener(router.event, () => {
      console.log(router.url);
    });
  }

}

export default Analytics;
```

## Special anchors

Anchor tags accept some convenient special attributes besides the regular `href`.

You can set the `params` attribute with an object as the value.

The path will remain the same as the current router path, but the `params` will be replaced by the new params you specify.

```jsx
<a params={{page: 1}}> First Page </a>
```

If you wish to just update some params and keep the others, you can use the JavaScript spread operator for that.

```jsx
<a params={{...params, page: 1}}> First Page </a>
```

You can set the `path` attribute with a string starting with "/" and no query params.

The params will remain the same, but the `path` will be updated.

```jsx
<a path="/category/suspense"> Suspense Books </a>
```

Both attributes above can be used at the same time.

```jsx
<a path="/category/suspense" params={{...params, page: 1}}> Suspense Books </a>
```

## Nested routes 

The first route to be matched will be rendered.

The other elements with a route will not be rendered, however, elements on the same level without a `route` attribute will render normally.

The router will lookup for one route per dom depth level, this allows you to have nested routing behavior.

```jsx
import Nullstack from 'nullstack';
import Home from './Home';

class Application extends Nullstack {

  renderPage() {
    return (
      <section>
        <div route="/page/about"> About Page </div>
        <div route="/page/contact"> Contact Page </div>
      </section>
    )
  }
 
  render({count}) {
    return (
      <main>
        <Home route="/" />
        <Page route="/page/:slug" />
      </main>
    )
  }

}

export default Application;
```

## Instances

By default components with a route will have the current url as the key.

This behaviour causes the component to be reinstantiated and run lifecycle again even when params change, which is very helpful to load content based on urls.

To skip the behaviour above you can define a custom key to the component.

```jsx
import Nullstack from 'nullstack';
import Home from './Home';
import Page from './Page';

class Application extends Nullstack {
 
  render({ router }) {
    return (
      <main>
        <Home route="/" key="home" />
        <Page route="/page/:slug" key={router.path} />
      </main>
    )
  }

}

export default Application;
```
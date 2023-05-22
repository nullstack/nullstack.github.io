---
title: Context Page
description: The page object is a proxy in the Nullstack Context available in both client and server and gives you information about the document head metatags
---

- Type: `object`
- Origin: [Nullstack Context](/context#----nullstack-context)
- Availability: server/client
- **readwrite** in server/client context

It gives you information about the document `head` metatags.

`page` keys will be used to generate metatags during [server-side rendering](/server-side-rendering) and must be assigned before [`initiate`](/full-stack-lifecycle) while this resolved.

The following keys are available in the object:

- **title**: `string`
- **image**: `string` (absolute or relative URL)
- **description**: `string`
- **canonical**: `string` (absolute or relative URL)
- **locale**: `string`
- **robots**: `string`
- **schema**: `object`
- **changes**: `string`
- **priority**: `number`
- **status**: `number`

When the `title` key is assigned on the client-side, the document title will be updated.

Nullstack uses the `changes` and `priority` keys to generate the **sitemap.xml**.

The sitemap is generated automatically only when using [static site generation](/static-site-generation) and must be manually generated in [server-side rendered](/server-side-rendering) applications.

The `changes` key represents the `changefreq` key in the **sitemap.xml** and if assigned must be one of the following values:

- **always**
- **hourly**
- **daily**
- **weekly**
- **monthly**
- **yearly**
- **never**

The `priority` key is a number between `0.0` and `1.0` that represents the `priority` key in the **sitemap.xml**.

Nullstack does not set a default priority, however, sitemaps assume a `0.5` priority when not explicitly set.

Besides `title` and `locale` all other keys have sensible defaults generated based on the application scope.

```jsx
import Nullstack from 'nullstack';

class Page extends Nullstack {

  prepare({project, page}) {
    page.title = `${project.name} - Page Title`;
    page.image = '/image.jpg';
    page.description = 'Page meta description';
    page.canonical = 'http://absolute.url/canonical-link';
    page.locale = 'pt-BR';
    page.robots = 'index, follow';
    page.schema = {};
    page.changes = 'weekly';
    page.priority = 1;
  }

  render({page}) {
    return (
      <div>
        <h1>{page.title}</h1>
        <p>{page.description}</p>
      </div>
    )
  }

}

export default Page;
```

## Custom Events

Updating `page.title` will raise a custom event.

```jsx
import Nullstack from 'nullstack';

class Analytics extends Nullstack {

  hydrate({page}) {
    window.addEventListener(page.event, () => {
      console.log(`New title: ${page.title}`);
    });
  }

}

export default Analytics;
```

> 🔥 `page.event` is only available in client functions/lifecycles.

## Error pages

If during the [server-side render](/server-side-rendering) process the `page.status` has any value besides `200`, your application will receive another render pass that gives you the chance to adjust the interface according to the status.

The `status` key will be raised with the HTTP response.

The page status will be modified to `500` and receive another render pass if the page raise an exception while rendering.

The status of [server functions](/server-functions) responses will be set to the `page.status`.

```jsx
import Nullstack from 'nullstack';
import ErrorPage from './ErrorPage';
import HomePage from './HomePage';

class Application extends Nullstack {

  // ...

  render({page}) {
    return (
      <main>
        {page.status !== 200 && <ErrorPage route="*" />}
        <HomePage route="/" />
      </main>
    )
  }

}

export default Application;
```

> 🔥 Assigning to the `status` key during the [single-page application](/full-stack-lifecycle) mode will have no effect.
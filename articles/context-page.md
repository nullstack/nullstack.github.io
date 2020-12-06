---
title: Context Page
description: The page object is a proxy in the framework store part of your context and gives you information about the document head metatags
---

The page object is a proxy in the framework store part of your context and gives you information about the document head metatags.

This key is *readwrite* and available only in the *client* context.

Page keys will be used to generate metatags during [server-side rendering](/server-side-rendering) and must be assigned before [initiate](/full-stack-lifecycle) is resolved.

The following keys are available in the object:

- *title*: string
- *image*: string (absolute or relative url)
- *description*: string
- *canonical*: string (absolute or relative url)
- *locale*: string
- *robots*: string
- *schema*: object

When the title key is assigned on the client-side, the document title will be updated.

Besides *title* and *locale* all other keys have sensible defaults generated based on the application scope.

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
  }

  render({page}) {
    return (
      <div>
        <h1> {page.title} </h1>
        <p> {page.description} </p>
      </div>
    )
  }

}

export default Page;
```

## Custom Events

Updating *page.title* will raise a custom *nullstack.page.title* event.

```jsx
import Nullstack from 'nullstack';

class Analytics extends Nullstack {

  hydrate({page}) {
    window.addEventListener('nullstack.page.title', () => {
      console.log(page.title);
    });
  }

}

export default Analytics;
```

## Next step

⚔ Learn about the [context project](/context-project).
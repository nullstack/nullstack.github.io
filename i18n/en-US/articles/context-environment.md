---
title: Context Environment
description: The environment object is a proxy in the Nullstack Context available in both client and server and gives you information about the current environment
---

- Type: `object`
- Origin: [Nullstack Context](/context#----nullstack-context)
- Availability: server/client
- **readonly** in server/client context

It gives you information about the current environment.

The following keys are available in the object:

- **client**: `boolean`
- **server**: `boolean`
- **development**: `boolean`
- **production**: `boolean`
- **static**: `boolean`
- **key**: `string`
- **hot** `boolean`

```jsx
import Nullstack from 'nullstack';

class Page extends Nullstack {
 
  render({environment}) {
    return (
      <div> 
        {environment.client && <p>I'm in the client</p>}
        {environment.server && <p>I'm in the server</p>}
        {environment.development && <p>I'm in development mode</p>}
        {environment.production && <p>I'm in production mode</p>}
        {environment.static && <p>I'm in a static site</p>}
        <p> My key is {environment.key}</p>
      </div>
    )
  }

}

export default Page;
```

The environment *key* is an md5 hash of the current environment folder outputs. The key is appended to [assets](/styles) and [static API](/static-site-generation) path to assist cache control.

The environment *hot* is boolean that identifies if hot reload is enabled and is available only in development mode.

## Custom Events

During development any updates to tracked files will raise a custom event you can use to facilitate development flow.

You can use this event to improve the developer experience by creating custom side effects to changes, like reinitiating specific components that need to reload data when code changes.

```jsx
import Nullstack from 'nullstack';

class BlogArticle extends Nullstack {

  hydrate({environment}) {
    if(!environment.hot) return
    window.addEventListener(environment.event, () => this.initiate());
  }

}

export default BlogArticle;
```

> 🔥 `environment.event` is only available in client functions/lifecycles.
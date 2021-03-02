---
title: Context Environment
description: The environment object is in the framework store part of your context and gives you information about the current environment
---

The environment object is in the *framework store* part of your context and gives you information about the current environment.

This key is *readonly* and available in both the *client* and *server* contexts.

The following keys are available in the object:

- *client*: boolean
- *server*: boolean
- *development*: boolean
- *production*: boolean
- *static*: boolean
- *key*: string

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

## Next step

⚔ Learn about the [context page](/context-page).
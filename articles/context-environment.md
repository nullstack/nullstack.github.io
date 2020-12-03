---
title: Context Environment
description: The environment object is in the framework store part of your context and gives you information about the current environment
---

The environment object is in the *framework store* part of your context and gives you information about the current environment.

This key is *readonly* and available in both the *client* and *server* contexts.

The following boolean keys are available in the environment:

- client
- server
- development
- production
- static

```jsx
import Nullstack from 'nullstack';

class Page extends Nullstack {
 
  render({environment}) {
    return (
      <div> 
        <p> Am i in the client? {environment.client} </p>
        <p> Am i in the server? {environment.server} </p>
        <p> Am i in development mode? {environment.development} </p>
        <p> Am i in production mode? {environment.production} </p>
        <p> Is this a static site? {environment.static} </p>
      </div>
    )
  }

}

export default Page;
```

## Next step

⚔ Learn about the [context network](/context-network).
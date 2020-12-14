---
title: Context Loading
description: The loading object is a proxy in the framework store part of your context and gives you information about API calls
---

The loading object is a proxy in the *framework store* part of your context and gives you information about API calls progress.

This key is *readonly* and available only in the *client* context.

The following keys are available in the object:

- *[serverFunctionName]*: boolean

When a [server function](/server-functions) is called a key with the name of the [server function](/server-functions) invoked will be set to true until the response is resolved.

Any other key you invoke will always return false instead of undefined for consistency.

When the server is emulating the client context for [server-side rendering](/server-side-rendering), every key will always return false, saving multiple render cycles in performance.

```jsx
import Nullstack from 'nullstack';

class Page extends Nullstack {

  static async save() {
    // ...
  }

  async submit() {
    await this.save();
  }
 
  render({loading}) {
    return (
      <form onsubmit={this.save}> 
        <button disabled={loading.save}> 
          Save
        </button>
      </form>
    )
  }

}

export default Page;
```

## Next step

⚔ Learn about the [context page](/context-page).
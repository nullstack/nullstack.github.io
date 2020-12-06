---
title: Context Network
description: The network object is a proxy in the framework store part of your context and gives you information about API calls
---

The network object is a proxy in the *framework store* part of your context and gives you information about API calls.

This key is *readonly* and available only in the *client* context.

The following keys are available in the object:

- *processing*: boolean
- *[serverFunctionName]*: boolean

When a [server function](/server-functions) is called, processing will be set to true, when it's resolved processing will be set back to false.

Besides *processing* a key with the name of the [server function](/server-functions) invoked will be set to true temporarily.

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
 
  render({network}) {
    return (
      <form onsubmit={this.submit}> 
        {network.processing && 
          <p> something is loading... </p>
        }
        <button disabled={network.save}> 
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
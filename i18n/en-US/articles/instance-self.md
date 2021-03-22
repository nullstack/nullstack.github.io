---
title: Instance Self
description: The self object is a proxy in the Nullstack Context available in client and gives you information about the instance lifecycle
---

- Type: `object`
- Origin: [Nullstack Context](/context#----nullstack-context)
- Availability: **client**
- **readonly** in **client** context

It gives you information about the instance lifecycle.

Each instance receives its own *self* object.

The following keys are available in the object:

- *initiated*: boolean
- *hydrated*: boolean
- *prerendered*: boolean
- *element*: HTMLElement

When a lifecycle method is resolved, even if not declared, an equivalent key is set to true in self.

If the component was server-side rendered the *prerendered* key will remain true until it is terminated.

The *element* key points to the DOM selector and is only guaranteed to exist when hydrate is being called since prepare and initiate could run in the server.

> 💡 Do not use *element* to guess the environment, instead use the [environment](/context-environment) for that.

Observing self is a nice way to avoid giving placeholder information to the end-user.

```jsx
import Nullstack from 'nullstack';

class Page extends Nullstack {

  // ...

  async initiate() {
    this.price = await this.getPrice();
  }

  async hydrate({self}) {
    self.element.querySelector('input').focus();
  }
 
  render({self}) {
    if(!self.prerendered && !self.initiated) return false;
    return (
      <form> 
        <input type="number" bind={this.price} />
        <button disabled={!self.hydrated}> 
          Save
        </button>
      </form>
    )
  }

}

export default Page;
```

> 💡 Components that get optimized into [functional components](/renderable-components) have no access to self.

## Next step

⚔ Learn about the [instance key](/instance-key).
---
title: Context Data
description: The data object is a proxy in the Component Context available in client and gives you information about the element dataset
---

- Type: `object`
- Origin: [Component Context](/context#----component-context)
- Availability: **client**
- **readonly** in **client** context

It gives you information about the element dataset.

You can use this key to avoid polluting your DOM with invalid attributes.

> 💡 This helps Nullstack set attributes without wasting time validating them.

Any `data-*` attributes will receive a respective camelized key on the `data` object when passed to an event context.

The kebab version is also available in the context.

```jsx
import Nullstack from 'nullstack';

class ContextData extends Nullstack {

  count = 1;

  calculate({data}) {
    this.count = this.count * data.multiply + data.sum;
  }
  
  render({data}) {
    return (
      <div> 
        <button onclick={this.calculate} data-multiply={3} data={{sum: 2}}>
          Calculate
        </button>
      </div>
    )
  }

}

export default ContextData;
```

> 💡 Camelized keys from the `data` object will result in kebab attributes in the DOM.
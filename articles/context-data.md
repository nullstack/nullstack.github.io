---
title: Context Data
description: The data is an object in the framework store part of your context and gives you information about the element dataset.
---

The data is an object in the framework store part of your context and gives you information about the element dataset.

You can use this key to avoid polluting your DOM with invalid attributes.

> 💡 This helps Nullstack set attributes without wasting time validating them.

This key is *readonly* and available only in the *client* context.

Any *data-\** attributes will receive a respective camelized key on the data object.

You can assign data attributes both via data-* and a data key that accepts an object with camelized keys.

The kebab version is also available in the context.

```jsx
import Nullstack from 'nullstack';

class ContextData extends Nullstack {

  count = 1;

  calculate({data}) {
    this.count = this.count * data.multiply + data.sum;
  }

  renderInner(context) {
    const {data} = context;
    return (
      <div data={data}>
        {data.frameworkName}
        is same as
        {context['data-framework-name']}
      </div>
    )
  }
  
  render({data}) {
    return (
      <div> 
        <button onclick={this.calculate} data-multiply={3} data={{sum: 2}}>
          Calculate
        </button>
        <Inner data-framework-name="Nullstack" />
      </div>
    )
  }

}

export default ContextData;
```

> 💡 Camelized keys from the data object will result in kebab attributes in the DOM.

## Next step

⚔ Learn about the [context environment](/context-environment).
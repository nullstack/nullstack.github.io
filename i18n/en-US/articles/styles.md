---
title: Styles
description: Using styles with Nullstack is as simple as importing a style file
---

Using styles with Nullstack is as simple as importing a style file.

Nullstack comes with a [SASS](https://sass-lang.com) loader by default, but you can still use vanilla CSS.

> ✨ It's a good practice to import a file with the same name as the component.

```jsx
import Nullstack from 'nullstack';
import './Header.scss';

class Header extends Nullstack {
  // ...
}

export default Header;
```


## Conditional classes and styles

You can pass falsy values to `style` and `class` to skip rendering conditionaly.

```jsx
import Nullstack from 'nullstack';

class Counter extends Nullstack {

  count = 0;
  
  render() {
    return (
      <div 
        class={this.count > 0 && 'bigger-than-zero'}
        style={this.count > 0 && 'border-color: black;'}
      > 
        {this.count}
      </div>
    )
  }

}

export default Counter;
```

## Array classes and styles

You can pass an array of strings as prop to `style` and `class` and they will be joined into the final attribute

You can also pass falsy values to skip rendering conditionaly.

```jsx
import Nullstack from 'nullstack';

class Counter extends Nullstack {

  count = 0;
  
  render() {
    return (
      <div 
        class={['number', this.count > 0 && 'bigger-than-zero', this.count % 2 === 0 ? 'even' : 'odd' ]}
        style={['background-color: black;', this.count > 0 && 'border-color: black;', this.count % 2 === 0 ? 'color: blue;' : 'color-red;' ]}
      > 
        {this.count}
      </div>
    )
  }

}

export default Counter;
```
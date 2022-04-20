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

## Next step

⚔ Learn about the [NJS file extension](/njs-file-extension).
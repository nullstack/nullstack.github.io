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

In production mode Nullstack uses [PurceCSS](https://purgecss.com), which cleans your **client.css** file, but has some gotchas.

> ✨ Learn more about [safelisting your css](https://purgecss.com/safelisting.html)

## Next step

⚔ Learn about the [NJS file extension](/njs-file-extension).
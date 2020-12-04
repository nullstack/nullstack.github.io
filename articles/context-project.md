---
title: Context Project
description: The project object is a proxy in the framework store part of your context and gives you information about the app manifest and some metatags
---

The project object is a proxy in the framework store part of your context and gives you information about the app manifest and some metatags.

This key is *readwrite* in the *server* context.

This key is *readonly* in the *client* context.

Project keys will be used to generate metatags during server-side rendering and must be assigned before *initiate* is resolved.

Project keys will be used to generate the app manifest and should ideally be set during the [application startup](/application-startup).

The following keys are available in the object:

- *domain*: string
- *name*: string
- *shortName*: string
- *color*: string
- *backgroundColor*: string
- *type*: string
- *display*: string
- *orientation*: string
- *scope*: string
- *root*: string
- *icons*: object
- *favicon*: string (relative or absolute url)

Besides *domain*, *name* and *color* all other keys have sensible defaults generated based on the application scope.

If you do not declare the *icons* key, Nullstack will scan any icons with the name following the pattern "icon-[WIDTH]x[HEIGHT].png" in your public folder.

```jsx
import Nullstack from 'nullstack';

class Application extends Nullstack {

  static async start({project}) {
    project.name = 'Nullstack';
    project.shortName = Nullstack';
    project.domain = 'nullstack.app';
    project.color = '#d22365';
    project.backgroundColor = '#d22365';
    project.type = 'website';
    project.display = 'standalone';
    project.orientation = 'portrait';
    project.scope = '/';
    project.root = '/';
    project.icons = {
      '72': '/icon-72x72.png',
      '128': '/icon-128x128.png',
      '512': '/icon-512x512.png'
    };
    project.favicon = '/favicon.png';
  }

}

export default Application;
```

> 💡 You can override the automatically generated manifest.json by serving your own manifest.json from the public folder

## Next step

⚔ Learn about the [context settings](/context-settings).
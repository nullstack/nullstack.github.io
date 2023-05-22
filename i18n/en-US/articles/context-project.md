---
title: Context Project
description: The project object is a proxy in the Nullstack Context available in both client and server and gives you information about the app manifest and some metatags
---

- Type: `object`
- Origin: [Nullstack Context](/context#----nullstack-context)
- Availability: server/client
- **readwrite** in the **server** context
- **readonly** in the **client** context

It gives you information about the app manifest and some metatags.

`project` keys will be used to generate metatags during server-side rendering and must be assigned before [`initiate`](/full-stack-lifecycle) is resolved.

`project` keys will be used to generate the app **manifest**.

The `disallow` key will be used to generate the **robots.txt**.

The following keys are available in the object and supported as environment variables as follows:

- **domain**: `string` (`NULLSTACK_PROJECT_DOMAIN`)
- **name**: `string` (`NULLSTACK_PROJECT_NAME`)
- **shortName**: `string` (`NULLSTACK_PROJECT_SHORT_NAME`)
- **color**: `string` (`NULLSTACK_PROJECT_COLOR`)
- **backgroundColor**: `string`
- **type**: `string`
- **display**: `string`
- **orientation**: `string`
- **scope**: `string`
- **root**: `string`
- **icons**: `object`
- **favicon**: `string` (relative or absolute url)
- **disallow**: `string array` (relative paths)
- **sitemap**: `boolean` or `string` (relative or absolute url)
- **cdn**: `string` (`NULLSTACK_PROJECT_CDN`)
- **protocol**: `string` (`NULLSTACK_PROJECT_PROTOCOL`)

Besides `domain`, `name` and `color` all other keys have sensible defaults generated based on the application scope.

If you do not declare the `icons` key, Nullstack will scan any icons with the name following the pattern "icon-[WIDTH]x[HEIGHT].png" in your **public** folder.

The `head` meta tag `apple-touch-icon` will be set to your `icon-180x180.png` file.

If the `sitemap` key is set to true your **robots.txt** file will point the sitemap to `https://${project.domain}/sitemap.xml`.

The `cdn` key will prefix your asset bundles and will be available in the context so you can manually prefix other assets.

The `protocol` key is "http" in development mode and "https" in production mode by default.

```jsx
// server.js
import Nullstack from 'nullstack';
import Application from './src/Application';

const context = Nullstack.start(Application);

context.start = function() {
  const { project } = context;
  project.name = 'Nullstack';
  project.shortName = 'Nullstack';
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
  project.disallow = ['/admin'];
  project.sitemap = true;
  project.cdn = 'cdn.nullstack.app';
  project.protocol = 'https';
}

export default context;
```

> More about the `context.start` at [application startup](/application-startup)

```jsx
// src/Application.njs
import Nullstack from 'nullstack';

class Application extends Nullstack {

  prepare({project, page}) {
    page.title = project.name;
  }

}

export default Application;
```

> 💡 You can override the automatically generated **manifest.json** and **robots.txt** by serving your own file from the **public** folder
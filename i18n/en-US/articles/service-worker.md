---
title: Context Service Worker
description: The worker object is a proxy in the Nullstack Context available in both client and server and gives you granular control of your PWA behavior
---

- Type: `object`
- Origin: [Nullstack Context](/context#----nullstack-context)
- Availability: server/client
- **readwrite** in **server** context
- **readonly** in **client** context

It gives you granular control of your PWA behavior.

`worker` keys will be used to generate the service worker file and should be set during the [application startup](/application-startup).

The following keys are available in the object during the startup:

- **enabled**: `boolean`
- **preload**: `string array` (relative paths)
- **headers**: `object`
- **cdn**: `string` (absolute url)
- **api**: `string` (absolute url)
- **protocol**: `string` (http or https)

The `enabled` key defines if the service worker will be automatically registered by Nullstack. 

By default `enabled` is set to `true` on production mode and `false` on development mode.

`preload` is an array of paths that will be cached when the service worker is installed.

The assets required to start the application will be preloaded automatically, and you should configure only the extra pages you want to have available offline.

```jsx
import { readdirSync } from 'fs';
import Nullstack from "nullstack";
import path from 'path';
import Application from "./src/Application";

const context = Nullstack.start(Application);

const { worker } = context;

const articles = readdirSync(path.join(__dirname, '../i18n/en-US', 'articles'));
worker.preload = [
  ...articles.map((article) => '/' + article.replace('.md', '')),
  ...illustrations.map((illustration) => '/illustrations/' + illustration),
  '/arrow.webp',
  '/stars.webp',
  '/documentation',
  '/components'
  // ...
]

export default context;
```

> 💡 The example above is extracted from this repository and allows the documentation to be fully accessible offline.

The following keys are available as **readonly** in the client context:

- **enabled**: `boolean`
- **preload**: `string array` (relative paths)
- **online**: `boolean`
- **fetching**: `boolean`
- **responsive**: `boolean`
- **installation**: `BeforeInstallPromptEvent`
- **registration**: `ServiceWorkerRegistration`
- **queues**: `object`

The following keys are available as **readwrite** in the client context:

- **headers**: `object`

The `responsive` key determines if the application has all the responses it needs to render the current page.

Nullstack will try to keep your application responsive as long as possible and set the key to `false` only when there are no ways of retrieving any response from the network or offline according to the fetch strategy for the [environment](/context-environment).

The `online` key will listen for network events and rerender the application when `navigator.onLine` value changes.

When the application is back online Nullstack will try to make the application responsive again and rerender if necessary.

```jsx
import Nullstack from 'nullstack';
// ...

class Application extends Nullstack {
 
  // ...

  render({worker}) {
    if(!worker.responsive) {
      return <OfflineWarning />
    }
    return (
      <main>
        <Home route="/" />
      </main>
    )
  }

}
```

You can access the current service worker **registration** and **installation** from the `worker` key to control the flow of your PWA.

The `registration` key refers to the service worker registration and will be only available once the registration process is complete.

The `installation` key refers to the deferred installation prompt event and will only be available if the `beforeinstallprompt` event is triggered.

```jsx
import Nullstack from 'nullstack';

class PWAInstaller extends Nullstack {

  installed = false;
  hidden = false;

  async prompt({worker}) {
    try {
      worker.installation.prompt();
      const {outcome} = await worker.installation.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
    } finally {
      this.hidden = true;
    }
  }
  
  render({worker, project}) {
    if(this.hidden) return false;
    if(!worker.installation) return false;
    return (
      <div>
        <img src={project.favicon} />
        <p> Do you want to add {project.name} to your home screen?</p>
        <button onclick={this.prompt}> Install </button>
        <button onclick={{hidden: true}}> Not Now </button>
      </div>
    )
  }

}

export default PWAInstaller;
```

## Loading Screens

When a [server function](/server-functions) is called `fetching` will be set to `true` until the response is resolved.

When a [server function](/server-functions) is called a key with the name of the [server function](/server-functions) invoked will be set in the `queues` object until the response is resolved.

The key will be an array with all arguments passed to the server function.

Any key you invoke on the `queues` object will always return an array instead of `undefined` for consistency.

When the server is emulating the client context for [server-side rendering](/server-side-rendering), every key of the `queues` object will always return an empty array, saving multiple render cycles in performance.

```jsx
import Nullstack from 'nullstack';

class Page extends Nullstack {

  static async save({ valid }) {
    // ...
  }

  async submit() {
    await this.save({ valid: true });
  }

  render({ worker }) {
    const loadingValidSave = !!worker.queues.save
      .find(args => args.valid);

    return (
      <form onsubmit={this.submit}>
        {worker.fetching &&
          <span> loading... </span>
        }
        <button disabled={loadingValidSave}>
          Save
        </button>
      </form>
    )
  }

}

export default Page;
```

## Custom headers

You can use the `headers` key to configure the headers that the worker will use when fetching a server function.

> 🔥 Headers will be ignored when a server function is called during the [server-side rendering](/server-side-rendering) process.

```jsx
import Nullstack from 'nullstack';

class LoginPage extends Nullstack {

  // ...

  async submit({worker}) {
    // ...
    worker.headers['Authorization'] = `Bearer ${token}`;
    // ...
  }

  static async authorize({request}) {
    const authorization = request.headers['Authorization'];
    // ...
  }
  
  // ...

}


export default LoginPage;
```

> ✨ Learn more about the [server request and response](/server-request-and-response)

## Server-side render strategy

- Requests for different origins will be fetched normally;
- Requests that are not GET will be fetched normally;
- Fingerprinted assets will be loaded into cache at installation time;
- Fingerprinted assets will be loaded from cache first then fallback to the network if needed;
- Paths with an extension will be retrieved stale and update the cache in the background for subsequent request;
- Navigation paths will be loaded from the network then fallback to a page in which `worker.responsive` and `worker.online` are set to `false`;

## Static-site generation strategy

- Requests for different origins will be fetched normally;
- Requests that are not GET will be fetched normally;
- Fingerprinted assets will be loaded into cache at installation time;
- Fingerprinted assets will be loaded from cache first then fallback to the network if needed;
- Paths with an extension will be retrieved stale and update the cache in the background for subsequent request;
- The home page will be loaded network first and then fallback to a cached copy if needed;
- Navigation paths will instead load only the static API data and merge it with the application template to generate a response.
- Navigating to a static route will cache only the data of that page;
- When data is not available in the cache or network it will fallback to a page in which `worker.responsive` and `worker.online` are set to `false`;

## Custom Strategy

Nullstack will install automatically your service worker if `enabled` is set to `true` with the following events:

- `install`
- `activate`
- `fetch`

You can override any of those events by creating a **service-worker.js** in the public folder;

If any of the keywords above are found Nullstack will inject your function in the service worker code instead of the default.

For convenience a `context` key is injected in the service worker `self` with the following keys:

- `worker`
- [`project`](/context-project)
- [`environment`](/context-environment)

```jsx
function activate(event) {
  event.waitUntil(async function() {
    const cacheNames = await caches.keys();
    const cachesToDelete = cacheNames.filter(cacheName => cacheName !== self.context.environment.key);
    await Promise.all(cachesToDelete.map((cacheName) => caches.delete(cacheName)));
    if (self.registration.navigationPreload) {
      await self.registration.navigationPreload.enable();
    }
    self.clients.claim();
  }());
}

self.addEventListener('activate', activate);
```

> 💡 The example above is extracted from the generated service worker and uses `self.context.environment.key`

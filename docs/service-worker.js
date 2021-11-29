self.context = {
  "environment": {
    "client": false,
    "server": true,
    "development": false,
    "production": true,
    "mode": "ssg",
    "key": "2ea000420cf0548997525127c55ca77c274d2dd0"
  },
  "project": {
    "domain": "nullstack.app",
    "name": "Nullstack",
    "color": "#d22365",
    "type": "website",
    "display": "standalone",
    "orientation": "portrait",
    "scope": "/",
    "root": "/",
    "sitemap": true,
    "favicon": "/favicon-96x96.png",
    "disallow": [],
    "icons": {
      "72": "/icon-72x72.png",
      "96": "/icon-96x96.png",
      "128": "/icon-128x128.png",
      "144": "/icon-144x144.png",
      "152": "/icon-152x152.png",
      "180": "/icon-180x180.png",
      "192": "/icon-192x192.png",
      "384": "/icon-384x384.png",
      "512": "/icon-512x512.png"
    },
    "backgroundColor": "#2d3748"
  },
  "settings": {},
  "worker": {
    "enabled": true,
    "fetching": false,
    "preload": [
      "/application-startup",
      "/context-data",
      "/context-environment",
      "/context-instances",
      "/context-page",
      "/context-project",
      "/context-secrets",
      "/context-settings",
      "/context",
      "/full-stack-lifecycle",
      "/functional-components",
      "/getting-started",
      "/how-to-deploy-a-nullstack-application",
      "/how-to-use-facebook-pixel-with-nullstack",
      "/how-to-use-google-analytics-with-nullstack",
      "/how-to-use-mongodb-with-nullstack",
      "/instance-self",
      "/njs-file-extension",
      "/nullstack-logo",
      "/persistent-components",
      "/renderable-components",
      "/routes-and-params",
      "/server-functions",
      "/server-request-and-response",
      "/server-side-rendering",
      "/service-worker",
      "/single-page-applications",
      "/stateful-components",
      "/static-site-generation",
      "/styles",
      "/two-way-bindings",
      "/illustrations/nulla-dps.webp",
      "/illustrations/nulla-fullbody.png",
      "/illustrations/nulla-glue.webp",
      "/illustrations/nulla-healer.webp",
      "/illustrations/nulla-hero.webp",
      "/illustrations/nulla-map.webp",
      "/illustrations/nulla-scrolls.webp",
      "/illustrations/nulla-tanker.webp",
      "/illustrations/nulla-tools.webp",
      "/arrow.webp",
      "/stars.webp",
      "/footer.webp",
      "/documentation",
      "/components",
      "/contributors",
      "/roboto-v20-latin-300.woff2",
      "/roboto-v20-latin-500.woff2",
      "/crete-round-v9-latin-regular.woff2"
    ],
    "headers": {},
    "api": "",
    "cdn": "",
    "protocol": "https",
    "queues": {}
  }
};

async function load(event) {
  const response = await event.preloadResponse;
  if (response) return response;
  return await fetch(event.request);
}

function withAPI(url) {
  let [path, query] = url.split('?');
  if (path.includes('.')) return url;
  path += '/index.json';
  return query ? [url, `${path}?${query}`] : [url, path];
}

async function extractData(response) {
  const html = await response.clone().text();
  const instancesLookup = 'window.instances = ';
  const instances = html.split("\n").find((line) => line.indexOf(instancesLookup) > -1).split(instancesLookup)[1].slice(0, -1);
  const pageLookup = 'window.page = ';
  const page = html.split("\n").find((line) => line.indexOf(pageLookup) > -1).split(pageLookup)[1].slice(0, -1);
  const json = `{"instances": ${instances}, "page": ${page}}`;
  return new Response(json, {
    headers: { 'Content-Type': 'application/json' }
  });
}

async function cacheFirst(event) {
  const cache = await caches.open(self.context.environment.key);
  const cachedResponse = await cache.match(event.request);
  if(cachedResponse) return cachedResponse;
  const response = await load(event);
  await cache.put(event.request, response.clone());
  return response;
}

async function staleWhileRevalidate(event) {
  const cache = await caches.open(self.context.environment.key);
  const cachedResponse = await cache.match(event.request);
  const networkResponsePromise = load(event);
  event.waitUntil(async function() {
    const networkResponse = await networkResponsePromise;
    await cache.put(event.request, networkResponse.clone());
  }());
  return cachedResponse || networkResponsePromise;
}

async function networkFirst(event) {
  const cache = await caches.open(self.context.environment.key);
  try {
    const networkResponse = await load(event);
    await cache.put(event.request, networkResponse.clone());
    return networkResponse;
  } catch(error) {
    return await cache.match(event.request);
  }
}

async function networkDataFirst(event) {
  const cache = await caches.open(self.context.environment.key);
  const url = new URL(event.request.url);
  const api = url.pathname + '/index.json';
  try {
    const response = await load(event);
    const dataResponse = await extractData(response);
    await cache.put(api, dataResponse);
    return response;
  } catch (error) {
    const cachedDataResponse = await cache.match(url);
    return cachedDataResponse || await cache.match(`/nullstack/${self.context.environment.key}/offline/index.html`);
  }
}

function install(event) {
  const urls = [
    '/',
    ...self.context.worker.preload.map(withAPI),
    '/manifest.json',
    `/client.css?fingerprint=${self.context.environment.key}`,
    `/client.js?fingerprint=2ea000420cf0548997525127c55ca77c274d2dd0`,
    `/nullstack/${self.context.environment.key}/offline/index.html`
  ].flat();
  event.waitUntil(async function () {
    const cache = await caches.open(self.context.environment.key);
    await cache.addAll([...new Set(urls)]);
    const homeResponse = await cache.match('/');
    const homeDataResponse = await extractData(homeResponse);
    await cache.put('/index.json', homeDataResponse);
    self.skipWaiting();
  }());
}

self.addEventListener('install', install);

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

function staticStrategy(event) {
  event.waitUntil(async function() {
    const url = new URL(event.request.url);
    if(url.origin !== location.origin) return;
    if(event.request.method !== 'GET') return;
    if(url.pathname.indexOf(self.context.environment.key) > -1) {
      return event.respondWith(cacheFirst(event));
    }
    if(url.pathname.indexOf('.') > -1) {
      return event.respondWith(staleWhileRevalidate(event));
    }
    if(url.pathname === '/') {
      return event.respondWith(networkFirst(event));
    }
    event.respondWith(networkDataFirst(event));
  }());
}

self.addEventListener('fetch', staticStrategy);
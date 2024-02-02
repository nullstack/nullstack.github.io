self.context = {
  "environment": {
    "client": false,
    "server": true,
    "development": false,
    "production": true,
    "mode": "ssg",
    "key": "23ad2dd940244ab04e281282c05613bd73043c4f",
    "name": ""
  },
  "project": {
    "domain": "nullstack.app",
    "name": "Nullstack",
    "color": "#d22365",
    "viewport": "width=device-width, initial-scale=1, shrink-to-fit=no",
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
      "/frequently-asked-questions",
      "/full-stack-lifecycle",
      "/getting-started",
      "/how-to-customize-webpack",
      "/how-to-deploy-a-nullstack-application",
      "/jsx-elements",
      "/nullstack-logo",
      "/persistent-components",
      "/proxy",
      "/refs",
      "/routes-and-params",
      "/script-runner",
      "/server-functions",
      "/server-request-and-response",
      "/server-side-rendering",
      "/service-worker",
      "/single-page-applications",
      "/stateful-components",
      "/stateless-components",
      "/static-site-generation",
      "/styles",
      "/transpilation-and-security",
      "/two-way-bindings",
      "/typescript",
      "/what-is-nullstack",
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
      "/contributors",
      "/roboto-v20-latin-300.woff2",
      "/roboto-v20-latin-500.woff2",
      "/crete-round-v9-latin-regular.woff2"
    ],
    "staleWhileRevalidate": [],
    "cacheFirst": [],
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
    return fetch(event.request);
}


function match(serializedMatcher, url) {
    const matcher = JSON.parse(serializedMatcher);
    return new RegExp(matcher.source, matcher.flags).test(url.href);
}


function withAPI(url) {
    const fragments = url.split("?");
    let path = fragments[0];
    const query = fragments[1];
    if (path.includes(".")) return url;
    path += "/index.json";
    return query ? [
        url,
        `${path}?${query}`
    ] : [
        url,
        path
    ];
}
async function extractData(response) {
    const html = await response.clone().text();
    const stateLookup = '<meta name="nullstack" content="';
    const state = html.split("\n").find((line)=>line.indexOf(stateLookup) > -1).split(stateLookup)[1].slice(0, -2);
    const { instances , page  } = JSON.parse(decodeURIComponent(state));
    const json = JSON.stringify({
        instances,
        page
    });
    return new Response(json, {
        headers: {
            "Content-Type": "application/json"
        }
    });
}


async function cacheFirst(event) {
    const cache = await caches.open(self.context.environment.key);
    const cachedResponse = await cache.match(event.request);
    if (cachedResponse) return cachedResponse;
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
    } catch (error) {
        return cache.match(event.request);
    }
}


async function networkDataFirst(event) {
    const cache = await caches.open(self.context.environment.key);
    const url = new URL(event.request.url);
    const api = `${url.pathname}/index.json`;
    try {
        const response = await load(event);
        const dataResponse = await extractData(response);
        await cache.put(api, dataResponse);
        return response;
    } catch (error) {
        const cachedDataResponse = await cache.match(url);
        return cachedDataResponse || cache.match(`/nullstack/${self.context.environment.key}/offline/index.html`);
    }
}


function install(event) {
    const urls = [
        "/",
        ...self.context.worker.preload.map(withAPI),
        "/manifest.webmanifest",
        `/client.js?fingerprint=${self.context.environment.key}`,
        `/client.css?fingerprint=${self.context.environment.key}`,
        ,
        `/nullstack/${self.context.environment.key}/offline/index.html`
    ].flat();
    event.waitUntil(async function() {
        const cache = await caches.open(self.context.environment.key);
        await cache.addAll([
            ...new Set(urls)
        ]);
        const homeResponse = await cache.match("/");
        const homeDataResponse = await extractData(homeResponse);
        await cache.put("/index.json", homeDataResponse);
        self.skipWaiting();
    }());
}
self.addEventListener("install", install);


function activate(event) {
    event.waitUntil(async function() {
        const cacheNames = await caches.keys();
        const cachesToDelete = cacheNames.filter((cacheName)=>cacheName !== self.context.environment.key);
        await Promise.all(cachesToDelete.map((cacheName)=>caches.delete(cacheName)));
        if (self.registration.navigationPreload) {
            await self.registration.navigationPreload.enable();
        }
        self.clients.claim();
    }());
}
self.addEventListener("activate", activate);


function staticStrategy(event) {
    event.waitUntil(async function() {
        if (event.request.method !== "GET") return;
        const url = new URL(event.request.url);
        for (const matcher of self.context.worker.staleWhileRevalidate){
            if (match(matcher, url)) {
                return event.respondWith(staleWhileRevalidate(event));
            }
        }
        for (const matcher of self.context.worker.cacheFirst){
            if (match(matcher, url)) {
                return event.respondWith(cacheFirst(event));
            }
        }
        if (url.origin !== location.origin) return;
        if (url.pathname.indexOf("/nullstack/") > -1) {
            return event.respondWith(networkFirst(event));
        }
        if (url.searchParams?.get("fingerprint") === self.context.environment.key) {
            return event.respondWith(cacheFirst(event));
        }
        if (url.pathname.indexOf(".") > -1) {
            return event.respondWith(staleWhileRevalidate(event));
        }
        if (url.pathname === "/") {
            return event.respondWith(networkFirst(event));
        }
        event.respondWith(networkDataFirst(event));
    }());
}
self.addEventListener("fetch", staticStrategy);

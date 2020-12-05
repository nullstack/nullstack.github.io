---
title: Server-Side Rendering
description: Nullstack optimizes SEO and response times out of the box by generating HTML for the route that you enter the application from
---

Nullstack optimizes SEO and response times out of the box by generating HTML for the route that you enter the application from.

Server-side rendering is good for SEO since it gives as fast as possible crawlable markup for search engines.

Nullstack starts the application for the user by first serving HTML of only the requested page with no overhead.

Before serving the HTML, Nullstack will wait for *prepare* and *initiate* of all components of that route to be resolved.

While server-side rendering all server functions run locally without the need to fetch an API, making the process even faster.

After the document is already painted in the browser, Nullstack loads the javascript client bundle and starts the hydration process. 

No further requests to the server are made to recover the application state during hydration.

The page head will generate the necessary meta tags for SEO based on the contents of the [project](/context-project) and [page](/context-page) context keys.

## Next step

⚔ Learn about [static site generation](/static-site-generation).
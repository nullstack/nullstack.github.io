---
title: Server-Side Rendering
description: Nullstack optimizes SEO and response times out of the box by generating HTML for the route that you enter the application from
---

Nullstack optimizes SEO and response times out of the box by generating HTML for the [route](/routes-and-params) that you enter the application from.

Server-side rendering is good for SEO since it gives as fast as possible crawlable markup for search engines.

Nullstack starts the application for the user by first serving HTML of only the requested page with no overhead.

Before serving the HTML, Nullstack will wait for [`prepare`](/full-stack-lifecycle) and [`initiate`](/full-stack-lifecycle) of all components of that route to be resolved.

While server-side rendering all server functions run locally without the need to fetch an API, making the process even faster.

After the document is already painted in the browser, Nullstack loads the JavaScript client bundle and starts the [hydration](/full-stack-lifecycle) process. 

No further requests to the server are made to recover the application state during [hydration](/full-stack-lifecycle).

The page head will generate the necessary meta tags for SEO based on the contents of the [`project`](/context-project) and [`page`](/context-page) context keys.

This is the default build mode and also the mode used for development.

It is a good pratice to follow SSR patterns in development in order to be able to easily change betweeb build modes in production.
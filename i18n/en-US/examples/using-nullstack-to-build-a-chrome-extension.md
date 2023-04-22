---
title: "Using Nullstack to build a Chrome Extension"
description: "Nullstack can be used to build a Chrome Extension"
---
Nullstack can be used as to build a Chrome Extension.

These are all the changes required to make the app compatible as an extension:

- `public/manifest.json` creates the Chrome Extension manifest file
- `server.js` disables the default service worker, as the extension doesn't need it
- `src/Application.jsx` is the entry component that will render the Popup code
- `package.json` sets mode to SPA (default mode) and enables writing files to disk

You can find a full example at [Mortaro/nullstack-chrome-extension](https://github.com/Mortaro/nullstack-chrome-extension).

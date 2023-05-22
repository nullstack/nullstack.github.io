---
title: How to Deploy a Nullstack application on Vercel
description: You can host a Nullstack application anywhere. Deploy it on Vercel, Heroku, AWS, Azure, GitHub pages, or anywhere else.
---

Create `api/nullstack.js` to export the production application server.

```js
import application from '../.production/server'

export default application.server;
```

Add the following `vercel.json` to the root folder in order to redirect all requests to nullstack:

```json
{
  "version": 2,
  "functions": {
    "api/nullstack.js": {
      "includeFiles": ".production/**"
    }
  },
  "routes": [
    {
      "handle": "filesystem"
    },
    {
      "src": "(.*)",
      "dest": "api/nullstack.js"
    }
  ]
}
```
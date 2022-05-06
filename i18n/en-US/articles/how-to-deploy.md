---
title: How to Deploy
description: You can host a Nullstack application anywhere. Deploy it on Vercel, Heroku, AWS, Azure, GitHub pages, or anywhere else.
---

Here you'll find ways to deploy an application built with Nullstack to any platform.

## Deploying a Nullstack application to Vercel

### SSR

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

## Deploying a Nullstack application to GitHub pages

### SSG

In your repo under `/settings/pages` you can:

- configure which `branch` will be serving the static files
- configure which folder will be serving the static files

For the settings bellow, choose `master` as the branch you want to use and the root folder `/` as the folder you want to use.

Create a file `.github/workflows/ssg-build.yml` with (assuming the branch `main` will trigger a new deploy).

In the build section below, update the environment variables to build with the correct settings.

- `NULLSTACK_PROJECT_NAME` - your project name
- `NULLSTACK_PROJECT_DOMAIN` - domain, required to correctly render meta tags
  - if you have a custom domain you should also create a file `public/CNAME` containing your domain name
- `NULLSTACK_PROJECT_COLOR` - color to show your application in when installing in devices

> ✨ You can alternatively store these values in GitHub's secrets settings.

```yml
name: Nullstack SSG Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Cache dependencies
        uses: actions/cache@v3
        with:
          path: |
            **/node_modules
            **/yarn.lock
            **/.production
          key: node_modules-${{ hashFiles('**/package.json') }}

      - name: Install deps
        run: yarn

      - name: Build
        env:
          NULLSTACK_PROJECT_NAME: 'Nullstack Project Name'
          NULLSTACK_PROJECT_DOMAIN: 'some-awesome-nullstack-project.com'
          NULLSTACK_PROJECT_COLOR: '#D22365'
        run: yarn build --cache

      - name: Deploy 🚀
        uses: JamesIves/github-pages-deploy-action@v4.3.3
        with:
          branch: master
          folder: built
```

This action will build your application in SSG mode and generate a folder with the static website, the last command will deploy the static folder to your `master` branch allowing static content to be served from the root.

## Deploying a Nullstack application to Heroku

### SSR

Use the Buildpack `heroku/nodejs`.

Create a `Procfile` in the application root with the following:

```
web: node .production/server.js
```

## Deploying a Nullstack application to AWS

### SSR

Run the `build` script and serve your application with:

```
node .production/server.js
```

## Deploying a Nullstack application to Azure

### SSR

Run the `build` script and serve your application with:

```
node .production/server.js
```

## Next step

> 🎉 **Congratulations!** You are done with the documentation!

⚔ If you want to see this more examples please [open an issue on github](https://github.com/nullstack/nullstack/issues).
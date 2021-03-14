---
title: Getting Started
description: Create full-stack javascript applications within seconds 
---

> 📌 You can watch a video tutorial on our [Youtube Channel](https://www.youtube.com/watch?v=l23z00GEar8&list=PL5ylYELQy1hyFbguVaShp3XujjdVXLpId).

Create full-stack javascript applications within seconds using `npx` to generate your project files from the latest template.

> 🔥 The minimum required [node.js](https://nodejs.org) version for development mode is *12.12.0*.

> ⚠ If the directory you are in contains spaces, you use Windows and `npx` gives errors, read about [the known npx bug](#the-known-npx-bug).

Replace `project-name` with your project name and run the command below to start a project: 

```sh
npx create-nullstack-app project-name
```

Change directory to the generated folder:

```sh
cd project-name
```

Install the dependencies:

```sh
npm install
```

Start the application in development mode:

```sh
npm start
```

## Understanding the generated files

The following folders and files will be generated:

### index.js

This is the [Webpack](https://webpack.js.org) entry point.

Usually, you don't have to touch this file, but it is a convenient place to import global dependencies like CSS frameworks.

### src/

This folder will contain the actual source code of your application.

### src/Application.njs

This is your application main file.

>✨ Learn more about the [njs file extension](/njs-file-extension "Nullstack Javascript").

The `start` function will be automatically called once when you run `npm start`, use it to populate your server [context](/context) with things like [database](/how-to-use-mongodb-with-nullstack), [settings](/context-settings), and [secrets](/context-secrets).

>✨ Learn more about the [application startup](/application-startup).

### src/Application.scss

This is an empty file just to demonstrate that you can use [SCSS with Nullstack](/styles).

It is a good practice to import a style file in a component with the same name.

>✨ Learn more about [styles](/styles).

### public/

Every file in here will be available to anyone from the domain root.

By default `create-nullstack-app` generates the icons required for your `manifest.json` and images for OG meta tags.

>✨ Learn more about [manifest.json](/context-project).

Be sure to replace these images with your project identity.

### .development/

This is the compiled result of your application in development mode.

> 🔥 Do not touch this folder

### .production/

This is the compiled result of your application in production mode.

> 🔥 Do not touch this folder

>✨ Learn more about [how to deploy a Nullstack application](/how-to-deploy-a-nullstack-application).

## The known npx bug

Warned on `npx` issues like [#100](https://github.com/zkat/npx/issues/100), [#110](https://github.com/zkat/npx/issues/110) and [#143](https://github.com/zkat/npx/issues/146), it has an error when trying to resolve the path to his cache folder when contains spaces.

If this happens to you, our recommendations are:

- Using downloaded as you normally would with `npm`:
  ```sh
  npm i -g create-nullstack-app
  create-nullstack-app project-name
  ```

- or, change the cache folder directory, as stated [here](https://github.com/zkat/npx/issues/146#issuecomment-384016791) and [here](https://github.com/zkat/npx/issues/146#issuecomment-384019497):

  - If you want to keep the use of space, replace `FirstName` with the one used on your path and run:
  ```sh
  npm config set cache "C:\Users\FirstName~1\AppData\Roaming\npm-cache" --global
  ```

  - or, using another path without spaces:
  ```sh
  npm config set cache C:\tmp\nodejs\npm-cache --global
  ```

## Next step

⚔ Create your first [renderable component](/renderable-components).
---
title: Getting Started
description: Create full-stack javascript applications within seconds 
---

> 📌 You can watch a video tutorial on our [Youtube Channel](https://www.youtube.com/watch?v=l23z00GEar8&list=PL5ylYELQy1hyFbguVaShp3XujjdVXLpId).

Create full-stack javascript applications within seconds using `npx` to generate your project files from the latest template.

> 🔥 The minimum required [node.js](https://nodejs.org) version for development mode is *12.12.0*.

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

## Next step

⚔ Create your first [renderable component](/renderable-components).
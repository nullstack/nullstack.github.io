---
title: Application Startup
description: The start function will run only once when your application loads and is a good place for setting up your context
---

The **server.js**/**client.js** files at your application root are responsible for starting your application.

When you run the application with `npm start` the `Nullstack.start` method in both files will start your main component and return the [`context`](/context) object of their respectives environments.

The returned `context` could be used normally, and you can set it's `start` method which runs only once, being a good place for setting things up, as your database:

```jsx
import Nullstack from 'nullstack';
import Application from './src/Application';
import startDatabase from './database';

const context = Nullstack.start(Application);

context.start = async function() {
  context.database = await startDatabase(context.secrets);
}

export default context;
```

> 💡 The `context.start` in **server.js** runs when the application is booted, and on **client.js** once the browser loads it

The `context` can be updated in any way as long as it be exported on both files, when building the app Nullstack turns it into a serverless function out-of-box.

## Dependency startup pattern

A nice pattern to work with dependencies that require startup time configurations is to define a `start` function in the dependency:

```jsx
import Nullstack from 'nullstack';

class Dependency extends Nullstack {

  static async start(context) {
    // start something with context
  }

}

export default Dependency;
```

And call it in the `context.start` passing the [context](/context):

```jsx
import Nullstack from 'nullstack';
import Application from './src/Application';
import Dependency from './src/Dependency';

const context = Nullstack.start(Application);

context.start = async function() {
  await Dependency.start(context);
}

export default Application;
```

> 🔒 Server functions with the name starting with "start" (and optionally followed by an uppercase letter) do not generate an API endpoint to avoid malicious context flooding.

## Script runner pattern

With this decoupling of the app `context`, after a compilation you can access it's keys running a script in another file.

See a file **script.js** created at root with two examples manipulating even [`project`](/context-project), [`settings`](/context-settings) and the registered [MongoDB database](/how-to-use-mongodb-with-nullstack) below:

```jsx
// import from .production instead if you run this in production mode
const { default: context } = require('./.development/server.js');
const Faker = require('faker');

// registers 5 random fake users
async function populateDB() {
  await context.start();
  const { database } = context;
  for (let id = 0; id < 5; id++) {
    await database.collection('users').insertOne({
      id,
      username: Faker.name.firstName()
    });
  }
  console.log('Registered users!');
  process.exit(0);
}

// does something based on users count
async function countUsers() {
  await context.start();
  const { database, project, settings } = context;
  project.name = settings.projectName;

  const count = await database.collection('users').count();
  if (count > 100) {
    console.log(`${project.name} have more than 100 registered users!`);
  } else {
    console.log(`${project.name} have ${count} registered users!`);
  }
  process.exit(0);
}

const command = process.argv.splice(2);
// runs if passing 'populate' arg
if (command[0] === 'populate') {
  populateDB();
} else {
  countUsers();
}
```

Then, you can run it with a Node command as follows:

```bash
> node script.js
MyProject have 49 registered users!
```

> 💡 Script runners are great for many things like seeding a database in specific environment, testing `context` behaviors and automating app jobs

## Next step

⚔ Learn about [functional components](/functional-components).
---
title: Script Runner
description: The context is a simple javascript object that is completely decoupled from the framework itself and can be taken advantage of to use the same context as the main application to run scripts
---

The context is a simple javascript object that is completely decoupled from the framework itself and can be taken advantage of to use the same context as the main application to run scripts.

After compilation you can access it's keys running a script in another file that simply imports the environment bundle.

This pattern is much more convenient than having to duplicate your logic for one-off scripts.

You must manually start the application to make sure that the context is populated.

You must exit the process manually unless you want to have a script that is continuously alive.

The example bellow is a simple JavaScript file under **scripts/seed.js** used for seeding the [MongoDB database](/how-to-use-mongodb-with-nullstack) registered in the context:

```jsx
// import from .production instead if you run this in production mode
const { default: context } = require('../.development/server.js');
const Faker = require('@faker-js/faker');

// registers 5 random fake users
async function seed() {
  await context.start();
  const { database, project } = context;
  for (let id = 0; id < 5; id++) {
    await database.collection('users').insertOne({
      id,
      username: Faker.name.firstName()
    });
  }
  console.log(`5 users seeded to ${project.name}`);
  process.exit(0);
}

seed()
```

To run it you can simply execute it as a normal node command.

> 🔥 You must always run it form the root in order to pick the correct .env file

```bash
> node scripts/seed.js
5 users seeded
```

Script runners are great for many things like:
- seeding a database in specific environment
- testing `context` behaviors
- one-off tasks
- cron jobs

Note that you are not limited to the above, you can be creative and use it for more complex things like watching blockchain events or task needs access to the same context as your application.
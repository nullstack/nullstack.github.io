---
title: NJS File Extension
description: Nullstack Javascript files let Webpack know which loaders to use at transpile time
---

Nullstack Javascript files let Webpack know which loaders to use at transpile time.

NJS files must import Nullstack or one of its subclasses.

If only a subclass is imported, a Nullstack import will be injected at transpile time.

At transpile time JSX tags will be replaced with *Nullstack.element*

This extension also allows Nullstack to make free transpile time optimizations like source injection and extracting renderable components into stateless functions.

> 🔥 Each file must have only one class declaration.

On the *server* bundle static async functions are mapped into a registry for security.

On the *client* bundle static async functions are removed and replaced with a flag.

On both *server* and *client* bundles, a hash with the md5 of the original source code is added to the class.

> 🐱‍💻 Bellow an example of a original .njs file.

```jsx
import List from './List';

class Tasks extends List {

  static async getTasks({limit}) {
    const {readFileSync} = await import('fs');
    const json = readFileSync('tasks.json', 'utf-8');
    return JSON.parse(json).tasks.slice(0, limit);
  }

  prepare(context) {
    context.tasks = [];
  }

  async initiate(context) {
    context.tasks = await this.getTasks({limit: 10});
  }

  renderTask({task}) {
    return (
      <li> 
        <input bind={task.description} />
      </li>
    )
  }

  render() {
    return (
      <main>
        <ul>
          {tasks.map((task) => <Task task={task} />)}
        </ul>
      </main>
    )
  }

}

export default Tasks;
```

> 🐱‍💻 Bellow an example of the same transpiled .njs file.

```jsx
import Nullstack from 'nullstack';
import List from './List';

class Tasks extends List {

  static hash = 'd493ac09d0d57574a30f136d31da455f';

  static getTasks = true;

  prepare(context) {
    context.tasks = [];
  }

  async initiate(context) {
    context.tasks = await this.getTasks({limit: 10});
  }

  renderTask({task}) {
    return (
      <li> 
        <input source={task} bind="description" />
      </li>
    )
  }

  render() {
    const Task = this.renderTask;
    return (
      <main>
        <ul>
          {tasks.map((task) => <Task task={task} />)}
        </ul>
      </main>
    )
  }

}

export default Tasks;
```

> 🐱‍💻 Bellow an example of a original .njs file.

```jsx
import Nullstack from 'nullstack';

class Tasks extends Nullstack {

  renderTask({task}) {
    return (
      <li> 
        <input bind={task.description} />
      </li>
    )
  }

  render({tasks}) {
    return (
      <main>
        <ul>
          {tasks.map((task) => <Task task={task} />)}
        </ul>
      </main>
    )
  }

}

export default Tasks;
```

> 🐱‍💻 Bellow an example of the same transpiled .njs file.

```jsx
import Nullstack from 'nullstack';

class Tasks extends Nullstack {

  static renderTask({task}) {
    return (
      <li> 
        <input source={task} bind="description" />
      </li>
    )
  }

  static render({tasks}) {
    const Task = this.renderTask;
    return (
      <main>
        <ul>
          {tasks.map((task) => <Task task={task} />)}
        </ul>
      </main>
    )
  }

}

export default Tasks;
```

## Next step

⚔ Learn about [server-side rendering](/server-side-rendering).
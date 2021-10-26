---
title: NJS File Extension
description: Nullstack JavaScript files let Webpack know which loaders to use at transpile time
---

Nullstack JavaScript files let [Webpack](https://webpack.js.org) know which loaders to use at transpile time.

NJS files must import Nullstack or one of its subclasses.

If only a subclass is imported, a Nullstack import will be injected at transpile time.

At transpile time JSX tags will be replaced with `Nullstack.element`.

This extension also allows Nullstack to make free transpile time optimizations like source injection.

> 🔥 Each file must have only one class declaration.

* On the **server** bundle static async functions are mapped into a registry for security.
* On the **client** bundle static async functions are removed and replaced with a invoke method.
* On the **client** bundle static async functions with the name starting with **"start"** (and optionally followed by an uppercase letter) are completely removed.
* On both **server** and **client** bundles, a hash with the md5 of the original source code is added to the class.

> 🐱‍💻 Bellow an example of a original .njs file.

```jsx
import List from './List';
import {readFileSync} from 'fs';

class Tasks extends List {

  static async getTasks({limit}) {
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

  static getTasks = Nullstack.invoke('getTasks', 'd493ac09d0d57574a30f136d31da455f');

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

## Next step

⚔ Learn more about the [service worker](/service-worker).
---
title: Context Instances
description: The instances object is a proxy in the Nullstack Context available in both client and server and gives you all active instances in application
---

- Type: `object`
- Origin: [Nullstack Context](/context#----nullstack-context)
- Availability: server/client
- **readwrite** in server/client context

It gives you all active instances of the application.

> 🔥 Active instances are the ones rendered at current route

As explained in [instance `key`](/instance-self#instance-key), keys play a big role on defining an unique identifier for components.

Based on it, was right around the corner the implementation of an listing of instances (more documented on [this article](https://guiwriter.netlify.app/tech/nullstack-instances/) in portuguese).

To explain how this concept works, let's use the historically simplest example: The To-do.

```jsx
import Nullstack from 'nullstack';
import Todo from './Todo';
import Undone from './Undone';

class Application extends Nullstack {

  render() {
    return (
      <main>
        <Undone key="undone" />
        <Todo/>
      </main>
    )
  }

}

export default Application;
```

In the above code we import and render **Todo** and **Undone**, and especially add an unique `key` to **Undone**.

**Undone** is focused on the solely task of showing how many undone to-dos are out there.

And, simpler than that, we doesn't even need to code the access to those to-dos here.

```jsx
import Nullstack from 'nullstack';

class Undone extends Nullstack {

  undones = 0;
  render() {
    return <p> Undones: {this.undones} </p>
  }

}

export default Undone;
```

Last but not least, here is where main magic happens, the **Todo** component:

```jsx
import Nullstack from 'nullstack';

class Todo extends Nullstack {

  todos = [];
  newTodo = '';

  addTodo({ instances }) {
    this.todos.push(this.newTodo);
    // accessing 'undone' component
    instances.undone.undones = this.todos.length;
  }

  render() {
    return (
      <>
        <ol>
          {this.todos.map(todo => <li>{todo}</li>)}
        </ol>

        {/* binding value to newTodo */}
        <input type="text" bind={this.newTodo} />
        <button onclick={this.addTodo}>
          Add to-do
        </button>
      </>
    )
  }
}

export default Todo;
```

Going by parts, in `render` we are listing `todos`, which stays empty until user types the `newTodo` in `input`, and press button, calling our `addTodo`.

In the `addTodo` method we are [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) `instances` from [`context`](/context), bringing the list of active instances and making possible to directly set value of `undones` array from the **Undone** component.

And going beyond, imagine if in **Undone** we do more than showing and have an calculation method or one to store this count at database, in **Todo** we could directly do:

```jsx
// destructuring again
const { undone } = instances;
const count = this.todos.length;
undone.calculate(count);
await undone.storeUndones(); // async storing
```

Well, this was a focused demo of the concept, but take your time to imagine:

- An notification icon at navbar, updating on every read on messages component, and having a method to mark all of them as read too
- An count in the header showing how many posts/emails did you read, unread or liked, without the need of an global state management or API requests
- Something not even we imagined, so, dream on!

## Next step

⚔ Learn about the [context `environment`](/context-environment).
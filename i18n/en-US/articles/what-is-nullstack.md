---
title: What is Nullstack?
description: Nullstack is a full stack web framework that allows features with front and back end to be created in a single component, We call it "feature-driven" components. Nullstack makes coding fun and simple because you don't think of big architectures, instead you just have small composable features.
---

Nullstack is a full stack web framework that allows features with front and back end to be created in a single component, We call it "feature-driven" components. Nullstack makes coding fun and simple because you don't think of big architectures, instead you just have small composable features.

It's easier to show than tell: Let's go over a component that lets you see the number of likes of a post in 5 minutes togheter!

In your head you are already thinking of APIs and architecture, but all your users want is to see information from the database and in the screen, so lets do just that:

```jsx
import Nullstack from 'nullstack'

class LikeButton extends Nullstack {

  // instance variables are mutable and reactive
  // you can use vanilla JS instead of idiomatic hooks
  likes = 0

  // static async functions run in the server
  static async getNumberOfLikes({ database, post }) {
    // database is a user defined context key
    const sql = 'SELECT COUNT(*) FROM likes WHERE post = ?'
    const [likes] = await database.query(sql, [post])
    return likes
  }

  async initiate({ post }) {
    // you can use the returned value of server functions
    // as if it was a regular function
    this.likes = await this.getNumberOfLikes({ post })
  }

  // JSX follows the HTML standards
  render() {
    return (
      <div class="likes-counter">
        <span> {this.likes} </span>
      </div>
    )
  }

}
```

That was easy, this is a feature, everything else is an imaginary problem. But that was actually too easy, what if we want to write data to the database instead of just reading on page load?

Let's change that span into a button and check the acceptance criteria for our feature. At any moment you can choose to run functions in the server and Nullstack will generate at compile time a microservice with an API just for that function.


```jsx
import Nullstack from 'nullstack'

class LikeButton extends Nullstack {

  // ...

  static async createLike({ request, database, post }) {
    const user = request.user.id
    const sql = 'INSERT INTO likes (user, post) VALUES (?, ?)'
    await database.query(sql, [user, post])
  }

  // every client function receives the props
  async like({ post }) {
    // you can mutate variables and the dom reflect the changes
    this.likes++
    // this is calling an api endpoint under the hood
    await this.createLike({ post })
  }

  // JSX follows the HTML standards
  render() {
    return (
      <div class="likes-counter">
        <button onclick={this.like}>
          {this.likes}
        </button>
      </div>
    )
  }

}
```

This example is small but gives you a glimpse at the beauty of Nullstack, every feature is just a component, and features can be composed as you want. This component can go inside a post component.

```jsx
function Post({ post }) {
  return (
    <div>
      <article> {post.content} </article>
      <LikeButton post={post.id}>
    </div>
  )
}
```

You can even have entire applications as components inside another application.

```jsx
function Application() {
  return (
    <div>
      <Blog route="/blog/*">dssxs-
      <Ecommerce route="/shop/*">
      <Home route="/">
    </div>
  )
}
```

Any developer can jump right into your project with just JavaScript knowledge and be productive at day 0 because they don't need to understand an overly complicated architecture or have to deal with a giant monolith. Nullstack apps are just isolated small features that are fun to code.
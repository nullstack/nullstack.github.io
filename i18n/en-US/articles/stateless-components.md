---
title: Stateless Components
description: Stateless components are pure functions that return JSX.
---

Stateless components are pure functions that return JSX.

JSX is an XML/HTML-like syntax that extends ECMAScript so that XML/HTML-like text can co-exist with JavaScript.

Stateless components are very similar to web components, they give you the ability to create new HTML tags that shortcut a group of other HTML tags.

Create a file in your src folder with the name of your component and the [jsx extension](/jsx-elements).

The props passed to a component can be destructured in the function signature

```jsx
// src/HelloDweeb.jsx
export default function HelloDweeb({ name }) {
  return <p> Hello {name} </p>
}
```

```jsx
// src/Application.jsx
import HelloDweeb from './HelloDweeb';

export default function Application({ name }) {
  return (
    <div>
      <HelloDweeb name="Anny">
    </div>
  )
}
```

Stateless components have access to the [`client context`](/context) and props are merged into the specific context

```tsx
// src/HelloProject.tsx
import { NullstackClientContext } from 'nullstack'

interface HelloProjectProps {
  name: string
}

export default function HelloProject(context: HelloProjectProps) {
  const { project, name } = context as NullstackClientContext<HelloProjectProps>
  return <p> Hello {name} welcome to {project.name} </p>
}
```

```jsx
// src/Application.tsx
import HelloProject from './HelloProject';

export default function Application() {
  return (
    <div>
      <HelloProject name="Bilkaya">
    </div>
  )
}
```
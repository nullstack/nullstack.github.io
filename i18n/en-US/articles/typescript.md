---
title: TypeScript
description: Nullstack supports TypeScript, you can use by simply adding the extension TSX on your components.
---

[TypeScript](https://www.typescriptlang.org/) allows you to get auto-complete, rename things, get contextual information about variables, know function parameters, prevent errors before even running your code. You can tune it to be full strict mode, or you can have it be very flexible only providing you the tools to make you more productive.

Nullstack supports TypeScript. All you have to do is rename your file from `njs -> nts` or `jsx -> tsx`.

> ✨ TypeScript is completely optional and you can use pure JavaScript if you prefer.

You can read the full list of types in our [GitHub Repo](https://github.com/nullstack/nullstack/tree/master/types)

The two most often types used are `NullstackClientContext` and `NullstackServerContext`

```jsx
import Nullstack, {NullstackClientContext, NullstackServerContext} from 'nullstack'

class TypeScript extends Nullstack {

    // ...
    async serverFunction(context: NullstackServerContext) {}

    async clientFunction(context: NuNullstackClientContextls) {}
    // ...

}
```
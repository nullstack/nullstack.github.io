---
title: TypeScript
description: Nullstack suporta TypeScript, você pode simplesmente utilizar simplesmente adicionando a extensão TSX em seus componentes.
---

[TypeScript](https://www.typescriptlang.org/) permite que você possa utilizar as funcionalidades de autocompletar, renomear, obter informações contextuais sobre variáveis, conhecer os parâmetros de função e prevenir erros antes mesmo da execução do código. Você pode ajustá-lo para o modo estrito completo ou o modo muito flexível, fornecendo apenas as ferramentas para torná-lo mais produtivo.

Nullstack suporta TypeScript. Tudo o que você precisa fazer é renomear o arquivo de `njs -> nts` ou `jsx -> tsx`.

> ✨ TypeScript é completamente opcional e você pode utilizar somente o Javascript caso prefira.

Você pode ler a lista completa de tipos em nosso [GitHub Repo](https://github.com/nullstack/nullstack/tree/master/types)

Os dois tipos mais usados são `NullstackClientContext` e `NullstackServerContext`.

```jsx
import Nullstack, {
  NullstackClientContext,
  NullstackServerContext,
} from "nullstack";

class TypeScript extends Nullstack {
  // ...
  async serverFunction(context: NullstackServerContext) {}

  async clientFunction(context: NuNullstackClientContextls) {}
  // ...
}
```

## Next step

> 🎉 **Parabéns!**. Você terminou com os conceitos principais!

⚔ Aprenda sobre [Transpilação e Segurança](/transpilation-and-security).

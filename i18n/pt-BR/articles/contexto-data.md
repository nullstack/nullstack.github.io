---
title: Contexto Data
description: O data é um objeto no framework que armazena parte de seu contexto e fornece informações sobre o conjunto de dados do elemento.
---

O `data` é um objeto no framework que armazena parte de seu contexto e fornece informações sobre o conjunto de dados do elemento.

Você pode usar esta chave para evitar poluir seu DOM com atributos inválidos.

> 💡 Isso ajuda o Nullstack a definir atributos sem perder tempo validando-os.

Esta chave é _readonly_ e disponível apenas no contexto do _client_.

Quaisquer atributos `data-`\* receberão uma chave camelizada respectiva no objeto de dados.

Você pode atribuir atributos **data** via `data-`\* e uma chave de dados que aceita um objeto com chaves camelizadas.

A versão kebab também está disponível no contexto.

```jsx
import Nullstack from "nullstack"

class ContextData extends Nullstack {
  count = 1

  calculate({ data }) {
    this.count = this.count * data.multiply + data.sum
  }

  renderInner(context) {
    const { data } = context
    return (
      <div data={data}>
        {data.frameworkName}é o mesmo que
        {context["data-framework-name"]}
      </div>
    )
  }

  render({ data }) {
    return (
      <div>
        <button onclick={this.calculate} data-multiply={3} data={{ sum: 2 }}>
          Calcular
        </button>
        <Inner data-framework-name="Nullstack" />
      </div>
    )
  }
}

export default ContextData
```

> 💡 Chaves camelizadas do objeto de dados resultarão em atributos kebab no DOM.

## Próxima Etapa

⚔ Aprenda sobre o[contexto environment](/pt-br/contexto-environment).

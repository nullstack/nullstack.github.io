---
title: Contexto Data
description: O objeto data é um proxy no Contexto Componente disponível no client e te dá informações sobre o conjunto de dados do elemento
---

- Tipo: `object`
- Origem: [Contexto Componente](/pt-br/contexto#----contexto-componente)
- Disponibilidade: **client**
- **readonly** no contexto do **client**

Ele te dá informações sobre o conjunto de dados do elemento.

Você pode usar esta chave para evitar poluir seu DOM com atributos inválidos.

> 💡 Isso ajuda o Nullstack a definir atributos sem perder tempo validando-os.

Quaisquer atributos `data-*` receberão uma chave camelizada respectiva no objeto `data`.

Você pode atribuir atributos `data` ambos via `data-*` e uma chave `data` que aceita um objeto com chaves camelizadas.

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

> 💡 Chaves camelizadas do objeto `data` resultarão em atributos kebab no DOM.

## Próxima Etapa

⚔ Aprenda sobre a [chave `environment` do contexto](/pt-br/contexto-environment).
---
title: Componentes com estado
description: Um framework web full stack produtivo não deve forçar você a pensar sobre detalhes de estrutura
---

Um framework web full stack produtivo não deve forçar você a pensar sobre detalhes de estrutura.

Nullstack assume o controle de suas subclasses e gera um proxy para cada instância.

Quando você invoca qualquer coisa em sua classe, você está na verdade dizendo ao Nullstack o que fazer com o ambiente nos bastidores.

Isso permite que você use operações de JavaScript vanilla como atribuir a uma variável e ver o reflexo no dom.

## Mutabilidade

Você pode modificar variáveis ​​de instância para atualizar o estado do seu aplicativo.

As funções são vinculadas automaticamente ao proxy da instância e podem ser passadas como referência para eventos.

Os eventos são declarados como atributos HTML normais.

```jsx
import Nullstack from "nullstack";

class Counter extends Nullstack {

  count = 0;

  increment() {
    this.count++;
  }

  render() {
    return (
      <button onclick={this.increment}>
        {this.count}
      </button>
    )
  }

}

export default Counter;
```

> 💡 As atualizações são feitas em lotes, geralmente enquanto aguardam chamadas assíncronas, portanto, fazer várias atribuições não tem custos de desempenho!

## Objeto de Eventos

Você pode criar atalho em eventos que são simples atribuições passando um objeto para o evento.

Cada chave do objeto será atribuída à instância.

```jsx
import Nullstack from "nullstack";

class Counter extends Nullstack {

  count = 0;

  render() {
    return (
      <button onclick={{ count: this.count + 1 }}>
        {this.count}
      </button>
    )
  }

}

export default Counter;
```

## Fonte de Evento

Por padrão, os eventos referem-se a `this` quando você passa um objeto.

Você pode usar o atributo `source` para definir qual objeto receberá as atribuições.

```jsx
import Nullstack from "nullstack";

class Paginator extends Nullstack {

  render({ params }) {
    return (
      <button source={params} onclick={{ page: 1 }}>
        Primeira Página
      </button>
    )
  }

}

export default Paginator;
```

> ✨ Aprenda mais sobre a [chave `params` do contexto](/pt-br/rotas-e-parametros).

> 💡 Se você não declarar uma fonte para o evento, o Nullstack injetará `source={this}` no tempo de transpilação para pular completamente o processo de pesquisa em tempo de execução!

## Contexto de Evento

Os atributos do elemento-alvo do evento serão mesclados ao `context` da instância e podem ser desestruturados na assinatura da função.

```jsx
import Nullstack from "nullstack";

class Counter extends Nullstack {

  count = 0;

  increment({ delta }) {
    this.count += delta;
  }

  render() {
    return (
      <button onclick={this.increment} delta={2}>
        {this.count}
      </button>
    )
  }

}

export default Counter;
```

> 💡 Qualquer atributo com valor primitivo será adicionado ao DOM.

> ✨ Considere usar [atributos `data`](/pt-br/contexto-data) para tornar seu HTML válido.

## Evento Original

O comportamento padrão do navegador é impedido por padrão.

Você pode desativar isso declarando um atributo `default` para o elemento de evento.

Uma referência ao evento original é sempre mesclada com o contexto da função.

```jsx
import Nullstack from "nullstack";

class Form extends Nullstack {
  submit({ event }) {
    event.preventDefault();
  }

  render() {
    return (
      <form onsubmit={this.submit} default>
        <button> Enviar </button>
      </form>
    )
  }
}

export default Form;
```

## Próximos passos

⚔ Aprenda sobre o [ciclo da vida full-stack](/pt-br/ciclo-de-vida-full-stack).

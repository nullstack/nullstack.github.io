---
title: Componentes com estado
description: Um framework web full stack produtivo não deve forçar você a pensar sobre detalhes de estrutura
---
Componentes com estado são classes que estendem nullstack e são capazes de manter o estado que reflete na interface do usuário.

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

## Array de Eventos

Você pode passar um array de eventos como prop e eles serão executados em paralelo

Você também pode passar valores falsos para pular eventos condicionalmente.

```jsx
import Nullstack from 'nullstack';

class Counter extends Nullstack {

  count = 0;

  increment() {
    this.count++;
  }

  log() {
    console.log(this.count);
  }

  logUnlessZero() {
    console.log(this.count > 0);
  }
  
  render() {
    return (
      <button onclick={[this.increment, this.log, this.count > 0 && this.logUnlessZero]}> 
        {this.count}
      </button>
    )
  }

}

export default Counter;
```

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

## Eventos Debounced

Você pode usar o atributo `debounce` passando um número de milissegundos para atrasar os eventos desse elemento

```jsx
import Nullstack from 'nullstack';

class Counter extends Nullstack {
  
  count = 0

  increment() {
    this.count++
  }
  
  render() {
    return (
      <button onclick={this.increment} debounce={2000}> 
        increment 
      </button>
    )
  }

}

export default Counter;
```


## TypeScript 

Componentes com estado aceitam um genérico que reflete nas props que sua tag aceitará

```tsx
// src/Counter.tsx
import Nullstack, { NullstackClientContext } from 'nullstack';

interface CounterProps {
  multiplier: number 
}

class Counter extends Nullstack<CounterProps> {

  // ...
  
  render({ multiplier }: NullstackClientContext<CounterProps>) {
    return <div> {multiplier} </div>
  }

}

export default Counter;
```

```tsx
// src/Application.tsx
import Counter from './Counter'

export default function Application() {
  return <Counter multiplier={4} />
}
```

## Componentes internos

Em vez de criar um novo componente apenas para organizar a divisão de código, você pode criar um componente interno.

Componentes internos são qualquer método cujo nome comece com `render` seguido por um caractere maiúsculo.

Os componentes internos compartilham a mesma instância e escopo do componente principal, portanto, são muito convenientes para evitar problemas como perfuração de escoras.

Para invocar o componente interno, use uma tag JSX com o nome do método sem o prefixo `render`.

```tsx
import Nullstack, { NullstackClientContext, NullstackNode } from 'nullstack';

interface CounterProps {
  multiplier: number 
}

interface CounterButtonProps {
  delta: number
}

declare function Button(context: CounterProps): NullstackNode

class Counter extends Nullstack<CounterProps> {

  count = 0;

  increment({ delta, multiplier }: NullstackClientContext<CounterProps & CounterButtonProps>) {
    this.count += delta * multiplier;
  }

  renderButton({ delta = 1 }: NullstackClientContext<CounterProps & CounterButtonProps>) {
    return (
      <button onclick={this.increment} delta={delta}> 
        {this.count}
      </button>
    )
  }
  
  render() {
    return (
      <div>
        <Button />
        <Button delta={2} />
      </div>
    )
  }

}

export default Counter;
```
> 💡 Nullstack will inject a constant reference to the function at transpile time in order to completely skip the runtime lookup process!

## Próximos passos

⚔ Aprenda sobre o [ciclo da vida full-stack](/pt-br/ciclo-de-vida-full-stack).

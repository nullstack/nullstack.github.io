---
title: Contexto
description: Cada função no Nullstack recebe um contexto como argumento.
---

Cada função no Nullstack recebe um contexto como argumento.

Existem dois contextos, um para o cliente e outro para o servidor.

O contexto do cliente dura enquanto a guia do navegador estiver aberta.

O contexto do servidor dura enquanto o servidor estiver em execução.

Ambos os contextos são proxies que mesclam as chaves de 3 objetos:

## 1 - Contexto Nullstack

Essas são as informações que o framework disponibiliza para você por padrão.

### As chaves globais disponíveis em ambos server e client são:

- [`page`](/pt-br/contexto-page)
- [`project`](/pt-br/contexto-project)
- [`environment`](/pt-br/contexto-environment)
- [`params`](/pt-br/rotas-e-parametros#par-metros)
- [`router`](/pt-br/rotas-e-parametros#roteador)
- [`settings`](/pt-br/contexto-settings)
- [`worker`](/pt-br/service-worker)

### As chaves disponíveis apenas em funções do servidor são:

- [`server`](/pt-br/requisicao-e-resposta-do-servidor)
- [`request`](/pt-br/requisicao-e-resposta-do-servidor#requisi--o-e-resposta)
- [`response`](/pt-br/requisicao-e-resposta-do-servidor#requisi--o-e-resposta)
- [`secrets`](/pt-br/contexto-secrets)

### A chave disponível apenas no cliente:

- [`instances`](/pt-br/contexto-instances)

## 2 - Contexto Aplicação

Quando você define uma chave para o contexto, ela fica disponível para desestruturação em qualquer profundidade da aplicação, até mesmo para os objetos pais ou aplicações de terceiros que montam seu componente.

Atualizar uma chave no contexto faz com que a aplicação seja renderizada novamente automaticamente.

Você pode pensar nisso como um único conceito para substituir **stores**, **contexts**, **services**, e **reducers** ao mesmo tempo, usando o padrão de injeção de dependência com objetos JavaScript padrão.

```jsx
import Nullstack from 'nullstack';

class Counter extends Nullstack {

  prepare(context) {
    context.count = 1;
  }

  static async updateTotalCount(context) {
    context.totalCount += context.count;
  }

  async double(context) {
    context.count += context.count;
    await this.updateTotalCount();
  }

  render({count}) {
    return (
      <button onclick={this.double}> {count} </button>
    )
  }

}

export default Counter;
```

```jsx
import Nullstack from 'nullstack';
import Counter from './Counter';

class Application extends Nullstack {

  prepare(context) {
    context.totalCount = 0;
  }

  render({count}) {
    return (
      <main>
        {(!count || count < 10) && <Counter />}
      </main>
    )
  }

}

export default Application;
```

## 3 - Contexto Componente

Este contém os atributos que você declara em sua tag, e incluindo:

- [`data`](/pt-br/contexto-data)
- [`self`](/pt-br/instancia-self)
- [`children`](/pt-br/componentes-renderizaveis#componentes-com-filhos)

Se o atributo é declarado em uma tag componente cada função desse componente terá acesso a esse atributo em seu contexto.

Se o atributo for declarado em uma tag que possui um evento, ele será incorporado ao contexto da função de evento.

```jsx
import Nullstack from 'nullstack';

class Counter extends Nullstack {

  add(context) {
    context.count += context.delta + context.amount;
  }

  render({count, delta}) {
    return (
      <button onclick={this.add} amount={1}>
        adicionar {delta} em {count}
      </button>
    )
  }

}

export default Counter;
```

```jsx
import Nullstack from 'nullstack';
import Counter from './Counter';

class Application extends Nullstack {

  prepare(context) {
    context.count = 0;
  }

  render() {
    return (
      <main>
        <Counter delta={2} />
      </main>
    )
  }

}

export default Application;
```

## Contexto de Funções

Cada função das subclasses do Nullstack é injetada com uma cópia do contexto da instância mesclada com seus argumentos.

Os argumentos são opcionais, mas se declarados, devem ser um único objeto com chaves de sua escolha.

```jsx
import Nullstack from 'nullstack';

class Counter extends Nullstack {

  add(context) {
    context.count += context.amount || 1;
  }

  prepare(context) {
    context.count = 0;
    this.add();            // soma 1
    this.add({amount: 2}); // soma 2
  }

  async initiate(context) {
    console.log(context.count); // 3
  }

}

export default Counter;
```
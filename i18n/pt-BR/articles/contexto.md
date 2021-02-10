---
title: Contexto
description: Cada função no Nullstack recebe um contexto como argumento.
---

Cada função no Nullstack recebe um contexto como argumento.

Existem dois contextos, um para o cliente e outro para o servidor.

O contexto do cliente dura enquanto a guia do navegador estiver aberta.

O contexto do servidor dura enquanto o servidor estiver em execução.

Ambos os contextos são proxies que mesclam as chaves de 3 objetos:

## 1 - Framework

Essas são as informações que o framework disponibiliza para você por padrão.

### As chaves globais do servidor são:

- [page](/pt-br/contexto-page)
- [environment](/pt-br/contexto-environment)
- [project](/pt-br/contexto-project)
- [server](/pt-br/requisicao-e-resposta-do-servidor)
- [request](/pt-br/requisicao-e-resposta-do-servidor)
- [response](/pt-br/requisicao-e-resposta-do-servidor)
- [worker](/pt-br/service-worker)

### As chaves globais do cliente são:

- [data](/pt-br/contexto-data)
- [page](/pt-br/contexto-page)
- [project](/pt-br/contexto-project)
- [environment](/pt-br/contexto-environment)
- [params](/pt-br/rotas-e-parametros)
- [router](/pt-br/rotas-e-parametros)
- [worker](/pt-br/service-worker)

### As chaves de instância do cliente são:

- [self](/pt-br/instancia-self)
- [children](/pt-br/componentes-renderizaveis)
- [key](/pt-br/instancia-key)

## 2 - Aplicação

Quando você define uma chave para o contexto, ela fica disponível para desestruturação em qualquer profundidade da aplicação, até mesmo para os objetos pais ou aplicações de terceiros que montam seu componente.

Atualizar uma chave no contexto faz com que a aplicação seja renderizada novamente automaticamente.

Você pode pensar nisso como um único conceito para substituir contextos, serviços e redutores ao mesmo tempo, usando o padrão de injeção de dependência com objetos javascript padrão.

```jsx
import Nullstack from 'nullstack';

class Counter extends Nullstack {

  prepare(context) {
    context.count = 1;
  }

  static async updateTotalCount(context) {
    context.totalCount += count;
  }

  async double(context) {
    context.count += context.count;
    await this.updateTotalCount({count: context.count});
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

  static async start(context) {
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

## 3 - Atributos

Esses são os atributos que você declara em sua tag.

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
        add {delta} to {count}
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
        <Counter delta={2} />}
      </main>
    )
  }

}

export default Application;
```

## Funções

Cada função das subclasses do Nullstack é injetada com uma cópia do contexto da instância mesclada com seus argumentos.

Os argumentos são opcionais, mas se declarados, devem ser um único objeto com chaves de sua escolha.

```jsx
import Nullstack from 'nullstack';

class Counter extends Nullstack {

  prepare() {
    this.add();
    this.add({amount: 2});
  }

  add(context) {
    context.count += context.amount || 1;
  }

}

export default Counter;
```

## Próximo passo

⚔ Aprenda sobre [Rotas e Parâmetros](/pt-br/rotas-e-parametros).
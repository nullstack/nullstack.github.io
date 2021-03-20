---
title: A *key* instance
description: A *key* *instance* é uma string na *store* do framework na parte do seu contexto e permite que você persista a instância quando é movida para a DOM.
---

A *key* *instance* é uma string na *store* do framework na parte do seu contexto e permite que você persista a instância quando é movida para a DOM.

Esta *key* é *readonly* depois que você inserir um valor no atributo e está disponível apenas no contexto do cliente.

Você pode declarar uma *key* por instância.

> 💡 Se você não declarar a *key* o nullstack irá gerar uma baseada na profundidade da dom

> 🔥 As *keys* não podem começar com "_." para evitar conflito com as *keys* geradas pelo Nullstack

As *keys* devem ser globalmente únicas já que o componente poderá ser movido para qualquer lugar da DOM e não apenas entre os componentes irmãos.

## Preservando o estado

As *keys* são úteis para preservar o estado em [stateful components](/stateful-components) quando você os move para dentro da DOM.

Isto é especialmente útil para listas com tamanho dinâmico que invocam os componentes.

```jsx
import Nullstack from 'nullstack';
import Item from './Item';

class List extends Nullstack {

  // ...

  async initiate() {
    this.items = await this.getItems();
  }
 
  render({self}) {
    return (
      <ul> 
        {this.items.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </ul>
    )
  }

}

export default Page;
```

## Instâncias compartilhadas

Você também pode usar as *keys* para compartilhar a instância entre dois elementos.

Apenas o primeiro encontro da *key* irá executar o [lifecycle](/full-stack-lifecycle)

```jsx
import Nullstack from 'nullstack';

class Counter extends Nullstack {

  count = 0;

  render({amount}) {
    return (
      <div>
        <button onclick={{count: this.count+1}}>
          {this.count} x {amount} = {this.count * amount}
        </button>  
      </div>
    )
  }

}

export default Counter;
```

```jsx
import Nullstack from 'nullstack';
import Counter from './Counter';

class Application extends Nullstack {

  render() {
    return (
      <main>
        <Counter key="a" amount={1} />
        <Counter key="b" amount={2} />
        <Counter key="b" amount={3} />
      </main>
    )
  }

}

export default Application;
```

## Próximo passo

⚔ Aprenda sobre [server request and response](/server-request-and-response).

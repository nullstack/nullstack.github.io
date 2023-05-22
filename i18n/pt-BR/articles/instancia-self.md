---
title: self da Instância
description: O objeto self é um proxy no Contexto Nullstack disponível no client e te dá informações sobre o ciclo de vida da instância
---

- Tipo: `object`
- Origem: [Contexto Nullstack](/pt-br/contexto#----contexto-nullstack)
- Disponibilidade: **server/client**
- **readonly** no contexto do **server** e **client**

Ele te dá informações sobre o ciclo de vida da instância e sua [`key`](#key-da-inst-ncia) única.

Cada instância recebe seu própio objeto `self`.

As seguintes *keys* estão disponíveis no objeto:

- **initiated**: `boolean`
- **hydrated**: `boolean`
- **prerendered**: `boolean`
- **persistent**: `boolean` (detalhes [aqui](/pt-br/componentes-persistentes))
- **element**: `HTMLElement` (somente no **client**)
- [`key`](#key-da-inst-ncia): `string`

Quando um método do ciclo de vida é resolvido, mesmo que não declarado, uma chave equivalente é setada para `true` no `self`.

Se o componente tiver sido renderizado no lado do servidor a chave `prerendered` continuará como `true` até que seja finalizado.

A chave `element` aponta para o seletor na DOM e sua existência só é garantida quando o `hydrate` está sendo chamado, pois `prepare` e `initiate` podem estar rodando no servidor.

> 💡 Não use a chave `element` para adivinhar o ambiente, ao invés use [`environment`](/pt-br/contexto-environment) para isso.

Observar o `self` é um bom jeito de evitar dar informações irrelevantes para o usuário final

```jsx
import Nullstack from 'nullstack';

class Page extends Nullstack {

  // ...

  async initiate() {
    this.price = await this.getPrice();
  }

  async hydrate({self}) {
    self.element.querySelector('input').focus();
  }
 
  render({self}) {
    if(!self.prerendered && !self.initiated) return false;
    return (
      <form> 
        <input type="number" bind={this.price} />
        <button disabled={!self.hydrated}> 
          Save
        </button>
      </form>
    )
  }

}

export default Page;
```

> 💡 Componentes que estão otimizados em [functional components](/pt-br/componentes-renderizaveis) não tem acesso ao `self`.

## key da Instância

- Tipo: `string`
- Origem: [Contexto Componente](/pt-br/contexto#----contexto-componente)
- Disponibilidade: **client**
- **readonly** no contexto do **client** ou depois de definido seu valor como atributo

Ele permite que você persista a instância quando é movida no DOM.

Você pode declarar uma `key` por instância.

> 💡 Se você não declarar a `key` o nullstack irá gerar uma baseada na profundidade da dom.

> 🔥 As *keys* não podem começar com "_." para evitar conflito com as *keys* geradas pelo Nullstack

As *keys* devem ser globalmente únicas já que o componente poderá ser movido para qualquer lugar da DOM e não apenas entre os componentes irmãos.

### Preservando o estado

As *keys* são úteis para preservar o estado em [componentes com estado](/pt-br/componentes-com-estado) quando você os move para dentro da DOM.

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
    const componentKey = self.key;
    return (
      <ul> 
        {this.items.map((item) => (
          <Item key={`${componentKey}-${item.id}`} {...item} />
        ))}
      </ul>
    )
  }

}

export default Page;
```

> 💡 Para preservar totalmente um componente com estado no cache, dê uma olhada na opção de componente [`persistent`](/pt-br/componentes-persistentes).

### Instâncias compartilhadas

Você também pode usar as *keys* para compartilhar a instância entre dois elementos.

Apenas o primeiro encontro da `key` irá executar o [lifecycle](/pt-br/ciclo-de-vida-full-stack).

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
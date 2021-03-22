---
title: Instância Key
description: A key da instância é uma string no Contexto Componente e permite que você persista a instância quando é movida para a DOM
---

- Tipo: `string`
- Origem: [Contexto Componente](/pt-br/contexto#----contexto-componente)
- Disponibilidade: **client**
- **readonly** no contexto do **client** ou depois de definido seu valor como atributo

Ele permite que você persista a instância quando é movida no DOM.

Você pode declarar uma *key* por instância.

> 💡 Se você não declarar a *key* o nullstack irá gerar uma baseada na profundidade da dom

> 🔥 As *keys* não podem começar com "_." para evitar conflito com as *keys* geradas pelo Nullstack

As *keys* devem ser globalmente únicas já que o componente poderá ser movido para qualquer lugar da DOM e não apenas entre os componentes irmãos.

## Preservando o estado

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

Apenas o primeiro encontro da *key* irá executar o [lifecycle](/pt-br/ciclo-de-vida-full-stack)

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

⚔ Aprenda sobre [requisicao e resposta do servidor](/pt-br/requisicao-e-resposta-do-servidor).

---
title: Instância *self*
description: O objeto *self* é um proxy na store do framework na parte do seu contexto e forne informações sobre o ciclo de vida da instância
---

O objeto *self* é um proxy na store do framework na parte do seu contexto e fornece informações sobre o ciclo de vida da instância.

Essa *key* é *readonly* e só está disponível no contexto do *client*.

Cada instância recebe seu própio objeto *self*.

As seguintes *keys* estão disponíveis no objeto:

- *initiated*: boolean
- *hydrated*: boolean
- *prerendered*: boolean
- *element*: HTMLElement

Quando um método do ciclo de vida é resolvido, mesmo que não declarado, uma *key* equivalente é setado para true no *self*

Se o componente tiver sido renderizado no lado do servidor a *key* *prerendered* continuará como *true* até que seja finalizado.

A *key* *element* aponta para o seletor na DOM e sua existência só é garantida quando o *hydrate* está sendo chamado e o *initiate* pode rodar no servidor.

> 💡 Não use a *key* *element* para adivinhar o ambiente, ao invés use [environment](/context-environment) para isso.

Observing self is a nice way to avoid giving placeholder information to the end-user.
Observar o *self* é um bom jeito de evitar dar informações irrelevantes para o usuário final

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

> 💡 Componentes que estão otimizados em [functional components](/renderable-components) não tem acesso ao *self*.

## Próximo passo

⚔ Aprenda sobre [instance key](/instance-key).
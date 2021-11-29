---
title: Componentes Persistentes
description: Componentes Persistentes são componentes que persistem na memória
---

Componentes Persistentes são componentes que persistem na memória.

Ele preserva seu estado mesmo quando removido do DOM e é bom para salvar partes inteiras do aplicativo em cache.

Executa os gatilhos de ciclo de vida [`prepare`](/pt-br/ciclo-de-vida-full-stack#prepare) e [`initiate`](/pt-br/ciclo-de-vida-full-stack#initiate) apenas uma vez.

Sempre executa os gatilhos [`hydrate`](/pt-br/ciclo-de-vida-full-stack#hydrate) ao entrar no DOM e [`terminate`](/pt-br/ciclo-de-vida-full-stack#terminate) ao sair.

```jsx
import Nullstack from 'nullstack';
import Counter from './Counter';

class Application extends Nullstack {

  showCounter = true;
  toogleCounter() {
    this.showCounter = !this.showCounter;
  }

  render() {
    return (
      <div>
        {this.showCounter && <Counter persistent key="Counter"/>}
        <button onclick={this.toogleCounter}>Exibe/Esconde Counter</button>
      </div>
    )
  }

}

export default Application;
```

Sempre que `showCounter` se torna `false`, `Counter` sai da árvore, mas seu estado permanece o mesmo ao entrar novamente.

Ele também mantém o componente na listagem [`instances`](/pt-br/contexto-instances), tornando possível gerenciar seu estado mesmo quando fora do DOM:

```jsx
import Nullstack from 'nullstack';
import Counter from './Counter';

class Application extends Nullstack {
  // ...
  updateCounter({ instances }) {
    instances.Counter.count += 1;
  }

  render() {
    return (
      <div>
        ...
        <button onclick={this.updateCounter}>
          Modificar Counter mesmo fora do DOM
        </button>
      </div>
    )
  }
}

export default Application;
```

Ao entrar novamente na árvore, o estado é mostrado de acordo com as alterações feitas.

Você pode até ativar/desativar dinamicamente a persistência, trazendo de volta o comportamento padrão:

```jsx
import Nullstack from 'nullstack';
import Counter from './Counter';

class Application extends Nullstack {
  // ...
  persistentCounter = true
  tooglePersistency() {
    this.persistentCounter = !this.persistentCounter;
  }

  render() {
    return (
      <div>
        <Counter persistent={this.persistentCounter}/>
        <button onclick={this.tooglePersistency}>
          Alternar persistência do Counter
        </button>
      </div>
    )
  }
}

export default Application;
```

## Próxima Etapa

⚔ Aprenda sobre a [chave `data` do contexto](/pt-br/contexto-data).
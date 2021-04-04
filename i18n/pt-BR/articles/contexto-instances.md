---
title: Contexto Instances
description: O objeto instances é um proxy no Contexto Nullstack disponível no client e fornece todas as instâncias ativas da aplicação
---

- Tipo: `object`
- Origem: [Contexto Nullstack](/pt-br/contexto#----contexto-nullstack)
- Disponibilidade: **client**
- **readwrite** no contexto do **client**

Fornece todas as instâncias ativas da aplicação.

> 🔥 Instâncias ativas são as criadas e ainda não [terminadas](/pt-br/ciclo-de-vida-full-stack#terminate)

Conforme explicado em [`key` da instância](/pt-br/instancia-self#key-da-inst-ncia), keys desempenham um grande papel na definição de um identificador único para componentes.

Baseado nisso, estava no virar da esquina uma implementação de uma listagem de instâncias.

```jsx
import Nullstack from 'nullstack';
import Counter from './Counter';
import Count from './Count';

class Application extends Nullstack {

  render() {
    return (
      <main>
        <Count key="count" />
        <Counter/>
      </main>
    )
  }

}

export default Application;
```

Adicionando uma `key` única ao **Count** torna-o disponível na lista `instances`.

```jsx
import Nullstack from 'nullstack';

class Count extends Nullstack {

  count = 0;
  add() {
    this.count++;
  }

  render() {
    return <p> Contagem: {this.count} </p>
  }

}

export default Count;
```

Sem a necessidade de chamar uma modificação do valor em **Count**, você pode fazer isso diretamente no **Counter**:
```jsx
import Nullstack from 'nullstack';

class Counter extends Nullstack {

  render({ instances }) {
    const { count } = instances;
    return (
      <button onclick={count.add}>
        Adicionar contagem
      </button>
    )
  }

}

export default Counter;
```

[Desestruturando](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) `instances` do [`context`](/pt-br/contexto) no `render`, e ali está o **Count** e todas as suas propriedades para serem chamadas ou modificadas.

Bem, esta foi uma demonstração focada do conceito, mas tome seu tempo para imaginar:

- Um ícone de notificação na navbar, atualizando em cada leitura no componente de mensagens e tendo um método para marcar todas elas como lidas também
- Uma contagem na header mostrando quantas postagens/e-mails você leu, não leu ou gostou, sem a necessidade de um gerenciamento de estado global ou solicitações à API
- Algo que nem nós imaginamos, então, sonhe livremente!

## Próxima Etapa

⚔ Aprenda sobre a [chave `environment` do contexto](/pt-br/contexto-environment).
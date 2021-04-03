---
title: Contexto Instances
description: O objeto instances é um proxy no Contexto Nullstack disponível em ambos client e server e fornece todas as instâncias ativas da aplicação
---

- Tipo: `object`
- Origem: [Contexto Nullstack](/pt-br/contexto#----contexto-nullstack)
- Disponibilidade: server/client
- **readwrite** em ambos **server** e **client**

Fornece todas as instâncias ativas da aplicação.

> 🔥 Instâncias ativas são as renderizadas na rota atual

Conforme explicado em [`key` da instância](/pt-br/instancia-self#key-da-inst-ncia), keys desempenham um grande papel na definição de um identificador único para componentes.

Baseado nisso, estava no virar da esquina uma implementação de uma listagem de instâncias (mais documentada [neste artigo](https://guiwriter.netlify.app/tech/nullstack-instances/)).

Para explicar como esse conceito funciona, vamos usar o exemplo historicamente mais simples: O To-do.

```jsx
import Nullstack from 'nullstack';
import Todo from './Todo';
import Undone from './Undone';

class Application extends Nullstack {

  render() {
    return (
      <main>
        <Undone key="undone" />
        <Todo/>
      </main>
    )
  }

}

export default Application;
```

No código acima, importamos e renderizamos **Todo** e **Undone** e, especialmente, adicionamos uma `key` única em **Undone**.

O **Undone** concentra-se na tarefa única de exibir quantas tarefas não feitas existem.

E, mais simples que isso, nem precisamos codificar o acesso a essas tarefas aqui.

```jsx
import Nullstack from 'nullstack';

class Undone extends Nullstack {

  undones = 0;
  render() {
    return <p> Undones: {this.undones} </p>
  }

}

export default Undone;
```

Por último, mas não menos importante, aqui é onde a mágica principal acontece, o componente **Todo**:

```jsx
import Nullstack from 'nullstack';

class Todo extends Nullstack {

  todos = [];
  newTodo = '';

  addTodo({ instances }) {
    this.todos.push(this.newTodo);
    // acessando o componente 'undone'
    instances.undone.undones = this.todos.length;
  }

  render() {
    return (
      <>
        <ol>
          {this.todos.map(todo => <li>{todo}</li>)}
        </ol>

        {/* vinculando valor a newTodo */}
        <input type="text" bind={this.newTodo} />
        <button onclick={this.addTodo}>
          Adicionar to-do
        </button>
      </>
    )
  }
}

export default Todo;
```

Indo por partes, no `render` estamos listando `todos`, que permanece vazio até que o usuário digite o `newTodo` no `input` e pressione o botão, chamando nosso `addTodo`.

No método `addTodo` estamos [desestruturando](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) `instances` do [`context`](/pt-br/contexto), trazendo a lista de instâncias ativas e possibilitando definir diretamente o valor do array `undones` do componente **Undone**.

E indo além, imagine se em **Undone** fizéssemos mais do que exibir e tivéssemos um método de cálculo ou para armazenar essa contagem no banco de dados, em **Todo** poderíamos fazer diretamente:

```jsx
// desestruturando novamente
const { undone } = instances;
const count = this.todos.length;
undone.calculate(count);
await undone.storeUndones(); // armazenando assincronamente
```

Bem, esta foi uma demonstração focada do conceito, mas tome seu tempo para imaginar:

- Um ícone de notificação na navbar, atualizando em cada leitura no componente de mensagens e tendo um método para marcar todas elas como lidas também
- Uma contagem na header mostrando quantas postagens/e-mails você leu, não leu ou gostou, sem a necessidade de um gerenciamento de estado global ou solicitações à API
- Algo que nem nós imaginamos, então, sonhe livremente!

## Próxima Etapa

⚔ Aprenda sobre a [chave `environment` do contexto](/pt-br/contexto-environment).
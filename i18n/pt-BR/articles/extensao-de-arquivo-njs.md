---
title: Extensão de arquivos NJS
description: Os arquivos Nullstack permitem que o Webpack saiba quais carregadores usar no momento da transpilação
---

Os arquivos do Nullstack permitem ao [Webpack](https://webpack.js.org) saber quais carregadores usar no momento da transpilação.

Os arquivos NJS devem importar o Nullstack ou uma de suas subclasses.

Se apenas uma subclasse for importada, uma importação Nullstack será injetada no momento da transpilação.

No momento da transpilação, as tags JSX serão substituídas por `Nullstack.element`.

Essa extensão também permite que o Nullstack faça otimizações em tempo de transpilação, como a injeção de origem.

> 🔥 Cada arquivo deve ter apenas uma classe declarada.

* No bundle **server**, as funções assíncronas estáticas são mapeadas em um registro para segurança.
* No bundle **client**, as funções assíncronas estáticas são removidas e substituídas por um método invoke.
* No bundle **client**, as funções assíncronas estáticas com o nome começando com **"start"** (e opcionalmente seguido por uma letra maiúscula) são completamente removidas.
* Nos bundles **server** e **client**, um hash com o md5 do código-fonte original é adicionado na classe.

> 🐱‍💻 Abaixo um exemplo de arquivo .njs original.

```jsx
import List from './List';
import {readFileSync} from 'fs';

class Tasks extends List {

  static async getTasks({limit}) {
    const json = readFileSync('tasks.json', 'utf-8');
    return JSON.parse(json).tasks.slice(0, limit);
  }

  prepare(context) {
    context.tasks = [];
  }

  async initiate(context) {
    context.tasks = await this.getTasks({limit: 10});
  }

  renderTask({task}) {
    return (
      <li> 
        <input bind={task.description} />
      </li>
    )
  }

  render() {
    return (
      <main>
        <ul>
          {tasks.map((task) => <Task task={task} />)}
        </ul>
      </main>
    )
  }

}

export default Tasks;
```

> 🐱‍💻 Abaixo um exemplo do mesmo arquivo .njs transpilado.

```jsx
import Nullstack from 'nullstack';
import List from './List';

class Tasks extends List {

  static hash = 'd493ac09d0d57574a30f136d31da455f';

  static getTasks = Nullstack.invoke('getTasks', 'd493ac09d0d57574a30f136d31da455f');

  prepare(context) {
    context.tasks = [];
  }

  async initiate(context) {
    context.tasks = await this.getTasks({limit: 10});
  }

  renderTask({task}) {
    return (
      <li> 
        <input source={task} bind="description" />
      </li>
    )
  }

  render() {
    const Task = this.renderTask;
    return (
      <main>
        <ul>
          {tasks.map((task) => <Task task={task} />)}
        </ul>
      </main>
    )
  }

}

export default Tasks;
```

# Extensões alternativas

Por conveniência, você também pode usar as extensões de arquivo `.jsx`, `.nts` e `.tsx`
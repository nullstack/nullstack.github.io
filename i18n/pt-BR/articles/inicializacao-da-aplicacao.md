---
title: Inicialização da Aplicação
description: A função de inicialização será executada apenas uma vez quando sua aplicação for inicializada e é um bom lugar para configurar o contexto do seu servidor
---

O arquivo **index.js** na raiz da aplicação é responsável por iniciar a aplicação.

Quando você executa a aplicação com `npm start` ou `node .production/server.js`, o **index** chama a função `start` em seu **src/Application.js**.

A função `start` será executada apenas uma vez quando sua aplicação for inicializada e é um bom lugar para configurar seu [contexto de servidor](/pt-br/contexto).

```jsx
import Nullstack from 'nullstack';
import database from './database';

class Application extends Nullstack {

  static async start(context) {
    context.database = database;
  }

}

export default Application;
```

## Padrão de inicialização de dependência

Um bom padrão para trabalhar com dependências que requerem configurações em tempo de inicialização é definir uma função `start` na dependência e chamá-la na função `start` da aplicação passando o [contexto do servidor](/pt-br/contexto).

```jsx
import Nullstack from 'nullstack';
import Dependency from './Dependency';

class Application extends Nullstack {

  static async start(context) {
    Dependency.start(context);
  }

}

export default Application;
```

> 🔒 As funções de servidor com o nome começando com "start" (e opcionalmente seguido por uma letra maiúscula) não geram um endpoint de API para evitar inundação de contexto malicioso.

## Padrão de inicialização encadeado

Outro padrão a ser usado ao trabalhar com dependências de tempo de inicialização é a inicialização encadeada em seu arquivo **index.js**:

```jsx
import Nullstack from 'nullstack';
import Application from './src/Application';
import NameSetter from './src/NameSetter';
import DomainSetter from './src/DomainSetter';

Nullstack.start(Application, NameSetter, DomainSetter);
```

Com cada um desses componentes sendo iniciados sequencialmente, juntamente com a passagem do `context` para seus métodos `start`.

## Exportação da aplicação

O aplicativo todo pode ser exportado possibilitando o uso como uma função *serverless* pronta para uso:

```jsx
import Nullstack from 'nullstack';
import Application from './src/Application';

export default Nullstack.start(Application);
```

> 💡 Isso apresenta o aplicativo em um estado perfeito para *deploy* em hosts Node serverless

Somando a essa possibilidade de desacoplamento, após uma compilação o `context` do aplicativo exportado pode ser acessado e modificado até mesmo usando um padrão de "*script runner*":

```js
// scripts/getProjectName.js
const { default: app } = require('../.development/server.js');

async function getProjectName() {
  const context = await app.start();
  // o nome do projeto após toda lógica inicial
  console.log(context.project.name);
}
getProjectName();
```

Qual poderia funcionar como um comando Node na raiz: `node scripts/getProjectName.js`.

> 💡 Isso tem muitos casos de uso, como atualizar o banco de dados armazenado no `context` logo ao iniciar a aplicação em um ambiente específico

## Próxima Etapa

⚔ Aprenda sobre [componentes funcionais](/pt-br/componentes-funcionais).
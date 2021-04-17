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

## Próxima Etapa

⚔ Aprenda sobre [componentes funcionais](/pt-br/componentes-funcionais).
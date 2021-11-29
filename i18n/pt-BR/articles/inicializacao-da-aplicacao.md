---
title: Inicialização da Aplicação
description: A função start será executada apenas uma vez quando sua aplicação for carregada e é um bom lugar para configurar seu contexto
---

Os arquivos **server.js**/**client.js** na raiz da aplicação são responsáveis por iniciar o aplicativo.

Quando você executa o aplicativo com `npm start`, o método `Nullstack.start` em ambos os arquivos iniciará seu componente principal e retornará o objeto [`context`](/pt-br/contexto) de seus respectivos ambientes.

O `context` retornado pode ser usado normalmente, e você pode definir seu método `start` que executa apenas uma vez, sendo um bom lugar para configurar coisas, como seu banco de dados:

```jsx
import Nullstack from 'nullstack';
import Application from './src/Application';
import startDatabase from './database';

const context = Nullstack.start(Application);

context.start = async function() {
  context.database = await startDatabase(context.secrets);
}

export default context;
```

> 💡 O `context.start` no **server.js** é executado quando o aplicativo é inicializado, e no **client.js** assim que o navegador o carrega

O `context` pode ser modificado de qualquer forma, desde que seja exportado em ambos os arquivos, ao construir o aplicativo, o Nullstack o transforma em uma função *serverless* pronta para uso.

## Padrão de inicialização de dependência

Um bom padrão para trabalhar com dependências que requerem configurações em tempo de inicialização é definir uma função `start` na dependência:

```jsx
import Nullstack from 'nullstack';

class Dependency extends Nullstack {

  static async start(context) {
    // inicie algo usando o context
  }

}

export default Dependency;
```

E chamá-la em `context.start` passando o [contexto](/pt-br/contexto):

```jsx
import Nullstack from 'nullstack';
import Application from './src/Application';
import Dependency from './src/Dependency';

const context = Nullstack.start(Application);

context.start = async function() {
  await Dependency.start(context);
}

export default Application;
```

> 🔒 As funções de servidor com o nome começando com "start" (e opcionalmente seguido por uma letra maiúscula) não geram um endpoint de API para evitar inundação de contexto malicioso.

## Padrão executor de script

Com este desacoplamento do `context` do aplicativo, após uma compilação você pode acessar suas chaves executando um script de outro arquivo.

Veja um arquivo **script.js** criado na raiz com dois exemplos manipulando até mesmo o [`project`](/pt-br/contexto-project), [`settings`](/pt-br/contexto-settings) e o [banco de dados MongoDB](/pt-br/como-usar-mongodb-com-nullstack) registrado abaixo:

```jsx
const { default: context } = require('./.development/server.js');
const Faker = require('faker');

// registra 5 usuários falsos aleatórios
async function populateDB() {
  await context.start();
  const { database } = context;
  for (let id = 0; id < 5; id++) {
    await database.collection('users').insertOne({
      id,
      username: Faker.name.firstName()
    });
  }
  console.log('Usuários registrados!');
  process.exit(0);
}

// faz algo com base na contagem de usuários
async function countUsers() {
  await context.start();
  const { database, project, settings } = context;
  project.name = settings.projectName;

  const qtdUsers = await database.collection('users').estimatedDocumentCount();
  if (qtdUsers > 100) {
    console.log(`${project.name} tem mais de 100 usuários registrados!`);
  } else {
    console.log(`${project.name} tem ${qtdUsers} usuários registrados!`);
  }
  process.exit(0);
}

const command = process.argv.splice(2);
// executado se passar o argumento 'populate'
if (command[0] === 'populate') {
  populateDB();
} else {
  countUsers();
}
```

Então, você pode executá-lo com um comando Node da seguinte maneira:

```bash
> node script.js
MeuProject tem 49 usuários registrados!
```

> 💡 Os executores de script são ótimos para muitas coisas, como popular um banco de dados em um ambiente específico, testar comportamentos do `context` e automatizar tarefas de aplicativos

## Próxima Etapa

⚔ Aprenda sobre [componentes funcionais](/pt-br/componentes-funcionais).
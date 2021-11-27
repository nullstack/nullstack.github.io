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

## Próxima Etapa

⚔ Aprenda sobre [componentes funcionais](/pt-br/componentes-funcionais).
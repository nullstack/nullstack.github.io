---
title: Funções de Servidor
description: As funções do servidor são microsserviços especializados que no momento da transpilação são convertidos em pontos de entrada da API.
---

As funções do servidor são microsserviços especializados que no momento da transpilação são convertidos em pontos de entrada da API.

Para sinalizar uma função como uma função de servidor, você deve declará-la como `static async`.

Ser uma função estática significa que ela não tem acesso ao escopo da instância.

No entanto, em vez de chamar a versão estática da *classe*, você deve invocá-la como uma função de *instância*.

As funções do servidor podem ser chamadas a qualquer momento em seu código e não estão limitadas a etapas de [pré-processamento](/pt-br/renderizando-no-servidor).

```jsx
import Nullstack from 'nullstack';

class Component extends Nullstack {

  static async increment(context) {
    context.count++;
  }

  async handleClick() {
    await this.increment();
  }

  // ...

}

export default Component;
```

> ✨ Aprenda mais sobre [contexto](/pt-br/contexto).

## Comportamento do cliente

Ao chamar uma função de servidor do cliente, os argumentos serão serializados como JSON.

Os argumentos serão postados contra a API gerada automaticamente e mesclados com o contexto do servidor quando atingir o servidor.

O valor de retorno da função do servidor será serializado de volta para o cliente e pode ser usado perfeitamente como se fosse uma função local.

```jsx
import Nullstack from 'nullstack';

class Component extends Nullstack {

  static async increment(context) {
    context.count++;
    return context.count;
  }

  async handleClick() {
    this.count = await this.increment();
  }

  // ...

}

export default Component;
```

## Comportamento do servidor

As funções de servidor serão usadas como funções locais, simplesmente criando um alias da chamada *instância* para a *classe* e mesclando os argumentos com o contexto do servidor.

## Date Convenience

As datas são serializadas como UTC em JSON e desserializadas de volta para objetos `Date`.

```jsx
import Nullstack from 'nullstack';

class Component extends Nullstack {

  async initiate() {
    const date = new Date();
    const verified = this.verifyDay({date});
  }

  static async verifyDay({date}) {
    return date.getDay() === new Date().getDay();
  }

  // ...

}

export default Component;
```

## Fetch Convenience

`fetch` está disponível em funções de servidor e cliente para fins de isomorfia.

```jsx
import Nullstack from 'nullstack';

class Component extends Nullstack {

  // ...

  async initiate() {
    const url = 'https://api.github.com/repos/nullstack/nullstack/issues';
    const response = await fetch(url);
    this.issues = await response.json();
  }

  // ...

}

export default Component;
```

## Importações apenas de servidor

As dependências importadas que são usadas apenas dentro das funções do servidor serão excluídas do pacote do cliente.

Isso é útil para acessar módulos exclusivos do node.js e reduzir o tamanho do pacote do cliente por meio do pré-processamento de dados, como o markdown, sem ter que expor a dependência ao usuário final.

```jsx
import Nullstack from 'nullstack';
import {readFileSync} from 'fs';
import {Remarkable} from 'remarkable';

class Application extends Nullstack {

  static async getTasks() {
    const readme = readFileSync('README.md', 'utf-8');
    return new Remarkable().render(readme);
  }

  // ...

}

export default Application;
```

## Segurança

Keep in mind that every server function is similar to an Express route in API and must be coded without depending on view logic for security.

Lembre-se de que cada função do servidor é semelhante a uma rota do Express na API, e deve ser codificada sem depender da lógica de exibição por segurança.

> 🔒 As funções de servidor com o nome começando com "start" (e opcionalmente seguido por uma letra maiúscula) não geram um endpoint de API, para evitar inundação de contexto malicioso.

```jsx
import Nullstack from 'nullstack';

class Component extends Nullstack {

  static async getCount({request, count}) {
    if(!request.session.user) return 0;
    return count;
  }

  // ...

}

export default Component;
```

> 💡 As funções do servidor não são expostas ao cliente.

> ✨ Aprenda mais sobre a [extensão de arquivo NJS](/pt-br/extensao-de-arquivo-njs).

## Palavras reservadas

Os nomes das funções do servidor não podem colidir com os nomes dos métodos de instância da classe atual ou de suas classes pai.

As seguintes palavras não podem ser usadas em funções de servidor:

- `prepare`
- `initiate`
- `hydrate`
- `update`
- `terminate`

As funções de servidor chamadas `start` não irão gerar um endpoint de API e só podem ser chamadas por outras funções de servidor.

## Ressalvas

Os endpoints de API gerados automaticamente não devem ser usados por aplicativos de terceiros.

A URL e a implementação podem mudar entre as versões do Nullstack.

> ✨ Se você deseja construir uma API, aprenda mais sobre [como criar uma API com o Nullstack](/pt-br/requisicao-e-resposta-do-servidor).

## Next step

⚔ Saiba mais sobre o [contexto](/pt-br/contexto).
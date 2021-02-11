---
title: Ciclo de Vida Full-Stack
description: Métodos de ciclo de vida são funções nomeadas de forma especial que você pode declarar na classe
---

Métodos de ciclo de vida são funções nomeadas de forma especial que você pode declarar na classe.

Cada método de ciclo de vida roda em uma fila de ordem específica, garantindo que todos os componentes do ciclo corrente sejam preparados antes do primeiro ser iniciado.

## Prepare

Esse método é bloqueante e roda antes da primeira renderização do componente.

Você pode usar essa função para definir o estado que o usuário verá antes do carregamento.

Se o usuário estiver entrando através dessa rota, *prepare* irá rodar no servidor antes do Nullstack [renderizar sua aplicação no lado do servidor](/server-side-rendering).

Se o usuário estiver navegando por outra rota, esse método rodará no cliente.

```jsx
import Nullstack from 'nullstack';

class Component extends Nullstack {

  // ...

  prepare() {
    this.date = new Date();
  }

  // ...

}

export default Component;
```

## Initiate

Esse método pode ser assíncrono, e roda assim que o componente for preparado e renderizado pela primeira vez.

Você pode usá-lo para invocar outra função do servidor e carregar os dados para apresentar a página.

Se o usuário estiver entrando através dessa rota, *initiate* rodará no servidor.

Nullstack irá esperar até que a promise seja resolvida e então finalmente irá gerar o HTML que será servido.

Se o usuário estiver navegando por outra rota, esse método rodará no cliente.

```jsx
import Nullstack from 'nullstack';

class Component extends Nullstack {

  // ...

  async initiate() {
    this.task = await getTaskByDay({
      day: this.date
    });
  }

  // ...

}

export default Component;
```
> ✨ Aprenda mais sobre [funções do servidor](/server-functions).

## Hydrate

Esse método é assíncrono e rodará apenas no cliente.

Ele sempre rodará independente do ambiente que iniciou o componente.

Esse é um bom lugar para acionar dependências que manipulam o DOM ou que podem rodar apenas no lado do cliente.

```jsx
import Nullstack from 'nullstack';

class Component extends Nullstack {

  // ...

  async hydrate() {
    this.timer = setInterval(() => {
      console.log(this.date);
    }, 1000);
  }

  // ...

}

export default Component;
```

## Update

Esse método é assíncrono e rodará apenas no cliente.

Ele roda em todos os componentes sempre que o estado da aplicação mudar.

> 🔥 Tome cuidado para não causar loops infinitos quando mutacionar o estado dentro de *update*.

Ele irá rodar logo antes da renderização, mas não irá bloquear a fila.

A função *update* não rodará até que a aplicação seja renderizada após *initiate*.

```jsx
import Nullstack from 'nullstack';

class Component extends Nullstack {

  // ...

  async update() {
    const today = new Date();
    if(today.getDay() != this.date.getDay()) {
      this.date = today;
      await this.initiate();
    }
  }

  // ...

}

export default Component;
```

> ✨ Métodos de ciclo de vida não têm efeitos colaterais, você pode chamá-los manualmentes sem causar problemas.

## Terminate

Esse método é assíncrono e rodará apenas no cliente.

Ele irá rodar após o componente deixar o DOM.

Esse é o lugar para limpar qualquer coisa que você definiu no método *hydrate*.

Essa instância será levada pelo garbage collector após a resolução da promise.

```jsx
import Nullstack from 'nullstack';

class Component extends Nullstack {

  // ...

  async terminate() {
    clearInterval(this.timer);
  }

  // ...

}

export default Component;
```

## Próximos passos

⚔ Aprenda sobre [funções do servidor](/server-functions).

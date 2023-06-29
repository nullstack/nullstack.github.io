---
title: Proxy
description: Proxy é o mecanismo básico que permite ao Nullstack implementar renderização e contexto.
---

Proxy é o mecanismo básico que permite ao Nullstack implementar renderização e contexto.

## Entendendo Proxy

O Nullstack possui algumas convenções sobre quando fazer proxy de um objeto.

Qualquer mutação em um proxy acionará um ciclo de renderização.

As instâncias da classe Nullstack são sempre proxied.

```jsx
import Nullstack from 'nullstack';

class Component extends Nullstack {

// Objetos JavaScript padrão são alvo de proxies
standardObjects = { key: 'value' }

// Objetos JavaScript nested também são alvo de proxies
nestedObjects = {nested: { key: 'value' }}

// Arrays JavaScript padrão são alvo de proxies
standardArray = [1, 2, 3]

// Arrays JavaScript nested também são alvo de proxies
nestedArray = [[1, 2, 3]]

// Instâncias de classes personalizadas não são alvo de proxies
customClassInstance = new CustomClass()

// Propriedades com sublinhado nunca são alvo de proxies
_underscoredArray = []
_underscoredObject = {}

// Referências ao DOM não são alvo de proxies
element = null

  render() {
    <div ref={this.element}> element </div>
  }

}

export default Component;
```

## Entendendo o escopo das funções

Nullstack possui algumas convenções sobre quando expor o contexto para uma função

```jsx
import Nullstack from 'nullstack';

class Component extends Nullstack {

  static async staticAsyncFunction(serverContext) {
// Funções estáticas e assíncronas têm acesso ao contexto do servidor
// Um método de instância refletido dessa função é criado
// Isso será vinculado à class Component
  }

  static async _underscoredStaticAsyncFunction() {
// Funções estáticas, assíncronas e com sublinhado não têm acesso ao contexto
// Isso será vinculado à class Component
}

static staticFunction() {
// Funções estáticas não têm acesso ao contexto
// Isso será vinculado à class Component
}

static _underscoredStaticFunction() {
// Funções estáticas com sublinhado não têm acesso ao contexto
// Isso será vinculado à class Component
}

method(clientContext) {
// Métodos têm acesso ao contexto do cliente
// Isso será vinculado à instância
}

_underscoredMethod() {
// Métodos com sublinhado não têm acesso ao contexto do cliente
// Isso será vinculado à instância
}

async asyncMethod(clientContext) {
// Métodos assíncronos têm acesso ao contexto do cliente
// Isso será vinculado à instância
}

async _underscoredAsyncMethod() {
// Métodos assíncronos com sublinhado não têm acesso ao contexto do cliente
// Isso será vinculado à instância
}

}

export default Component;
```

## Truques sublinhados

Você pode criar um método começando com `_`, isso significa que você está criando um código JavaScript puro que ignora proxies.

Com isso, você poderá adicionar ou remover o listener de eventos.

```jsx
import Nullstack from "Nullstack";

class Application extends Nullstack {
  _listener() {
    // faça alguma coisa
  }

  async hydrate() {
    window.addEventListener("resize", this._listener, false);
  }

  async terminate() {
    window.removeEventListener("resize", this._listener, false);
  }

  render() {
    return <main>Conteúdo</main>;
  }
}

export default Application;
```

Você também pode usar isto para ignorar o contexto

```jsx
import Nullstack from "Nullstack";

class Application extends Nullstack {
  _method(prop) {
    // faça alguma coisa
  }

  async hydrate() {
    // Observe que não está passando um objeto como o contexto normalmente requer
    this._method(true)
  }

}

export default Application;
```
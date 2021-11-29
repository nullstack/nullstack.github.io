---
title: Componentes Funcionais
description: Componentes Funcionais são simples funções puras que podem modificar o contexto e não tem estado próprio
---

Desde a v0.9.21, o Nullstack tem a simplicidade de componentes funcionais puros pronta para uso.

Este segue as especificações de [componentes renderizáveis](/pt-br/componentes-renderizaveis), mas com mais ênfase no **renderizável**.

Usando funções puras, você pode escrever componentes focados na renderização da seguinte maneira:

```jsx
const AnonComponent = function(context) {
  return (
    <div html={context.html} id={context.id}></div>
  )
}

function NamedComponent(context) {
  return (
    <div html={context.html} id={context.id}></div>
  )
}

const ArrowComponent = (context) => {
  return (
    <div html={context.html} id={context.id}></div>
  )
}

export default {
  AnonComponent,
  NamedComponent,
  ArrowComponent
};
```

E exportado assim, seu uso seria:

```jsx
import Nullstack from 'nullstack';
import Functionals from './Functionals';

class Application extends Nullstack {

  render() {
    const html = "<p>texto</p>";
    return (
      <main>
        <Functionals.AnonComponent html={html} id="1"/>
        <Functionals.NamedComponent html={html} id="2"/>
        <Functionals.ArrowComponent html={html} id="3"/>
      </main>
    )
  }

}

export default Application;
```

Então, o resultado da renderização seria diretamente semelhante a:

```html
<div id="1"> <p>texto</p> </div>
<div id="2"> <p>texto</p> </div>
<div id="3"> <p>texto</p> </div>
```

## Vinculando Valores do Contexto

Mesmo não tendo estado próprio, os componentes funcionais do Nullstack podem vincular e modificar valores do [`context`](/pt-br/contexto).

```jsx
import Nullstack from 'nullstack';
import BindPureComponent from './Functionals';

class Application extends Nullstack {

  prepare(context) {
    context.count = 0;
  }

  render() {
    return (
      <main>
        <BindPureComponent/>
      </main>
    )
  }

}

export default Application;
```

Registrando `counter` no `context` como no componente acima, podemos ler e modificar esse dado no **BindPureComponent** da seguinte maneira:

```jsx
export default function BindPureComponent(context) {
  return (
    <div>
      <input type="number" bind={context.count}/>
      <p>{context.count}</p>
    </div>
  )
}
```

Ou, até mesmo usar funções locais executadas por eventos para fazer essa modificação:

```jsx
export default function EventPureComponent(context) {
  const multiple = 2;
  function multiply() {
    context.count *= multiple;
  }

  return (
    <div>
      <button onclick={multiply}>Multiply</button>
      <p>{context.count}</p>
    </div>
  )
}
```

> 💡 Com sua versatilidade e simplicidade, os componentes funcionais são perfeitos para bibliotecas de componentes sem estado

## Próxima Etapa

⚔ Aprenda sobre [componentes persistentes](/pt-br/componentes-persistentes).
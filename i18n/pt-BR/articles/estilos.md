---
title: Estilos
description: Usar estilos com o Nullstack é tão simples quanto importar um arquivo de estilo.
---

Usar estilos com o Nullstack é tão simples quanto importar um arquivo de estilo.

O Nullstack vem com um loader [SASS](https://sass-lang.com) por padrão, mas você ainda pode usar o CSS Vanilla.

> ✨ É uma boa prática importar um arquivo com o mesmo nome do componente.

```jsx
import Nullstack from 'nullstack';
import './Header.scss';

class Header extends Nullstack {
  // ...
}

export default Header;
```

## Classes e estilos condicionais

Você pode passar valores falsy para `style` e `class` para pular a renderização de condicionais.

```jsx
import Nullstack from 'nullstack';

class Counter extends Nullstack {

  count = 0;
  
  render() {
    return (
      <div 
        class={this.count > 0 && 'bigger-than-zero'}
        style={this.count > 0 && 'border-color: black;'}
      > 
        {this.count}
      </div>
    )
  }

}

export default Counter;
```

## Array de classes e estilo

Passe uma array de strings como suporte para `style` e` class` e elas serão unidas ao atributo final.

Você também pode passar valores falsy para pular a renderização de condicionais.

```jsx
import Nullstack from 'nullstack';

class Counter extends Nullstack {

  count = 0;
  
  render() {
    return (
      <div 
        class={['number', this.count > 0 && 'bigger-than-zero', this.count % 2 === 0 ? 'even' : 'odd' ]}
        style={['background-color: black;', this.count > 0 && 'border-color: black;', this.count % 2 === 0 ? 'color: blue;' : 'color: red;' ]}
      > 
        {this.count}
      </div>
    )
  }

}

export default Counter;
```
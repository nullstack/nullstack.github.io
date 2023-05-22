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
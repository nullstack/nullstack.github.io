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

No modo de produção, o Nullstack usa [PurgeCSS](https://purgecss.com), que limpa seu arquivo client.css, mas tem alguns truques.

> ✨ Saiba mais sobre [fazendo uma safelist do seu css](https://purgecss.com/safelisting.html)

## Próximo passo

⚔ Aprenda sobre a [extensão de arquivo NJS](/njs-file-extension).

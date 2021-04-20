---
title: Logo Nullstack
description: Nullstack vem com seu conjunto de logotipos prontos pra uso
---

O Nullstack vem com seu conjunto de logotipos prontos para serem usados ​​como componentes:

```jsx
import Nullstack from 'nullstack';
import Logo from 'nullstack/logo';

class Application extends Nullstack {

  render() {
    return (
      <main>
        <Logo height={30} light />
        <Logo height={30} monotone />
        <Logo height={30} light monotone />
        <Logo height={30} duotone />
        <Logo height={30} light duotone />
      </main>
    )
  }

}

export default Application;
```

Os componentes acima e seus atributos geram os seguintes logotipos:

![Nullstack Logos](/nullstack-logos.png)

O logotipo usa largura total e cores de `duotone` por padrão.
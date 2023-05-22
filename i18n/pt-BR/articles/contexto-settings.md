---
title: Contexto Settings
description: O objeto settings é um proxy no Contexto Nullstack disponível em ambos client e server que você pode usar para configurar seu aplicativo com informações públicas
---

- Tipo: `object`
- Origem: [Contexto Nullstack](/pt-br/contexto#----contexto-nullstack)
- Disponibilidade: server/client
- **readwrite** no contexto do **server**
- **readonly** no contexto do **client**

Você pode usá-lo para configurar seu aplicativo com informações públicas.

Você pode atribuir qualquer chave com qualquer tipo ao objeto.

Você pode atribuir chaves a `settings` dinamicamente com base no ambiente atual usando [`context.environment`](/pt-br/contexto-environment).

```jsx
// server.js
import Nullstack from 'nullstack';
import Application from './src/Application';

const context = Nullstack.start(Application);

context.start = function() {
  const { settings, environment } = context;
  settings.endpoint = 'https://domain.com/api';
  settings.privateKey = environment.development ? 'DEV_API_KEY' : 'PROD_API_KEY';
}

export default context;
```

```jsx
// src/Application.njs
import Nullstack from 'nullstack';

class Application extends Nullstack {

  async hydrate({settings}) {
    const response = await fetch(settings.endpoint, {
      headers: {
        Authorization: `Bearer ${settings.publicKey}`
      }
    });
    this.data = await response.json();
  }

}

export default Application;
```

Qualquer variável de ambiente começando com NULLSTACK_SETTINGS_ será mapeado para o `settings` daquele ambiente.

> 🐱‍💻 NULLSTACK_SETTINGS_PUBLIC_KEY será mapeado para `settings.publicKey`
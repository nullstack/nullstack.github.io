---
title: Contexto Secrets
description: O objeto secrets é um proxy no Contexto Nullstack disponível no server que você pode usar para configurar dados sensíveis para sua aplicação
---

- Tipo: `object`
- Origem: [Contexto Nullstack](/pt-br/contexto#----contexto-nullstack)
- Disponibilidade: **server**
- **readwrite** no contexto do **server**

Você pode usá-lo para configurar dados sensíveis para sua aplicação.

Você pode atribuir qualquer chave com qualquer tipo ao objeto.

Você pode atribuir chaves a `secrets` dinamicamente com base no ambiente atual usando [`context.environment`](/pt-br/contexto-environment).

```jsx
// server.js
import Nullstack from 'nullstack';
import Application from './src/Application';

const context = Nullstack.start(Application);

context.start = function() {
  const { secrets, environment } = context;
  secrets.endpoint = 'https://domain.com/api';
  secrets.privateKey = environment.development ? 'DEV_API_KEY' : 'PROD_API_KEY';
}

export default context;
```

```jsx
// src/Application.njs
import Nullstack from 'nullstack';

class Application extends Nullstack {

  static async fetchFromApi({secrets}) {
    const response = await fetch(secrets.endpoint, {
      headers: {
        Authorization: `Bearer ${secrets.privateKey}`
      }
    });
    return await response.json();
  }

}

export default Application;
```

Qualquer variável de ambiente iniciada por NULLSTACK_SECRETS_ será mapeada para o `secrets` de seu respectivo ambiente.

> 🐱‍💻 NULLSTACK_SECRETS_PRIVATE_KEY será mapeada para `secrets.privateKey`
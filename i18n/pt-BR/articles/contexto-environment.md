---
title: Contexto Environment
description: O objeto environment está armazenado na parte da estrutura do seu contexto e fornece informações sobre o ambiente atual
---

O objeto *environment* está na parte do framework no contexto e fornece informações sobre o ambiente atual.

Esta chave é *somente leitura* e está disponível nos contextos *client* e *server*.

As seguintes chaves estão disponíveis no objeto:

- *client*: boolean
- *server*: boolean
- *development*: boolean
- *production*: boolean
- *static*: boolean
- *key*: string

```jsx
import Nullstack from 'nullstack';

class Page extends Nullstack {
 
  render({environment}) {
    return (
      <div> 
        {environment.client && <p>Estou no cliente</p>}
        {environment.server && <p>Estou no servidor</p>}
        {environment.development && <p>Estou em modo de desenvolvimento</p>}
        {environment.production && <p>Estou em modo de produção</p>}
        {environment.static && <p>Estou em um site estático</p>}
        <p>Minha chave é {environment.key}</p>
      </div>
    )
  }

}

export default Page;
```

A chave *key* do *environment* é uma hash md5 nas saídas das pasta do ambiente atual. A chave é anexada nos caminhos dos [assets](/pt-br/estilos) e na [API estática](/pt-br/geracao-de-sites-estaticos) para auxiliar no controle de cache.

## Próxima Etapa

⚔ Aprenda sobre o [contexto da página](/pt-br/contexto-page).
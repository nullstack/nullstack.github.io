---
title: Contexto Environment
description: O objeto environment é um proxy no Contexto Nullstack disponível em ambos client e server e te dá informações sobre o ambiente atual
---

- Tipo: `object`
- Origem: [Contexto Nullstack](/pt-br/contexto#----contexto-nullstack)
- Disponibilidade: server/client
- **readonly** em ambos **server** e **client**

Ele te dá informações sobre o ambiente atual.

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
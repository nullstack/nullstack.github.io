---
title: Contexto Service Worker
description: O objeto worker é um proxy no Contexto Nullstack disponível em ambos client e server e te dá controle granular do comportamento do seu PWA
---

- Tipo: `object`
- Origem: [Contexto Nullstack](/pt-br/contexto#----contexto-nullstack)
- Disponibilidade: server/client
- **readwrite** no contexto do **server**
- **readonly** no contexto do **client**

Ele te dá controle granular do comportamento do seu PWA.

Chaves do `worker` serão usadas para gerar o arquivo do *service worker* e devem ser atribuídas durante o [processo de inicialização](/pt-br/inicializacao-da-aplicacao).

As seguintes chaves estão disponíveis no objeto durante a inicialização:

- **enabled**: `boolean`
- **preload**: `string array` (relative paths)
- **headers**: `object`
- **cdn**: `string` (absolute url)
- **api**: `string` (absolute url)
- **protocol**: `string` (http or https)

A chave `enabled` define se o service worker será registrado automaticamente pelo Nullstack. 

Por padrão a chave `enabled` é setada como `true` no modo de produção e `false` no modo de desenvolvimento.

O array `preload` é composto por caminhos que serão cacheados quando o service worker for instalado.

Os assets requeridos para inicializar a aplicação serão pré-carregados automaticamente, e você deverá apenas as páginas extras que você quer que estejam disponíveis em modo offline.

```jsx
import { readdirSync } from 'fs';
import Nullstack from "nullstack";
import path from 'path';
import Application from "./src/Application";

const context = Nullstack.start(Application);

const { worker } = context;

const articles = readdirSync(path.join(__dirname, '../i18n/en-US', 'articles'));
worker.preload = [
  ...articles.map((article) => '/' + article.replace('.md', '')),
  ...illustrations.map((illustration) => '/illustrations/' + illustration),
  '/arrow.webp',
  '/stars.webp',
  '/documentation',
  '/components'
  // ...
]

export default context;
```

> 💡 O exemplo acima foi extraido deste repositório e permite que a documentação esteja totalmente acessível em modo offline.

As seguintes chaves estão disponíveis como **readonly** no contexto do cliente:

- **enabled**: `boolean`
- **preload**: `string array` (relative paths)
- **online**: `boolean`
- **fetching**: `boolean`
- **responsive**: `boolean`
- **installation**: `BeforeInstallPromptEvent`
- **registration**: `ServiceWorkerRegistration`
- **queues**: `object`

As seguintes chaves estão disponíveis como **readwrite** no contexto do cliente:

- **headers**: `object`

A chave `responsive` determina se a aplicação tem todas as respostas necessárias para renderizar a página atual.

O Nullstack irá tentar manter sua aplicação respondendo o maior tempo possível e setará a chave para `false` somente quando não houver mais alternativas de recuperar qualquer resposta da rede ou offline usando a estratégia de busca para o [ambiente](/pt-br/contexto-environment).

A chave `online` irá monitorar os eventos da rede e re-renderizar a aplicação quando o valor de `navigator.onLine` mudar.

Quando a aplicação voltar a ficar online o Nullstack irá tentar fazer a aplicação responder novamente e re-renderizar se necessário.

```jsx
import Nullstack from 'nullstack';
// ...

class Application extends Nullstack {
 
  // ...

  render({worker}) {
    if(!worker.responsive) {
      return <OfflineWarning />
    }
    return (
      <main>
        <Home route="/" />
      </main>
    )
  }

}
```

Você pode acessar a **registration** e **installation** do service worker atual pela chave `worker` para controlar o fluxo do seu PWA.

A chave `registration` se refere ao registro do service worker e só estará disponível uma vez que o processo de registro esteja completo. 

A chave `installation` se refere a instalação delegada no evento do prompt e apenas estará disponível se o evento `beforeinstallprompt` ocorrer.

```jsx
import Nullstack from 'nullstack';

class PWAInstaller extends Nullstack {

  installed = false;
  hidden = false;

  async prompt({worker}) {
    try {
      worker.installation.prompt();
      const {outcome} = await worker.installation.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
    } finally {
      this.hidden = true;
    }
  }
  
  render({worker, project}) {
    if(this.hidden) return false;
    if(!worker.installation) return false;
    return (
      <div>
        <img src={project.favicon} />
        <p> Do you want to add {project.name} to your home screen?</p>
        <button onclick={this.prompt}> Install </button>
        <button onclick={{hidden: true}}> Not Now </button>
      </div>
    )
  }

}

export default PWAInstaller;
```

## Telas de Carregamento

Quando uma [função do servidor](/pt-br/funcoes-de-servidor) é chamada o `fetching` será setado como `true` até a requisição ser resolvida.

Quando uma [função do servidor](/pt-br/funcoes-de-servidor) é chamada uma chave com o nome da [função do servidor](/pt-br/funcoes-de-servidor) invocada será setada no objeto `queues` até a requisição ser resolvida.

A chave será um array com todos os argumentos passados ​​para a função do servidor.

Qualquer chave que for chamada no objeto `queues` sempre irá retornar um array ao invés de `undefined` por consistência.

Quando o servidor estiver emulando o contexto do cliente para [renderização no lado do servidor](/pt-br/renderizando-no-servidor), todas as chaves de `queues` vão sempre retornar um array vazio, pulando múltiplos ciclos de render por performance.

```jsx
import Nullstack from 'nullstack';

class Page extends Nullstack {

  static async save({ valid }) {
    // ...
  }

  async submit() {
    await this.save({ valid: true });
  }

  render({ worker }) {
    const loadingValidSave = !!worker.queues.save
      .find(args => args.valid);

    return (
      <form onsubmit={this.submit}>
        {worker.fetching &&
          <span> carregando... </span>
        }
        <button disabled={loadingValidSave}>
          Salvar
        </button>
      </form>
    )
  }

}

export default Page;
```

## Headers customizadas

Você pode usar a chave `headers` para configurar as headers que o *worker* usará na requisição para uma função do servidor

> 🔥 headers serão ignorados quando uma função do servidor for chamada durante o processo de [renderização do lado do servidor](/pt-br/renderizando-no-servidor) 

```jsx
import Nullstack from 'nullstack';

class LoginPage extends Nullstack {

  // ...

  async submit({worker}) {
    // ...
    this.headers['Authorization'] = `Bearer ${token}`;
    // ...
  }

  static async authorize({request}) {
    const authorization = request.headers['Authorization'];
    // ...
  }
  
  // ...

}


export default LoginPage;
```

> ✨ Aprenda mais sobre o [requisições e respostas do servidor](/pt-br/requisicao-e-resposta-do-servidor)

## Estratégia de renderização Server-side

- Requisições de diferentes origens serão realizadas normalmente;
- Requisições diferentes do método GET serão realizadas normalmente;
- Assets com Fingerprints serão carregados no cache no momento da instalação;
- Assets com Fingerprints serão carregados do cache primeiro, e só então retornados para a rede, se necessário;
- Caminhos com uma extensão serão recuperados e atualizarão o cache em segundo plano para uma requisição subsequente;
- Os caminhos navegados serão carregados da rede e se falhar serão retornados do cache para a página na qual o `worker.responsive` e o `worker.online` estiverem setados como `false`;

## Estratégia de geração de site estático

- Requisições de diferentes origens serão realizadas normalmente;
- Requisições diferentes do método GET serão realizadas normalmente;
- Assets com Fingerprints serão carregados no cache no momento da instalação;
- Assets com Fingerprints serão carregados do cache primeiro, e só então retornados para a rede, se necessário;
- Caminhos com uma extensão serão recuperaados e atualizarão o cache em segundo plano para uma requisição subsequente;
- A página inicial será carregada na rede primeiro, e se necessário será retornada uma cópia em cache;
- Caminhos navegados irão carregar apenas os dados da API estática e mesclar com o template da aplicação para gerar a resposta.
- Navegar para uma rota estática irá fazer cache apenas dos dados daquela página;
- Quando os dados estiverem indisponíveis no cache ou na rede irá retornar uma página na qual `worker.responsive` e `worker.online` estiverem setados como `false`;

## Estratégia customizada

O Nullstack irá instalar automaticamente seu service worker se `enabled` estiver setado como `true` com os seguintes eventos:

- `install`
- `activate`
- `fetch`

Você pode sobreescrever qualquer um desses eventos criando um **service-worker.js** na pasta public;

Se qualquer uma das palavras chaves acima for encontrada o Nullstack injetará sua função no código do service worker ao invés do padrão.

Por conveniência uma chave chamada `context` é injetada no `self` do service worker com as seguintes chaves:

- `worker`
- [`project`](/pt-br/contexto-project)
- [`environment`](/pt-br/contexto-environment)

```jsx
function activate(event) {
  event.waitUntil(async function() {
    const cacheNames = await caches.keys();
    const cachesToDelete = cacheNames.filter(cacheName => cacheName !== self.context.environment.key);
    await Promise.all(cachesToDelete.map((cacheName) => caches.delete(cacheName)));
    if (self.registration.navigationPreload) {
      await self.registration.navigationPreload.enable();
    }
    self.clients.claim();
  }());
}

self.addEventListener('activate', activate);
```

> 💡 O exemplo acima foi extraido do service worker gerado e usa `self.context.enviroment.key`
---
title: Context Service Worker
description: The worker is a proxy in the framework store part of your context and gives you granular control of your PWA behavior.
---


O *worker* é um proxy na store do framework e em parte do seu contexto e da um pequeno controle do comportamento do seu PWA

Essa key é *readwrite* no contexto do *servidor*

Essa key é *readonly* no contexto do *cliente*.

Worker keys serão usadas para gerar o arquivo do service worker e devem ser setadas durante o [processo de inicialização](/application-startup).

Worker keys são congeladas após o [processo de inicialização](/application-startup). 

As seguintes keys estão disponíveis no objeto durante a inicialização

- *enabled*: boolean
- *preload*: string array (relative paths)
- *headers*: object

A key *enabled* define se o service worker será registrado automaticamente pelo Nullstack. 

Por padrão a key *enabled* é setada como true no modo de produção e false no modo de desenvolvimento.

O array Preload é composto por caminhos que serão cacheados quando o service worker for instalado.

Os assets requeridos para inicializar a aplicação serão pré-carregados automaticamente, e você deverá  apenas as páginas extras que você quer que estejam disponíveis em modo offline.

```jsx
import Nullstack from 'nullstack';
import path from 'path';
import {readdirSync} from 'fs';

class Application extends Nullstack {

  static async start({worker}) {
    const articles = readdirSync(path.join(__dirname, '..', 'articles'));
    worker.preload = [
      ...articles.map((article) => '/' + article.replace('.md', '')),
      '/nullstack.svg',
      '/documentation',
      '/components'
    ]
  }
  
  // ...

}

export default Application;
```

> 💡 O exemplo acima foi extraido deste repositório e permite que a documentação esteja totalmente acessível em modo offline.

As seguintes keys estão disponíveis como *readonly* no contexto do cliente:

- *enabled*: boolean
- *preload*: string array (relative paths)
- *online*: boolean
- *fetching*: boolean
- *responsive*: boolean
- *installation*: BeforeInstallPromptEvent
- *registration*: ServiceWorkerRegistration
- *loading*: object

As seguintes keys estão disponíveis como *readwrite* no contexto do cliente:

- *headers*: object

A key *responsive* determina se a aplicação tem todas as respostas necessárias para renderizar a página atual.

O Nullstack irá tentar manter sua aplicação *respondendo* o maior tempo possível e irá setar a key para false somente quando não houver mais alternativas de recuperar qualquer resposta da rede ou acordo offline para a estratégia de busca para o [ambiente](/context-environment).

A key *online* irá monitorar os eventos da rede e re-renderizar a aplicação quando o valor de navigator.onLine mudar.

Quando a aplicação voltar a ficar online o Nullstack irá tentar fazer a aplicação *responder* novamente e re-renderizar se necessário.

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

Você pode acessar o service worker atual *registration* and *installation* da key worker para controlar o fluxo do seu PWA.

A key *registration* se refere ao registro do service worker e só estará disponível uma vez que o processo de registro esteja completo. 

A key *installation* se refere a instalação adiada no evento do prompt e apenas estará disponível se o evento *beforeinstallprompt* ocorrer.

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

## Carregando telas

Quando uma [função do servidor](/server-functions) é chamada o *fetching* será setado como true até a requisição for resolvida.

Quando uma [função do servidor](/server-functions) é chamada a key com o nome [server function](/server-functions)
invocked será setada como true na *loading* key até a requisição for resolvida. 

Qualquer chave que for chamada no objeto *loading* sempre irá retornar um valor booleano ao invés de undefined por consistência.

When the server is emulating the client context for [server-side rendering](/server-side-rendering), every key of the *loading* object will always return false, saving multiple render cycles in performance.

```jsx
import Nullstack from 'nullstack';

class Page extends Nullstack {

  static async save() {
    // ...
  }

  async submit() {
    await this.save();
  }
 
  render({worker}) {
    return (
      <form onsubmit={this.save}> 
        {worker.fetching && 
          <span> loading... </span>
        }
        <button disabled={worker.loading.save}> 
          Save
        </button>
      </form>
    )
  }

}

export default Page;
```

## Cabeçalhos customizados

Você pode usar *headers* key para configurar o cabeçalho que o *worker* usará na requisição para uma função do servidor

> 🔥 Cabeçalhos serão ignorados quando uma função do servidor for chamada durante o processo de [renderização do lado do servidor](/server-side-rendering) 

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

> ✨ Aprenda mais sobre o [requisições e respostas do servidor](/server-request-and-response)

## Estratégia de renderização Server-side

- Requisições de diferentes origens serão realizadas normalmente;
- Requisições diferentes do método GET serão realizadas normalmente;
- Assets com Fingerprints serão carregados no cache no momento da instalação;
- Assets com Fingerprints serão carregados do cache primeiro, e só então retornados para a rede, se necessário;
- Caminhos com uma extensão serão recuperaados e atualizarão o cache em segundo plano para uma requisição subsequente;
- Os *Navigation paths* serão carregados da rede e então serão retornados para a página na qual o *worker.responsive* e o *worker.online* estiverem setados como false;


## Estratégia de geração de site estático

- Requisições de diferentes origens serão realizadas normalmente;
- Requisições diferentes do método GET serão realizadas normalmente;
- Assets com Fingerprints serão carregados no cache no momento da instalação;
- Assets com Fingerprints serão carregados do cache primeiro, e só então retornados para a rede, se necessário;
- Caminhos com uma extensão serão recuperaados e atualizarão o cache em segundo plano para uma requisição subsequente;
- A página inicial será carregada na rede primeiro, e então retornada para uma cópia em cache, se necessário;
- Ao invés disso os *Navigation paths* irão carregar apenas os dados da API estática e mesclar com o template da aplicação para gerar a resposta.
- Navegar por uma rota estática só irá retornar o cache daquela página;
- Quando os dados estiverem indisponíveis no cache ou na rede irá retornar para a página na qual *worker.responsive* e *worker.online* estiverem setados como false;

## Estratégia customizada

O Nullstack irá instalar automaticamente seu service worker se *enabled* estiver setado como true nos seguintes eventos:

- install
- activate
- fetch

Você pode sobreescrever qualquer um desses eventos criando um *service-worker.js* na pasta public;

Se qualquer uma das palavras chaves acima for encontrada o Nullstack ira injetar sua função no código do service worker ao invés do padrão

Por conviniência uma *context* key é injetada no *própio* service worker com as seguintes keys:

- worker
- [projeto](/context-project)
- [ambiente](/context-environment)

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

> 💡 O exemplo acima foi extraido do service worker gerado e usa self.context.enviroment.key

## Próximo passo

⚔ Aprenda [Como fazer o deploy de uma aplicação Nullstack](/how-to-deploy-a-nullstack-application).
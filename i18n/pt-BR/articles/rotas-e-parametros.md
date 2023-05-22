---
title: Rotas e Parâmetros
description: Nullstack tem rotas embutidas, não faria sentido não ser assim já que se espera que aplicações web tenham hyperlinks.
---

Nullstack tem rotas embutidas, não faria sentido não ser assim já que se espera que aplicações web tenham hyperlinks.

Qualquer tag pode receber um atributo `route`, seja um componente, componente interno ou uma tag HTML simples.

```jsx
import Nullstack from 'nullstack';
import Page from './Page';

class Application extends Nullstack {

  renderHome() {
    return (
      <section> Home </section>
    )
  }
 
  render({count}) {
    return (
      <main>
        <Home route="/" />
        <Page route="/page" />
        <abbr route="/abbreviations"> Abreviações </abbr>
      </main>
    )
  }

}

export default Application;
```

## Links

Links no Nullstack são tags `a` simples com o valor de `href` começando com "/".

```jsx
<a href="/page/about"> Página About </a>
```

> 💡 No lado do cliente o evento de clique modificará o histórico sem recarregar a página.

> ✨ Você ainda pode atribuir seu próprio evento de clique para a tag sem perder o comportamento do framework.

## Parâmetros

A chave `params` é um proxy de objeto injetado em cada instância de cliente.

Cada parâmetro da string de *query* é mapeado para esse objeto.

Por padrão qualquer chave requisitada deste objeto retornará uma string.

Se o valor for `undefined` retornará uma string vazia.

Se o valor for `true` ou `false` retornará um boleano, ao invés de uma string.

> 🐱‍💻 Abaixo um exemplo que visita "/books?expanded=true&page=2":

```jsx
import Nullstack from 'nullstack';

class Books extends Nullstack {

  async initiate({params}) {
    if(params.expanded) {
      const page = parseInt(params.page) || 1;
      this.books = await this.getBooks({page});
    }
  }

}

export default Books;
```

Realizar atribuição para uma chave de `params` causará um redirecionamento para a rota com os parâmetros atualizados.

Quando realizar atribuição para um parâmetro, o valor será convertido para JSON antes de ser definido.

> 💡 Redirecionamentos funcionam em lotes, então não há perca de performance em multiplas atribuições.

```jsx
import Nullstack from 'nullstack';

class Paginator extends Nullstack {

  handleClick({params}) {
    params.filter = '';
    params.page = 1;
  }

}

export default Paginator;
```

Atribuir uma string vazia a um parâmetro irá removê-lo da url.

## Segmentos Dinâmicos

Parte da rota pode ser uma expressão começada com ":" segida por um nome de parâmetro.

Esse valor será comparado com qualquer string na mesma posição de diretório.

O valor da string na URL será atribuído para o [contexto](/pt-br/contexto), parâmetros e funções abaixo desse ponto na hierarquia terão acesso a nova chave.

> 🐱‍💻 Abaixo um exemplo que visita "/category/suspense?page=2":

```jsx
import Nullstack from 'nullstack';

class Books extends Nullstack {

  async initiate({params}) {
    const page = parseInt(params.page) || 1;
    const category = params.slug;
    this.books = await this.getBooks({category, page});
  }

}

export default Books;
```

```jsx
import Nullstack from 'nullstack';
import Books from './Books';

class Application extends Nullstack {

  render() {
    <main>
      <Books route="/category/:slug">
    </main>
  }

}

export default Application;
```

Quando um segmento dinâmico é alterado, como por exemplo mover de "/category/suspense" para "/category/comedy", o componente será desfeito e uma nova instância será criada.

Mudar um parâmetro de consulta não re-instnaciará o componente.

Os filhos do componente não serão re-instanciados automaticamente, você pode definir a mesma rota para os filhos ou fazer isso manualmente se desejar esse comportamento.

> 💡 O comportamento mencionado acima resolve muitos dos problemas que você teria normalmente que lidar manualmente.

## Curingas

Curingas são rotas declaradas com "*" como valor do atributo

Essas rotas corresponderão a qualquer coisa se nada acima delas corresponder a URL requisitada.

```jsx
import Nullstack from 'nullstack';
import Home from './Home';

class Application extends Nullstack {

  render({count}) {
    return (
      <main>
        <Home route="/" />
        <div route="*"> Curinga </div>
      </main>
    )
  }

}
```

Curingas podem ser prefixados com um segmento.

> ✨ Isso é especialmente útil para engines que podem ser montadas em suas aplicações.

```jsx
import Nullstack from 'nullstack';
import Home from './Home';
import BlogEngine from './BlogEngine';

class Application extends Nullstack {

  render({count}) {
    return (
      <main>
        <Home route="/" />
        <BlogEngine route="/blog/*" />
      </main>
    )
  }

}
```

## Roteador

A chave `router` é um proxy de objeto injetado em cada instância de cliente.

O `router` tem três chaves:

- **`url`**
- **`path`**
- **`base`**
- **`previous`**

A chave `url` retorna tudo depois do domínio, incluindo o caminho e os parâmetros de query como uma string.

A chave `path` retorna apenas o caminho sem os parâmetros de consulta.

A chave `base` retorna apenas a url base (ex: `https://nullstack.app` ou `http://localhost:5000`).

A chave `previous` é o mesmo que `url`, mas para a rota anterior. Valor padrão é `null` (ex. ao acessar o aplicativo pela primeira vez).

> 💡 As chaves acima automaticamente removem a barra final por conveniência.

Atribuir a `url` ou `path` causará redirecionamento.

Atribuir uma url absoluta a `url` causará uma recarga completa.

```jsx
import Nullstack from 'nullstack';

class Application extends Nullstack {

  prepare({router}) {
    if(router.path == '/') {
      router.path = '/dashboard'; // simples mudança de rota
    } else {
      router.url = 'https://my-domain.app' // recarga completa
    }
  }

}
```

> 💡 Por baixo dos panos tags `a` e `params` usam o `router`.

## Eventos customizados

Atualizar `router.url` ou `router.path` irá gerar um evento personalizado.

```jsx
import Nullstack from 'nullstack';

class Analytics extends Nullstack {

  hydrate({router}) {
    window.addEventListener(router.event, () => {
      console.log(router.url);
    });
  }

}

export default Analytics;
```

## Âncoras especiais

Tags de âncora aceitam somente alguns atributos especiais convenientes além do `href` comum.

Você pode atribuir o atributo `params` com um objeto como valor.

O caminho permanecerá o mesmo do caminho atual do roteador, mas os `params` serão substituídos pelos novos parâmetros que você especificar.

```jsx
<a params={{page: 1}}> Primeira Página </a>
```

E você deseja apenas atualizar alguns parâmetros e manter outros, você pode usar o operador JavaScript *spread* para isso.

```jsx
<a params={{...params, page: 1}}> Primeira Página </a>
```

Você pode definir o atributo `path` com uma string começando com "/" e sem parâmetros de query.

Os parâmetros permanecerão os mesmos, mas, o `path` será atualizado.

```jsx
<a path="/category/suspense"> Livros de Suspense </a>
```

Ambos os atributos acima podem ser utilizados ao mesmo tempo.

```jsx
<a path="/category/suspense" params={{...params, page: 1}}> Livros de Suspense </a>
```

## Rotas aninhadas

A primeira rota a ser correspondida será renderizada.

Os outros elementos com uma rota não serão renderizados, no entanto, os elementos no mesmo nível sem um atributo `route` serão renderizados normalmente.

O roteador irá procurar uma rota por nível de profundidade DOM, isso permite que você tenha um comportamento de roteamento aninhado.

```jsx
import Nullstack from 'nullstack';
import Home from './Home';

class Application extends Nullstack {

  renderPage() {
    return (
      <section>
        <div route="/page/about"> About Page </div>
        <div route="/page/contact"> Contact Page </div>
      </section>
    )
  }
 
  render({count}) {
    return (
      <main>
        <Home route="/" />
        <Page route="/page/:slug" />
      </main>
    )
  }

}

export default Application;
```
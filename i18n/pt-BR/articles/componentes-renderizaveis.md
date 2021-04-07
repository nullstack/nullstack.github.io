---
title: Componentes renderizáveis
description: Componentes renderizáveis são muito semelhantes aos componentes da Web que fornecem a capacidade de criar novas tags HTML que atalham um grupo de outras tags HTML
---

O componente mais simples que você pode fazer é um componente renderizável.

Componentes renderizáveis são muito semelhantes aos componentes da Web que fornecem a capacidade de criar novas tags HTML que atalham um grupo de outras tags HTML.

Crie um arquivo em sua pasta src com o nome de seu componente e com a [extensão `.njs`](/pt-br/extensão-de-arquivo-njs).

Neste exemplo, vai ser chamado `helloworld.njs`.

Tudo o que você precisa fazer é importar `nullstack` ou qualquer uma das suas subclasses e estender sua classe dele, definir um método de instância chamado `render` que retorna qualquer JSX e exporte o componente.

> ✨ Instale a extensão oficial [Nullstack para VSCode](https://marketplace.visualstudio.com/items?itemName=ChristianMortaro.vscode-nullstack) para gerar classes com snippets.

```jsx
import Nullstack from "nullstack";

class HelloWorld extends Nullstack {

  render() {
    return (
      <div> Olá Mundo </div>
    )
  }

}

export default HelloWorld;
```

O código acima apenas declara o componente, você ainda tem que usá-lo.

Importando o componente em seu aplicativo, temos a capacidade de usar uma nova tag em sua renderização.

Esta tag será substituída pelo que você retornou no método `render` do componente.

```jsx
import Nullstack from "nullstack";

import "./Application.scss";

import HelloWorld from "./HelloWorld";

class Application extends Nullstack {
  // ...

  render({ page }) {
    return (
      <main>
        <h1> {page.title} </h1>
        <a href="https://nullstack.app/documentation" target="_blank">
          Read the documentation
        </a>
        <HelloWorld />
      </main>
    )
  }
}

export default Application;
```

## Usando atributos HTML.

Nullstack JSX se desvia um pouco das especificações.

Você pode usar os atributos HTML normais como `class` e `for` diretamente.

```jsx
<label for="input" class="nao-me-rotule"> Eu sou um rótulo </label>
```

## Componentes Headless

Se você deseja pular a renderização do componente, você pode simplesmente retornar `false` da renderização.

```jsx
import Nullstack from "nullstack";

class Headless extends Nullstack {

  render() {
    return false;
  }

}

export default Headless;
```

Isso alocará o espaço no DOM para quando você decidir renderizar a marcação lá.

Isso também é útil para renderização condicional.

Se tudo o que você deseja fazer é gerar um componente invisível, você pode ignorar a definição do método de renderização.

## Componentes internos

Em vez de criar um novo componente apenas para organizar a divisão de código, você pode criar um componente interno.

**Componentes internos** são quaisquer métodos cujo nome seja iniciado com `render` seguido por um caractere maiúsculo.

Componentes internos compartilham a mesma instância e escopo, pois o componente principal, portanto, são muito convenientes para evitar problemas como adereços de perfuração.

Para invocar o componente interno, use uma tag JSX com o nome do método sem o prefixo `render`.

```jsx
import Nullstack from "nullstack"

class Post extends Nullstack {

  renderArticle() {
    return (
      <article> Conteúdo </article>
    )
  }

  renderAside() {
    return (
      <aside> Conteúdo Relacionado </aside>
    )
  }

  render() {
    return (
      <div>
        <Article />
        <Aside />
      </div>
    )
  }

}

export default HelloWorld;
```

> 💡 Nullstack injetará uma referência constante à função no tempo de transpilação, a fim de ignorar completamente o processo de pesquisa de tempo de execução!

## Atributos booleanos

Os atributos podem ser atribuídos como booleanos.

Quando o valor é `false`, o atributo não será renderizado.

Quando o valor for `true`, ele será processado como um atributo booleano sem um valor de string.

```jsx
<button disabled={false}> Botão </button>
```

Você pode abreviar atributos quando sabe que o valor será sempre verdadeiro.

```jsx
<button disabled> Botão </button>
```

> ✨ Aprender mais sobre [atributos](/pt-br/contexto).

## Tag do elemento

Se você precisar decidir o nome da tag em tempo de execução, pode usar a tag do elemento e definir o atributo da tag condicionalmente.

```jsx
<element tag={!!link ? "a" : "span"} href={link || false}>
  algum texto arbitrário
</element>
```

Quando o atributo tag é omitido, Nullstack assumirá como padrão um `div`.

## Fragmentos

Fragmentos são elementos que renderizam o seu conteúdo no componente pai.

```jsx
export default function Fragmented() {
  return (
    <>
      <>
        <button> Eu sou um botão! </button>
      </>
      <p> Parágrafo! </p>
    </>
  )
}
```
Onde quer que seja usado, o componente funcional acima será renderizado da seguinte forma:

```html
<button> Eu sou um botão! </button>
<p> Parágrafo! </p>
```

## Elementos SVG

O SVG pode ser usado como se fosse qualquer tag HTML normal.

Você pode manipular o SVG usando atributos e eventos normalmente.

```jsx
<svg height={this.size} viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="40" onclick={this.grow} />
</svg>
```

> ✨ Aprender mais sobre [eventos](/pt-br/componentes-com-estado).

## Componentes com filhos

Seu componente pode ser invocado passando um bloco de conteúdo.

```jsx
<Header>
  <h1> Olá Mundo</h1>
</Header>
```

Isso não renderiza automaticamente o bloco, pois não saberia onde colocá-lo.

Você pode desestruturar os filhos no método de renderização e colocá-los em sua marcação.

```jsx
import Nullstack from "nullstack";

class Header extends Nullstack {

  render({ children }) {
    return (
      <div>{children}</div>
    )
  }

}

export default Header;
```

> ✨ Isso é possível porque a chave `children` faz parte do [contexto da instância](/pt-br/contexto##as-chaves-de-inst-ncia-do-cliente-s-o-).

## Listas

Você pode mapear listas sem declarar uma `key`.

As listas que podem mudar de comprimento devem ser agrupadas em um elemento pai apenas para elas.

```jsx
<ul>
  {list.map((item) => (
    <li>{item.name}</li>
  ))}
</ul>
```

Você pode emular uma lista de tamanho fixo, retornando `false` em vez de um elemento para reservar espaço no Dom.

```jsx
{list.map((item) => (
  item.visible ? <div>{item.name}</div> : false
)}
```

É uma boa prática usar componentes internos combinados com listas para limpar seu código.

```jsx
import Nullstack from "nullstack";

class List extends Nullstack {
  items = [
    { visible: true, number: 1 },
    { visible: false, number: 2 },
    { visible: true, number: 3 },
  ]

  renderItem({ visible, number }) {
    if (!visible) return false;
    return <li> {number} </li>
  }

  render() {
    return (
      <ul>
        {this.items.map((item) => (
          <Item {...item} />
        ))}
      </ul>
    )
  }
}

export default List;
```

> ✨ Às vezes, você notará chaves no mapa. Saiba mais sobre a [key da instância](/pt-br/instancia-self#key-da-inst-ncia).

## HTML interno

Você pode definir o HTML interno de um elemento com o atributo `html`.

Links dentro da string HTML serão substituídos por [Âncoras Roteáveis](/pt-br/rotas-e-parametros).

```jsx
import Nullstack from "nullstack";

class Post extends Nullstack {

  content = `
    <h1> Este é um post </h1>
    <a href="/other-post">
      Confira este outro post
    </a>
  `;

  render() {
    return (
      <article html={this.content} />
    )
  }

}

export default Post;
```

> 🔥 Tome cuidado! Ao usar o HTML gerado pelo usuário, você está em risco de injeção de script

## A tag `head`

Componentes renderizáveis podem renderizar dentro da tag `head` um número ilimitado de vezes em qualquer profundidade do aplicativo.

A tag `head` só será atualizada durante o processo de [renderização no servidor](/pt-br/renderizacao-no-servidor) e mudanças serão ignorados após o processo de [hidratação](/pt-br/ciclo-de-vida-full-stack).

```jsx
import Nullstack from 'nullstack';

class Application extends Nullstack {

  // ...

  render() {
    return (
      <main>
        <div>
          <head>
            <link rel="preconnect" href="https://www.googletagmanager.com" />
          </head>
        </div>
        <head>
          <link rel="preload" href="/roboto-v20-latin-300.woff2" as="font" type="font/woff2" crossorigin />
          <link rel="preload" href="/crete-round-v9-latin-regular.woff2" as="font" type="font/woff2" crossorigin />
        </head>
      </main>
    )
  }

}

export default Application;
```

> 🔥 Você não deve usar a tag `head` para atualizar [metatags](/pt-br/contexto-page) que o Nullstack já controla.

## Próxima Etapa

⚔ Adicione estado ao seu componente usando [componentes com estado](/pt-br/componentes-com-estado).

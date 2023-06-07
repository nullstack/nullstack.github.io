---
title: O que é Nullstack?
description: O Nullstack é um framework full stack que permite que o frontend e o backend sejam criados em um único componente, nós o chamamos de componentes "orientados a recursos". O Nullstack torna a codificação divertida e simples porque você não pensa em grandes arquiteturas; em vez disso, você possui pequenos recursos em componentes.
---

O Nullstack é um framework full stack que permite que o frontend e o backend sejam criados em um único componente, nós o chamamos de componentes "orientados a recursos". O Nullstack torna a codificação divertida e simples porque você não pensa em grandes arquiteturas; em vez disso, você possui pequenos recursos em componentes.

É mais fácil mostrar do que dizer: vamos repassar um componente que permite ver o número de curtidas de uma postagem em 5 minutos!

Na sua cabeça, você já está pensando em APIs e arquitetura, mas todos os seus usuários desejam ver as informações do banco de dados na tela, então vamos fazer exatamente isso:

```jsx
import Nullstack from 'nullstack'

class LikeButton extends Nullstack {

  // as variáveis de instância são mutáveis e reativas
  // você pode usar vanilla JS em vez de hooks
  likes = 0

  // funções "static async" rodam no servidor
  static async getNumberOfLikes({ database, post }) {
    // database is a user defined context key
    const sql = 'SELECT COUNT(*) FROM likes WHERE post = ?'
    const [likes] = await database.query(sql, [post])
    return likes
  }

  async initiate({ post }) {
    // Você pode usar o valor retornado das funções do servidor
    // Como se fosse uma função regular
    this.likes = await this.getNumberOfLikes({ post })
  }

  // JSX segue os padrões HTML
  render() {
    return (
      <div class="likes-counter">
        <span> {this.likes} </span>
      </div>
    )
  }

}
```

Isso foi fácil, esse é um recurso, tudo no mais é um problema imaginário. Mas isso foi realmente muito fácil, e se quisermos escrever dados no banco de dados em vez de apenas ler na página carregar?

Vamos alterar esse span para um botão e verificar os critérios de aceitação do nosso recurso. A qualquer momento, você pode optar por executar funções no servidor e o Nullstack gerará no momento da compilação um microsserviço com uma API apenas para essa função.


```jsx
import Nullstack from 'nullstack'

class LikeButton extends Nullstack {

  // ...

  static async createLike({ request, database, post }) {
    const user = request.user.id
    const sql = 'INSERT INTO likes (user, post) VALUES (?, ?)'
    await database.query(sql, [user, post])
  }

  // Cada client function recebe as props
  async like({ post }) {
    // Você pode alterar as variáveis e o DOM reflete as mudanças
    this.likes++
    // Isso está chamando um ponto de extremidade da API por baixo dos panos
    await this.createLike({ post })
  }

  // JSX segue os padrões HTML
  render() {
    return (
      <div class="likes-counter">
        <button onclick={this.like}>
          {this.likes}
        </button>
      </div>
    )
  }

}
```

Este exemplo é pequeno, mas mostra um pouco da beleza do NullStack. Todo recurso é apenas um componente e os recursos podem ser compostos como você deseja. Este componente pode entrar em um componente post.

```jsx
function Post({ post }) {
  return (
    <div>
      <article> {post.content} </article>
      <LikeButton post={post.id}>
    </div>
  )
}
```

Você pode até ter aplicativos inteiros como componentes dentro de outro aplicativo.

```jsx
function Application() {
  return (
    <div>
      <Blog route="/blog/*">dssxs-
      <Ecommerce route="/shop/*">
      <Home route="/">
    </div>
  )
}
```

Qualquer desenvolvedor pode pular direto para o seu projeto com apenas conhecimento do JavaScript e ser produtivo no dia 0, porque não precisa entender uma arquitetura excessivamente complicada ou ter que lidar com um monólito gigante. Os aplicativos Nullstack são apenas pequenos recursos isolados que são divertidos de codificar.
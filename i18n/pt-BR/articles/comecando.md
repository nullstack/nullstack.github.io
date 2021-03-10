---
title: Começando
description: Crie aplicações full-stack em javascript em meros segundos
---

> 📌 Você pode assistir um tutorial no nosso [Canal do Youtube](https://www.youtube.com/watch?v=ieLVXZGXUkI&list=PL5ylYELQy1hz1tcnZcP44xRxETpH9bTUe).

Crie aplicações javascript full-stack em segundos usando `npx` para gerar os arquivos do seu projeto usando o template mais recente.

> 🔥 A versão mínima necessária do [node.js](https://nodejs.org/pt-br/) para o modo de desenvovimento é *12.12.0*.

Troque `project-name` com o nome do seu projeto e rode o comanto abaixo para começar um projeto: 

```sh
npx create-nullstack-app project-name
```

Troque o diretório para a pasta gerada:

```sh
cd project-name
```

Instale as dependências:

```sh
npm install
```

Inicie a aplicação em modo de desenvolvimento:

```sh
npm start
```

## Entendendo os arquivos gerados

As seguintes pastas e arquivos serão gerados:

### index.js

Este é o ponto de entrada do [Webpack](https://webpack.js.org).

Normalmente, você não precisará mexer neste arquivo, mas é um lugar conveniente para importar dependências globais como frameworks CSS.

### src/

Esta pasta contêm o código fonte da sua aplicação.

### src/Application.njs

Este é o arquivo principal da sua aplicação.

>✨ Saiba mais sobre a [extensão de arquivo njs](/pt-br/extensao-de-arquivo-njs "Nullstack Javascript").

A função `start` será automaticamente chamada uma vez que você rode `npm start`, use a para preencher o [contexto](/pt-br/contexto) do seu servidor com coisas como [banco de dados](/pt-br/como-usar-mongodb-com-nullstack), [configurações](/pt-br/contexto-settings), e [segredos](/pt-br/contexto-secrets).

>✨ Saiba mais sobre a [inicialização da aplicação](/pt-br/inicializacao-da-aplicacao).

### src/Application.scss

Este é um arquivo vazio só para demonstrar que você pode usar [SCSS com Nullstack](/pt-br/estilos).

É uma boa prática importar um arquivo de estilo em um componente com o mesmo nome.

>✨ Saiba mais sobre [estilos](/pt-br/estilos).

### public/

Todo arquivo aqui ficará disponível para qualquer um na raíz do domínio.

Por padrão `create-nullstack-app` gera os ícones necessários para o seu `manifest.json` e imagens para meta tags OG.

>✨ Saiba mais sobre o [manifest.json](/pt-br/contexto-project).

Tenha certeza de trocar estas imagens pela identidade do seu projeto.

### .development/

Este é o resultado compilado da sua aplicação em modo de desenvolvimento.

> 🔥 Não toque nesta pasta

### .production/

Este é o resultado compilado da sua aplicação em modo de produção.

> 🔥 Não toque nesta pasta

>✨ Saiba mais sobre [como fazer deploy de aplicação Nullstack](/pt-br/como-fazer-deploy-de-aplicacao-nullstack).

## Próximo Passo

⚔ Crie seu primeiro [componente renderizável](/pt-br/componentes-renderizaveis).

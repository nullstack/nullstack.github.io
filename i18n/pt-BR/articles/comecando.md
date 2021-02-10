---
title: Começando
description: Crie aplicações full-stack em javascript em meros segundos
---

> 📌 Voce pode assistir um tutorial no nosso [Canal do Youtube](https://www.youtube.com/watch?v=ieLVXZGXUkI&list=PL5ylYELQy1hz1tcnZcP44xRxETpH9bTUe).

Crie aplicações full-stack em javascript em segundos usando *npx* para gerar os arquivos do seu projeto do último template.

> 🔥 A versão mínima necessária do [node.js](https://nodejs.org) para o modo de desenvovimento é *12.12.0*.

Troque *project-name* com o nome do seu projeto e rode o comanto abaixo para começar um projeto: 

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

Comece a aplicação em mode de desenvolvimento:

```sh
npm start
```

## Entendendo os arquivos gerados

As seguintes pastas e arquivos são gerados:

### index.js

Este é o ponto de entrada do [Webpack](https://webpack.js.org).

Normalmente, voce não tem que mexer neste arquivo, mas é um lugar conveniente para importar dependências globais como frameworks CSS.

### src/

Esta pasta contêm o código fonte da sua aplicação.

### src/Application.njs

Este é o arquivo principal da sua aplicação.

>✨ Saiba mais sobre a [extensão de arquivo njs](/njs-file-extension "Nullstack Javascript").

A função *start* será automaticamente chamada uma vez que voce rode *npm start*, use a para preencher o [contexto](/context) do seu servidor com coisas como [database](/how-to-use-mongodb-with-nullstack), [configurações](/context-settings), and [segredos](/context-secrets).

>✨ Saiba mais sobre a [inicialização da aplicação](/application-startup).

### src/Application.scss

Este é um arquivo vazio só para demonstrar que voce pode usar [SCSS com nullstack](/styles).

É uma boa prática importa um arquivo de estilo em um componente com o mesmo nome.

>✨ Saiba mais sobre [estilos](/styles).

### public/

Cada arquivo aqui será disponível para qualquer um desde a raíz do domínio.

Por padrão *create-nullstack-app* gera os ícones necessários para o seu manifest.json e imagens para suas meta tags OG.

>✨ Saiba mais sobre o [manifest.json](/context-project).

Tenha certeza de trocar estas imagens com a identidade do seu projeto.

### .development/

Este é o resultado compilado da sua aplicação em modo de desenvolvimento.

> 🔥 Não toque nesta pasta

### .production/

Este é o resultado compilado da sua aplicação em modo de produção.

> 🔥 Não toque nesta pasta

>✨ Saiba mais sobre [como implantar uma application nullstack](/how-to-deploy-a-nullstack-application).

## Next step

⚔ Crie seu primeiro [componente renderizável](/renderable-components).

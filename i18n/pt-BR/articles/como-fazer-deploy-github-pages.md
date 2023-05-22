---
title: Como fazer deploy de uma aplicação Nullstack no GitHub Pages
description: Você pode colocar uma aplicação Nullstack em qualquer lugar. Faça deploy da sua applicação no Vercel, Heroku, AWS, Azure, GitHub pages, ou em qualquer outro lugar.
---

Altere seu script build no `package.json` para incluir `--mode=ssg`:

```json
"build": "npx nullstack build --mode=ssg",
```

No seu repositório em `/settings/pages` você pode:

- configurar em qual branch você vai servir arquivos estáticos
- configurar em qual pasta você vai servir arquivos estáticos

Para as configurações abaixo, escolha `master` como o branch que você vai usar e a pasta raíz `/` como a pasta que você quer usar.

Crie o arquivo `.github/workflows/ssg-build.yml` com (sendo `main` o branch que vai causar o deploy).

Na parte de build abaixo, atualize as variáveis de ambiente para construir a aplicação com as configurações corretas.

- `NULLSTACK_PROJECT_NAME` - nome do seu projeto
- `NULLSTACK_PROJECT_DOMAIN` - dominio, necessário para mostrar as meta tags corretamente
  - se você tiver um dominio diferente, você também deve criar o arquivo `public/CNAME` contendo o nome do seu dominio
- `NULLSTACK_PROJECT_COLOR` - cor da sua aplicação

> ✨ Você pode alternativamente guardar estes valores de ambiente na seção de segredos do GitHub.

```yml
name: Nullstack SSG Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Cache dependencies
        uses: actions/cache@v3
        with:
          path: |
            **/node_modules
            **/yarn.lock
            **/.production
          key: node_modules-${{ hashFiles('**/package.json') }}

      - name: Install deps
        run: yarn

      - name: Build
        env:
          NULLSTACK_PROJECT_NAME: 'Nullstack Project Name'
          NULLSTACK_PROJECT_DOMAIN: 'some-awesome-nullstack-project.com'
          NULLSTACK_PROJECT_COLOR: '#D22365'
        run: yarn build --cache

      - name: Deploy 🚀
        uses: JamesIves/github-pages-deploy-action@v4.3.3
        with:
          branch: master
          folder: built
```

Esta ação irá construir sua aplicaçção em modo SSG e irá gerar a pasta contendo seu site estatico, o ultimo comando vai pegar a pasta estática e jogar no branch `master` permitindo o GitHub servir o conteúdo estático diretamente da pasta raíz.
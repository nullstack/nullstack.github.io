---
title: Como fazer deploy de uma aplicação Nullstack no GitHub Pages
description: Você pode hospedar um aplicativo Nullstack em qualquer lugar. Faça deploy no Vercel, Heroku, AWS, Azure, GitHub Pages ou em qualquer outro lugar.
---

Altere o script de construção no arquivo `package.json` para construir com `--mode=ssg`.

```json
"build": "npx nullstack build --mode=ssg",
```

No seu repositório, em `/settings/pages` você pode:

- Configurar qual `branch` vai servir os arquivos estáticos
- Configurar qual pasta vai servir os arquivos estáticos

Para as configurações abaixo, escolha master como a branch que deseja usar e a pasta raiz / como a pasta que você deseja usar.

Crie um arquivo `.github/workflows/ssg-build.yml` (assumindo que a branch `main` vai iniciar uma nova implementação).

Na construção abaixo, atualize as variáveis de ambiente para fazer executar o build coretamente.

- `NULLSTACK_PROJECT_NAME` - nome do seu projeto
- `NULLSTACK_PROJECT_DOMAIN` - domínio, necessário para renderizar corretamente as metatags
- Se você tem um domínio personaliado, você deve também criar um arquivo `public/CNAME` contendo seu domínio 
- `NULLSTACK_PROJECT_COLOR` - cor da sua aplicação para quando for exibida nos dispositivos

> ✨ Você também pode salvar esses valores nas configurações do GitHub.

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

Essa ação vai executar o build da sua aplicação no modo SSG e gerar uma pasta com o site estático. O último comando vai fazer a deploy do arquivo estático para sua branch `master` permitindo que o conteúdo estático seja servido vindo da raiz.
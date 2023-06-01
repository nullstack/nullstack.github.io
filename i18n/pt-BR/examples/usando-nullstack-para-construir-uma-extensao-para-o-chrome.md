---
title: "Usando o Nullstack para construir uma extensão para o Chrome"
description: "O Nullstack pode ser usado para construir uma extensão para o Chrome"
---
O Nullstack pode ser usado para construir uma extensão para o Chrome.

Essas são todas as alterações necessárias para fazer com que o app seja compatível como uma extensão:

- `public/manifest.json` criar o arquivo de manifesto da extensão pro Chrome
- `server.js` desabilita o service worker padrão, como uma extensão ele é desnecessário
- `src/Application.jsx` é o componente de entrada que vai renderizar o código do Popup
- `package.json` seta o modo pra SPA (modo padrão) e habilita a gravação de arquivos disco

Você pode achar um exemplo completo em: [Mortaro/nullstack-chrome-extension](https://github.com/Mortaro/nullstack-chrome-extension).

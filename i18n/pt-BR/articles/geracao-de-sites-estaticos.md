---
título: Geração de Site Estático
descrição: Use Nullstack para gerar websites estáticos para aplicações estáticas ultrarrápidas usando todo o potencial de Nullstack sem a necessidade de ter um back-end de node.js
---

Use Nullstack para gerar websites estáticos para aplicações estáticas ultrarrápidas usando todo o potencial do cliente Nullstack sem a necessidade de haver um back-end de node.js.

Websites estáticos são úteis para aplicações read-only como blogs e documentação

> 💡 Esta documentação é na verdade um site estático gerado com Nullstack

Todos os benefícios de [renderização no lado do servidor](/pt-br/renderizando-no-servidor) se aplicam para websites gerados estáticamente.

Você pode gerar um website estático a partir da sua aplicação Nullstack com o seguinte comando NPX:

```sh
npx create-nullstatic-app
```

> 🔥 Você deve estar em uma pasta de projeto Nullstack para executar esse comando.

Por padrão, a sua aplicação Nullstack será criada na pasta *static*.

Você pode mudar a pasta padrão por passá-la para o comando como um argumento:

```sh
npx create-nullstatic-app docs
```

O Nullstatic generator irá executar a sua aplicação no modo produção e irá rastrear cada link para uma rota interna que encontrar no seu DOM.

> 💡 Certifique-se que a porta de produção do servidor se encontra livre quando executar esse comando.

O [manifest.json](/pt-br/contexto-project) e o conteúdo da pasta pública serão copiados para a pasta de destino.

Além de gerar raw HTML também irá gerar um arquivo JSON para cada rota com uma cópia do estado.

Na primeira visita para a sua aplicação estática, HTML será veiculado e hidratado.

Nos pedidos subsequentes, Nullstack irá buscar o JSON gerado e atualizar o estado da aplicação sem que haja a necessidade de recarregar a página.

Isso, na verdade, oferece não apenas um site estático gerado, mas um API gerado estaticamente que alimenta a Single Page Application sem nenhum custo.

## Boas Práticas

Você pode adicionar um script para a sua package.json a fim de gerar o seu website estático em uma pasta personalizada:

```jsx
{
  "name": "nullstack.github.io",
  "version": "0.0.1",
  "description": "",
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "nullstack": "~0.9.0"
  },
  "scripts": {
    "start": "npx webpack --config node_modules/nullstack/webpack.config.js --mode=development --watch",
    "build": "npx webpack --config node_modules/nullstack/webpack.config.js --mode=production",
    "ssg": "npx create-nullstatic-app docs"
  }
}

```

## Ressalvas

Nullstatic rastreia a sua aplicação apenas até a resolução inicial, outras solicitações de API acionadas por eventos serão ignoradas.

Nullstatic rastreará um URL / 404 e gerará um /404.html e um /404/index.html.

## Próximo passo

⚔ Aprenda mais sobre o [trabalhador de serviço](/pt-br/trabalhador-serviço).

---
title: Renderizando no servidor
description: O Nullstack otimiza o SEO e também o tempo de resposta, gerando HTML para a rota de sua aplicação.
---

O Nullstack otimiza o SEO e também o tempo de resposta, gerando HTML para as [rotas](/pt-br/rotas-e-parametros) de sua aplicação.

A renderização no servidor é excelente para o SEO, pois fornece marcação rastreável bem veloz para os mecanismos de busca.

O Nullstack inicia a aplicação para o usuário servindo primeiro a página HTML solicitada, sem ocorrer sobrecarga.

Antes de servir o HTML, o Nullstack esperará pela [prepare](/pt-br/ciclo-de-vida-full-stack) e [initiate](/pt-br/ciclo-de-vida-full-stack) de todos os componentes da rota a serem resolvidos.

Durante a renderização, todas as funções do servidor são executadas localmente, sem a necessidade de buscar uma API, tornando o processo ainda mais rápido.

Depois que o documento já está no navegador, o Nullstack carrega o pacote no lado do cliente e inicia o processo de [hydration] (/pt-br/ciclo-de-vida-full-stack).

Nenhuma outra solicitação ao servidor é feita, para recuperar o estado da aplicação durante o [hydration] (/pt-br/ciclo-de-vida-full-stack).

O head da página gerará as meta tags necessárias para SEO com base no conteúdo das chaves de contexto [project] (/context-project) e [page] (/context-page).

## Próximos passos

⚔ Aprenda sobre [geração de site estático](/pt-br/geracao-de-sites-estaticos).
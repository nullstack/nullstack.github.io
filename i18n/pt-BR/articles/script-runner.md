---
title: Script Runner
description: O contexto é um objeto JavaScript simples que está completamente desacoplado do próprio framework e pode ser aproveitado para usar o mesmo contexto da aplicação principal para executar scripts.
---

O contexto é um objeto JavaScript simples que está completamente desacoplado do próprio framework e pode ser aproveitado para usar o mesmo contexto da aplicação principal para executar scripts.

Após a compilação, você pode acessar as chaves do contexto executando um script em outro arquivo que simplesmente importa o pacote de ambiente.

Esse padrão é muito mais conveniente do que ter que duplicar sua lógica para scripts pontuais.

Você deve iniciar manualmente a aplicação para garantir que o contexto seja populado.

Você também deve encerrar manualmente o processo, a menos que deseje ter um script que esteja em execução contínua.

O exemplo abaixo é um arquivo JavaScript simples em **scripts/seed.js** usado com [banco de dados MongoDB](/examples/como-usar-mongodb-com-nullstack) registrado no contexto:

```jsx
// Importe de .production em vez disso se você estiver executando em modo de produção.
const { default: context } = require('../.development/server.js');
const Faker = require('@faker-js/faker');

// registrar 5 usuários falsos
async function seed() {
  await context.start();
  const { database, project } = context;
  for (let id = 0; id < 5; id++) {
    await database.collection('users').insertOne({
      id,
      username: Faker.name.firstName()
    });
  }
  console.log(`5 users seeded to ${project.name}`);
  process.exit(0);
}

seed()
```

Para executá-lo, você pode simplesmente executá-lo como um comando node normal.

> 🔥 Você sempre deve executá-lo a partir da raiz para pegar o arquivo .env correto

```bash
> node scripts/seed.js
5 users seeded
```

Os script runners são ótimos para várias coisas como:
- Preencher um banco de dados em um ambiente específico
- Testar comportamentos do `contexto`
- Tarefas pontuais
- Tarefas agendadas (cron jobs)

E você não está limitado às opções acima, você pode ser criativo e usá-lo para coisas mais complexas, como observar eventos de blockchain ou tarefas que precisam ter acesso ao mesmo contexto da sua aplicação.
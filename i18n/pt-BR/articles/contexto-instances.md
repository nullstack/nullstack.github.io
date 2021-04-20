---
title: Contexto Instances
description: O objeto instances é um proxy no Contexto Nullstack disponível no client e fornece todas as instâncias ativas da aplicação
---

- Tipo: `object`
- Origem: [Contexto Nullstack](/pt-br/contexto#----contexto-nullstack)
- Disponibilidade: **client**
- **readwrite** no contexto do **client**

Fornece todas as instâncias ativas da aplicação.

> 💡 Instâncias ativas são as criadas e ainda não [terminadas](/pt-br/ciclo-de-vida-full-stack#terminate)

Conforme explicado em [`key` da instância](/pt-br/instancia-self#key-da-inst-ncia), keys desempenham um grande papel na definição de um identificador único para componentes.

> 🔥 Nullstack confia que seus desenvolvedores sabem o que estão fazendo e expõe o máximo de comportamentos internos possíveis para o programador usar como quiser, use com precaução.

Adicionando uma `key` única ao **Counter** torna-o disponível na lista `instances`.

```jsx
import Nullstack from 'nullstack';
import Counter from './Counter';
import AnyOtherComponent from './AnyOtherComponent';

class Application extends Nullstack {

  render() {
    return (
      <main>
        <Counter key="counter" />
        <AnyOtherComponent/>
      </main>
    )
  }

}

export default Application;
```



```jsx
import Nullstack from 'nullstack';

class Counter extends Nullstack {

  value = 0;

  increment() {
    this.value++;
  }

  render() {
    return <p> Contador: {this.value} </p>
  }

}

export default Counter;
```

Você pode acessar qualquer método e variável de instância da instância **counter** em **AnyOtherComponent**

```jsx
import Nullstack from 'nullstack';

class AnyOtherComponent extends Nullstack {

  render({ instances }) {
    return (
      <button onclick={instances.counter.increment}>
        Add 1 ao {instances.counter.value}
      </button>
    )
  }

}

export default AnyOtherComponent;
```

O uso de `instances` libera possibilidades ilimitadas de novos comportamentos como:

- Um ícone de notificação na navbar que pode ser atualizado de outros componentes em certas ações
- Um componente de *toast* que pode ser invocado de qualquer lugar de sua aplicação
- Um sistema de *store* com ações customizadas similares ao Redux
- Algo que nós nem imaginamos, sonhe criativamente e poste suas ideias no GitHub!

## Próxima Etapa

⚔ Aprenda sobre a [chave `environment` do contexto](/pt-br/contexto-environment).
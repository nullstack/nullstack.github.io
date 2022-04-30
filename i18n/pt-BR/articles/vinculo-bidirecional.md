---
title: Vínculo Bidirecional
description: O atributo bind reduz drasticamente a quantidade de "glue code" que você precisa digitar em sua aplicação.
---

Grandes pedaços de código em uma `Progressive Web Application (PWA)` são dedicados a reagir as entradas do usuário.

O processo de controlar a entrada do usuário pode ser dividido em 3 etapas tediosas:

- Declarar uma variável com o valor inicial;
- Passar o valor inicial para a entrada;
- Observar as mudanças na entrada e atribuir o novo valor à variável.

A última etapa pode incluir modelagem e outros tratamentos de valor.

Este processo no qual você faz manualmente todas essas etapas é chamado de *one-way binding*, é o padrão em muitos frameworks, e é possível no Nullstack.

```jsx
import Nullstack from 'nullstack';

class Form extends Nullstack {

  number = 1;
  string = '';

  updateString({event}) {
    this.string = event.target.value;
  }

  updateNumber({event}) {
    this.number = parseInt(event.target.value);
  }
 
  render() {
    return (
      <form>
        <input
          type="text"
          name="string"
          value={this.string}
          oninput={this.updateString}
        />
        <input
          type="number"
          name="number"
          value={this.number}
          oninput={this.updateNumber}
        />
      </form>
    )
  }

}

export default Form;
```

## O atributo bind 

O atributo `bind` reduz drasticamente a quantidade de 'glue code' que você precisa digitar em sua aplicação.

Você pode criar um atalho para definir um `value`, ` name` e evento com o atributo `bind`.

> 💡O Nullstack simplesmente substituirá o atributo `bind` pelo ` value`, `name` e evento subjacente.

O `bind` irá gerar um evento que automaticamente retornará para o tipo primitivo anterior que o valor era.

Você pode passar qualquer variável para o `bind`, desde que seu objeto pai seja mencionado.

```jsx
import Nullstack from 'nullstack';

class Form extends Nullstack {

  number = 1;
  string = '';
 
  render() {
    return (
      <form>
        <input type="text" bind={this.string} />
        <input type="number" bind={this.number} />
      </form>
    )
  }

}

export default Form;
```

## Eventos vinculados

Os seguintes eventos são definidos para cada tipo de entrada:

- `onclick` para entradas com o tipo de caixa de seleção
- `oninput` para outras entradas e áreas de texto
- `onchange` para qualquer outra coisa

Você ainda pode declarar um atributo com o mesmo evento vinculado.

Os eventos não substituirão o evento vinculado, em vez disso, serão executados depois que o vínculo transformar a variável.

O novo valor será mesclado na função [contexto](/pt-br/contexto).

```jsx
import Nullstack from 'nullstack';

class Form extends Nullstack {

  name = '';

  compare({value}) {
    this.name === value;
  }
 
  render() {
    return (
      <input bind={this.name} oninput={this.compare} />
    )
  }

}

export default Form;
```

## Fonte de vinculação

O `bind` também pode receber um atributo `source`.

> 💡 Se você não declarar um `source` para o `bind`, o Nullstack injetará um `source = {this}` no tempo de transpilação para pular completamente o processo de pesquisa em tempo de execução!

Se você declarar um `source`, o `bind` deverá ser uma string com o nome da chave que será modificada.

A fonte será mesclada no  [contexto](/pt-br/contexto) de eventos.

```jsx
import Nullstack from 'nullstack';

class Paginator extends Nullstack {

  validate({source, params}) {
    if(!source.page) {
      params.page = '1';
    }
  }

  render({params}) {
    return (
      <input 
        source={params}
        bind="page"
        oninput={this.validate}
      />
    )
  }

}

export default Paginator;
```

> 💡 A vinculação por referência é possível porque todas as vinculações são convertidas para o formato acima no momento da transpilação.

Qualquer objeto que responde a uma chamada de tecla com "[]" pode ser vinculado.

O atributo `name` pode ser substituído.

```jsx
import Nullstack from 'nullstack';

class Form extends Nullstack {

  number = 1;
  boolean = true;
  character = 'a';
  text = 'aaaa';
  
  object = {count: 1};
  array = ['a', 'b', 'c'];

  render({params}) {
    return (
      <div>
        <input bind={this.number} />
        <textarea bind={this.text} />
        <select bind={this.character}>
          {this.array.map((character) => <option>{character}</option>)}
        </select>
        <select bind={this.boolean} name="boolean-select">
          <option value={true}>true</option>
          <option value={false}>false</option>
        </select>
        <input bind={this.boolean} type="checkbox" />
        <input bind={this.object.count} />
        {this.array.map((value, index) => (
          <input bind={this.array[index]} />
        ))}
        <input bind={params.page} />
      </div>
    )
  }

}

export default Form;
```

## Objeto de Eventos

Você pode usar o [objeto de eventos](/pt-br/componentes-com-estado) ao lado do `bind` normalmente.

O evento será executado após a alteração da variável.

O evento irá compartilhar a fonte do `bind`.

```jsx
import Nullstack from 'nullstack';

class Paginator extends Nullstack {

  render({params}) {
    return (
      <input bind={params.filter} oninput={{page: 1}} />
    )
  }

}

export default Paginator;
```

## Componentes vinculáveis 

Você pode criar seu próprio componente vinculável recebendo os atributos gerados pelo `bind`.

Você deve responder chamando `onchange` com uma chave ` value`.

Você também pode mesclar quaisquer outras chaves que deseja enviar ao usuário do componente.

```jsx
class CurrencyInput extends Nullstack {

  parse({event, onchange}) {
    const normalized = event.target.value.replace(',', '').padStart(3, '0');
    const whole = (parseInt(normalized.slice(0,-2)) || 0).toString();
    const decimal = normalized.slice(normalized.length - 2);
    const value = parseFloat(whole+'.'+decimal);
    const bringsHappyness = value >= 1000000;
    onchange({value, bringsHappyness});
  }

  render({value, name}) {
    const formatted = value.toFixed(2).replace('.', ',');
    return <input name={name} value={formatted} oninput={this.parse} />
  }

}
```

```jsx
import Nullstack from 'nullstack';
import CurrencyInput from './CurrencyInput';

class Form extends Nullstack {

  balance = 0;

  render() {
    return (
      <CurrencyInput bind={this.balance} />
    )
  }

}

export default Form;
```

## Próximos passos

⚔ Aprenda sobre [propriedades sublinhadas](/pt-br/propriedades-sublinhadas).
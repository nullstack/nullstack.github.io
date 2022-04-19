---
title: Two-Way Binding
description: Bind reduces drastically the amount of glue code you have to type in your application.
---

Big chunks of code in a progressive web application is dedicated to reacting to user input.

The process of controlling user input can be broken into 3 tedious steps:

- Declaring a variable with the initial value;
- Passing the initial value to the input;
- Observing changes in the input and assigning the new value to the variable.

The last step might include typecasting and other value treatments.

This process in which you manually do all these steps is called *one-way binding*, it is the default in many frameworks, and is possible in Nullstack.

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

## The bind attribute

Bind reduces drastically the amount of glue code you have to type in your application.

You can shortcut setting a `value`, `name`, and event with the `bind` attribute.

> 💡 Nullstack will simply replace `bind` with the `value`, `name`, and event under the hood.

Bind will generate an event that automatically typecasts to the previous primitive type the value was.

You can pass any variable to the `bind` as long as its parent object is mentioned.

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

## Bound Events 

The following events are set for each type of input:

- `onclick` for inputs with the checkbox type
- `oninput` for other inputs and textareas
- `onchange` for anything else

You can still declare an attribute with the same bound event.

Events will not override the bound event, instead, it will be executed after bind mutates the variable.

The new value will be merged into the function [context](/context).

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

## Bind source

Bind can take a `source` attribute as well.

> 💡 If you do not declare a source to the bind, Nullstack will inject a `source={this}` at transpile time in order to completely skip the runtime lookup process!

If you declare a source, `bind` must be a string with the name of the key that will be mutated.

The source will be merged into the [context](/context) of events.

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

> 💡 Binding by reference is possible because all binds are converted to the format above at transpile time.

Any object that responds to a key call with "[]" can be bound.

The `name` attribute can be overwritten.

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

## Object Events

You can use [object events](/stateful-components) alongside `bind` normally.

The event will run after the variable is mutated.

The event will share the `bind` source.

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

## Bindable Components

You can create your own bindable component by receiving the attributes that `bind` generates.

You must respond by calling `onchange` with a `value` key.

You can also merge any other keys you wish to send to the component user.

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

## Next step

⚔ Learn more about [underscored properties](/underscored-properties).
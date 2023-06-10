---
title: Refs
description: Refs são uma maneira de controlar elementos do DOM à medida que são renderizados
---

Você pode passar a referência a uma variável para qualquer ref e ela definirá o valor dessa variável para o elemento DOM quando o enredo entrar no DOM.

Você pode passar qualquer variável para o `ref`, desde que seu objeto pai seja mencionado.

```jsx
import Nullstack from 'nullstack';

class Player extends Nullstack {

  video = null

  hydrate() {
    // Assumindo que você tenha permissão do navegador
    this.video.play()
  } 
 
  render() {
    return (
      <div>
        <video ref={this.video} />
      </div>
    )
  }

}

export default Player;
```

## Refs funcionais

Refs pode ser a referência a uma função que será acionada quando o nó entrar no DOM

Uma tecla `element` será adicionada ao contexto quando a função for chamada

Todas props desse enredo serão mescladas no contexto dessa função.

```jsx
import Nullstack from 'nullstack';

class Toast extends Nullstack {

  visible = false

  startTimer({ element, timeout }) {
    console.log(element, `será escondido em ${timeout}ms`)
    setTimeout(() => this.visible = false, timeout)
  }
 
  render() {
    return (
      <div>
        {this.visible &&
          <div ref={this.startTimer} timeout={3000}> 
            Mensagem muito importante que estava escondida antes 
          </div>
        }
      </div>
    )
  }

}

export default Toast;
```

## Simples components refáveis

Ref pode ser propagada apenas passando a referência do contexto.

```jsx
export default function CustomPlayer({ label, ref }) {
  return (
    <div>
      <video ref={ref} />
    </div>
  )
}
```

```jsx
import Nullstack from 'nullstack';
import CustomPlayer from './CustomPlayer';

class VideoPage extends Nullstack {

  video = null;

  render() {
    return (
      <CustomPlayer ref={this.video} />
    )
  }

}

export default VideoPage;
```

## Complexos componentes refáveis

Você pode criar seu próprio componente refável recebendo os atributos que o `ref` gera.

Ref é um atalho de tempo de transpilação que cria um objeto com as chaves `object` e `property`.

```jsx
class CustomPlayer extends Nullstack {

  element = null

  hydrate({ ref }) {
    ref.object[ref.property] = this.element
  }

  render({ audioOnly }) {
    return (
      <div>
        {audioOnly ? <audio ref={this.element} /> : <video ref={this.element} />}
      </div>
    )
  }

}

export default CustomPlayer;
```
---
title: Refs
description: Refs are a way to control elements from the DOM as they are rendered
---

You can pass the reference to a variable to any nodes ref and it will set the value of that variable to the DOM element when the node enters the DOM.

You can pass any variable to the `ref` as long as its parent object is mentioned.

```jsx
import Nullstack from 'nullstack';

class Player extends Nullstack {

  video = null

  hydrate() {
    // assuming you have browser permission
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

## Functional refs

Refs can be the reference to a function that will be triggered when the node enters the DOM

An `element` key will be added to the context when the function is invoked

All props of that node will be merged into the context of that function

```jsx
import Nullstack from 'nullstack';

class Toast extends Nullstack {

  visible = false

  startTimer({ element, timeout }) {
    console.log(element, `will be hidden in ${timeout}ms`)
    setTimeout(() => this.visible = false, timeout)
  }
 
  render() {
    return (
      <div>
        {this.visible &&
          <div ref={this.startTimer} timeout={3000}> 
            Very important message that was hidden before 
          </div>
        }
      </div>
    )
  }

}

export default Toast;
```

## Simple Refable Components

Ref can bubble down by just passing the reference from the context.

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

## Complex Refable Components

You can create your own refable component by receiving the attributes that `ref` generates.

Ref is a transpile time shortcut that creates an object with the keys `object` and `property`.

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
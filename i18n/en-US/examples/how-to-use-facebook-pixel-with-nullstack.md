---
title: Facebook's Pixel
description: Take advantage of the context and custom events to create a component that dynamically sends Pixel events
---

According to [developers.facebook.com](https://developers.facebook.com/docs/facebook-pixel/):

"The Facebook pixel is a snippet of JavaScript code that allows you to track visitor activity on your website."

You can take advantage of the [context](/context) and [custom events](/context-page) to create a component that dynamically sends Pixel events.

Facebook's Pixel can only be called after [`hydrate`](/full-stack-lifecycle) to ensure it is running in the client.

```jsx
import Nullstack from 'nullstack';

class FacebookPixel extends Nullstack {

  async hydrate({page, id}) {
    ! function(f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function() {
          n.callMethod ?
              n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s)
    }(window, document, 'script',
      'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', id);
    fbq('track', 'PageView');
    window.addEventListener(page.event, () => {
      fbq('init', id);
      fbq('track', 'PageView');
    })
  }
}

export default FacebookPixel;
```

```jsx
import Nullstack from 'nullstack';
import FacebookPixel from './FacebookPixel';

class Application extends Nullstack {

  // ...

  render() {
    return (
      <main>
        <FacebookPixel id="REPLACE_WITH_YOUR_FACEBOOK_PIXEL_ID" />
      </main>
    )
  }


}

export default Application;
```

## Using a Wrapper

Alternatively, you can install [nullstack-facebook-pixel](https://github.com/Mortaro/nullstack-facebook-pixel) as a dependency:

```sh
npm install nullstack-facebook-pixel
```

```jsx
import Nullstack from 'nullstack';
import FacebookPixel from 'nullstack-facebook-pixel';

class Application extends Nullstack {

  // ...

  render() {
    return (
      <main>
        <FacebookPixel id="REPLACE_WITH_YOUR_FACEBOOK_PIXEL_ID" />
      </main>
    )
  }


}

export default Application;
```
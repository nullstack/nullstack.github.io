---
title: Google Analytics
description: Take advantage of the context and custom events to create a component that dynamically sends GTAG events
---

According to [analytics.google.com](https://analytics.google.com):

"Google Analytics lets you measure your advertising ROI as well as track your Flash, video, and social networking sites and applications."

You can take advantage of the [context](/context) and [custom events](/context-page) to create a component that dynamically sends GTAG events.

GTAG can only be called after [`hydrate`](/full-stack-lifecycle) to ensure it is running in the client.

```jsx
import Nullstack from 'nullstack';

class GoogleAnalytics extends Nullstack {

  hydrate({router, page, id}) {
    window.dataLayer = window.dataLayer || [];
    function gtag(){
      dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', id, {
      page_title: page.title,
      page_path: router.url
    });
    window.addEventListener(page.event, () => {
      gtag('event', 'page_view', {
        page_title: page.title,
        page_path: router.url
      })
    })
  }
  
  render({id}) {
    return (
      <script 
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
      />
    )
  }

}

export default GoogleAnalytics;
```

```jsx
import Nullstack from 'nullstack';
import GoogleAnalytics from './GoogleAnalytics';

class Application extends Nullstack {

  // ...

  render() {
    return (
      <main>
        <GoogleAnalytics id="REPLACE_WITH_YOUR_GOOGLE_ANALYTICS_ID" />
      </main>
    )
  }


}

export default Application;
```

## Using a Wrapper

Alternatively, you can install [nullstack-google-analytics](https://github.com/Mortaro/nullstack-google-analytics) as a dependency:

```sh
npm install nullstack-google-analytics
```

```jsx
import Nullstack from 'nullstack';
import GoogleAnalytics from 'nullstack-google-analytics';

class Application extends Nullstack {

  // ...

  render() {
    return (
      <main>
        <GoogleAnalytics id="REPLACE_WITH_YOUR_GOOGLE_ANALYTICS_ID" />
      </main>
    )
  }


}

export default Application;
```
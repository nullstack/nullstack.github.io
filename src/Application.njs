import Nullstack from 'nullstack';
import GoogleAnalytics from 'nullstack-google-analytics';
import './Application.scss';
import Article from './Article';
import Components from './Components';
import Contributors from './Contributors';
import Documentation from './Documentation';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import Loader from './Loader';
import "./tailwind.css";
import Waifu from './Waifu';


class Application extends Nullstack {

  renderPreloader() {
    return (
      <head>
        <link rel="preload" href="/roboto-v20-latin-300.woff2" as="font" type="font/woff2" crossorigin />
        <link rel="preload" href="/roboto-v20-latin-500.woff2" as="font" type="font/woff2" crossorigin />
        <link rel="preload" href="/crete-round-v9-latin-regular.woff2" as="font" type="font/woff2" crossorigin />
      </head>
    )
  }

  prepare(context) {
    context.mode = 'light';
    context.oppositeMode = 'dark';
  }

  hydrate(context) {
    if (localStorage['mode']) {
      context.mode = localStorage['mode'];
      if (context.mode === 'dark') {
        context.oppositeMode = 'light';
      }
    }
  }

  render({ router, mode }) {
    const locale = router.url.startsWith('/pt-br') ? 'pt-BR' : 'en-US';
    return (
      <main class={mode}>
        <div class="dark:bg-gray-900 dark:text-white">
          <Header locale={locale} />

          <Home route="/" locale="en-US" />
          <Home route="/pt-br" locale="pt-BR" />

          <Documentation route="/documentation" locale="en-US" />
          <Documentation route="/pt-br/documentacao" locale="pt-BR" />

          <Components route="/components" locale="en-US" />
          <Components route="/pt-br/componentes" locale="pt-BR" />

          <Contributors route="/contributors" locale="en-US" />
          <Contributors route="/pt-br/contribuidores" locale="pt-BR" />

          <Waifu route="/waifu" locale="en-US" />
          <Waifu route="/pt-br/waifu" locale="pt-BR" />

          <Article route="/pt-br/:slug" locale="pt-BR" />
          <Article route="/:slug" locale="en-US" />

          <GoogleAnalytics id="G-E7GZ5Z4MLN" />
          <Preloader />
          <Loader />

          <Footer locale={locale} />
        </div>
      </main>
    )
  }

}

export default Application;
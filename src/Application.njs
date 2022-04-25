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

  renderHiringBanner() {
    return (
      <div class="p-3 md:p-0">
        <a class="bg-yellow-100 dark:bg-gray-800 py-2 flex justify-center items-center space-x-2 font-semibold flex-col md:flex-row px-6 text-center md:mt-2" href="https://ae.studio/jobs/4484720004/nullstack-developer" target="_blank">
          <span class="text-gray-900 dark:text-white"> AE Studio is hiring Nullstack developers that get shit done! </span>
          <span class="text-pink-800 dark:text-pink-200"> Apply here. </span>
        </a>
      </div>
    )
  }

  render({ router, mode }) {
    const locale = router.url.startsWith('/pt-br') ? 'pt-BR' : 'en-US';
    return (
      <main class={mode}>
        <div class="dark:bg-gray-900 dark:text-white">
          <Header locale={locale} />
          <HiringBanner />

          <Home route="/" locale="en-US" persistent />
          <Home route="/pt-br" locale="pt-BR" persistent />

          <Documentation route="/documentation" locale="en-US" persistent />
          <Documentation route="/pt-br/documentacao" locale="pt-BR" persistent />

          <Components route="/components" locale="en-US" persistent />
          <Components route="/pt-br/componentes" locale="pt-BR" persistent />

          <Contributors route="/contributors" locale="en-US" persistent />
          <Contributors route="/pt-br/contribuidores" locale="pt-BR" persistent />

          <Waifu route="/waifu" locale="en-US" persistent />
          <Waifu route="/pt-br/waifu" locale="pt-BR" persistent />

          <Article route="/pt-br/:slug" locale="pt-BR" persistent />
          <Article route="/:slug" locale="en-US" persistent />

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
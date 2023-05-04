import Nullstack from 'nullstack';
import GoogleAnalytics from 'nullstack-google-analytics';
import './Application.scss';
import '../tailwind.css';
import Article from './Article';
import Components from './Components';
import Contributors from './Contributors';
import Documentation from './Documentation';
import Blog from './Blog';
import Examples from './Examples';
import Post from './Post';
import PostExample from './PostExample';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import Loader from './Loader';
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
    context.page.locale = context.router.url.startsWith('/pt-br') ? 'pt-BR' : 'en-US';
  }

  hydrate(context) {
    context.mode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"
    document.querySelector('html').setAttribute('data-theme', context.mode)
  }

  render({ mode }) {
    return (
      <body data-theme={mode} class={mode}>
        <div class="dark:bg-gray-900 dark:text-white">
          <Header />

          <Home route="/" persistent />
          <Home route="/pt-br" persistent />

          <Documentation route="/documentation" persistent />
          <Documentation route="/pt-br/documentacao" persistent />

          <Examples route="/examples" persistent />
          <PostExample route="/examples/:slug" persistent />

          <Examples route="/pt-br/exemplos" persistent />
          <PostExample route="/pt-br/exemplos/:slug" persistent />

          <Blog route="/blog" persistent />
          <Post route="/blog/:slug" persistent />

          <Components route="/components" persistent />
          <Components route="/pt-br/componentes" persistent />

          <Contributors route="/contributors" persistent />
          <Contributors route="/pt-br/contribuidores" persistent />

          <Waifu route="/waifu" persistent />
          <Waifu route="/pt-br/waifu" persistent />

          <Article route="/pt-br/:slug" persistent />
          <Article route="/:slug" persistent />

          <GoogleAnalytics id="G-E7GZ5Z4MLN" />
          <Preloader />
          <Loader />

          <Footer />
        </div>
      </body>
    )
  }

}

export default Application;
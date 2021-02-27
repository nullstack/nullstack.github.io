import Nullstack from 'nullstack';
import './Application.scss';
import Documentation from './Documentation';
import Components from './Components'
import Article from './Article';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Waifu from './Waifu';
import Contributors from './Contributors';
import Loader from './Loader';
import GoogleAnalytics from 'nullstack-google-analytics';
import path from 'path';
import {readdirSync} from 'fs';

class Application extends Nullstack {

  static async startWorker({worker}) {
    const articles = readdirSync(path.join(__dirname, '../i18n/en-US', 'articles'));
    worker.preload = [
      ...articles.map((article) => '/' + article.replace('.md', '')),
      '/documentation',
      '/components',
      '/about',
      '/contributors',
      '/roboto-v20-latin-300.woff2',
      '/roboto-v20-latin-500.woff2',
      '/crete-round-v9-latin-regular.woff2',
      '/nullachan.png'
    ]
  }

  static async startProject({project}) {
    project.name = 'Nullstack';
    project.domain = 'nullstack.app';
    project.color = '#d22365';
    project.backgroundColor = '#2d3748';
  }

  static async start(context) {
    await this.startProject(context);
    await this.startWorker(context);
  }

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
    if(localStorage['mode']) {
      context.mode = localStorage['mode'];
      if(context.mode === 'dark') {
        context.oppositeMode = 'light';
      }
    }
  }

  render({router, mode}) {
    const locale = router.url.startsWith('/pt-br') ? 'pt-BR' : 'en-US';
    return (
      <main class={`${mode} bgm1 cm3`}>
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
      </main>
    )
  }

}

export default Application;
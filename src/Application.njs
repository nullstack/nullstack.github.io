import Nullstack from 'nullstack';
import './Application.scss';
import Documentation from './Documentation';
import Components from './Components'
import Article from './Article';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Contributors from './Contributors';
import Loader from './Loader';
import GoogleAnalytics from 'nullstack-google-analytics';
import path from 'path';
import {readdirSync} from 'fs';

class Application extends Nullstack {

  static async startWorker({worker}) {
    const articles = readdirSync(path.join(__dirname, '..', 'articles'));
    worker.preload = [
      '/nullstack.svg',
      ...articles.map((article) => '/' + article.replace('.md', '')),
      '/documentation',
      '/components',
      '/about',
      '/contributors',
      '/roboto-v20-latin-300.woff2',
      '/roboto-v20-latin-500.woff2',
      '/crete-round-v9-latin-regular.woff2'
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

  prepare({page}) {
    page.locale = 'en';
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

  render() {
    return (
      <main>
        <Preloader />  
        <Header />
        <Home route="/" />
        <Documentation route="/documentation" />
        <Components route="/components" />
        <Contributors route="/contributors" />
        <Article route="/:slug" />
        <Footer />
        <GoogleAnalytics id="G-E7GZ5Z4MLN" />
        <Loader />
      </main>
    )
  }

}

export default Application;
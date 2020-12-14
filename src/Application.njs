import Nullstack from 'nullstack';
import './Application.scss';
import Documentation from './Documentation';
import Components from './Components'
import Article from './Article';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Loader from './Loader';
import GoogleAnalytics from 'nullstack-google-analytics';

class Application extends Nullstack {

  static async startWorker({worker}) {
    const {default: path} = await import('path');
    const {readdirSync} = await import('fs');
    const articles = readdirSync(path.join(__dirname, '..', 'articles'));
    worker.enabled = true;
    worker.preload = [
      ...articles.map((article) => '/' + article.replace('.md', '')),
      '/nullstack.svg',
      '/documentation',
      '/components'
    ]
  }

  static async startProject({project}) {
    project.name = 'Nullstack';
    project.domain = 'nullstack.app';
    project.color = '#d22365';
  }

  static async start(context) {
    await this.startProject(context);
    await this.startWorker(context);
  }

  prepare({page}) {
    page.locale = 'en';
  }

  render() {
    return (
      <main>
        <Header />
        <Home route="/" />
        <Documentation route="/documentation" />
        <Components route="/components" />
        <Article route="/:slug" />
        <Footer />
        <GoogleAnalytics id="G-E7GZ5Z4MLN" />
        <Loader />
      </main>
    )
  }

}

export default Application;
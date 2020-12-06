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

  static async start(context) {
    const {project} = context;
    project.name = 'Nullstack';
    project.domain = 'nullstack.app';
    project.color = '#d22365';
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
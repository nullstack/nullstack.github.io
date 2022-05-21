import { existsSync, readFileSync } from 'fs';
import Translatable from './Translatable';
import YAML from 'yaml';
import Arrow from '../icons/Arrow';
import './Article.scss';

class Article extends Translatable {

  title = '';
  html = '';

  prepare({ router }) {
    if (router.path === '/renderable-components' || router.path === '/functional-components') {
      router.path = '/stateless-components'
    }
    if (router.path === '/njs-file-extension') {
      router.path = '/jsx-elements'
    }
  }

  static async getArticleByKey({ articles, locale, key }) {
    if (articles[locale][`${key}.md`]) {
      return articles[locale][`${key}.md`]
    }
    return articles[locale][`404.md`]
  }

  static async getArticlesList({ locale }) {
    const file = readFileSync(`i18n/${locale}/components/Documentation.yml`, 'utf-8');
    return YAML.parse(file);
  }

  async initiate({ page, locale, params }) {
    super.initiate({ page, locale })
    const article = await this.getArticleByKey({ key: params.slug, locale });
    Object.assign(this, article);
    const { topics } = await this.getArticlesList({ locale });
    this.topics = topics
  }

  launch({ project, page }) {
    page.title = `${this.title} - ${project.name}`;
    page.description = this.description;
    if (this.status) {
      page.status = 404;
    }
  }

  renderLink({ title, href, router }) {
    const active = router.url === href;
    return (
      <a href={href} class={`${active ? 'text-pink-500 dark:text-pink-500' : 'text-gray-500 dark:text-gray-300'} hover:text-pink-600 dark:hover:text-pink-400 block w-full`} onclick={{ expanded: true }}> {title} </a>
    )
  }

  renderTopic({ title, links }) {
    return (
      <div class="mb-3">
        <h5> {title} </h5>
        <nav>
          {links.map((link) => <Link {...link} />)}
        </nav>
      </div>
    )
  }

  render() {
    if (!this.html) return false
    return (
      <section class="max-w-screen-xl mx-auto px-4 flex flex-wrap sm:flex-nowrap py-12 sm:py-24">
        <button
          onclick={{ expanded: !this.expanded }}
          class={`transition delay-300 fixed bottom-10 right-10 bg-pink-600 text-white shadow-xl rounded-full py-2 px-4 z-50 md:hidden ring-0 transform ${this.expanded ? 'rotate-180 transform' : ''}`}>
          <Arrow size={20} />
        </button>
        <aside class={`w-full md:w-3/12 fixed top-0 left-0 md:relative z-40 md:z-auto bg-white dark:bg-gray-900 h-screen md:h-auto p-4 overflow-y-auto md:p-0 md:pr-4 transform pb-24 sm:pb-0 transition sm:transition-none delay-500 delay-0 ${this.expanded ? 'translate-y-0' : 'translate-y-full md:translate-y-0'}`}>
          {this.topics?.map((topic) => <Topic {...topic} />)}
        </aside>
        <article class="w-full md:w-9/12 pb-24">
          <h1 class="text-pink-600 text-4xl font-light block mb-8"> {this.title} </h1>
          <div html={this.html} class="prose dark:prose-dark max-w-none" />
          <p class="bg-gray-100 dark:bg-gray-800 p-2 mt-4">
            {this.i18n.lead} <a href="https://discord.gg/eDZfKz264v" target="_blank" class="text-pink-600 font-semibold">{this.i18n.cta}</a>
          </p>
        </article>
      </section>
    )
  }

}

export default Article;
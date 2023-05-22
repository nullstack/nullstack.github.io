import { readFileSync, existsSync } from 'fs';
import Translatable from './Translatable';
import YAML from 'yaml';
import Arrow from '../icons/Arrow';
import './Article.scss';
import prismjs from 'prismjs';
import { Remarkable } from 'remarkable';
import meta from 'remarkable-meta';

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

  static async getArticleByKey({ locale, key }) {
    await import('prismjs/components/prism-jsx.min');
    let path = `i18n/${locale}/articles/${key}.md`;
    if (!existsSync(path)) {
      path = `i18n/${locale}/articles/404.md`;
    }
    const text = readFileSync(path, 'utf-8');
    const md = new Remarkable({
      highlight: (code) => Prism.highlight(code, prismjs.languages.jsx, 'javascript')
    });
    md.use(meta);
    md.use((md) => {
      const originalRender = md.renderer.rules.link_open;
      md.renderer.rules.link_open = function () {
        let result = originalRender.apply(null, arguments);
        const regexp = /href="([^"]*)"/;
        const href = regexp.exec(result)[1];
        if (!href.startsWith('/')) {
          result = result.replace('>', ' target="_blank" rel="noopener">');
        }
        return result;
      };
    });
    md.use((md) => {
      md.renderer.rules.heading_open = function (tokens, i) {
        const { content } = tokens[i + 1];
        const { hLevel } = tokens[i];
        const id = content.toLowerCase().split(/[^a-z]/).join('-');
        return `<h${hLevel} id="${id}"><a href="#${id}">`;
      }
      md.renderer.rules.heading_close = function (tokens, i) {
        const { hLevel } = tokens[i];
        return `</a></h${hLevel}>`;
      }
    });
    return {
      html: md.render(text),
      ...md.meta
    }
  }

  static async getArticlesList({ locale }) {
    const file = readFileSync(`i18n/${locale}/components/Documentation.yml`, 'utf-8');
    return YAML.parse(file);
  }

  async initiate({ page, params }) {
    super.initiate({ page })
    const article = await this.getArticleByKey({ key: params.slug, locale: page.locale });
    Object.assign(this, article);
    const { topics } = await this.getArticlesList({ locale: page.locale });
    this.topics = topics
  }

  launch({ project, page }) {
    page.title = `${this.title} - ${project.name}`;
    page.description = this.description;
    if (this.status) {
      page.status = 404;
    }
  }

  async hydrate({ router, page }) {
    const examples = [
      "/how-to-deploy-to-vercel",
      "/how-to-deploy-to-github-pages",
      "/how-to-deploy-to-heroku",
      "/how-to-use-mongodb-with-nullstack",
      "/how-to-use-google-analytics-with-nullstack",
      "/how-to-use-facebook-pixel-with-nullstack",
    ]
    if (examples.includes(router.url)) {
      page.status = 301
      router.url = `/examples${router.url}`
    }
  }

  renderLink({ title, href, router }) {
    const active = router.url === href;
    return (
      <a
        href={href}
        class={[active ? 'text-pink-500 dark:text-pink-500' : 'text-gray-500 dark:text-gray-300', 'hover:text-pink-600 dark:hover:text-pink-400 block w-full']}
        onclick={{ expanded: true }}
      >
        {title}
      </a>
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

  renderNextArticle({ router }) {
    let nextLink, nextTopic    
    for (let topicIndex = 0; topicIndex < this.topics.length; topicIndex++) {
      const topic = this.topics[topicIndex]
      for (let linkIndex = 0; linkIndex < topic.links.length; linkIndex++) {
        const link = topic.links[linkIndex]
        if (link.href === router.path) {
          console.log({topicIndex}, topic.links.length)
          if (linkIndex < topic.links.length - 1) {
            nextLink = topic.links[linkIndex + 1]
            nextTopic = topic
          } else if (topicIndex < this.topics.length - 1) {
            nextTopic = this.topics[topicIndex + 1]
            nextLink = nextTopic.links[0]
          }
        }
      }
    }
    return (
      <div class="prose dark:prose-dark max-w-none my-12 border border-pink-600 p-6">
        <h2> <a href="#next-step"> {this.i18n.next} </a> </h2>
        {nextLink && 
          <span class="my-2 block"> 
            ➡️ {this.i18n.learn} <a href={nextLink.href} class="text-white hover:text-pink-600">{nextTopic.title}: {nextLink.title}</a> 
          </span>
        }
        <span>
          ❓ {this.i18n.lead} <a href="https://discord.gg/eDZfKz264v" target="_blank">{this.i18n.cta}</a>
        </span>
      </div>
    )
  }

  render() {
    if (!this.html) return false
    return (
      <section class="max-w-screen-xl mx-auto px-4 flex flex-wrap sm:flex-nowrap py-12 sm:py-24">
        <button
          onclick={{ expanded: !this.expanded }}
          class={['transition delay-300 fixed bottom-10 right-10 bg-pink-600 text-white shadow-xl rounded-full py-2 px-4 z-50 md:hidden ring-0 transform', this.expanded && 'rotate-180 transform']}>
          <Arrow size={20} />
        </button>
        <aside class={[
          'w-full md:w-3/12 fixed top-0 left-0 md:relative z-40 md:z-auto bg-white dark:bg-gray-900 h-screen md:h-auto p-4 overflow-y-auto md:p-0 md:pr-4 transform pb-24 sm:pb-0 transition sm:transition-none delay-500 delay-0',
          this.expanded ? 'translate-y-0' : 'translate-y-full md:translate-y-0'
        ]}>
          {this.topics?.map((topic) => <Topic {...topic} />)}
        </aside>
        <article class="w-full md:w-9/12 pb-24">
          <h1 class="text-pink-600 text-4xl font-light block mb-8"> {this.title} </h1>
          <div html={this.html} class="prose dark:prose-dark max-w-none" />
          <NextArticle />
        </article>
      </section>
    )
  }

}

export default Article;
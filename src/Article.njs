import Nullstack from 'nullstack';
import './Article.scss';
import {existsSync, readFileSync} from 'fs';
import prismjs from 'prismjs';
import {Remarkable} from 'remarkable';
import meta from 'remarkable-meta';

class Component extends Nullstack {

  title = '';
  html = '';

  static async getArticleByKey({locale, key}) {
    await import('prismjs/components/prism-jsx.min');
    let path = `i18n/${locale}/articles/${key}.md`;
    if(!existsSync(path)) {
      path = `i18n/${locale}/articles/404.md`;
    }
    const text = readFileSync(path, 'utf-8');
    const md = new Remarkable({
      highlight: (code) => Prism.highlight(code, prismjs.languages.jsx, 'javascript')
    });
    md.use(meta);
    md.use((md) => {
      const originalRender = md.renderer.rules.link_open;
      md.renderer.rules.link_open = function() {
        let result = originalRender.apply(null, arguments);
        const regexp = /href="([^"]*)"/;
        const href = regexp.exec(result)[1];
        if(!href.startsWith('/')) {
          result = result.replace('>', ' target="_blank" rel="noopener">');
        }
        return result;
      };
    });
    md.use((md) => {
      md.renderer.rules.heading_open = function (tokens, i) {
        const {content} = tokens[i+1];
        const {hLevel} = tokens[i];
        const id = content.toLowerCase().split(/[^a-z]/).join('-');
        return `<h${hLevel} id="${id}"><a href="#${id}">`;
      }
      md.renderer.rules.heading_close = function (tokens, i) {
        const {hLevel} = tokens[i];
        return `</a></h${hLevel}>`;
      }
    });
    return {
      html: md.render(text),
      ...md.meta
    }
  }

  async initiate({project, page, locale, params}) {
    const article = await this.getArticleByKey({key: params.slug, locale});
    Object.assign(this, article);
    page.title = `${article.title} - ${project.name}`;
    page.description = article.description;
    if(article.status) {
      page.status = 404;
    }
  }
  
  render() {
    return (
      <section class="x sm-p4x sm-p10y md+p20y"> 
        <h1 class="x12 sm-fs6 md+fs8 m6b"> {this.title} </h1>
        <article html={this.html} />
      </section>
    )
  }

}

export default Component;
import Nullstack from 'nullstack';

class Component extends Nullstack {

  title = '';
  html = '';

  static async getArticleByKey({key}) {
    const {existsSync, readFileSync} = await import('fs');
    const {default: Prism} = await import('prismjs');
    await import('prismjs/components/prism-jsx.min');
    const {Remarkable} = await import('remarkable');
    const {default: meta} = await import('remarkable-meta');
    const path = `articles/${key}.md`;
    if(!existsSync(path)) {
      return {html: 'Not Found', title: 'Not Found', description: 'Not Found'};
    }
    const text = readFileSync(path, 'utf-8');
    const md = new Remarkable({
      highlight: (code) => Prism.highlight(code, Prism.languages.jsx, 'javascript')
    });
    md.use(meta);
    return {
      html: md.render(text),
      ...md.meta
    }
  }

  async initiate({project, page, params}) {
    const article = await this.getArticleByKey({key: params.slug});
    Object.assign(this, article);
    page.title = `${project.name} - ${article.title}`;
    page.description = article.description;
  }

  whitelist() {
    return (
      <article>
        <code class="language-jsx language-sh" />
        <blockquote />
        <em />
      </article>
    )
  }
  
  render() {
    return (
      <section class="x p20y"> 
        <h1 class="x12 sm-f8 md+f8 m6b"> {this.title} </h1>
        <article html={this.html} />
      </section>
    )
  }

}

export default Component;
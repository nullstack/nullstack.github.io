import { readFileSync, existsSync } from "fs";
import Translatable from "./Translatable";
import "./Article.scss";
import prismjs from "prismjs";
import { Remarkable } from "remarkable";
import meta from "remarkable-meta";

class Post extends Translatable {
  html = "";

  static async getPostByKey({ locale, key }) {
    await import("prismjs/components/prism-jsx.min");
    let path = `i18n/${locale}/posts/${key}.md`;
    if (!existsSync(path)) {
      path = `i18n/${locale}/posts/404.md`;
    }
    const text = readFileSync(path, "utf-8");
    const md = new Remarkable({
      highlight: (code) =>
        Prism.highlight(code, prismjs.languages.jsx, "javascript"),
    });
    md.use(meta);
    md.use((md) => {
      const originalRender = md.renderer.rules.link_open;
      md.renderer.rules.link_open = function () {
        let result = originalRender.apply(null, arguments);
        const regexp = /href="([^"]*)"/;
        const href = regexp.exec(result)[1];
        if (!href.startsWith("/")) {
          result = result.replace(">", ' target="_blank" rel="noopener">');
        }
        return result;
      };
    });
    md.use((md) => {
      md.renderer.rules.heading_open = function (tokens, i) {
        const { content } = tokens[i + 1];
        const { hLevel } = tokens[i];
        const id = content
          .toLowerCase()
          .split(/[^a-z]/)
          .join("-");
        return `<h${hLevel} id="${id}"><a href="#${id}">`;
      };
      md.renderer.rules.heading_close = function (tokens, i) {
        const { hLevel } = tokens[i];
        return `</a></h${hLevel}>`;
      };
    });
    return {
      html: md.render(text),
      ...md.meta,
    };
  }

  async initiate({ page, params }) {
    super.initiate({ page, locale: page.locale });
    const post = await this.getPostByKey({ key: params.slug, locale: page.locale });
    Object.assign(this, post);
  }

  launch({ project, page }) {
    page.title = `${this.title} - ${project.name}`;
    page.description = this.description;
    if (this.status) {
      page.status = 404;
    }
  }

  render() {
    if (!this.html) return false;
    return (
      <section class="max-w-screen-md mx-auto px-4 flex flex-wrap sm:flex-nowrap py-12 sm:py-24">
        <article class="w-full pb-24">
          <h1 class="text-pink-600 text-4xl font-light block">{this.title}</h1>
          <div class="opacity-80 mb-8">
            <span class="mr-2">
              By
              <a
                href={`https://github.com/${this.author.handle}`}
                rel="noopener"
                target="_blank"
              >
                {this.author.name}
              </a>
            </span>
            <span class="mr-2">|</span>
            <span>{this.date}</span>
          </div>

          <div
            html={this.html}
            class="prose dark:prose-dark max-w-none text-lg"
          />
        </article>
      </section>
    );
  }
}

export default Post;

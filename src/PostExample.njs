import { readFileSync, existsSync } from "fs";
import Translatable from "./Translatable";
import "./Article.scss";
import prismjs from "prismjs";
import { Remarkable } from "remarkable";
import meta from "remarkable-meta";

class PostExample extends Translatable {
  html = "";

  static async getPostByKey({ locale, key }) {
    await import("prismjs/components/prism-jsx.min");
    let path = `i18n/${locale}/examples/${key}.md`;
    if (!existsSync(path)) {
      path = `i18n/${locale}/examples/404.md`;
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
          <h2 class="text-pink-600 text-4xl font-light block">{this.title}</h2>

          <div
            html={this.html}
            class="prose dark:prose-dark max-w-none text-lg"
          />
          <div class="prose dark:prose-dark max-w-none text-lg mt-12">
            <p>
              If you have any questions, feel free to join our{" "}
              <a href="https://discord.com/invite/eDZfKz264v" target="_blank">
                Discord server
              </a>{" "}
              where you can interact with our community 🥰
            </p>
            <p>
              Found a bug or have a feature request? Feel free to{" "}
              <a
                href="https://github.com/nullstack/nullstack/issues"
                target="_blank"
              >
                open an issue
              </a>{" "}
              at our Github.
            </p>
            <p>
              We will interact over the feedback as fast as we can and release
              1.0 pretty soon.
            </p>
            <p>
              You can help us by{" "}
              <a
                href="https://github.com/nullstack/nullstack/stargazers"
                target="_blank"
              >
                leaving a star on our Github repo🌟
              </a>
              .
            </p>
          </div>
        </article>
      </section>
    );
  }
}

export default PostExample;

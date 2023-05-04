import Nullstack from "nullstack";
import { readFileSync } from "fs";
import prismjs from "prismjs";

class Snippet extends Nullstack {
  html = "";

  static async getSnippetByKey({ key, locale }) {
    await import("prismjs/components/prism-jsx.min");
    const i18nFolder = `i18n/${locale || 'en-US'}`;
    const path = `${i18nFolder}/snippets/${key}.njs`;
    const code = readFileSync(path, "utf-8");
    return prismjs.highlight(code, Prism.languages.jsx, "javascript");
  }

  async initiate({ key, page }) {
    this.html = await this.getSnippetByKey({ key, locale: page.locale });
  }

  render() {
    return (
      <pre class="p-4 w-full rounded-md shadow-2xl bg-gray-800">
        <code html={this.html} />
      </pre>
    );
  }
}

export default Snippet;

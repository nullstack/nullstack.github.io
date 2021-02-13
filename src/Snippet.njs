import Nullstack from 'nullstack';
import {readFileSync} from 'fs';
import prismjs from 'prismjs';

class Snippet extends Nullstack {

  html = '';

  static async getSnippetByKey({key}) {
    await import('prismjs/components/prism-jsx.min');
    const path = `snippets/${key}.njs`;
    const code = readFileSync(path, 'utf-8');
    return prismjs.highlight(code, Prism.languages.jsx, 'javascript');
  }

  async initiate({key}) {
    this.html = await this.getSnippetByKey({key});
  }

  render() {
    return (
      <pre class="p4">
        <code html={this.html} />
      </pre>
    )
  }

}

export default Snippet;
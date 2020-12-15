import Nullstack from 'nullstack';

class Snippet extends Nullstack {

  html = '';

  static async getSnippetByKey({key}) {
    const {readFileSync} = await import('fs');
    const {default: Prism} = await import('prismjs');
    await import('prismjs/components/prism-jsx.min');
    const path = `snippets/${key}.njs`;
    const code = readFileSync(path, 'utf-8');
    return Prism.highlight(code, Prism.languages.jsx, 'javascript');
  }

  async initiate({key}) {
    this.html = await this.getSnippetByKey({key});
  }

  render() {
    return (
      <pre class="bgm3 p4">
        <code html={this.html} />
      </pre>
    )
  }

}

export default Snippet;
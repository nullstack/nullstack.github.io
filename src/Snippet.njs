import Nullstack from 'nullstack';

import 'prism-theme-one-dark/prism-onedark.css';
import "prismjs/plugins/unescaped-markup/prism-unescaped-markup.min.js";

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

  whitelist() {
    return (
      <div class="
        token comment prolog doctype cdata punctuation selector
        tag property boolean number constant symbol attr-name
        deleted string char attr-value builtin inserted
        operator entity url language-css style atrule
        keyword function regex important variable bold italic
      " />
    )
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
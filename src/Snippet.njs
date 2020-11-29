import Nullstack from 'nullstack';

import 'prism-theme-one-dark/prism-onedark.css';
import "prismjs/plugins/unescaped-markup/prism-unescaped-markup.min.js";

class Snippet extends Nullstack {

  html = '';

  static async start(context) {
    context.snippets = {};
    const {readdirSync, readFileSync} = await import('fs');
    const {default: Prism} = await import('prismjs');
    await import('prismjs/components/prism-jsx.min');
    const folder = 'snippets';
    for(const file of readdirSync(folder)) {
      const path = [folder, file].join('/');
      const code = readFileSync(path, 'utf-8');
      const key = file.split('.')[0];
      context.snippets[key] = Prism.highlight(code, Prism.languages.jsx, 'javascript');
    }
  }

  static async getSnippetByKey({snippets, key}) {
    return snippets[key];
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
      <pre html={this.html} />
    )
  }

}

export default Snippet;
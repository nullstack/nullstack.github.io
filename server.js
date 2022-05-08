import { readdirSync, readFileSync, writeFileSync } from 'fs';
import Nullstack from "nullstack";
import path from 'path';
import Application from "./src/Application";
import prismjs from 'prismjs';
import { Remarkable } from 'remarkable';
import meta from 'remarkable-meta';
import 'prismjs/components/prism-jsx.min';

const context = Nullstack.start(Application);

const { worker, project, environment } = context;

function slugify(string) {
  return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z ]/g, "").toLowerCase()
}

const locales = ['en-US', 'pt-BR']
context.articles = {}

for (const locale of locales) {
  context.articles[locale] = {}
  const articles = readdirSync(path.join(__dirname, `../i18n/${locale}`, 'articles'));
  // preload files for workers
  if (locale === 'en-US') {
    const illustrations = readdirSync(path.join(__dirname, '../public', 'illustrations'));
    worker.preload = [
      ...articles.map((article) => '/' + article.replace('.md', '')).filter((article) => article.indexOf('404') === -1),
      ...illustrations.map((illustration) => '/illustrations/' + illustration),
      '/en-US.json',
      '/arrow.webp',
      '/stars.webp',
      '/footer.webp',
      '/contributors',
      '/roboto-v20-latin-300.woff2',
      '/roboto-v20-latin-500.woff2',
      '/crete-round-v9-latin-regular.woff2',
    ]
  }
  const map = {}
  for (const article of articles) {
    const content = readFileSync(path.join(__dirname, `../i18n/${locale}`, 'articles', article), 'utf-8')
    // preload articles markdown
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
    context.articles[locale][article] = {
      html: md.render(content),
      ...md.meta,
    }
    // generate word map for search
    const lines = []
    let shouldSkip = false
    for (const line of content.split("\n")) {
      if (line.startsWith('```')) {
        shouldSkip = !shouldSkip
      } else if (!shouldSkip && !(line.includes('[') && line.includes(']'))) {
        lines.push(line)
      }
    }
    const words = lines.join(" ").split(" ")
    const wordMap = {}
    for (const word of words) {
      const slug = slugify(word)
      if (!slug) continue
      if (!wordMap[slug]) {
        wordMap[slug] = 1
      } else {
        wordMap[slug]++
      }
    }
    const key = article.replace('.md', '')
    map[key] = {
      ...md.meta,
      href: locale === 'en-US' ? `/${key}` : `/${locale.toLowerCase()}/${key}`,
      words: wordMap
    }
  }
  const json = environment.development ? JSON.stringify(map, null, 2) : JSON.stringify(map)
  writeFileSync(`public/${locale}.json`, json)
}


project.name = 'Nullstack';
project.domain = 'nullstack.app';
project.color = '#d22365';
project.backgroundColor = '#2d3748';

export default context
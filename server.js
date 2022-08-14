import { readdirSync } from 'fs';
import Nullstack from "nullstack";
import path from 'path';
import Application from "./src/Application";
import 'prismjs/components/prism-jsx.min';

const context = Nullstack.start(Application);

const { worker, project } = context;

const illustrations = readdirSync(path.join(__dirname, '../public', 'illustrations'));
const articles = readdirSync(path.join(__dirname, `../i18n/en-US`, 'articles'));
worker.preload = [
  ...articles.map((article) => '/' + article.replace('.md', '')).filter((article) => article.indexOf('404') === -1),
  ...illustrations.map((illustration) => '/illustrations/' + illustration),
  '/arrow.webp',
  '/stars.webp',
  '/footer.webp',
  '/contributors',
  '/roboto-v20-latin-300.woff2',
  '/roboto-v20-latin-500.woff2',
  '/crete-round-v9-latin-regular.woff2',
]

project.name = 'Nullstack';
project.domain = 'nullstack.app';
project.color = '#d22365';
project.backgroundColor = '#2d3748';

export default context
import { readFileSync } from 'fs';
import Nullstack from 'nullstack';
import YAML from 'yaml';

class Translatable extends Nullstack {

  static async geti18nByLocale({ locale }) {
    const [name] = this.name.split('_');
    const file = readFileSync(`i18n/${locale}/components/${name}.yml`, 'utf-8');
    return YAML.parse(file);
  }

  async initiate({ page, locale }) {
    this.locale = locale;
    this.i18n = await this.geti18nByLocale({ locale });
    if (this.i18n.title) {
      page.description = this.i18n.description;
      page.locale = locale || 'en-US';
    }
  }

  launch({ project, page }) {
    if (this.i18n.title) {
      page.title = `${this.i18n.title} - ${project.name}`;
    }
  }

  update({ locale }) {
    if (this.locale !== locale) {
      this.initiate();
    }
  }

}

export default Translatable;
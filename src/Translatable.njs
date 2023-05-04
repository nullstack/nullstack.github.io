import { existsSync, readFileSync } from "fs";
import Nullstack from "nullstack";
import YAML from "yaml";

class Translatable extends Nullstack {
  static async geti18nByLocale({ locale }) {
    const [name] = this.name.split("_");
    const translationPath = `i18n/${locale}/components/${name}.yml`;
    if (existsSync(translationPath)) {
      const file = readFileSync(translationPath, "utf-8");
      return YAML.parse(file);
    }
    return {};
  }

  async initiate({ page }) {
    this.locale = page.locale;
    this.i18n = await this.geti18nByLocale({ locale: page.locale });
    if (this.i18n.title) {
      page.description = this.i18n.description;
      page.locale = page.locale || "en-US";
    }
  }

  launch({ project, page }) {
    if (this.i18n.title) {
      page.title = `${this.i18n.title} - ${project.name}`;
    }
  }

  update({ page }) {
    if (this.locale !== page.locale) {
      this.initiate();
    }
  }
}

export default Translatable;

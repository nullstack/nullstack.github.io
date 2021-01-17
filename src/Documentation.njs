import Nullstack from 'nullstack';
import {readFileSync} from 'fs';
import YAML from 'yaml';

class Documentation extends Nullstack {
  
  i18n = {};

  static async geti18nByLocale({locale}) {
    const file = readFileSync(`i18n/${locale}/pages/Documentation.yml`, 'utf-8');
    return YAML.parse(file);
  }

  async initiate({project, page, locale}) {
    this.i18n = await this.geti18nByLocale({locale});
    page.title = `${this.i18n.title} - ${project.name}`;
    page.description = this.i18n.description;
    page.priority = 0.8;
    page.locale = locale || 'en-US';
  }

  renderLink({title, href}) {
    return (
      <a href={href} title={title} class="xl x12 p3y bcm2t ci1"> {title} </a>
    )
  }

  renderTopic({title, description, links}) {
    return (
      <div class="x12 m6y bcm2 p4x p4t p1b">
        <h2 class="x12 sm-fs6 md+fs8 m2b"> {title} </h2>
        <p class="x12 fs4 m6b"> {description} </p>
        <nav class="x12"> 
          {links.map(link => <Link {...link} />)} 
        </nav>
      </div>
    )
  }
  
  render() {
    return (
      <section class="x sm-p4x sm-p10y md+p20y">
        <h1 class="x12 sm-fs6 md+fs12 m2b"> {this.i18n.heading} </h1>
        <p class="x12 fs4"> {this.i18n.tagline} </p>
        {this.i18n.topics && this.i18n.topics.map((topic) => <Topic {...topic} />)}
      </section>
    )
  }

}

export default Documentation;
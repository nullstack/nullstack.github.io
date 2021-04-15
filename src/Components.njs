import Translatable from './Translatable';

class Components extends Translatable {

  prepare({page}) {
    page.priority = 0.3;
  }

  renderProject({title, repository}) {
    return (
      <a
        href={repository}
        target={repository.indexOf('http') === 0 && "_blank"}
        rel="noopener" class="xl x12 p3y bcm2t ci1"
      >
        {title}
      </a>
    )
  }

  renderTopic({title, projects, tagline}) {
    return (
      <div class="x12 m6y bcm2 p4x p4t p1b">
        <h2 class="x12 sm-fs6 md+fs8 m3b"> {title} </h2>
        {tagline &&
          <p class="m3y" title={tagline.title}> {tagline.text} </p>
        }
        <nav class="x12"> 
          {projects.map(project => <Project {...project} />)} 
        </nav>
      </div>
    )
  }
  
  render() {
    if(!this.i18n) return false;
    return (
      <section class="x sm-p4x sm-p10y md+p20y">
        <h1 class="x12 sm-fs6 md+fs12 m2b"> {this.i18n.heading} </h1>
        <p class="x12 fs4"> {this.i18n.tagline} </p>
        <p class="m2t" html={this.i18n.contribute} />
        <div class="x12">
          {this.i18n.topics.map((topic) => <Topic {...topic} />)}
        </div>
      </section>
    )
  }

}

export default Components;
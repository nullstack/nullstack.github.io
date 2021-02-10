import Translatable from './Translatable';

class Contributors extends Translatable {

  documentation = [];
  packages = [];

  async fetchContributors({repository}) {
    const response = await fetch(`https://api.github.com/repos/nullstack/${repository}/contributors`);
    return await response.json();
  }

  async hydrate() {
    this.documentation = await this.fetchContributors({repository: 'nullstack.github.io'});
    const nullstack = await this.fetchContributors({repository: 'nullstack'});
    const createNulstackApp = await this.fetchContributors({repository: 'create-nullstack-app'});
    const createNulstaticApp = await this.fetchContributors({repository: 'create-nullstatic-app'});
    const packages = [...nullstack, ...createNulstackApp, ...createNulstaticApp];
    const logins = new Set(packages.map(({login}) => login));
    this.packages = [...logins].map((login) => packages.find((contributor) => contributor.login == login));
  }
  
  renderTopic({title, paragraphs, main, children}) {
    return (
      <div class="x12 m10b">
        <element tag={main ? 'h1' : 'h2'} class="x12 sm-fs6 md+fs8 m2b">
          {title}
        </element>
        {paragraphs &&
          <div class="xl x12">
            {paragraphs.map((paragraph) => <p class="x12 fs4 m1b" html={paragraph} />)}
          </div>
        }
        <div class="xl x12">
          {children}
        </div>
      </div>
    )
  }

  renderState() {
    const {state} = this.i18n;
    return (
      <Topic {...state} main />
    )
  }

  renderRoadmap() {
    const {roadmap} = this.i18n;
    return (
      <Topic {...roadmap}>
        <ul class="m2t">
          {roadmap.tasks.map((task) => <li class="bc1b p1y"> ⚔ {task} </li>)}
        </ul>
      </Topic>
    )
  }

  renderCoreContributor({github, name, role, description, contribution}) {
    return (
      <div class="xl x12 bcm2 p2 m2t">
        <img class="xl" src={`https://github.com/${github}.png`} alt={name} width="90" height="90" style="height: 90px" />
        <div class="md+x10 md+p3l sm-m3t">
          <h3>
            <a href={github} target="_blank" rel="noopener" class="ci1">{name}</a>
          </h3>
          <h4 class="m1y"> {role} </h4>
          <p> {description} </p> 
          <p> {contribution} </p>
        </div>
      </div>
    )
  }

  renderCoreTeam() {
    const {core} = this.i18n;
    return (
      <Topic {...core}>
        {core.team.map((contributor) => <CoreContributor {...contributor} />)}
      </Topic>
    )
  }

  renderInstructions() {
    const {instructions} = this.i18n;
    return (
      <Topic {...instructions} />
    )
  }

  renderContributor({login, avatar_url, html_url}) {
    return (
      <div class="xx sm-x6 bcm2 p2 m2t">
        <a link={html_url} title={login} target="_blank" rel="noopener" class="ci1">
          <img class="xl" src={avatar_url} alt={login} width="90" height="90" style="height: 90px" />
        </a>
      </div>
    )
  }

  renderGithubContributors({title, key}) {
    return (
      <Topic title={title}>
        <div class="xl">
          {this[key].map((contributor) => <Contributor {...contributor} />)}
        </div>
        <p class="x12 fs4 m2t">{this.i18n.githubCacheWarning}</p>
      </Topic>
    )
  }
  
  render() {
    if(!this.i18n) return false;
    return (
      <section class="x sm-p4x sm-p10y md+p20y">
        <State />
        <Roadmap />
        <CoreTeam />
        <GithubContributors title={this.i18n.packages.title} key="packages" />
        <GithubContributors title={this.i18n.documentation.title} key="documentation" />
        <Instructions />
      </section>
    )
  }

}

export default Contributors;
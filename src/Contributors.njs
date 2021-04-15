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
      <div class="w-full mb-12">
        <element tag={main ? 'h1' : 'h2'} class="text-gray-800 text-xl sm:text-4xl font-light mb-4">
          {title}
        </element>
        {paragraphs &&
          <div class="text-xl">
            {paragraphs.map((paragraph) => <p class="w-full mb-1" html={paragraph} />)}
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
      <Topic {...roadmap} />
    )
  }

  renderCoreContributor({github, name, role, description, contribution}) {
    return (
      <div class="border border-gray-100 p-2 mt-2 flex flex-wrap">
        <img src={`https://github.com/${github}.png`} alt={name} width="90" height="90" class="w-24 h-24 mb-2 sm:mb-0" />
        <div class="w-full sm:w-10/12 sm:pl-3">
          <h3>
            <a href={`https://github.com/${github}`} target="_blank" rel="noopener" class="text-pink-600">{name}</a>
          </h3>
          <h4 html={role} />
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
      <a href={html_url} title={login} target="_blank" rel="noopener" class="ci1">
        <img src={avatar_url} alt={login} width="90" height="90" class="h-24 w-24" />
      </a>
    )
  }

  renderGithubContributors({title, key}) {
    return (
      <Topic title={title}>
        <div class="flex justify-start flex-wrap">
          {this[key].map((contributor) => <Contributor {...contributor} />)}
        </div>
        <p class="w-full mt-2">{this.i18n.githubCacheWarning}</p>
      </Topic>
    )
  }
  
  render() {
    if(!this.i18n) return false;
    return (
      <section class="max-w-screen-xl mx-auto px-4 flex justify-between items-center flex-wrap py-12 sm:py-24">
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
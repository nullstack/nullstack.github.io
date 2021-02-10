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

  renderParagraph({text, children}) {
    return (
      <p class="x12 fs4 m1b">
        {!!children.length ? children : text}
      </p>
    )
  }
  
  renderArchor({children, link, title}) {
    link = link || "https://github.com/nullstack/nullstack/issues";
    const href = (
      link.indexOf("github.com") === -1
        ? (`https://github.com/${link}`)
        : link
    )
    return (
      <a
        href={href}
        title={title}
        target="_blank"
        rel="noopener"
        class="ci1"
      >
        {children}
      </a>
    )
  }

  renderTopic({title, main, children}) {
    return (
      <div class="x12 m10b">
        <element tag={main ? 'h1' : 'h2'} class="x12 sm-fs6 md+fs8 m2b">
          {title}
        </element>
        {children}
      </div>
    )
  }

  renderState() {
    return (
      <Topic title={this.i18n.topics[0].title} main>
        {this.i18n.topics[0].paragraphs.map(text => {
          return <Paragraph text={text}/>
        })}
      </Topic>
    );
  }

  renderTask({description}) {
    return (
      <li class="bc1b p1y"> ⚔ {description} </li>
    )
  }

  renderRoadmap() {
    return (
      <Topic title={this.i18n.topics[1].title}>
        {this.i18n.topics[1].paragraphs.map(text => {
          return <Paragraph text={text}/>
        })}
        <ul class="m2t">
          {this.i18n.topics[1].tasks.map(task => {
            return <Task description={task}/>
          })}
        </ul>
      </Topic>
    )
  }

  renderCoreContributor({contributor}) {
    const { github, name, role, description, contribution } = contributor;
    return (
      <div class="xl x12 bcm2 p2 m2t">
        <img class="xl" src={'https://github.com/' + github + '.png'} alt={name} width="90" height="90" style="height: 90px" />
        <div class="md+x10 md+p3l sm-m3t">
          <h3>
            <Archor link={github}>{name}</Archor>
          </h3>
          <h4 class="m1y"> {role} </h4>
          <p> {description} </p> 
          <p> {contribution} </p>
        </div>
      </div>
    )
  }

  renderCoreTeam() {
    return (
      <Topic title={this.i18n.topics[2].title}>
        {this.i18n.topics[2].paragraphs.map(text => {
          return <Paragraph text={text}/>
        })}
        {this.i18n.topics[2].contributors.map(contributor => {
          return <CoreContributor contributor={contributor} />
        })}
      </Topic>
    )
  }

  renderHowToContribute() {
    return (
      <Topic title={this.i18n.topics[5].title}>
        <Paragraph text={this.i18n.topics[5].paragraphs[0]} />
        <Paragraph>
          <Archor>
            {this.i18n.topics[5].textLinks[0]}
          </Archor>
          {this.i18n.topics[5].textLinks[1]}
          <Archor>
            {this.i18n.topics[5].textLinks[2]}
          </Archor>
          {this.i18n.topics[5].textLinks[3]}
        </Paragraph>
      </Topic>
    )
  }

  renderContributor({login, avatar_url, html_url}) {
    return (
      <div class="xx sm-x6 bcm2 p2 m2t">
        <Archor link={html_url} title={login}>
          <img class="xl" src={avatar_url} alt={login} width="90" height="90" style="height: 90px" />
        </Archor>
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
        <GithubContributors title={this.i18n.topics[3].title} key="packages" />
        <GithubContributors title={this.i18n.topics[4].title} key="documentation" />
        <HowToContribute />
      </section>
    )
  }

}

export default Contributors;
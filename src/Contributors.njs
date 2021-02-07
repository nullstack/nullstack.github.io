import Nullstack from 'nullstack';

class Contributors extends Nullstack {

  documentation = [];
  packages = [];

  prepare({page, project}) {
    page.title = `Contributors - ${project.name}`;
    page.description = 'Found a bug or want a new feature? Become a contributor!'
  }

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

  renderParagraph({text}) {
    return (
      <p class="x12 fs4 m1b">{text}</p>
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
      <Topic title="The State of Nullstack" main>
        <Paragraph text="Nullstack is being developed since January 2019 with features being extracted from freelancing projects." />
        <Paragraph text="At this point the API is stable, lifecycle methods and context keys will pretty much be frozen." />
        <Paragraph text="We are not yet on 1.0 but really close, the only thing missing is to test it on applications made outside the core team to figure out if it fits the needs of other programmers." />
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
      <Topic title="The Roadmap">
        <Paragraph text="The next updates will be guided towards fixing any bugs that are found and focus on quality of life." />
        <Paragraph text="The following updates are the next planned steps in no particular order:" />
        <ul class="m2t">
          <Task description="Video and text tutorials in both English and Portuguese" />
          <Task description="Internationalize the documentation" />
          <Task description="Improve error messages and unify the server and client consoles" />
          <Task description="Typescript support and better IDE support in general" />
          <Task description="Yak shaving to improve performance on things that give diminishing returns at this point" />
          <Task description="Plugins for deployment in the most common hosts" />
          <Task description="Browser dev tools for context and instances inspection" />
          <Task description="Out of the box integration with hybrid apps, if PWAs don't kill them before we get to it" />
        </ul>
      </Topic>
    )
  }

  renderCoreContributor({github, name, role, description, contribution}) {
    return (
      <div class="xl x12 bcm2 p2 m2t">
        <img class="xl" src={'https://github.com/' + github + '.png'} alt={name} width="90" height="90" style="height: 90px" />
        <div class="md+x10 md+p3l sm-m3t">
          <h3> <a href={'https://github.com/' + github} class="ci1" target="_blank" rel="noopener"> {name} </a> </h3>
          <h4 class="m1y"> {role} </h4>
          <p> {description} </p> 
          <p> {contribution} </p>
        </div>
      </div>
    )
  }

  renderCoreTeam() {
    return (
      <Topic title="The Core Team">
        <Paragraph text="Nullstack was developed by full-stack neuro-atypical freelancers." />
        <Paragraph text="With a heavy background in Rails, Ember.js, and React.js, the inspirations took from those projects might be obvious." />    
        <CoreContributor 
          name="Christian Mortaro" 
          role="Autistic Author"
          github="Mortaro"
          description="Creator of the concept. Comes with new API proposals to its favorite rubber ducks and returns with commits."
          contribution="Reverse engineered wishful thinking code into existence and then refactored it into a framework."
        />
        <CoreContributor 
          name="Dayson Marx" 
          role="Distracted Designer" 
          github="daysonmarx"
          description="Rubber duck with human skills that makes sure the code is not going too far outside the box, then makes the box look nice."
          contribution="API reviewer that developed third party projects to test proof of concepts from a front-end focused perspective."
        />
        <CoreContributor 
          name="Anny Figueira" 
          role="Autistic Adopter" 
          github="AnnyFigueira"
          description="Rubber duck with a neck to find inconsistencies and problems, waiting till an API is approved to force us into rewriting everything."
          contribution="An early adopter of the framework that developed real production applications to validate how the parts fit together."
        />
      </Topic>
    )
  }

  renderHowToContribute() {
    return (
      <Topic title="How to Contribute">
        <Paragraph text="It's simple. Found a bug or want a new feature?" />
        <p class="x12 fs4 m1b">
          <a href="https://github.com/nullstack/nullstack/issues" target="_blank" rel="noopener" class="ci1"> Create an issue </a>
          or  
          <a href="https://github.com/nullstack/nullstack/issues" target="_blank" rel="noopener" class="ci1"> submit a pull request </a> with tests.
        </p>
      </Topic>
    )
  }

  renderContributor({login, avatar_url, html_url}) {
    return (
      <div class="xx sm-x6 bcm2 p2 m2t">
        <a href={html_url} title={login} class="ci1" target="_blank" rel="noopener">
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
        <p class="x12 fs4 m2t">* The list might take a while to update due to GitHub API cache</p>
      </Topic>
    )
  }
  
  render() {
    return (
      <section class="x sm-p4x sm-p10y md+p20y">
        <State />
        <Roadmap />
        <CoreTeam />
        <GithubContributors title="Packages Contributors" key="packages" />
        <GithubContributors title="Documentation Contributors" key="documentation" />
        <HowToContribute />
      </section>
    )
  }

}

export default Contributors;
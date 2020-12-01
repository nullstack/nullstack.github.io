import Nullstack from 'nullstack';

class Documentation extends Nullstack {

  renderLink({title}) {
    const href = '/' + title.toLowerCase().split(' ').join('-');
    return (
      <a href={href} class="xl x12 p3y bcm2b ci1h"> {title} </a>
    )
  }

  renderTopic({title, description, children}) {
    return (
      <div class="x12">
        <h2 class="x12 sm-f8 md+f8 m2b"> {title} </h2>
        <p class="x12 f4"> {description} </p>
        <nav class="x12 m6y"> {children} </nav>
      </div>
    )
  }
  
  render() {
    return (
      <section class="x sm-p2x p20y">
        <h1 class="x12 sm-f8 md+f12 m2b"> Nullstack Documentation </h1>
        <p class="x12 f4"> Nullstack features have been extracted from real life projects with convenience and consistency in mind </p>
        <Topic title="Core Concepts" description="Start your journey in Nullstack with these basic concepts">
          <Link title="Getting started" />
          <Link title="Renderable components" />
          <Link title="Stateful components" />
          <Link title="Full-stack lifecycle" />
          <Link title="Server functions" />
          <Link title="Context and attributes" />
          <Link title="Routes" />
          <Link title="Two way bindings" />
        </Topic>
        <Topic title="Advanced concepts" description="These are concepts that you will most likely learn as you need in your projects">
          <Link title="Application Startup" />
          <Link title="Context environment" />
          <Link title="Context network" />
          <Link title="Context page" />
          <Link title="Context params" />
          <Link title="Context project" />
          <Link title="Context router" />
          <Link title="Context secrets" />
          <Link title="Context self" />
          <Link title="Context server" />
          <Link title="Context settings" />
          <Link title="App manifest" />
          <Link title="Styles" />
          <Link title="NJS file extension" />
          <Link title="Server side rendering" />
          <Link title="Static site generation" />
        </Topic>
        <Topic title="Examples" description="The best way to learn Nullstack is by reading some code">
          <Link title="How to deploy a Nullstack application" />
          <Link title="How to use MongoDB with Nullstack" />
          <Link title="How to use Google Analytics with Nullstack" />
          <Link title="How to use Facebook Pixel with Nullstack" />
          <Link title="How to create an API with Nullstack" />
        </Topic>
      </section>
    )
  }

}

export default Documentation;
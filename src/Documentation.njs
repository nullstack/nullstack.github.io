import Nullstack from 'nullstack';

class Documentation extends Nullstack {

  prepare({project, page}) {
    page.title = `Documentation - ${project.name}`;
    page.description = 'Follow these steps and become a full-stack javascript developer!';
    page.priority = 0.8;
  }

  renderLink({title}) {
    const href = '/' + title.toLowerCase().split(' ').join('-');
    return (
      <a href={href} class="xl x12 p3y bcm2t ci1"> {title} </a>
    )
  }

  renderTopic({title, description, children}) {
    return (
      <div class="x12 m6y bcm2 p4x p4t p1b">
        <h2 class="x12 sm-fs6 md+fs8 m2b"> {title} </h2>
        <p class="x12 fs4 m6b"> {description} </p>
        <nav class="x12"> {children} </nav>
      </div>
    )
  }
  
  render() {
    return (
      <section class="x sm-p4x sm-p10y md+p20y">
        <h1 class="x12 sm-fs6 md+fs12 m2b"> Nullstack Documentation </h1>
        <p class="x12 fs4"> Follow these steps and become a full-stack javascript developer! </p>
        <Topic title="Core concepts" description="Start your journey in Nullstack with these basic concepts">
          <Link title="Getting started" />
          <Link title="Renderable components" />
          <Link title="Stateful components" />
          <Link title="Full-stack lifecycle" />
          <Link title="Server functions" />
          <Link title="Context" />
          <Link title="Routes and params" />
          <Link title="Two-way bindings" />
        </Topic>
        <Topic title="Advanced concepts" description="These are concepts that you will most likely learn as you need in your projects">
          <Link title="Application Startup" />
          <Link title="Context data" />
          <Link title="Context environment" />
          <Link title="Context page" />
          <Link title="Context project" />
          <Link title="Context settings" />
          <Link title="Context secrets" />
          <Link title="Instance self" />
          <Link title="Instance Key" />
          <Link title="Server request and response" />
          <Link title="Styles" />
          <Link title="NJS file extension" />
          <Link title="Server-side rendering" />
          <Link title="Static site generation" />
          <Link title="Service Worker" />
          <Link title="How to deploy a Nullstack application" />
        </Topic>
        <Topic title="Examples" description="The best way to learn Nullstack is by reading some code">
          <Link title="How to use MongoDB with Nullstack" />
          <Link title="How to use Google Analytics with Nullstack" />
          <Link title="How to use Facebook Pixel with Nullstack" />
        </Topic>
      </section>
    )
  }

}

export default Documentation;
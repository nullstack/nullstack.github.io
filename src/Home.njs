import Nullstack from 'nullstack';
import Snippet from './Snippet';
import Cog from 'poisonicon/cog/stroke';
import Heartbeat from 'poisonicon/heartbeat/stroke';
import QRCode from 'poisonicon/qrcode/stroke';

class Component extends Nullstack {

  prepare({project, page}) {
    page.title = `${project.name} - Full-stack Javascript Components`;
    page.description = 'Nullstack is a full-stack javascript framework for building progressive web applications';
    page.priority = 1;
  }

  renderHero() {
    return (
      <section class="x xx sm-p2x p20y">
        <h1 class="x12 sm-fs8 md+fs12"> Full-stack Javascript Components </h1>
        <div class="xx x8 m12b" style="background-image: linear-gradient(0deg, #fff 49%, #e2e8f0 50%, #fff 52%);"> 
          <p class="bgm1 fs6 p2"> for one-dev armies </p>
        </div>
        <div>
          <p class="x12 fs4 lh12 ls12"> Nullstack is a full-stack framework for building <strong>progressive web applications</strong>. </p>
          <p class="x12 fs4 lh12 ls12"> It connects a <strong> stateful UI </strong> layer to specialized <strong>microservices</strong> in the same component using <strong>vanilla javascript.</strong> </p>
          <p class="x12 fs4 lh12 ls12 m4t"> Focus on solving your business logic instead of writing glue code. </p>
        </div>
      </section>
    )
  }

  renderFeature({title, key, link}) {
    return (
      <div class="md-x12 lg+x6 p1">
        {!!title && 
          <div class="xsb bcm2 p4">
            <h3 class="ff2 fw3 fs4">
              <a href={link} class="ci1">{title}</a>
            </h3>
          </div>
        }
        <Snippet key={key} />
      </div>
    )
  }

  renderShowcase() {
    return (
      <section class="x lg-x12z xl md-p2x">
        <Feature key="Application" />
        <Feature key="TaskList" />
        <div class="xl x12 p1">
          <div class="xl x12 bcm2">
            <p class="xx x12 m5t p4x lh16">
              The example above uses 
              <a href="/server-functions" class="ci1 p1x"> server functions </a>
              to read tasks from a JSON file and store them in the 
              <a href="/context" class="ci1 p1x"> context </a>
              available to all components.  
            </p>
            <p class="xx x12 m6b p4x lh16"> 
              The tasks are listed in a specific
              <a href="/routes-and-params" class="ci1 p1x"> route </a>
              that renders a component with multiple
              <a href="/renderable-components" class="ci1 p1x"> inner components </a>
              filtered by status with inputs using
              <a href="/two-way-bindings" class="ci1 p1l"> two-way bindings </a>.
            </p>
          </div>
        </div>
      </section>
    )
  }

  renderAbout() {
    return (
      <section class="x xx sm-p2x sm-p10y md+p20t md+p10b">
        <h2 class="x12 sm-fs8 md+fs12 m2b"> Complete Features as Components </h2>
        <p class="x12 fs4"> Nullstack is not another part of your stack, it is your stack </p>
        <p class="x12 fs4"> Your application can be exported from back-end to front-end as a component and mounted into another application </p>
      </section>
    )
  }

  renderStep({title, children, link, icon: Icon}) {
    return (
      <div class="md+x4 p1">
        <div class="xx bgm2 p8y p4x y12">
          <Icon height={40} class="cm2z m4b" />
          <h2 class="x12 fs6">
            <a href={link} class="ci1">{title}</a>
          </h2>
          <p class="x12 fs4 m4y"> {children} </p>
        </div>
      </div>
    )
  }

  renderCycle() {
    return (
      <section class="x xx sm-p2x md+bcm2y md+p10y">
        <Step icon={Cog} title="Server-Side Rendering" link="/server-side-rendering">
          Nullstack generates <strong> SEO ready </strong> HTML optimized for the
          first paint of your route in a single request using local functions
          with <strong> zero javascript </strong> dependencies in the client bundle.
        </Step>
        <Step icon={Heartbeat} title="Single Page Application" link="/full-stack-lifecycle">
          After hydration, requests will fetch JSON from an <strong> automatically generated API </strong> 
          off server functions, update the application state, and rerender the page.
        </Step>
        <Step icon={QRCode} title="Static Site Generation" link="/static-site-generation">
          You can even use Nullstack to generate lightning-fast <strong> static websites </strong> 
          that serve HTML and become a  single page application 
          using an automatically generated <strong> static API </strong>.
        </Step>
      </section>
    )
  }

  renderProductivity() {
    return (
      <section class="x xx sm-p2x sm-p10y md+p20y">
        <h2 class="x12 sm-fs8 md+fs12 m2b"> Productivity is in the Details </h2>
        <p class="x12 fs4"> Nullstack features have been extracted from real life projects with convenience and consistency in mind </p>
      </section>
    )
  }

  renderFeatures() {
    return (
      <section class="x lg-x12z xl lg-p2x">
        <Feature 
          title="Stateful Components"
          key="Stateful"
          link="/stateful-components"
        />
        <Feature 
          title="Two-Way Binding"
          key="Binding"
          link="/two-way-bindings"
        />
        <Feature 
          title="Built-in Routes"
          key="Routes"
          link="/routes-and-params"
        />
        <Feature 
          title="Full-stack Lifecycle"
          key="Lifecycle"
          link="/full-stack-lifecycle"
        />
      </section>
    )
  }

  renderReason({title, description, closer, link}) {
    return (
      <div class="md+x6 p1">
        <div class="xx bgm2 p8y p4x y12">
          <Icon height={40} class="cm2z m4b" />
          <h3 class="x12 fs6">
            <a href={link} class="ci1">{title}</a>
          </h3>
          <p class="x12 fs4 m4y"> {description} </p>
          <strong>{closer}</strong>
        </div>
      </div>
    )
  }

  renderWhy() {
    return (
      <section class="sm-p2x sm-m10t md+m20t">
        <div class="x xx md+bcm2t p10y">
          <h2 class="x12 sm-fs8 md+fs12"> Why should you use Nullstack? </h2>
          <div class="xl p10y">
            <Reason 
              title="Scalable Development"
              description="Every project starts small and becomes complex over time. Scale as you go, no matter the size of the team."
              link="/about"
              closer="No compromises, no enforcements."
            />
            <Reason 
              title="Feature-driven Development"
              description="Development of both back and front ends of a feature in the same component in an organized way with ease of overview."
              link="/about#feature-driven"
              closer="True componentization and code reusability."
            />
            <Reason 
              title="Already existing ecosystem"
              description="Takes advantage of any isomorphic vanilla Javascript package made throughout history."
              link="/about#everything-as-vanilla-as-possible"
              closer="All of your application speaks the same language."
            />
            <Reason 
              title="Quickly adapt to scope changes"
              description="The horizontal structure, as opposed to a hierarchical one, makes it a lot easier to move resources around."
              link="/about#why-dependency-injection-instead-of-modularity"
              closer="Flexibility over bureaucracy."
            />
          </div>
          <a href="/getting-started" class="bci1 cm1 ci1:h bgi1 bgm1:h p2y p4x"> Get Started </a>
          <span class="x12 fs4"> ╰(*°▽°*)╯ </span>
        </div>
      </section>
    )
  }

  renderVideo({code, part}) {
    const title = `Full-stack with Nullstack - Part ${part}`;
    return (
      <div class="x12 md+x4 p1">
        <a href={`https://www.youtube.com/watch?v=${code}&list=PL5ylYELQy1hyFbguVaShp3XujjdVXLpId`} title={title} target="_blank" rel="noopener">
          <img src={`/thumb-0${part}.jpg`} alt={title} height="209" />
        </a>
      </div>
    )
  }

  renderPlaylist({worker}) {
    if(!worker.online) return false;
    return (
      <section class="x xx md+bcm2t sm-p10t md+p20t sm-p2x">
        <h2 class="x12 sm-fs8 md+fs12"> Watch our Nullstack video turorials </h2>
        <p class="x12 fs4"> Nullstack cares about making its content as direct to the point and easy to understand as possible </p>
        <div class="xl x12 p10t">
          <Video code="l23z00GEar8" part={1} />
          <Video code="_i5kKXkhBaM" part={2} />
          <Video code="8PExa5-G1As" part={3} />
        </div>
      </section>
    )
  }
  
  render() {
    return (
      <div>
        <Hero />
        <Cycle />
        <About />
        <Showcase />
        <Productivity />
        <Features />
        <Playlist />
        <Why />
      </div>
    )
  }

}

export default Component;
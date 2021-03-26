import Snippet from './Snippet';
import Cog from 'poisonicon/cog/stroke';
import Heartbeat from 'poisonicon/heartbeat/stroke';
import QRCode from 'poisonicon/qrcode/stroke';
import Translatable from './Translatable';

class Home extends Translatable {

  prepare({page}) {
    page.priority = 1;
  }

  renderHero() {
    return (
      <section class="x xx sm-p2x p20y">
        <h1 class="x12 sm-fs8 md+fs12"> {this.i18n.hero.heading} </h1>
        <div class="bgm1 xx x8 m12b p2b bg-tagline-home"> 
          <p class="bgm1 fs6 p2"> {this.i18n.hero.tagline} </p>
        </div>
        <div>
          {this.i18n.hero.descriptions.map((description, index, {length}) => 
            <p class={`x12 fs4 lh12 ls12 ${index == length - 1 ? 'm4t' : ''}`} html={description} />
          )}
        </div>
      </section>
    )
  }

  renderStep({title, text, link, icon: Icon}) {
    return (
      <div class="md+x4 p1">
        <div class="xx bgm2 p8y p4x y12">
          <Icon height={40} class="cm2z m4b" />
          <h2 class="x12 fs6">
            <a href={link} title={title} class="ci1">{title}</a>
          </h2>
          <p class="x12 fs4 m4y" html={text} />
        </div>
      </div>
    )
  }

  renderCycle() {
    return (
      <section class="x xx sm-p2x md+bcm2y md+p10y">
        <Step icon={Cog} {...this.i18n.cycle.ssr} />
        <Step icon={Heartbeat} {...this.i18n.cycle.spa} />
        <Step icon={QRCode} {...this.i18n.cycle.ssg} />
      </section>
    )
  }

  renderAbout() {
    return (
      <section class="x xx sm-p2x sm-p10y md+p20t md+p10b">
        <h2 class="x12 sm-fs8 md+fs12 m2b"> {this.i18n.about.heading} </h2>
        {this.i18n.about.taglines.map((tagline) => <p class="x12 fs4" html={tagline} />)}
      </section>
    )
  }

  renderFeature({title, key, link}) {
    return (
      <div class="md-x12 lg+x6 p1">
        {!!title && 
          <div class="xsb bcm2 p4">
            <h3 class="ff2 fw3 fs4">
              <a href={link} title={title} class="ci1">{title}</a>
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
        <Feature key="ProductList" />
        <Feature key="ProductForm" />
        <div class="xl x12 p1">
          <div class="xl x12 bcm2 p2t">
            {this.i18n.showcase.descriptions.map((description) => <p class="xx x12 m2b p4x lh16" html={description} />)}
          </div>
        </div>
      </section>
    )
  }

  renderProductivity() {
    return (
      <section class="x xx sm-p2x sm-p10y md+p20y">
        <h2 class="x12 sm-fs8 md+fs12 m2b"> {this.i18n.productivity.heading} </h2>
        <p class="x12 fs4"> {this.i18n.productivity.tagline} </p>
      </section>
    )
  }

  renderFeatures() {
    return (
      <section class="x lg-x12z xl lg-p2x">
        {this.i18n.features.map(feature => <Feature {...feature} />)}
      </section>
    )
  }

  renderVideo({title, link, thumbnail}) {
    return (
      <div class="xx x12 md+x4 p1">
        <a href={link} title={title} target="_blank" rel="noopener">
          <img src={thumbnail} alt={title} height="209" width="372" loading="lazy" />
        </a>
      </div>
    )
  }

  renderPlaylist({worker}) {
    if(!worker.online) return false;
    return (
      <section class="x xx sm-p10t md+p20t sm-p2x">
        <h2 class="x12 sm-fs8 md+fs12"> {this.i18n.playlist.heading} </h2>
        <p class="x12 fs4"> {this.i18n.playlist.tagline} </p>
        <div class="xl x12 p10t">
          {this.i18n.playlist.videos.map((video) => <Video {...video} /> )}
        </div>
      </section>
    )
  }

  renderReason({title, description, closer, link}) {
    return (
      <div class="md+x6 p1">
        <div class="xx bgm2 p8y p4x y12">
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
          <h2 class="x12 sm-fs8 md+fs12"> {this.i18n.why.heading} </h2>
          <div class="xl p10y">
            {this.i18n.why.reasons.map((reason) => <Reason {...reason} />)}
          </div>
          <a 
            href={this.i18n.why.getStarted.link} 
            title={this.i18n.why.getStarted.text} 
            class="bci1 cm1 ci1:h bgi1 bgm1:h p2y p4x"
          > 
            {this.i18n.why.getStarted.text} 
          </a>
          <span class="x12 fs4"> ╰(*°▽°*)╯ </span>
        </div>
      </section>
    )
  }
  
  render() {
    if(!this.i18n) return false;
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

export default Home;
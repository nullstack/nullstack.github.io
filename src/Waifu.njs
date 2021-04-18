import {readdirSync} from 'fs';
import Translatable from './Translatable';

class Waifu extends Translatable {

  fanarts = [];

  static async getFanarts() {
    return readdirSync('public/fanarts')
  }

  async initiate(context) {
    super.initiate(context)
    this.fanarts = await this.getFanarts()
  }

  hydrate() {
    this.fanarts.sort(() => (Math.random() > .5) ? 1 : -1);
  }

  renderAttribute({ label, value }) {
    return (
      <li class="xl m2b">
        <b>{label}</b>: {value}
      </li>
    )
  }

  renderAttributes() {
    return (
      <section class="max-w-screen-xl mx-auto px-4 flex justify-between items-center flex-wrap">
        <img src="/illustrations/nulla-fullbody.png" alt="Nulla-Chan" class="max-w-full" width="319" height="587" loading="lazy" />
        <div class="sm:w-5/12 grid gap-8 mt-12 sm:mt-0">
          <ul>
            {this.i18n.attributes.map((attribute) => <Attribute {...attribute} />)}
          </ul>
        </div>
      </section>
    )
  }

  renderFanart({ image }) {
    const name = image.slice(0, -4);
    const src = `/fanarts/${image}`;
    return (
      <div class="flex flex-col rounded-3xl p-3 shadow items-center space-y-1">
        <img src={src} alt={name} title={`Nulla-chan by ${name}`}/>
        <a 
          href={`https://www.instagram.com/${name}`} 
          target="_blank"
          rel="noopener"
          class="hover:text-pink-600 inline-block"
        >
          @{name}
        </a>
      </div>)
  }

  renderFanarts({ self }) {
    if(!self.hydrated) return false
    return (
      <section class="max-w-screen-xl mx-auto px-4 flex justify-between items-center flex-wrap py-12 sm:py-24">
        <h2 class="w-full">
          <span class="text-pink-600 text-4xl sm:text-6xl font-light block sm:mb-3">
            {this.i18n.fanarts.heading}
          </span>
        </h2>
        <span class="text-gray-900 text-2xl sm:text-4xl font-light block">
          {this.i18n.fanarts.tagline}
        </span>
        <div class="grid grid-cols-2 sm:grid-cols-5 gap-8 w-full mt-8">
          {this.fanarts.map(fanart => <Fanart image={fanart} />)}
        </div>
      </section>
    )
  }

  renderSeparator() {
    return (
      <div 
        class="h-5 bg-center bg-no-repeat w-full max-w-screen-xl mx-auto flex justify-center items-start flex-wrap border-t-4 border-gray-200 text-center dark:opacity-10"
      >
      </div>
    )
  }
  
  render({ worker }) {
    if(!this.i18n) return false;
    return (
      <div>
        <Attributes />
        <Separator />
        <Fanarts />
        {/* <div class="xx x12">
          {worker.online && <img src="/waifu.png" alt="Nulla-Chan" height="500" />}
          <div class="md+p10l">
            <h1 class="xl m14t"> Nulla <span class="ci1">-</span> Chan </h1>
            <p class="xl m8b"> {this.i18n.tagline} </p>
            <ul>
              {this.i18n.attributes.map((attribute) => <Attribute {...attribute} />)}
            </ul>
            <span class="xl m8t">
              {this.i18n.artist.label}
              <a href={this.i18n.artist.href} target="_blank" rel="noopener" class="ci1 m2x"> {this.i18n.artist.text} </a>
            </span>
            <span class="xl m2t">
              {this.i18n.concept.label}
              <a href={this.i18n.concept.href} target="_blank" rel="noopener" class="ci1 m2x"> {this.i18n.concept.text} </a>
            </span>
          </div>
        </div>
        <blockquote class="xx x12 m10y">
          {this.i18n.descriptions.map((description) => <p class="x12"> {description} </p>)}
        </blockquote> */}
      </div>
    )
  }

}

export default Waifu;
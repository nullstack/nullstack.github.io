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
      <li>
        <b>{label}</b>: {value}
      </li>
    )
  }

  renderProfile() {
    return (
      <section class="max-w-screen-xl mx-auto px-4 flex justify-between items-center flex-wrap py-12 sm:py-24">
        <div class="w-full">
          <h2 class="w-full text-pink-600 text-4xl sm:text-6xl font-light block sm:mb-3">
            {this.i18n.title}
          </h2>
          <span class="text-2xl sm:text-4xl font-light block mb-8">
            {this.i18n.description}
          </span>
        </div>
        <div class="flex flex-wrap justify-between w-full">
          <div class="flex w-full sm:w-6/12 bg-yellow-300 dark:bg-gray-800 justify-center py-8">
            <img src="/illustrations/nulla-fullbody.png" alt="Nulla-Chan" class="max-w-full" width="319" height="587" loading="lazy" />
          </div>
          <div class="flex w-full sm:w-6/12 sm:bg-yellow-200 sm:dark:bg-gray-700 justify-center py-8 items-center">
            <ul class="sm:w-6/12 grid gap-4 sm:mt-0">
              {this.i18n.attributes.map((attribute) => <Attribute {...attribute} />)}
              <li>
                <b> {this.i18n.artist.label} </b>
                <a href={this.i18n.artist.href} target="_blank" rel="noopener" class="underline"> 
                  {this.i18n.artist.text} 
                </a>
              </li>
              <li>
                <b> {this.i18n.concept.label} </b>
                <a href={this.i18n.concept.href} target="_blank" rel="noopener" class="underline"> 
                  {this.i18n.concept.text}
                </a>
              </li>
            </ul>
          </div>
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
      <section class="max-w-screen-xl mx-auto px-4 flex justify-between items-center flex-wrap pb-12 sm:pb-24">
        <h2 class="w-full text-pink-600 text-4xl sm:text-6xl font-light block sm:mb-3">
          {this.i18n.fanarts.heading}
        </h2>
        <span class="text-2xl sm:text-4xl font-light block mb-8">
          {this.i18n.fanarts.tagline}
        </span>
        <div class="grid grid-cols-2 sm:grid-cols-5 gap-8 w-full">
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
  
  render({}) {
    if(!this.i18n) return false;
    return (
      <div>
        <Profile />
        {/* <Separator /> */}
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
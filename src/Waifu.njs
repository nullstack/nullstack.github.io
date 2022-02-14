import { readdirSync } from 'fs';
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
        <div class="w-full mb-8">
          <h2 class="w-full text-pink-600 text-4xl sm:text-6xl font-light block sm:mb-3">
            {this.i18n.title}
          </h2>
          <span class="text-2xl sm:text-4xl font-light block mb-3">
            {this.i18n.description}
          </span>
          <blockquote>
            {this.i18n.descriptions.map((description) => <p class="text-xl"> {description} </p>)}
          </blockquote>
        </div>
        <div class="flex flex-wrap justify-between w-full">
          <div class="flex w-full sm:w-6/12 bg-gray-100 dark:bg-gray-800 justify-center pt-8">
            <img src="/illustrations/nulla-fullbody.png" alt="Nulla-Chan" class="max-w-full" width="624" height="688" />
          </div>
          <div class="flex w-full sm:w-6/12 sm:bg-gray-50 sm:dark:bg-gray-700 justify-center py-8 items-center">
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
    const name = image.slice(0, -5).replace(/\[dot\]/g, '.').replace(/\[u\]/g, '.');
    const src = `/fanarts/${image}`;
    return (
      <div class="flex flex-col p-3 shadow items-center space-y-1">
        <img src={src} alt={name} title={`Nulla-chan by ${name}`} />
        <a
          href={`https://www.instagram.com/${name}`}
          target="_blank"
          rel="noopener"
          class="hover:text-pink-600 block pt-1"
        >
          @{name}
        </a>
      </div>)
  }

  renderFanarts({ self }) {
    if (!self.hydrated) return false
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

  render({ }) {
    if (!this.i18n) return false;
    return (
      <div>
        <Profile />
        <Fanarts />
      </div>
    )
  }

}

export default Waifu;
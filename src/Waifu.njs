import {readdirSync} from 'fs';
import Translatable from './Translatable';

class Waifu extends Translatable {

  fannarts = []

  static async populateFannarts () {
    return readdirSync('public/fannarts')
  }

  async initiate(context) {
    super.initiate(context)
    this.fannarts = await this.populateFannarts()
  }

  hydrate() {
    this.fannarts = this.fannarts.sort(() => (Math.random() > .5) ? 1 : -1);
  }

  renderAttribute({label, value}) {
    return (
      <li class="xl m2b">
        <b>{label}</b>: {value}
      </li>
    )
  }

  renderCard({src, name}) {
    console.log({src})
    return (
      <div class="rounded-3xl p-2 shadow">
        <img src={src} alt={name}/>
      </div>)
  }

  renderFannarts({self}) {
    if(!self.hydrated) return false
    return (
    <div class="grid grid-cols-2 sm:grid-cols-5 gap-8 w-full">
      {this.fannarts.map(fannart => 
        { 
          console.log({fannart})
          return (<Card src={`/fannarts/${fannart}`} name={fannart.split('.')} />)}
      )}
    </div>
    )
  }
  
  render({worker}) {
    if(!this.i18n) return false;
    return (
      <section class="max-w-screen-xl mx-auto px-4 flex justify-between items-center flex-wrap py-12 sm:py-24">
        <Fannarts />
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
      </section>
    )
  }

}

export default Waifu;
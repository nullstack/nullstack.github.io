import Translatable from './Translatable';

class Waifu extends Translatable {

  renderAttribute({label, value}) {
    return (
      <li class="xl m2b">
        <b>{label}</b>: {value}
      </li>
    )
  }
  
  render({worker}) {
    if(!this.i18n) return false;
    return (
      <div class="x md+p20t p10y sm-p2x"> 
        <div class="xx x12">
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
        </blockquote>
      </div>
    )
  }

}

export default Waifu;
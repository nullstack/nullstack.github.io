import Translatable from './Translatable';

class Footer extends Translatable {

  renderLink({title, href}) {
    return (
      <a href={href} rel="noopener" target="_blank" 
        class="sm-xr sm-m1y sm-x12 md+bci1 sm-bcm2t sm-p4t ci1 md+cm1:h md+bgi1:h p4x p2y md+m2x">
        {title}
      </a>
    )
  }

  render({locale}) {
    if(!this.i18n) return false;
    const localUrl = locale !== "en-US" ? `/${locale.toLowerCase()}` : "";
    return (
      <footer class="xx m20t">
        <div class="x xr md+bcm2t yy md+p10y prtl">
          <a href={`${localUrl}/waifu`}>
            <img
             src="/nullachan.png"
             alt={this.i18n.nullachan.alt}
             title={this.i18n.nullachan.title}
             class="pabl sm-p2l" height="160" loading="lazy" 
            />
          </a>
          <nav class="xr sm-x4 yy">
            {this.i18n.links.map((link) => <Link {...link} />)}
          </nav>
        </div>
      </footer>
    )
  }

}

export default Footer;
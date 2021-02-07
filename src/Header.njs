import Bars from 'poisonicon/bars/stroke';
import Ex from 'poisonicon/ex/stroke';
import Translatable from './Translatable';

class Header extends Translatable {

  expanded = false;

  renderLink({title, href, target}) {
    return (
      <a 
        href={href}
        target={target}
        onclick={target ? false : {expanded: false}}
        rel={target ? 'noopener' : false}
        class="sm-x12 sm-bcm2b p2 ci1:h"
      > {title} </a>
    )
  }
  
  render() {
    if(!this.i18n) return false;
    return (
      <header class="x12 pftl bgm1 bs2">
        <div class="x xsb yy p4y">
          <div class="sm-x12 sm-xsb sm-p4x yy">
            <a href={this.i18n.home.href} title={this.i18n.home.title}>
              <img src="/nullstack.svg" alt="Nullstack" width="135" height="30" />
            </a>
            <span onclick={{expanded: !this.expanded}} class="yy md+off">
              <element tag={this.expanded ? Ex : Bars} height={20} class="cm3" />
            </span>
          </div>
          <nav class={`yy sm-p4 ${!this.expanded && 'sm-off'}`}>
            {this.i18n.links.map((link) => <Link {...link} />)}
          </nav>
          <div class={`sm-x12 sm-p4x ${!this.expanded && 'sm-off'}`}>
            <a href={this.i18n.action.href} onclick={{expanded: false}} class="xx sm-x12 bci1 bgi1 bgm1:h cm1 ci1:h p4x p2y">
              {this.i18n.action.title}
            </a>
          </div>
        </div>
      </header>
    )
  }

}

export default Header;
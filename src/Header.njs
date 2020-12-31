import Nullstack from 'nullstack';
import Bars from 'poisonicon/bars/stroke';
import Ex from 'poisonicon/ex/stroke';

class Header extends Nullstack {

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
    return (
      <header class="x12 pftl bgm1 bs2">
        <div class="x xsb yy p4y">
          <div class="sm-x12 sm-xsb sm-p4x yy">
            <a href="/" title="Nullstack">
              <img src="/nullstack.svg" alt="Nullstack" width="135" height="30" />
            </a>
            <span onclick={{expanded: !this.expanded}} class="yy md+off">
              <element tag={this.expanded ? Ex : Bars} height={20} class="cm3" />
            </span>
          </div>
          <nav class={`yy sm-p4 ${!this.expanded && 'sm-off'}`}>
            <Link title="About" href="/about" />
            <Link title="Documentation" href="/documentation" />
            <Link title="Components" href="/components" />
            <Link title="Contributors" href="/contributors" />
            <Link title="Source" href="https://github.com/nullstack/nullstack" target="_blank" />
          </nav>
          <div class={`sm-x12 sm-p4x ${!this.expanded && 'sm-off'}`}>
            <a href="/getting-started" onclick={{expanded: false}} class="xx sm-x12 bci1 bgi1 bgm1:h cm1 ci1:h p4x p2y">
              Get Started
            </a>
          </div>
        </div>
      </header>
    )
  }

}

export default Header;
import Nullstack from 'nullstack';

class Header extends Nullstack {

  renderLink({title, href, target}) {
    return (
      <a href={href} target={target} class="p2 ci1h"> {title} </a>
    )
  }
  
  render() {
    return (
      <header class="x12 ftl bgm1 s1 sm-off">
        <div class="x xsb yy p4y">
          <a href="/" title="Nullstack">
            <img src="/nullstack.png" style="height: 30px" />
          </a>
          <nav class="yy">
            <Link title="About" href="/" />
            <Link title="Documentation" href="/documentation" />
            <Link title="Components" href="/components" />
            <Link title="Source" href="https://github.com/nullstack/nullstack" target="_blank" />
          </nav>
          <a href="/getting-started" class="bci1 bgi1 bgm1h cm1 ci1h p4x p2y">
            Get Started
          </a>
        </div>
      </header>
    )
  }

}

export default Header;
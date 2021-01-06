import Nullstack from 'nullstack';

class Footer extends Nullstack {

  renderLink({title, href}) {
    return (
      <a href={href} rel="noopener" target="_blank" 
        class="sm-xr sm-m1y sm-x12 md+bci1 sm-bcm2t sm-p4t ci1 md+cm1:h md+bgi1:h p4x p2y md+m2x">
        {title}
      </a>
    )
  }
  
  render() {
    return (
      <footer class="xx m20t">
        <div class="x xr md+bcm2t yy md+p10y prtl">
          <a href="/waifu">
            <img src="/nullachan.png" alt="Nulla-Chan" title="Nulla-Chan: Nullstack's official waifu" class="pabl sm-p2l" height="160" loading="lazy" />
          </a>
          <nav class="xr sm-x4 yy">
            <Link title="YouTube" href="https://www.youtube.com/channel/UCUNPaxoppH3lu6JTrUX78Ww" />
            <Link title="Twitter" href="https://twitter.com/nullstackapp" />
            <Link title="GitHub" href="https://github.com/nullstack" />
          </nav>
        </div>
      </footer>
    )
  }

}

export default Footer;
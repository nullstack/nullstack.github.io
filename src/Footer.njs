import Nullstack from 'nullstack';

class Footer extends Nullstack {
  
  render() {
    const year = new Date().getFullYear();
    return (
      <footer class="xx bgm2 p10y">
        <img src="/nullstack.svg" style="height: 30px" />
        <p class="x12 m6t"> © {year} Nullstack </p>
      </footer>
    )
  }

}

export default Footer;
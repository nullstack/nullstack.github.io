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
      <footer class="flex flex-wrap w-full justify-center relative">
        <img src="/footer.png" class="absolute bottom-20" />
        <img src="/stars.png" class="transform hover:scale-105 transition delay-100" />
        <div class="bg-gray-800 w-full text-center"> 
          <a href="https://github.com/nullstack/nullstack/stargazers" class="text-white p-4 inline-block text-xl">
            <span>Leave a star on</span>
            <span class="font-bold block">GitHub</span>
          </a>
        </div>
      </footer>
    )
  }

}

export default Footer;
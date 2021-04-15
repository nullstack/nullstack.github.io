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
        <div class="w-full relative flex justify-center h-80 bg-70 hover:bg-100 bg-center bg-no-repeat" style="background-image: url(/stars.png); transition: background-size 3s;">
          <img src="/footer.png" class="absolute bottom-0" />
        </div>
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
import Translatable from './Translatable';
import GitHub from "../icons/GitHub";
import YouTube from "../icons/YouTube";
import Twitter from "../icons/Twitter";
import Discord from "../icons/YouTube";

class Footer extends Translatable {

  renderLink({ href, icon: Icon, title }) {
    return (
      <a 
        href={href} 
        title={title}
        target="_blank"
        rel="noopener"
        class="text-pink-600 hover:text-white inline-block"
      >
        <Icon size={45} />
      </a>
    )
  }
  render() {
    return (
      <footer class="flex flex-wrap w-full justify-center relative">
        <div class="w-full relative flex justify-center h-80 bg-70 hover:bg-100 bg-bottom bg-no-repeat" style="background-image: url(/stars.webp); transition: background-size 3s;">
          <img src="/footer.webp" alt="Nulla-Chan" class="absolute bottom-0" />
        </div>
        <div class="bg-gray-800 w-full py-4 flex-wrap"> 
          <nav class="w-full flex items-center justify-center space-x-1">
            <Link href="https://twitter.com/nullstackapp" title="Twitter" icon={Twitter} /> 
            <Link href="https://github.com/nullstack/nullstack" title="Github" icon={GitHub} /> 
            <Link href="https://www.youtube.com/nullstack" title="Youtube" icon={YouTube} /> 
            <Link href="https://discord.gg/eDZfKz264v" title="Discord" icon={Discord} /> 
          </nav>
          <nav class="w-full flex flex-wrap items-center justify-center space-x-1">
            <p class="text-center mt-3 w-full text-gray-400"> 
              {this.i18n.star.story}
            </p>
            <a 
              href="https://github.com/nullstack/nullstack/stargazers" 
              class="text-white flex flex-wrap text-xl text-center"
              target="_blank"
              rel="noopener"
            >
              <span class="block w-full">{this.i18n.star.action}</span>
            </a>
          </nav>
        </div>
      </footer>
    )
  }

}

export default Footer;
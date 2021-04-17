import Translatable from './Translatable';
import Github from "poisonicon/github/stroke";
import Youtube from "poisonicon/youtube/stroke";
import Twitter from "poisonicon/trash/stroke";

class Footer extends Translatable {

  renderLink({ href, icon: Icon, title }) {
    return (
      <a 
        href={href} 
        title={title}
        target="_blank"
        rel="noopener"
        class="hover:text-pink-600 text-white py-2 px-4 inline-block"
      >
        <Icon height={30}/>
      </a>
    )
  }
  render() {
    return (
      <footer class="flex flex-wrap w-full justify-center relative">
        <div class="w-full relative flex justify-center h-80 bg-70 hover:bg-100 bg-center bg-no-repeat" style="background-image: url(/stars.webp); transition: background-size 3s;">
          <img src="/footer.webp" alt="Nulla-Chan" class="absolute bottom-0" />
        </div>
        <div class="bg-gray-800 w-full py-4 flex-wrap"> 
          <nav class="w-full flex items-center justify-center space-x-1">
            <Link href="https://twitter.com/nullstackapp" title="Twitter" icon={Twitter} /> 
            <Link href="https://github.com/nullstack/nullstack" title="Github" icon={Github} /> 
            <Link href="https://www.youtube.com/nullstack" title="Youtube" icon={Youtube} /> 
          </nav>
          <nav class="w-full flex items-center justify-center space-x-1">
            <a 
              href="https://github.com/nullstack/nullstack/stargazers" 
              class="text-white flex flex-wrap text-xl text-center mt-3"
              target="_blank"
              rel="noopener"
            >
              <span class="block w-full">{this.i18n.star}</span>
              <span class="font-bold block w-full">GitHub</span>
            </a>
          </nav>
        </div>
      </footer>
    )
  }

}

export default Footer;
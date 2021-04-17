import Nullstack from 'nullstack';
import Github from "poisonicon/github/stroke";
import Youtube from "poisonicon/youtube/stroke";
import Twitter from "poisonicon/trash/stroke";

class Footer extends Nullstack {

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
        <div class="w-full relative flex justify-center h-80 bg-70 hover:bg-100 bg-center bg-no-repeat" style="background-image: url(/stars.png); transition: background-size 3s;">
          <img src="/footer.png" alt="Nulla-Chan" class="absolute bottom-0" />
        </div>
        <div class="bg-gray-800 w-full text-center py-4 space-x-1"> 
          <Link href="https://twitter.com/nullstackapp" title="Twitter" icon={Twitter} /> 
          <Link href="https://github.com/nullstack/nullstack" title="Github" icon={Github} /> 
          <Link href="https://www.youtube.com/nullstack" title="Youtube" icon={Youtube} /> 
        </div>
      </footer>
    )
  }

}

export default Footer;
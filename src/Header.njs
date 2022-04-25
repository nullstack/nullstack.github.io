import Logo from "nullstack/logo";
import Translatable from "./Translatable";
import Hamburger from "../icons/Hamburger";
import Close from "../icons/Close";
import Mode from "../icons/Mode";
import Brasil from "../icons/Brasil";
import Gringo from "../icons/Gringo";
import GitHub from "../icons/GitHub";
import YouTube from "../icons/YouTube";
import Twitter from "../icons/Twitter";
import Discord from "../icons/Discord";

class Header extends Translatable {

  expanded = false;

  renderLink({ title, href, target, mobile, onclick }) {
    return (
      <element
        tag={onclick ? 'button' : 'a'}
        href={href}
        target={target}
        onclick={onclick || { expanded: false }}
        class={`w-full sm:w-auto border-b sm:border-0 border-gray-100 dark:border-gray-800 p-2 font-lg hover:text-pink-600 items-center flex font-light ${mobile ? 'sm:hidden' : ''}`}
      >
        {title}
      </element>
    );
  }

  renderSocialLink({ href, icon: Icon, title }) {
    return (
      <a
        href={href}
        title={title}
        target="_blank"
        rel="noopener"
        class="text-gray-700 hover:text-pink-600 dark:text-pink-600 dark:hover:text-white inline-block"
      >
        <Icon size={40} />
      </a>
    )
  }

  toggleMode(context) {
    const nextOppositeMode = context.mode;
    context.mode = context.oppositeMode;
    context.oppositeMode = nextOppositeMode;
    window.localStorage.setItem('mode', context.mode);
  }

  render({ mode, oppositeMode, locale }) {
    if (!this.i18n) return false;
    return (
      <header class="fixed w-full bg-white dark:bg-gray-900 shadow top-0 left-0 z-20">
        <div class="max-w-screen-xl mx-auto px-4 flex justify-between items-center flex-wrap py-4">
          <div class="w-full sm:w-auto justify-between sm:justify-self-start sm:px-0 items-center flex">
            <a {...this.i18n.home}>
              <Logo height="30" light={mode === "dark"} />
            </a>
            <span
              onclick={{ expanded: !this.expanded }}
              class="flex items-center sm:hidden"
            >
              {this.expanded && <Close size={20} class="text-gray-900 dark:text-white" />}
              {!this.expanded && <Hamburger size={20} class="text-gray-900 dark:text-white" />}
            </span>
          </div>
          <nav
            class={`flex items-center flex-wrap sm:px-0 mt-2 sm:mt-0 ${!this.expanded && "hidden sm:flex"
              }`}
          >
            {this.i18n.links.map((link) => (
              <Link {...link} />
            ))}
            <Link href={this.i18n.language.href} title={this.i18n.language.title} mobile />
            <Link onclick={this.toggleMode} title={this.i18n.mode[oppositeMode]} mobile />
          </nav>
          <div class={`flex w-full sm:w-auto mt-4 sm:mt-0 sm:space-x-2 items-center ${!this.expanded && "hidden sm:flex"}`}>
            <a href={this.i18n.language.href} title={this.i18n.language.title} class="hidden sm:flex text-pink-600">
              {locale === 'pt-BR' && <Gringo size={30} />}
              {locale !== 'pt-BR' && <Brasil size={30} />}
            </a>
            <button onclick={this.toggleMode} title={this.i18n.mode[oppositeMode]} class="hidden sm:flex text-pink-600 dark:text-white">
              <Mode size={25} />
            </button>
            <div class="space-x-0 items-center flex">
              <SocialLink href="https://discord.gg/eDZfKz264v" title="Discord" icon={Discord} />
              <SocialLink href="https://github.com/nullstack/nullstack" title="Github" icon={GitHub} />
            </div>
          </div>
        </div>
      </header>
    );
  }

}

export default Header;
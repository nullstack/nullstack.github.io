import Logo from "nullstack/logo";
import Translatable from "./Translatable";
import Hamburger from "../icons/Hamburger";
import Close from "../icons/Close";
import Discord from "../icons/Discord";
import docsearch from '@docsearch/js';
import '@docsearch/css/dist/style.css';

class Header extends Translatable {

  expanded = false;

  renderBadge({ badge }) {
    return (
      <span class="absolute top-[6px] -right-5 bg-yellow-100 text-yellow-800 text-xs leading-none font-semibold ml-1 px-0.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">
        {badge}
      </span>
    );
  }

  renderLink({ title, href, target, mobile, onclick, badge }) {
    return (
      <element
        tag={onclick ? 'button' : 'a'}
        href={href}
        target={target}
        onclick={onclick || { expanded: false }}
        class={['w-full sm:w-auto border-b sm:border-0 border-gray-100 dark:border-gray-800 p-2 font-lg hover:text-pink-600 items-center flex font-light relative', mobile && 'sm:hidden']}
      >
        {title}
        {badge && <Badge badge={badge} />}
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
        class="text-gray-700 hover:text-pink-600 dark:text-pink-600 dark:hover:text-white flex h-10 w-10 items-center justify-center"
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
    document.querySelector('html').setAttribute('data-theme', context.mode)
  }

  startDocSearch(context) {
    docsearch({
      container: context.element,
      appId: 'PTI4K6LPXF',
      apiKey: '49670e20e0c5c259f1ce7fc5dbf5e6e3',
      indexName: 'nullstack',
    });
  }

  toggleLocale({ page }) {
    if (page.locale === 'pt-BR') {
      page.locale = 'en-US'
    } else {
      page.locale = 'pt-BR'
    }
  }

  render({ page, mode }) {
    if (!this.i18n) return false;
    return (
      <div class="h-20">
        <header class="fixed w-full bg-white dark:bg-gray-900 shadow top-0 left-0 z-20 md:h-20 flex items-center">
          <div class="max-w-screen-xl mx-auto px-4 flex justify-between items-center flex-wrap py-4 w-full">
            <div class="w-full sm:w-auto justify-between sm:justify-self-start sm:px-0 items-center flex">
              <a {...this.i18n.home}>
                <Logo height="30" light={mode === "dark"} />
              </a>
              <div class="flex gap-4">
                <div id="docsearch" ref={this.startDocSearch} />
                <div class="flex items-center sm:hidden">
                  <button
                    title={this.i18n.menu.title}
                    onclick={{ expanded: !this.expanded }}
                  >
                    {this.expanded && <Close size={25} class="text-gray-900 dark:text-white" />}
                    {!this.expanded && <Hamburger size={25} class="text-gray-900 dark:text-white" />}
                  </button>
                </div>
              </div>
            </div>
            <nav class={['flex items-center flex-wrap sm:px-0 mt-2 sm:mt-0', !this.expanded && 'hidden sm:flex']}>
              {this.i18n.links.map((link) => <Link {...link} />)}
              <Link href={this.i18n.language.href} title={this.i18n.language.title} mobile />
            </nav>
            <div class={['flex w-full sm:w-auto mt-4 sm:mt-0 sm:space-x-2 items-center', !this.expanded && 'hidden sm:flex']}>
              <a href={this.i18n.language.href} title={this.i18n.language.title} onclick={this.toggleLocale} class="hidden sm:flex text-pink-600 h-10 w-10 items-center justify-center">
                {page.locale === 'pt-BR' && '🇺🇸'}
                {page.locale !== 'pt-BR' && '🇧🇷'}
              </a>
              <SocialLink href="https://discord.gg/eDZfKz264v" title="Discord" icon={Discord} />
              <GithubStars />
            </div>
          </div>
        </header>
      </div>
    );
  }

  renderGithubStars() {
    return (
      <div class="pt-1">
        <a 
          class="github-button inline-block" 
          href="https://github.com/nullstack/nullstack" 
          data-color-scheme="no-preference: light; light: light; dark: dark;" 
          data-size="large" 
          data-show-count="true" 
          aria-label="Star nullstack/nullstack on GitHub"
        >
          Star
        </a>
        <script async defer src="https://buttons.github.io/buttons.js" />
      </div>
    )
  }

}

export default Header;
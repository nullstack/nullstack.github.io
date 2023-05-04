import Arrow from '../icons/Arrow';
import Snippet from "./Snippet";
import Translatable from './Translatable';

class Home extends Translatable {

  launch({ project, page }) {
    page.title = `${project.name} - ${this.i18n.title}`;
  }

  async getStarted({ router, action }) {
    if ('clipboard' in navigator) {
      const command = 'npx create-nullstack-app@latest --typescript --tailwind';
      await navigator.clipboard.writeText(command);
    }
    clearTimeout(this.gettingStarted);
    this.gettingStarted = setTimeout(() => {
      router.url = action;
      this.gettingStarted = null;
    }, 3000)
  }

  renderHero({ page }) {
    return (
      <section class="max-w-screen-xl mx-auto px-4 flex justify-between items-center flex-wrap sm:pt-12 pb-24">
        <div class="sm:w-5/12 grid gap-8 mt-12 sm:mt-0">
          <h1 class="w-full">
            <span class={`text-pink-600 ${page.locale === 'pt-BR' ? 'text-xl sm:text-3xl' : 'text-5xl sm:text-6xl'} font-light block sm:mb-3 text-center sm:text-left`}>
              {this.i18n.hero.heading}
            </span>
            <span class={`text-pink-600 dark:text-pink-500 ${page.locale !== 'pt-BR' ? 'text-xl sm:text-3xl' : 'text-3xl sm:text-5xl'} font-light block sm:mb-3 text-center sm:text-left`}>
              {this.i18n.hero.subHeading}
            </span>
          </h1>
          <p class="text-xl sm:text-2xl text-center sm:text-left">
            {this.i18n.hero.descriptions[0]}
          </p>
          <p class="text-xl sm:text-2xl text-center sm:text-left">
            {this.i18n.hero.descriptions[1]}
          </p>
          <div class="">
            <a
              class="bg-pink-600 text-white px-6 py-4 border border-pink-600 hover:bg-transparent hover:text-pink-600 w-full sm:w-auto block sm:hidden text-center"
              href={this.i18n.hero.actionLink}
            >
              {this.i18n.hero.getStarted}
            </a>
            <button
              class="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white px-6 py-4 border border-gray-300 dark:border-pink-600 hover:bg-transparent hover:text-pink-600 hidden sm:inline-block"
              onclick={this.getStarted}
              action={this.i18n.hero.actionLink}
            >
              <span class="text-pink-600"> $ </span>
              {this.gettingStarted ? this.i18n.hero.actionCallback : this.i18n.hero.callToAction}
            </button>
          </div>
        </div>
        <div class="w-full sm:w-7/12 bg-center bg-0 hover:bg-100 bg-repeat-y mt-6 relative sm:pr-40 sm:pl-12" style="background-image: url(/stars.webp); transition: background-size 3s;">
          <Snippet key="GlueCode" locale={page.locale} />
          <img src="/illustrations/nulla-hero.webp" alt="Nulla-Chan" class="hidden sm:flex max-w-sm absolute bottom-0 -right-14" width="627" height="765" loading="lazy" />
        </div>
      </section >
    )
  }

  renderRole({ image, title, text }) {
    return (
      <div class="sm:w-1/3 px-8 flex flex-wrap justify-center text-center mb-8 sm:mb-0">
        <div class="bg-center bg-0 hover:bg-100" style="background-image: url(/stars.webp); transition: background-size 3s;">
          <img src={image} alt={title} width="192" height="192" class="transform hover:scale-105 transition delay-100" loading="lazy" />
        </div>
        <h2 class="w-full text-center text-pink-600 dark:text-pink-500 text-xl sm:text-2xl font-light mb-4 sm:px-20">
          {title}
        </h2>
        <p class="w-full text-center text-xl font-gray-600">{text}</p>
      </div>
    )
  }

  renderTrinity() {
    return (
      <section class="max-w-screen-xl mx-auto px-4 flex justify-between items-center flex-wrap py-12 sm:py-36">
        <h2 class="w-full text-center mb-8 sm:mb-24">
          <span class="w-full text-pink-600 text-2xl sm:text-5xl font-light block sm:mb-3">{this.i18n.trinity.heading}</span>
          <span class="sm:text-xl block">{this.i18n.trinity.subHeading}</span>
        </h2>
        {this.i18n.trinity.roles.map((role) => <Role {...role} />)}
      </section>
    )
  }

  renderFeature({ snippet, image, title, text, inverted, locale }) {
    return (
      <section class="max-w-screen-xl mx-auto px-4 flex justify-between items-center flex-wrap py-12 sm:py-36">
        <div class={`w-full sm:w-5/12 ${inverted ? 'sm:order-2' : ''}`}>
          <Snippet key={snippet} locale={locale} />
        </div>
        <div class="mt-12 sm:mt-0 sm:w-5/12">
          <h3 class="text-pink-600 dark:text-pink-500 text-xl sm:text-4xl font-light mb-4">
            {title}
          </h3>
          <p class="text-xl font-gray-600">
            {text}
          </p>
          <img src={image} alt={title} class="mt-6" width="520" height="272" loading="lazy" />
        </div>
      </section>
    )
  }

  renderVideo({ link, title, thumbnail }) {
    return (
      <div class="w-full sm:w-auto p-1 flex justify-center">
        <a href={link} title={title} target="_blank" rel="noopener">
          <img src={thumbnail} alt={title} height="209" width="372" loading="lazy" />
        </a>
      </div>
    )
  }

  renderPlaylist({ worker }) {
    if (!worker.online) return false
    return (
      <div>
        <section class="max-w-screen-xl mx-auto px-4 flex justify-center items-center flex-wrap py-12 sm:pt-36">
          <h2 class="text-xl sm:text-4xl font-light mb-4">
            {this.i18n.playlist.heading}
            <del>{this.i18n.playlist.slang}</del>
            <span class="text-pink-600 dark:text-pink-500">{this.i18n.playlist.realWord}</span>
          </h2>
          <div class="sm:flex items-center justify-center w-full mt-12 flex-wrap">
            {this.i18n.playlist.videos.map(video => <Video {...video} />)}
          </div>
        </section>
      </div>
    )
  }

  renderSeparator() {
    return (
      <div
        class="h-5 bg-center bg-no-repeat w-full max-w-screen-xl mx-auto flex justify-center items-start flex-wrap border-t-4 border-gray-200 text-center dark:opacity-10 text-gray-300"
      >
        <Arrow size={30} />
      </div>
    )
  }

  render() {
    if (!this.i18n) return false;
    return (
      <div>
        <Hero />
        <Separator />
        <Trinity />
        <Separator />
        {this.i18n.features.map(feature =>
          <>
            <Feature {...feature} />
            <Separator />
          </>
        )}
        <Playlist />
      </div>
    )
  }

}

export default Home;

import Nullstack from "nullstack";
import Snippet from "./Snippet";

class Home extends Nullstack {
  renderHero() {
    return (
      <section class="max-w-screen-xl mx-auto px-4 flex justify-between items-center flex-wrap">
        <div class="sm:w-5/12 grid gap-8 mt-12 sm:mt-0">
          <h1 class="w-full">
            <span class="text-pink-600 text-4xl sm:text-6xl font-light block sm:mb-3">
              Full-Stack
            </span>
            <span class="text-pink-600 text-3xl sm:text-5xl font-light block sm:mb-3">
              Javascript Components
            </span>
            <span class="text-gray-900 dark:text-white text-2xl sm:text-4xl font-light block">
              For one-dev armies
            </span>
          </h1>
          <p class="text-xl sm:text-2xl">
            Write the back-end and the front-end of a feature in a single
            component and let the framework decide where the code should run.
          </p>
          <p class="text-xl sm:text-2xl">
            Nullstack gives you all the tools you need to stay focused on your
            business logic.
          </p>
          <div>
            <button class="bg-pink-600 text-white px-6 py-4 border border-pink-600 hover:bg-transparent hover:text-pink-600 inline-block">
              npx create-nullstack-app
            </button>
          </div>
        </div>
        <div class="bg-center bg-0 hover:bg-100 bg-repeat-y mt-6" style="background-image: url(/stars.png); transition: background-size 3s;">
          <img src="/hero.png" alt="Nulla-Chan" class="max-w-full" />
        </div>
      </section>
    );
  }

  renderRole({ image, title, children }) {
    return (
      <div class="sm:w-1/3 px-8 flex flex-wrap justify-center text-center">
        <div class="bg-center bg-0 hover:bg-100" style="background-image: url(/stars.png); transition: background-size 3s;">
          <img src={image} class="h-48 transform hover:scale-105 transition delay-100" />
        </div>
        <h3 class="w-full text-center text-pink-600 text-xl sm:text-2xl font-light mb-4 sm:px-20">
          {title}
        </h3>
        <p class="w-full text-center text-xl font-gray-600">{children}</p>
      </div>
    );
  }

  renderTrinity() {
    return (
      <section class="max-w-screen-xl mx-auto px-4 flex justify-between items-center flex-wrap py-12 sm:py-36">
        <Role image="/tanker.png" title="Optimized for first render">
          On the first render you'll get SEO ready HTML optimized for the first
          paint of your route in a single request using local functions with
          zero javascript dependencies in the client bundle
        </Role>
        <Role image="/healer.png" title="Snappy PWA experience">
          After the content is served and the network is idle Nullstack
          javascript is loaded, the state of the application is restored through
          hydration and it becomes a single page application
        </Role>
        <Role image="/damage.png" title="Lightweight API requests">
          Subsequent server functions will fetch JSON from an automaticallty
          generated microservice API, deserialize the response, update the
          aplication state, and rerender the page out of the box
        </Role>
      </section>
    );
  }

  renderFeature({ snippet, image, title, children, inverted }) {
    return (
      <section class="max-w-screen-xl mx-auto px-4 flex justify-between items-center flex-wrap py-12 sm:py-36">
        <div class={`w-full sm:w-5/12 ${inverted ? 'sm:order-2' : ''}`}>
          <Snippet key={snippet} />
        </div>
        <div class="mt-12 sm:mt-0 sm:w-5/12">
          <h2 class="text-pink-600 text-xl sm:text-4xl font-light mb-4">
            {title}
          </h2>
          <p class="text-xl">
            {children}
          </p>
          <img src={image} />
        </div>
      </section>
    );
  }

  renderVideo({ link, title, thumbnail }) {
    return (
      <div class="w-full sm:w-1/3 p-1 flex justify-center">
        <a href={link} title={title} target="_blank" rel="noopener">
          <img src={thumbnail} alt={title} height="209" width="372" loading="lazy" />
        </a>
      </div>
    )
  }

  renderPlaylist() {
    return (
      <div>
        <section class="max-w-screen-xl mx-auto px-4 flex justify-center items-center flex-wrap py-12 sm:pt-36">
          <h2 class="text-xl sm:text-4xl font-light mb-4"> 
            Learn with our <del class="text-gray-400">Dweebs</del> <span class="text-pink-600">Experts </span>
          </h2>
          <div class="sm:flex items-center justify-center w-full mt-12 flex-wrap">
            <Video thumbnail="/thumbnail-en-us-1.webp" title="Some video Title" link="#" />
            <Video thumbnail="/thumbnail-en-us-1.webp" title="Some video Title" link="#" />
            <Video thumbnail="/thumbnail-en-us-1.webp" title="Some video Title" link="#" />
          </div>
        </section>
      </div>
    )
  }

  renderSeparator() {
    return (
      <div class="w-full max-w-screen-xl mx-auto flex justify-center items-start flex-wrap border-t-4 border-gray-200 text-center dark:opacity-10">
        <img src="/arrow.png" class="-mt-1" />
      </div>
    )
  }

  render() {
    return (
      <div>
        <Hero />
        <Separator />
        <Trinity />
        <Separator />
        <Feature snippet="GlueCode" image="/glue-code.png" title="No more glue code">
          A full-stack Lifecycle combined with a feature-driven mindset allows
          you to write clean and reusable code without the need to create APIs
          manually.
        </Feature>
        <Separator />
        <Feature snippet="Vanilla" image="/glue-code.png" title="Become a better programmer" inverted>
          Your components are just POJOs.
          Take advantage of the existing ecosystem while you write Javascript as it is supposed to be,
          and see the result reflected in the dom.
        </Feature>
        <Separator />
        <Feature snippet="Modern" image="/glue-code.png" title="You already know Nullstack">
          Routes are simple attributes you can assign to any tag, and links are just a tags.
          You will find out that Nullstack is just a modern version of your current stack.
        </Feature>
        <Separator />
        <Feature snippet="Batteries" image="/glue-code.png" title="All the tools you need" inverted>
          Most chores are very repetitive. 
          Save your energy for the real challenges using the shortcuts we created, 
          like object events and two-way bindings
        </Feature>
        <Separator />
        <Playlist />
      </div>
    );
  }
}

export default Home;

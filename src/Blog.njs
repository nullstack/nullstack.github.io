import Translatable from "./Translatable";

class Blog extends Translatable {
  prepare({ page }) {
    page.priority = 0.3;
  }

  renderProject({ title, repository }) {
    return (
      <a
        href={repository}
        target={repository.indexOf("http") === 0 && "_blank"}
        rel="noopener"
        class="block text-pink-600 dark:text-pink-500 border-t border-gray-100 dark:border-gray-800 py-2 mt-2"
      >
        {title}
      </a>
    );
  }

  renderPost({ title, href, description, date, author }) {
    return (
      <a href={href} class="w-full block mb-8">
        <h2 class="w-full text-xl sm:text-4xl font-light mb-2 text-pink-600">
          {title}
        </h2>
        <p class="text-base" title={description}>
          {description}
        </p>
        <div class="opacity-80">
          <span class="mr-2">By {author.name}</span>
          <span class="mr-2">|</span>
          <span>{date}</span>
        </div>
      </a>
    );
  }

  render() {
    if (!this.i18n) return false;
    return (
      <section class="max-w-screen-lg mx-auto px-4 flex justify-between items-center flex-wrap py-12 sm:py-24">
        <h1 class="w-full text-pink-600 text-4xl sm:text-6xl font-light block sm:mb-3">
          {this.i18n.heading}
        </h1>
        <p class="text-2xl sm:text-4xl font-light block mb-3">
          {" "}
          {this.i18n.tagline}
        </p>
        <p
          class="w-full prose dark:prose-dark max-w-none text-xl"
          html={this.i18n.contribute}
        />
        <div class="w-full mt-8">
          {this.i18n.posts?.map((post) => (
            <Post {...post} />
          ))}
        </div>
      </section>
    );
  }
}

export default Blog;

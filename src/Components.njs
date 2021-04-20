import Translatable from './Translatable';

class Components extends Translatable {

  prepare({page}) {
    page.priority = 0.3;
  }

  renderProject({title, repository}) {
    return (
      <a
        href={repository}
        target={repository.indexOf('http') === 0 && "_blank"}
        rel="noopener"
        class="block text-pink-600 dark:text-pink-500 border-t border-gray-100 dark:border-gray-800 py-2 mt-2"
      >
        {title}
      </a>
    )
  }

  renderTopic({title, projects, tagline}) {
    return (
      <div class="w-full my-6">
        <h2 class="w-full text-xl sm:text-4xl font-light mb-4"> {title} </h2>
        {tagline &&
          <p class="my-3" title={tagline.title}> {tagline.text} </p>
        }
        <nav class="w-full"> 
          {projects.map(project => <Project {...project} />)} 
        </nav>
      </div>
    )
  }
  
  render() {
    if(!this.i18n) return false;
    return (
      <section class="max-w-screen-xl mx-auto px-4 flex justify-between items-center flex-wrap py-12 sm:py-24">
        <h1 class="w-full text-xl sm:text-4xl font-light mb-4"> {this.i18n.heading} </h1>
        <p class="w-full text-xl"> {this.i18n.tagline} </p>
        <p class="w-full prose max-w-none" html={this.i18n.contribute} />
        <div class="w-full">
          {this.i18n.topics.map((topic) => <Topic {...topic} />)}
        </div>
      </section>
    )
  }

}

export default Components;
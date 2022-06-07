import Translatable from "./Translatable";

function slugify(string) {
  return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z ]/g, "").toLowerCase()
}

class Search extends Translatable {

  term = ''
  results = []
  _database = {}

  hydrate() {
    document.addEventListener('keydown', (e) => {
      if (e.key === "Escape" || e.key === "Esc") {
        this.close()
      }
      if (e.key === "k" && e.ctrlKey) {
        e.preventDefault()
        this.open()
      }
    })
  }

  async search({ locale }) {
    clearInterval(this._timer)
    setTimeout(async () => {
      if (!this._database[locale]) {
        const response = await fetch(`/${locale}.json`)
        this._database[locale] = await response.json()
      }
      const terms = this.term.split(" ").map(slugify)
      const results = {}
      for (const file in this._database[locale]) {
        results[file] = 0
        for (const term of terms) {
          if (this._database[locale][file].words[term]) {
            results[file] += this._database[locale][file].words[term]
          }
        }
      }
      this.results = Object.keys(results).filter((r) => results[r]).sort((a, b) => results[b] - results[a]).map((f) => this._database[locale][f]).slice(0, 5)
    }, 400)
  }

  close() {
    this.searching = false
  }

  open() {
    this.term = ''
    this.results = []
    this.searching = true
  }

  goToFirst({ router, event }) {
    if (event.key === "Enter" && this.results.length) {
      router.url = this.results[0].href
      this.close()
    }
  }

  focusSearchInput({ element }) {
    element.focus()
  }

  render() {
    if (!this.i18n || !this.searching) return false;
    return (
      <div class="w-full h-full fixed top-0 left-0 flex items-start justify-center z-50 blur-sm bg-gray-900 bg-opacity-80 px-4 py-8">
        <div class="w-full max-w-screen-md bg-white dark:bg-gray-800 p-4 rounded-md shadow-md md:mt-48">
          <div class="flex justify-between mb-4">
            <span> {this.i18n.title} </span>
            <button class="text-gray-400" onclick={this.close}> {this.i18n.close} </button>
          </div>
          <input
            bind={this.term}
            oninput={this.search}
            onkeydown={this.goToFirst}
            default
            type="search"
            class="text-gray-900 dark:text-white w-full bg-gray-100 dark:bg-gray-900 p-4"
            placeholder={this.i18n.placeholder}
            ref={this.focusSearchInput}
          />
          {this.results.length > 0 &&
            <ul class="mt-4 space-y-4 divide-y divide-gray-200 dark:divide-gray-900">
              {this.results.map((result) => (
                <li>
                  <a href={result.href} onclick={this.close}>
                    <h3 class="text-pink-600 text-lg font-semibold mb-2 mt-4">{result.title}</h3>
                    <p class="text-gray-900 dark:text-white"> {result.description} </p>
                  </a>
                </li>
              ))}
            </ul>
          }
          {this.results.length === 0 && !!this.term &&
            <p class="text-white mt-4" > {this.i18n.empty} "<b>{this.term}" </b></p>
          }
        </div>
      </div>
    )
  }

}

export default Search;
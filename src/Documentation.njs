import Translatable from './Translatable';

class Documentation extends Translatable {
  
  prepare({ router, page }) {
    if(page.locale === 'pt-BR') {
      router.url = '/pt-br/comecando'
    } else {
      router.url = '/getting-started'
    }
  }

}

export default Documentation;
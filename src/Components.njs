import Nullstack from 'nullstack';

class Documentation extends Nullstack {

  prepare({project, page}) {
    page.title = `Community Components - ${project.name}`;
    page.description = 'A curated list of Nullstack components made by the community';
  }

  renderProject({title, repository}) {
    return (
      <a href={repository} class="xl x12 p3y bcm2b ci1h">
        {title}
      </a>
    )
  }

  renderTopic({title, children}) {
    return (
      <div class="x12">
        <h2 class="x12 sm-f6 md+f8"> {title} </h2>
        <nav class="x12 m6b"> {children} </nav>
      </div>
    )
  }
  
  render() {
    return (
      <section class="x sm-p4x sm-p10y md+p20y">
        <h1 class="x12 sm-f6 md+f12 m2b"> Community Components </h1>
        <p class="x12 f4"> A curated list of Nullstack components made by the community. </p>
        <p class="m2t"> 
          If you want to add a component to this list
          <a href="https://github.com/nullstack/nullstack.github.io/issues" class="ci1"> open an issue on github </a>.
        </p>
        <Topic title="Integrations">
          <Project title="Google Analytics" repository="https://github.com/Mortaro/nullstack-google-analytics" />
          <Project title="Facebook Pixel" repository="https://github.com/Mortaro/nullstack-facebook-pixel" />
        </Topic>
        <Topic title="General Inputs">
          <Project title="Currency Input" repository="https://github.com/Mortaro/nullstack-currency-input" />
          <Project title="Date Input" repository="https://github.com/Mortaro/nullstack-date-input" />
          <Project title="CKEditor Adapter" repository="https://github.com/Mortaro/nullstack-ckeditor-adapter" />
        </Topic>
        <Topic title="Brazilian Inputs">
          <Project title="CPF and CNPJ Inputs" repository="https://github.com/Mortaro/nullstack-cpf-cnpj-input" />
          <Project title="CEP Input" repository="https://github.com/Mortaro/nullstack-cep-input" />
          <Project title="Phone Input" repository="https://github.com/Mortaro/nullstack-phone-input" />
          <p class="bgs2 p2 m2t" title="Nullstack is a Brazilian Framework"> 🤘 Nullstack é BR porr@! </p>
        </Topic>
      </section>
    )
  }

}

export default Documentation;
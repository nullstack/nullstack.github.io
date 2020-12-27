import Nullstack from 'nullstack';

class Documentation extends Nullstack {

  prepare({project, page}) {
    page.title = `Community Components - ${project.name}`;
    page.description = 'A curated list of Nullstack components made by the community';
    page.priority = 0.3;
  }

  renderProject({title, repository}) {
    return (
      <a href={repository} target="_blank" rel="noopener" class="xl x12 p3y bcm2t ci1:h">
        {title}
      </a>
    )
  }

  renderTopic({title, children}) {
    return (
      <div class="x12 m6y bcm2 p4x p4t p1b">
        <h2 class="x12 sm-fs6 md+fs8 m3b"> {title} </h2>
        <nav class="x12"> {children} </nav>
      </div>
    )
  }
  
  render() {
    return (
      <section class="x sm-p4x sm-p10y md+p20y">
        <h1 class="x12 sm-fs6 md+fs12 m2b"> Community Components </h1>
        <p class="x12 fs4"> A curated list of Nullstack components made by the community. </p>
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
          <p class="bgs2 p2 m3y" title="Nullstack is a Brazilian Framework"> 🤘 Nullstack é BR porr@! </p>
          <Project title="CPF and CNPJ Inputs" repository="https://github.com/Mortaro/nullstack-cpf-cnpj-input" />
          <Project title="CEP Input" repository="https://github.com/Mortaro/nullstack-cep-input" />
          <Project title="Phone Input" repository="https://github.com/Mortaro/nullstack-phone-input" />
        </Topic>
      </section>
    )
  }

}

export default Documentation;
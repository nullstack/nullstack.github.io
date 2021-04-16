import Nullstack from 'nullstack';

class Routes extends Nullstack {

  renderPost({params}) {
    return (
      <div>
        <div route="/post/getting-started">
          npx create-nullstack-app name
        </div>
        <div route="*"> {params.slug} </div>
      </div>
    )
  }
  
  render() {
    return (
      <div> 
        <Post route="/post/:slug" />
        <a href="/post/hello-world"> Welcome </a>
      </div>
    )
  }

}

export default Routes;
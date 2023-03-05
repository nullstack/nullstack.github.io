class Modern extends Nullstack {

  // params are injected on every function
  renderWaifu({ params }) {
    return (
      <p> Hi i'm {params.name} </p>
    )
  }

  // routes can have dynamic segments
  render() {
    return (
      <div class="not-class-name">
        <Waifu route="/waifus/:name" />
        <a href="/waifus/Nulla">
          NullaChan
        </a>
      </div>
    )
  }

}
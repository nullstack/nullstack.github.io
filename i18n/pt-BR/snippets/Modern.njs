class Modern extends Nullstack {

  // 'params' são injetados em cada função
  renderWaifu({ params }) {
    return (
      <p> Olá, eu sou a {params.name} </p>
    )
  }

  // as rotas podem ter segmentos dinâmicos
  render() {
    return (
      <>
        <Waifu route="/waifus/:name" />
        <a href="/waifus/Nulla">
          NullaChan
        </a>
      </>
    )
  }

}
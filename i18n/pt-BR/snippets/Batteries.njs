class Batteries extends Nullstack {

  // variáveis ​​podem ser vinculadas ao dom
  name = 'Nulla-Chan';
  isWaifu = true;
  
  render() {
    // preparando um evento em objeto
    const isWaifu = !this.isWaifu;

    // eventos são evitados por padrão
    return (
      <form>
        <input bind={this.name} />
        <button onclick={{isWaifu}}>
          Alternar Waifu
        </button>
      </form>
    )
  }

}
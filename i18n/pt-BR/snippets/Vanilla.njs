class Vanilla extends Nullstack {

  // variáveis ​​são apenas variáveis
  count = 0;

  // mutações refletem no dom
  increment() {
    this.count++
  }

  // 'this' é vinculado por padrão
  render() {
    return (
      <button onclick={this.increment}> 
        {this.count}
      </button>
    )
  }

}
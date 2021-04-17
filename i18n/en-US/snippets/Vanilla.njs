class Vanilla extends Nullstack {

  // variables are just variables
  count = 0;

  // mutations reflect in the dom
  increment() {
    this.count++
  }
  
  // 'this' is bound by default
  render() {
    return (
      <button onclick={this.increment}> 
        {this.count}
      </button>
    )
  }

}
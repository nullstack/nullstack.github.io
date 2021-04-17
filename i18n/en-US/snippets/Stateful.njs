import Nullstack from 'nullstack';

class Controlled extends Nullstack {

  count = 0;

  increment({delta}) {
    this.count += delta;
  }
  
  render() {
    return (
      <div>
        <button onclick={this.increment} delta={-1}> 
          {this.count}
        </button>
        <span> {this.count} </span>
        <button onclick={this.increment} delta={1}> 
          {this.count}
        </button>
      </div>
    )
  }

}

export default Controlled;
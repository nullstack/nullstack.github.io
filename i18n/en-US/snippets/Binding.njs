import Nullstack from 'nullstack';

class Binding extends Nullstack {

  number = 1;
  boolean = true;
  
  object = {number: 1};
  array = ['a', 'b', 'c'];
  
  render({params}) {
    return (
      <form>
        <input bind={this.number} />
        <input bind={this.boolean} type="checkbox" />
        <input bind={this.object.number} />
        {this.array.map((value, index) => (
          <input bind={this.array[index]} />
        ))}
        <input bind={params.page} />
      </form>
    )
  }

}

export default Binding;
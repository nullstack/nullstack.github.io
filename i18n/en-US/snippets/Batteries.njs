class Batteries extends Nullstack {

  // variables can be bound to the dom
  name = 'Nulla-Chan';
  isWaifu = true;
  
  render() {
    // preparing an object event
    const isWaifu = !this.isWaifu;

    // events are prevented by default
    return (
      <form>
        <input bind={this.name} />
        <button onclick={{isWaifu}}>
          Toggle Waifu
        </button>
      </form>
    )
  }

}
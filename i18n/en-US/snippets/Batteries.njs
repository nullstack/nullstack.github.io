class Batteries extends Nullstack {

  name = 'Nulla-Chan';
  happy = false;

  action() {
    console.log('event already prevented')
  }

  render() {
    return (
      <form onsubmit={this.action}>
        {/* two way bindings */}
        <input bind={this.name} />
        {/* object events */}
        <button onclick={{ happy: true }}>
          Hug {this.name}
        </button>
      </form>
    )
  }

}
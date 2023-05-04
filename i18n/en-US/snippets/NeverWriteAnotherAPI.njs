class WaifuCreator extends Nullstack {

  // extracted into a microservice
  static async insertWaifu({ database, name }) {
    const sql = "INSERT INTO waifus (name) VALUES (?)";
    return database.query(sql, name);
  }

  // invokes the microservice
  async create() {
    this.insertWaifu({ name: "Nulla-Chan" })
  }

  // render in the DOM
  render() {
    return (
      <button onclick={this.create}>
        Create Waifu
      </button>
    );
  }
  
}

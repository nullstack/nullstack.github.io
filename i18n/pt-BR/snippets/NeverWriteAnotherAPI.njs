class WaifuCreator extends Nullstack {

  // extraído em um microsserviço
  static async insertWaifu({ database, name }) {
    const sql = "INSERT INTO waifus (name) VALUES (?)";
    return database.query(sql, name);
  }

  // invoca o microsserviço
  async create() {
    this.insertWaifu({ name: "Nulla-Chan" })
  }

  // renderiza no DOM
  render() {
    return (
      <button onclick={this.create}>
        Criar Waifu
      </button>
    );
  }
  
}

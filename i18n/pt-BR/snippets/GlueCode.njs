class WaifuCounter extends Nullstack {

  // roda no servidor
  static async getWaifus({ database }) {
    const sql = "SELECT COUNT(*) FROM WAIFUS";
    return database.query(sql);
  }

  // roda no cliente
  async countWaifus() {
    this.waifus = this.getWaifus()
  }

  // roda onde for melhor
  render() {
    return (
      <button onclick={this.countWaifus}>
        Count: {this.waifus}
      </button>
    );
  }

}
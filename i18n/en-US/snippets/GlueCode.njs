class WaifuCounter extends Nullstack {

  // runs in the server
  static async getWaifus({ database }) {
    const sql = "SELECT COUNT(*) FROM WAIFUS";
    return database.query(sql);
  }

  // runs in the client
  async countWaifus() {
    this.waifus = this.getWaifus()
  }

  // runs wherever is best
  render() {
    return (
      <button onclick={this.countWaifus}>
        Count: {this.waifus}
      </button>
    );
  }

}

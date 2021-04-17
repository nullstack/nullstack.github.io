class Feature extends Nullstack {

  // runs in the server
  static async delete({ database }) {
    database.query("DELETE * FROM WAIFUS");
  }

  // runs in the client
  async confirm() {
    if (confirm("You sure? uwu")) {
      await this.delete();
    }
  }

  // runs wherever is best
  render() {
    return (
      <button onclick={this.confirm}>
        Delete
      </button>
    );
  }
  
}

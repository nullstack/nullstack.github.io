class WaifuDestroyer extends Nullstack {

  // executa no servidor
  static async delete({ database }) {
    database.query("DELETE * FROM WAIFUS");
  }

  // executa no client
  async confirm() {
    if (confirm("Tem certeza? uwu")) {
      await this.delete();
    }
  }

  // executa onde for melhor
  render() {
    return (
      <button onclick={this.confirm}>
        Delete
      </button>
    );
  }
  
}

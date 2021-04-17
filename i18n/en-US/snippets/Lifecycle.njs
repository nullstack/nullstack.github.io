import Nullstack from 'nullstack';

class Lifecycle extends Nullstack {
  
  prepare({environment}) {
    const {server, client} = environment;
  }

  async initiate({environment}) {
    const {server, client} = environment;
  }

  async hydrate({environment}) {
    const {client} = environment;
  }

  async update({environment}) {
    const {client} = environment;
  }

  async terminate({environment}) {
    const {client} = environment;
  }

}

export default Lifecycle;
import Nullstack from 'nullstack';

class ProductList extends Nullstack {

  products = [];

  static async getProducts({ database }) {
    const [products] = await database.query(
      'SELECT * FROM products'
    );
    return products;
  }

  async initiate() {
    this.products = await this.getProducts();
  }

  static async deleteProduct({ database, id }) {
    await database.query(
      'DELETE FROM products WHERE id=?', 
      [id]
    );
  }

  async remove({ id }) {
    await this.deleteProduct({ id });
    await this.initiate();
  }

  renderProduct({ id, name }) {
    return (
      <li>
        <button onclick={this.remove} id={id}>
          {name}
        </button>    
      </li>
    )
  }
  
  render() {
    return (
      <ul>
        {this.products.map((product) => (
          <Product {...product} />
        ))}
      </ul>
    )
  }

}

export default ProductList;
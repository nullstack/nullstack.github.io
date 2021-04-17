import Nullstack from 'nullstack';

class ProductForm extends Nullstack {

  name = '';
  price = 0;

  static async getProductById({ database, id }) {
    const [products] = await database.query(
      'SELECT * FROM products WHERE id=? LIMIT 1', 
      [id]
    );
    return products[0];
  }

  async initiate({ params }) {
    const product = await this.getProductById({
      id: params.id
    });
    this.name = product.name;
    this.price = product.price;
  }

  static async updateProduct({ database, name, price, id }) {
    await database.query(
      'UPDATE products SET name=?, price=? WHERE id=?',
      [name, price, id]
    );
  }

  async submit({ router, params }) {
    await this.updateProduct({
      id: params.id,
      name: this.name,
      price: this.price
    });
    router.url = '/products';
  }
  
  render() {
    return (
      <form onsubmit={this.submit}>
        <input class="form-control" bind={this.name} />
        <input type="number" step=".01" bind={this.price} />
        <button>Submit</button>
      </form>
    )
  }

}

export default ProductForm;
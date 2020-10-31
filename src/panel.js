import React, { Component } from 'react';
import client from './feathers';
import Product from './product';
import MarketModal from './market_modal';
import ProductModal from './product_modal';
import PriceModal from './price_modal';

class Panel extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const products = client.service('products')

    products.on('created', product => {
      if (this.state.marketId === product.marketId) {
        this.setState({ products: this.state.products.concat(product) })
      }
    });
  }

  showMarketModal = () => {
    this.setState({ showMarketModal: true });
  };

  hideMarketModal = () => {
    this.setState({ showMarketModal: false });
  };

  showProductModal = () => {
    this.setState({ showProductModal: true });
  };

  hideProductModal = () => {
    this.setState({ showProductModal: false });
  };

  showPriceModal = (product) => {
    this.setState({ product: product });
    this.setState({ showPriceModal: true });
  };

  hidePriceModal = () => {
    this.setState({ showPriceModal: false });
  };

  marketSelected(market) {
    this.setState({ marketId: market._id, marketName: market.name, marketUID: market.uid })

    client.service('products')
      .find({
        query: {
          marketId: market._id,
          $sort: { createdAt: -1 }
        }
      })
      .then((products) =>  this.setState({ products: products.data }))
      .catch(error => this.setState({ error }));
  }

  render() {
    const { markets } = this.props;
    const { products } = this.state;

    return <main className="flex flex-column">
      <header className="title-bar flex flex-row flex-center">
        <div className="title-wrapper block center-element">
          <img className="logo" src="http://feathersjs.com/img/feathers-logo-wide.png"
            alt="Feathers Logo" />
          <span className="title">Market</span>
        </div>
      </header>

      <div className="flex flex-row flex-1 clear">
        <aside className="sidebar col col-4 flex flex-column flex-space-between">
          <header className="flex flex-row flex-center">
            <h4 className="font-300 text-center">
              <span className="font-600 online-count">{markets.length}</span> Markets
            </h4>
          </header>

            <a href="#" onClick={() => this.showMarketModal()} className="button button-primary">
              Crear Nuevo Mercado
            </a>

          <ul className="flex flex-column flex-1 list-unstyled user-list">
            {markets.map(market => <li key={market._id}>
              <a className="block relative" href="#" onClick={() => this.marketSelected(market)}>
                <span className="font-600 online-count">{market.uid}</span>
                <span className="avatar" >{market.name}</span>
              </a>
            </li>)}
          </ul>
          <footer className="flex flex-row flex-center">
            <a href="#" onClick={() => client.logout()} className="button button-primary">
              Sign Out
            </a>
          </footer>
        </aside>

        <div className="flex flex-column col col-8">

          <div className="flex flex-row">
            <div className="flex flex-column col col-6">
              <h3> {this.state.marketName} </h3>
              <a href="#" onClick={() => this.showProductModal()} className={this.state.marketName === undefined ? "display-none" : "button button-primary"}>
                Crear Nuevo Producto
              </a>
            </div>
          </div>

          <main className="chat flex flex-column flex-1 clear" ref={main => { this.chat = main; }}>
            <table className={ ( (products && products.length === 0) || products === undefined) ? "display-none" : ""}>
              <thead>
              <tr>
                <th>#</th>
                <th>Precio de Compra</th>
                <th>Precio Mayorista</th>
                <th>Precio de Venta</th>
              </tr>
              </thead>
              <tbody>
                {products && products.map(product => <Product key={product._id} handleOpen={this.showPriceModal} className="cursor message flex flex-row" product={product} />)}
              </tbody>
            </table>
          </main>
        </div>
      </div>
      <MarketModal className="message flex flex-row" show={this.state.showMarketModal} handleClose={this.hideMarketModal} />
      <ProductModal className="message flex flex-row" marketUID={this.state.marketUID} show={this.state.showProductModal} handleClose={this.hideProductModal} />
      <PriceModal  className="message flex flex-row" product={this.state.product} show={this.state.showPriceModal} handleClose={this.hidePriceModal} />
    </main>;

  }
}

export default Panel;

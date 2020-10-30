import React, { Component } from 'react';
import moment from 'moment';
import client from './feathers';
import Product from './product';

class Panel extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const products = client.service('products')

    Promise.all([
      products.find()
    ]).then( ([ productPage ]) => {
      const products = productPage.data;
      this.setState({ products });
    });

    products.on('created', product => this.setState({
      products: this.state.products.concat(product)
    }));
  }


   marketSelected(marketId) {
    this.setState({ marketId: marketId })

    client.service('products')
      .find({
        query: {
          marketId: marketId,
          $sort: { createdAt: -1 }
        }
      })
      .then((products) =>  this.setState({ products: products.data }))
      .catch(error => this.setState({ error }));
  }

  componentWillUnmount() {
    // Clean up listeners
    // client.service('products').removeListener('created', this.scrollToBottom);
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
        <aside className="sidebar col col-3 flex flex-column flex-space-between">
          <header className="flex flex-row flex-center">
            <h4 className="font-300 text-center">
              <span className="font-600 online-count">{markets.length}</span> Mercados
            </h4>
          </header>

          <ul className="flex flex-column flex-1 list-unstyled user-list">
            {markets.map(market => <li key={market._id}>
              <a className="block relative" href="#" onClick={() => this.marketSelected(market._id)}>
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

        <div className="flex flex-column col col-9">
          <main className="chat flex flex-column flex-1 clear" ref={main => { this.chat = main; }}>
            {products && products.map(product => <div key={product._id} className="message flex flex-row">
              <Product product={product} />
            </div>)}
          </main>
        </div>
      </div>
    </main>;

  }
}

export default Panel;

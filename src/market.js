import React, { Component } from 'react';
import moment from 'moment';
import client from './feathers';

class Market extends Component {

  sendMessage(ev) {
    const input = ev.target.querySelector('[name="text"]');
    const text = input.value.trim();

    if(text) {
      client.service('messages').create({ text }).then(() => {
        input.value = '';
      });
    }

    ev.preventDefault();
  }

  scrollToBottom() {
    const chat = this.chat;

    chat.scrollTop = chat.scrollHeight - chat.clientHeight;
  }

  componentDidMount() {
    this.scrollToBottom = this.scrollToBottom.bind(this);

    client.service('products').on('created', this.scrollToBottom);
    this.scrollToBottom();
  }

  componentWillUnmount() {
    // Clean up listeners
    client.service('products').removeListener('created', this.scrollToBottom);
  }

  render() {
    const { markets, products } = this.props;

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
              <a className="block relative" href="#">
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
            {products.map(product => <div key={product._id} className="message flex flex-row">
              <div className="message-wrapper">
                <p className="message-header">
                  <span className="username font-600">{product.name}</span>
                  <span className="sent-date font-300">  -  {moment(product.createdAt).format('MMM Do, hh:mm:ss')}</span>
                </p>
                <p className="message-content font-300">Precio de Adquisicion: {product.prices.data[0] ? product.prices.data[0].purchase_price : 0}</p>
                <p className="message-content font-300">Precio Mayorista: {product.prices.data[0] ? product.prices.data[0].wholesale_price : 0}</p>
                <p className="message-content font-300">Precio de Venta: {product.prices.data[0] ? product.prices.data[0].sale_price : 0}</p>
              </div>
            </div>)}
          </main>

          <form onSubmit={this.sendMessage.bind(this)} className="flex flex-row flex-space-between" id="send-message">
            <input type="text" name="text" className="flex flex-1" />
            <button className="button-primary" type="submit">Send</button>
          </form>
        </div>
      </div>
    </main>;
  }
}

export default Market;

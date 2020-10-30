import React, { Component } from 'react';
import moment from 'moment';
import client from './feathers';

class Product extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const prices = client.service('prices')

    prices.on('created', price => {
      console.log(price);
      if (this.props.product._id = price.productId) {
        this.setState({ price });
      }
    });
  }

  render() {
    const { product } = this.props;

    return <div className="message-wrapper">
                <p className="message-header">
                  <span className="username font-600">{product.name}</span>
                  <span className="sent-date font-300">  -  {moment(product.createdAt).format('MMM Do, hh:mm:ss')}</span>
                </p>
                <p className="message-content font-300">Precio de Adquisicion: {product.prices.data[0] ? product.prices.data[0].purchase_price : 0}</p>
                <p className="message-content font-300">Precio Mayorista: {product.prices.data[0] ? product.prices.data[0].wholesale_price : 0}</p>
                <p className="message-content font-300">Precio de Venta: {product.prices.data[0] ? product.prices.data[0].sale_price : 0}</p>
              </div>;

  }
}

export default Product;

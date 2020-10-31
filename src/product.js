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
      if (this.props.product._id === price.productId) {
        this.props.product.purchase_price = price.purchase_price
        this.props.product.wholesale_price = price.wholesale_price
        this.props.product.sale_price = price.sale_price
      }
    });
  }

  render() {
    const { product } = this.props;

    return <tr className="message-wrapper">
              <td className="message-header">
                <a className="cursor" onClick={() => this.props.handleOpen(product)}>
                  <span className="username font-600">{product.uid} - {product.name}</span>
                  <span className="sent-date font-300">  -  {moment(product.createdAt).format('MMM Do, hh:mm:ss')}</span>
                </a>
              </td>
              <td className="message-content font-300">{product.purchase_price}</td>
              <td className="message-content font-300">{product.wholesale_price}</td>
              <td className="message-content font-300">{product.sale_price}</td>
            </tr>;

  }
}

export default Product;

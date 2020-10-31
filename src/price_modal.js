import React, { Component } from 'react';
import client from './feathers';

export default class PriceModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  updateField(name, ev) {
    this.setState({ [name]: ev.target.value });
  }

  create() {
    const { purchase_price, sale_price, wholesale_price } = this.state;
    const prices = client.service('prices');

    return prices.create({
      purchase_price,
      sale_price,
      wholesale_price,
      product: this.props.product.uid
    })
    .then(() => this.props.handleClose())
    .catch(error => this.setState({ error }));
  }

  render() {

    return <div className={this.props.show ? "modal display-block" : "modal display-none"}>
      <section className="modal-main">
        <main className="login container">
          <div className="row">
            <div className="col-12 col-6-tablet push-3-tablet text-center heading">
              <h3 className="font-100">New Price for {this.props.product &&  this.props.product.uid}</h3>
              <p>{this.state.error && this.state.error.message}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-6-tablet push-3-tablet col-4-desktop push-4-desktop">
              <form className="form">
                <fieldset>
                  <label>purchase_price :</label>
                  <input className="block" type="number" id="purchase_price" name="purchase_price" placeholder="purchase_price" onChange={ev => this.updateField('purchase_price', ev)} />
                  <label>wholesale_price :</label>
                  <input className="block" type="number" id="wholesale_price" name="wholesale_price" placeholder="wholesale_price" onChange={ev => this.updateField('wholesale_price', ev)} />
                  <label>sale_price :</label>
                  <input className="block" type="number" id="sale_price" name="sale_price" placeholder="sale_price" onChange={ev => this.updateField('sale_price', ev)} />
                  </fieldset>

                <button type="button" className="button button-primary block signup" onClick={() => this.create()}>
                  New
                </button>

                <button type="button" className="close"  onClick={() => this.props.handleClose()} >X</button>
              </form>
            </div>
          </div>
        </main>
      </section>
    </div>;
  }
}

import React, { Component } from 'react';
import client from './feathers';

export default class ProductModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  updateField(name, ev) {
    this.setState({ [name]: ev.target.value });
  }

  create() {
    const { uid, name, description, purchase_price, sale_price, wholesale_price } = this.state;
    const products = client.service('products');

    return products.create({
      uid,
      name,
      description,
      purchase_price,
      sale_price,
      wholesale_price,
      market: this.props.marketUID
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
              <h3 className="font-100">Create Product in {this.props.marketUID}</h3>
              <p>{this.state.error && this.state.error.message}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-6-tablet push-3-tablet col-4-desktop push-4-desktop">
              <form className="form">
                <fieldset>
                  <input className="" type="text" name="uid" placeholder="uid" onChange={ev => this.updateField('uid', ev)} />
                  <input className="block" type="text" name="name" placeholder="name" onChange={ev => this.updateField('name', ev)} />
                  <input className="block" type="text" name="description" placeholder="description" onChange={ev => this.updateField('description', ev)} />
                  <input className="block" type="number" name="purchase_price" placeholder="purchase_price" onChange={ev => this.updateField('purchase_price', ev)} />
                  <input className="block" type="number" name="sale_price" placeholder="sale_price" onChange={ev => this.updateField('sale_price', ev)} />
                  <input className="block" type="number" name="wholesale_price" placeholder="wholesale_price" onChange={ev => this.updateField('wholesale_price', ev)} />
                </fieldset>

                <button type="button" className="button button-primary block signup" onClick={() => this.create()}>
                  Create
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

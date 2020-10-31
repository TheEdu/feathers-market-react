import React, { Component } from 'react';
import client from './feathers';

export default class MarketModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  updateField(name, ev) {
    this.setState({ [name]: ev.target.value });
  }

  create() {
    const { uid, name, description } = this.state;
    const markets = client.service('markets');

    return markets.create({
      uid, name, description
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
              <h1 className="font-100">Create Market</h1>
              <p>{this.state.error && this.state.error.message}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-6-tablet push-3-tablet col-4-desktop push-4-desktop">
              <form className="form">
                <fieldset>
                  <input className="block" type="hidden" name="marketId" value="{}"/>
                </fieldset>

                <fieldset>
                  <input className="block" type="text" name="uid" placeholder="uid" onChange={ev => this.updateField('uid', ev)} />
                </fieldset>

                <fieldset>
                  <input className="block" type="text" name="name" placeholder="name" onChange={ev => this.updateField('name', ev)} />
                </fieldset>

                <fieldset>
                  <input className="block" type="text" name="description" placeholder="description" onChange={ev => this.updateField('description', ev)} />
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

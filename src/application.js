import React, { Component } from 'react';
import Login from './login';
import Panel from './panel';
import client from './feathers';

class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const markets = client.service('markets');

    // Try to authenticate with the JWT stored in localStorage
    client.authenticate().catch(() => this.setState({ login: null }));

    // On successfull login
    client.on('authenticated', login => {
      // Get all users and messages
      Promise.all([
        markets.find()
      ]).then( ([ marketPage ]) => {
        const markets = marketPage.data;
        this.setState({ login, markets });
      });
    });

    // On logout reset all all local state (which will then show the login screen)
    client.on('logout', () => this.setState({
      login: null,
      markets: null
    }));

    markets.on('created', market => this.setState({
      markets: this.state.markets.concat(market)
    }));
  }

  render() {
    if(this.state.login === undefined) {
      return <main className="container text-center">
        <h1>Loading...</h1>
      </main>;
    } else if(this.state.login) {
      return <Panel markets={this.state.markets} />
    }

    return <Login />;
  }
}

export default Application;
